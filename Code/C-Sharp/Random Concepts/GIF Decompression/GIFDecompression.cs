using System.Collections.Generic;
using System.IO;
using System;

public class GIFDecompression
{
    public string Header { get; private set; }
    public byte[] LogicalScreenDescriptor { get; private set; }
    public string LSDString { get; private set; }
    public int GIFWidth { get; private set; }
    public int GIFHeight { get; private set; }
    public string LSDPackedData { get; private set; }
    public bool GlobalColorFlag { get; private set; }
    public int GCTSize { get; private set; }
    public bool GCTSortFlag { get; private set; }
    public GIFColor[] GlobalColors { get; private set; }
    public int BackgroundColorIndex { get; private set; }
    public List<int> Instructions { get; private set; }
    public List<string> Definitions { get; private set; }
    public List<ImageData> Images { get; private set; }
    public List<GIFColor> PixelColors { get; private set; }

    private int _bytePointer;
    private int _blockCodeSize = 0;
    private ImageDescriptor _imageDes;
    private GraphicsControl _graphicsControl;

    private int CODECOUNT = 0;
    private int BLOCKCOUNT = 0;
    private int IMAGECOUNT = 0;

    public GIFByteExtractor(string gifFile)
    {
        Images = new();
        PixelColors = new();
        _bytePointer = 0;

        byte[] bytes = File.ReadAllBytes(gifFile);

        Header = GetHeader(bytes[_bytePointer..6]);

        LSDString = GetLSD(bytes[_bytePointer..13]);

        int GCTEndByte = _bytePointer + GCTSize;

        GetGlobalColorTable(bytes[_bytePointer..GCTEndByte]);
        StartLoopPoint(bytes);
    }

    private string GetHeader(byte[] header)
    {
        string headerString = "";
        foreach (byte b in header) headerString += (char)b;
        _bytePointer = 6;
        return headerString;
    }

    private string GetLSD(byte[] bytes)
    {
        LogicalScreenDescriptor = bytes[..7];
        string lsdString = "";
        int length = LogicalScreenDescriptor.Length;
        for (int i = 0; i < length; i++) lsdString += LogicalScreenDescriptor[i].ToString("X2") + " ";
        TranslateLSD();
        _bytePointer = 13;
        return lsdString.TrimEnd();
    }

    private void TranslateLSD()
    {
        GIFWidth = TwoBytesToLittleEndianInt(LogicalScreenDescriptor[1], LogicalScreenDescriptor[0]);
        GIFHeight = TwoBytesToLittleEndianInt(LogicalScreenDescriptor[3], LogicalScreenDescriptor[2]);
        LSDPackedData = ByteToBinary(LogicalScreenDescriptor[4]);
        TranslateLSDPackedData(LSDPackedData);
        BackgroundColorIndex = Convert.ToInt32(LogicalScreenDescriptor[5]);
    }

    private void TranslateLSDPackedData(string LSD_PD)
    {
        GlobalColorFlag = LSD_PD[0] == '1';
        int colorResolution = Convert.ToInt32(LSD_PD[5..], 2);
        GCTSize = Convert.ToInt32(3 * (Math.Pow(2, colorResolution + 1)));
        GCTSortFlag = LSD_PD[4] == '1';
    }

    private void GetGlobalColorTable(byte[] bytes)
    {
        if (!GlobalColorFlag) return;
        if (GCTSortFlag) throw new NotImplementedException("The GCT sort flag has not been managed...");
        GlobalColors = new GIFColor[GCTSize / 3];

        for (int i = 0; i < GCTSize; i += 3)
        {
            byte red = bytes[i];
            byte green = bytes[i + 1];
            byte blue = bytes[i + 2];
            int index = i == 0 ? 0 : i / 3;
            GlobalColors[index] = new(red, green, blue, false);
        }
        _bytePointer += GCTSize;
    }

    private void StartLoopPoint(byte[] bytes)
    {
        while (true)
        {
            if (bytes[_bytePointer].ToString("X2") == "3B")
            {
                break;
            }

            if (bytes[_bytePointer].ToString("X2") == "21")
            {
                switch (bytes[_bytePointer + 1].ToString("X2"))
                {
                    case "FF":
                        SkipApplicationExtension(bytes[_bytePointer..]);
                        break;
                    case "F9":
                        ExtractGCE(bytes[_bytePointer..]);
                        break;
                    case "01":
                        throw new NotImplementedException("Entered Plain Text Extension.");
                    case "FE":
                        throw new NotImplementedException("Entered Comment Extension.");
                    default:
                        break;
                };
            }

            else if (bytes[_bytePointer].ToString("X2") == "2C")
            {
                ExtractImageDescriptor(bytes[_bytePointer..]);
                Decompress(bytes[_bytePointer..]);
                IMAGECOUNT++;
            }

            else
            {
                throw new Exception($"Error in Loop Point. Byte:{bytes[_bytePointer - 3]:X2} {bytes[_bytePointer - 2]:X2} {bytes[_bytePointer - 1]:X2} " +
                $"{bytes[_bytePointer]:X2} {bytes[_bytePointer + 1]:X2} " +
                $"{GlobalColors.Length} {CODECOUNT} {BLOCKCOUNT} {IMAGECOUNT}");
            }
        }
    }

    private void SkipApplicationExtension(byte[] bytes)
    {
        int byteCount = 3; // 21 FF <byteCount>

        byteCount += bytes[2]; // Should be byte length (+11)

        while (true)
        {
            byteCount += bytes[byteCount]; // Sub Byte

            byteCount += 1; // Sub Byte Count Index

            if (bytes[byteCount].ToString("X2") == "00") // 00
            {
                _bytePointer += 1; // Terminator
                _bytePointer += byteCount; // Previous Bytes
                break;
            }
        }
    }

    private void ExtractGCE(byte[] bytes)
    {
        string pdBinary = ByteToBinary(bytes[3]);
        int tIndex = bytes[6];
        _bytePointer += 8;
        _graphicsControl = new(pdBinary, tIndex);
    }

    private void ExtractImageDescriptor(byte[] bytes)
    {
        if (bytes[0].ToString("X2") != "2C") throw new Exception("Error extracting Image Descriptor...");
        int startX = TwoBytesToLittleEndianInt(bytes[2], bytes[1]);
        int startY = TwoBytesToLittleEndianInt(bytes[4], bytes[3]);
        int iWidth = TwoBytesToLittleEndianInt(bytes[6], bytes[5]);
        int iHeight = TwoBytesToLittleEndianInt(bytes[8], bytes[7]);
        string pdString = ByteToBinary(bytes[9]);
        bool lctFlag = pdString[0] == '1';
        _bytePointer += 10;

        if (lctFlag)
        {
            int lctSizeExtract = Convert.ToInt32(pdString[^3..], 2);
            int lctColorCount = (int)Math.Pow(2, lctSizeExtract + 1);
            int lctByteCount = 3 * lctColorCount;

            GIFColor[] colors = new GIFColor[lctColorCount];
            for (int i = 0; i < lctByteCount; i += 3)
            {
                byte red = bytes[10 + i];
                byte green = bytes[10 + i + 1];
                byte blue = bytes[10 + i + 2];
                int index = i == 0 ? 0 : i / 3;
                colors[index] = new(red, green, blue, false);
            }

            _bytePointer += lctByteCount;
            _imageDes = new(startX, startY, iWidth, iHeight, pdString, colors);
            return;
        }

        _imageDes = new(startX, startY, iWidth, iHeight, pdString);
    }

    private void Decompress(byte[] bytes)
    {
        int blockPointer = 0;
        int codeSize = bytes[blockPointer] + 1;
        _blockCodeSize = bytes[blockPointer];

        InitInstructionsAndDefinitions(_blockCodeSize);

        blockPointer++;
        string binary = "";

        while (true)
        {
            int blockByteCount = bytes[blockPointer];
            blockPointer++;
            byte[] block = bytes[blockPointer..(blockByteCount + blockPointer)];
            blockPointer += blockByteCount;
            (int newCodeSize, string oldBinary) = BlockToPixelData(block, codeSize, binary);
            binary = oldBinary;
            codeSize = newCodeSize;
            BLOCKCOUNT++;

            if (bytes[blockPointer].ToString("X2") == "00")
            {
                _bytePointer += blockPointer;
                _bytePointer++;

                BLOCKCOUNT = 0;
                EndOfImage();
                break;
            }
        }
    }

    private (int codeSize, string binary) BlockToPixelData(byte[] block, int codeSize, string oldBinary)
    {
        string binary = GetBinaryFromReverseBlock(block, oldBinary);
        CODECOUNT = 0;

        while (binary.Length > codeSize)
        {
            (string instructionBinary, string remainder) = GetInstruction(binary, codeSize);
            binary = remainder;
            int instruction = Convert.ToInt32(instructionBinary, 2);
            int maxIndex = Definitions.Count - 1;

            NoDefintionExists(instruction, instruction < maxIndex);

            (bool breakFromLoop, int newCodeSize) = DefinitionExists(instruction, codeSize, instruction < maxIndex);
            codeSize = newCodeSize;

            if (breakFromLoop)
            {
                CODECOUNT = 0;
                break;
            }

            BuildImageData(instruction);

            int max = ((int)Math.Pow(2, codeSize));

            if (Definitions.Count == max)
            {
                if (codeSize < 12)
                {
                    codeSize++;
                }
            }
            CODECOUNT++;
        }

        return (codeSize, binary);
    }

    private string GetBinaryFromReverseBlock(byte[] block, string oldBinary)
    {
        Array.Reverse(block);
        string binary = "";
        foreach (byte b in block) binary += ByteToBinary(b);
        binary += oldBinary;
        return binary;
    }

    private void InitInstructionsAndDefinitions(int codeSize)
    {
        int size = (int)Math.Pow(2, codeSize);
        Definitions = new List<string>();
        Instructions = new List<int>();
        for (int i = 0; i < size; i++) Definitions.Add(i.ToString());
        Definitions.Add("CLEAR");
        Definitions.Add("EOI");
    }

    private void NoDefintionExists(int instruction, bool exists)
    {
        if (exists) return;

        if (Instructions.Count == 0) Instructions.Add(instruction);
        else
        {
            string lastInstruction = Definitions[Instructions[^1]];
            AddNew(lastInstruction, lastInstruction.Split(',')[0], instruction);
        }
    }

    private (bool canReturn, int codeSize) DefinitionExists(int instruction, int codeSize, bool exists)
    {
        if (!exists) return (false, codeSize);

        if (Definitions[instruction] == "EOI") return (true, codeSize);
        else if (Definitions[instruction] == "CLEAR")
        {
            InitInstructionsAndDefinitions(_blockCodeSize);
            return (false, _blockCodeSize + 1);
        }
        else
        {
            if (Instructions.Count == 0) Instructions.Add(instruction);
            else
            {
                string lastInstruction = Definitions[Instructions[^1]];
                string currentInstruction = Definitions[instruction];
                AddNew(lastInstruction, currentInstruction.Split(',')[0], instruction);
            }
        }
        return (false, codeSize);
    }

    private void AddNew(string lastInstruction, string firstIndex, int instruction)
    {
        string newDefinition = lastInstruction + "," + firstIndex;
        Definitions.Add(newDefinition);
        Instructions.Add(instruction);
    }

    private (string code, string remainder) GetInstruction(string binary, int codeSize)
    {
        if (codeSize > binary.Length) throw new Exception("Mismanaged code extractor, code size larger than remainder...");
        else
        {
            string code = binary.Substring(binary.Length - codeSize, codeSize);
            string remainder = binary[..^codeSize];
            return (code, remainder);
        }
    }

    private void BuildImageData(int instruction)
    {
        if (Definitions[instruction] == "CLEAR" || Definitions[instruction] == "EOI") return;

        string s = Definitions[instruction];
        string[] instructions = s.Split(',');

        foreach (string instr in instructions)
        {
            int index = int.Parse(instr);

            if (_imageDes.LocalColorTableFlag) PixelColors.Add(_imageDes.LocalColorTable[index]);
            else
            {
                GIFColor gc = GlobalColors[index];
                if (_graphicsControl.TransparencyIndex == index)
                {
                    gc.Alpha = true;
                }

                PixelColors.Add(gc);
            }
        }
    }

    private void EndOfImage()
    {
        ImageData data = new(_graphicsControl.dMethod, _imageDes.StartPixelX, _imageDes.StartPixelY, _imageDes.ImageWidth,
            _imageDes.ImageHeight, _graphicsControl.TransparencyFlag, _graphicsControl.TransparencyIndex, PixelColors);

        Images.Add(data);

        PixelColors = new List<GIFColor>();
    }

    // Conversions -------------------------------------------------------
    private string ByteToBinary(byte currentByte) => Convert.ToString(currentByte, 2).PadLeft(8, '0');

    private int TwoBytesToLittleEndianInt(byte startByte, byte endByte)
    {
        string littleEndianString = startByte.ToString("X2") + endByte.ToString("X2");
        return Convert.ToInt32(littleEndianString, 16);
    }
}


public class GraphicsControl
{
    public enum DisposalMethod
    {
        None = 0,
        Cover = 1,
        BackgroundFill = 2,
        UnusedState = 3
    }

    public DisposalMethod dMethod { get; private set; }
    public bool TransparencyFlag { get; private set; }
    public int TransparencyIndex { get; private set; }

    public GraphicsControl(string pdBinary, int tIndex)
    {
        GetPackedData(pdBinary);
        TransparencyIndex = tIndex;
    }

    private void GetPackedData(string packedDataString)
    {
        TransparencyFlag = packedDataString[7] == '1';
        dMethod = packedDataString[3..6] switch
        {
            "001" => DisposalMethod.Cover,
            "010" => DisposalMethod.BackgroundFill,
            "011" => DisposalMethod.UnusedState,
            _ => DisposalMethod.None,
        };
    }
}

public class ImageData
{
    public GraphicsControl.DisposalMethod DisposalMethod { get; private set; }
    public int StartingPixelX { get; private set; }
    public int StartingPixelY { get; private set; }
    public int ImageWidth { get; private set; }
    public int ImageHeight { get; private set; }
    public bool Transparency { get; private set; }
    public int TransparencyIndex { get; private set; }
    public List<GIFColor> PixelColors { get; private set; }
    public ImageData(GraphicsControl.DisposalMethod disposalMethod, int startingPixelX, int startingPixelY, int imageWidth, int imageHeight,
        bool transparency, int transparencyIndex, List<GIFColor> pixelColors)
    {
        DisposalMethod = disposalMethod;
        StartingPixelX = startingPixelX;
        StartingPixelY = startingPixelY;
        ImageWidth = imageWidth;
        ImageHeight = imageHeight;
        Transparency = transparency;
        TransparencyIndex = transparencyIndex;
        PixelColors = pixelColors;
    }
}

public class ImageDescriptor
{
    public int StartPixelX { get; private set; }
    public int StartPixelY { get; private set; }
    public int ImageWidth { get; private set; }
    public int ImageHeight { get; private set; }
    public bool LocalColorTableFlag { get; private set; }
    public GIFColor[] LocalColorTable { get; private set; }
    public bool InterlaceFlag { get; private set; }

    public ImageDescriptor(int startX, int startY, int iWidth, int iHeight, string pdString)
    {
        this.StartPixelX = startX;
        this.StartPixelY = startY;
        this.ImageWidth = iWidth;
        this.ImageHeight = iHeight;
        LocalColorTableFlag = pdString[0] == '1';
        InterlaceFlag = pdString[1] == '1';
    }

    public ImageDescriptor(int startX, int startY, int iWidth, int iHeight, string pdString, GIFColor[] lct)
    {
        this.StartPixelX = startX;
        this.StartPixelY = startY;
        this.ImageWidth = iWidth;
        this.ImageHeight = iHeight;
        LocalColorTableFlag = pdString[0] == '1';
        InterlaceFlag = pdString[1] == '1';
        LocalColorTable = lct;
    }
}

// Second Iteration / Rewrite
public class GIFDecompressor
{
    private GIFHeader _header;
    private GIFLogicalDescriptor _logicalDescriptor;
    private GIFGlobalColorTable _globalColorTable;
    private GIFGraphicsControl _graphicsControl;
    private GIFImageDescriptor _imageDescriptor;
    private int _bytePointer;

    public GIFDecompressor(string gifFile)
    {
        this._bytePointer = 0;

        byte[] bytes = File.ReadAllBytes(gifFile);

        this._header = new(bytes[this._bytePointer..6]);
        this._bytePointer += this._header.ByteMover;

        this._logicalDescriptor = new(bytes[this._bytePointer..13]);
        this._bytePointer += this._logicalDescriptor.ByteMover;

        if (this._logicalDescriptor.GlobalColorFlag)
        {
            if (this._logicalDescriptor.GCTSortFlag) throw new NotImplementedException("The GCT sort flag has not been managed...");

            int GCTEndByte = this._bytePointer + this._logicalDescriptor.GCTSize;
            this._globalColorTable = new(bytes[this._bytePointer..GCTEndByte], this._logicalDescriptor.GCTSize);

            this._bytePointer += this._globalColorTable.ByteMover;
        }

        StartLoopPoint(bytes);
    }

    private void StartLoopPoint(byte[] bytes)
    {
        while (true)
        {
            if (bytes[this._bytePointer].ToString("X2") == "3B") //EOF
            {
                break;
            }

            if (bytes[this._bytePointer].ToString("X2") == "21")
            {
                switch (bytes[this._bytePointer + 1].ToString("X2"))
                {
                    case "FF":
                        GIFApplicationExtension ae = new(bytes[this._bytePointer..]);
                        this._bytePointer += ae.ByteMover;
                        break;
                    case "F9":
                        this._graphicsControl = new(bytes[this._bytePointer..]);
                        this._bytePointer += this._graphicsControl.ByteMover;
                        break;
                    case "01":
                        throw new NotImplementedException("Entered Plain Text Extension.");
                    case "FE":
                        throw new NotImplementedException("Entered Comment Extension.");
                    default:
                        break;
                };
            }

            else if (bytes[this._bytePointer].ToString("X2") == "2C")
            {
                this._imageDescriptor = new(bytes[this._bytePointer..]);
                this._bytePointer += this._imageDescriptor.ByteMover;

                Decompress d = new(bytes[this._bytePointer..], this._graphicsControl, this._imageDescriptor, this._globalColorTable);
                this._bytePointer += d.ByteMover;
            }

            else
            {
                throw new Exception($"Error in Loop Point. Byte:{bytes[this._bytePointer - 3]:X2} {bytes[this._bytePointer - 2]:X2} {bytes[this._bytePointer - 1]:X2}");
            }
        }
    }
}

public class GIFHeader
{
    public string Header { get; private set; }
    public int ByteMover { get; private set; }
    public GIFHeader(byte[] bytes)
    {
        string headerString = "";
        foreach (byte b in bytes) headerString += (char)b;

        ByteMover = 6;
    }
}

public class GIFImageDescriptor
{
    public int ByteMover { get; private set; }
    public int StartX { get; private set; }
    public int StartY { get; private set; }
    public int FrameWidth { get; private set; }
    public int FrameHeight { get; private set; }
    public bool LocalColorTableFlag { get; private set; }
    public GIFColor[] LocalColorTable { get; private set; }

    public GIFImageDescriptor(byte[] bytes)
    {
        ByteMover = 0;

        if (bytes[0].ToString("X2") != "2C") throw new Exception("Error extracting Image Descriptor...");

        StartX = Conversions.TwoBytesToLittleEndianInt(bytes[2], bytes[1]);
        StartY = Conversions.TwoBytesToLittleEndianInt(bytes[4], bytes[3]);
        FrameWidth = Conversions.TwoBytesToLittleEndianInt(bytes[6], bytes[5]);
        FrameHeight = Conversions.TwoBytesToLittleEndianInt(bytes[8], bytes[7]);

        string pdString = Conversions.ByteToBinary(bytes[9]);

        LocalColorTableFlag = pdString[0] == '1';

        ByteMover += 10;

        if (LocalColorTableFlag)
        {
            int lctSizeExtract = Convert.ToInt32(pdString[^3..], 2);
            int lctColorCount = (int)Math.Pow(2, lctSizeExtract + 1);
            int lctByteCount = 3 * lctColorCount;

            LocalColorTable = new GIFColor[lctColorCount];
            for (int i = 0; i < lctByteCount; i += 3)
            {
                byte red = bytes[10 + i];
                byte green = bytes[10 + i + 1];
                byte blue = bytes[10 + i + 2];
                int index = i == 0 ? 0 : i / 3;
                LocalColorTable[index] = new(red, green, blue, false);
            }

            ByteMover += lctByteCount;
        }
    }
}

public class GIFLogicalDescriptor
{
    public int ByteMover { get; private set; }
    public int GIFWidth { get; private set; }
    public int GIFHeight { get; private set; }
    public int GCTSize { get; private set; }
    public bool GlobalColorFlag { get; private set; }
    public bool GCTSortFlag { get; private set; }
    public int BackgroundColorIndex { get; private set; }

    private byte[] _logicalScreenDescriptor;
    private string _lsdPackedData;

    public GIFLogicalDescriptor(byte[] bytes)
    {
        _logicalScreenDescriptor = bytes[..7];
        TranslateLSD();
        ByteMover = 13;
    }

    private void TranslateLSD()
    {
        GIFWidth = Conversions.TwoBytesToLittleEndianInt(_logicalScreenDescriptor[1], _logicalScreenDescriptor[0]);
        GIFHeight = Conversions.TwoBytesToLittleEndianInt(_logicalScreenDescriptor[3], _logicalScreenDescriptor[2]);
        _lsdPackedData = Conversions.ByteToBinary(_logicalScreenDescriptor[4]);
        TranslateLSDPackedData(_lsdPackedData);
        BackgroundColorIndex = Convert.ToInt32(_logicalScreenDescriptor[5]);
    }

    private void TranslateLSDPackedData(string LSD_PD)
    {
        GlobalColorFlag = LSD_PD[0] == '1';
        int colorResolution = Convert.ToInt32(LSD_PD[5..], 2);
        GCTSize = Convert.ToInt32(3 * (Math.Pow(2, colorResolution + 1)));
        GCTSortFlag = LSD_PD[4] == '1';
    }
}

public class GIFGraphicsControl
{
    public int ByteMover { get; private set; }
    public enum DisposalMethod
    {
        None = 0,
        Cover = 1,
        BackgroundFill = 2,
        UnusedState = 3
    }

    public DisposalMethod dMethod { get; private set; }
    public bool TransparencyFlag { get; private set; }
    public int TransparencyIndex { get; private set; }

    public GIFGraphicsControl(byte[] bytes)
    {
        string pdBinary = Conversions.ByteToBinary(bytes[3]);
        int tIndex = bytes[6];
        ByteMover = 8;

        GetPackedData(pdBinary);
        TransparencyIndex = tIndex;
    }

    private void GetPackedData(string packedDataString)
    {
        TransparencyFlag = packedDataString[7] == '1';
        dMethod = packedDataString[3..6] switch
        {
            "001" => DisposalMethod.Cover,
            "010" => DisposalMethod.BackgroundFill,
            "011" => DisposalMethod.UnusedState,
            _ => DisposalMethod.None,
        };
    }
}

public class GIFApplicationExtension
{
    public int ByteMover { get; private set; }
    public GIFApplicationExtension(byte[] bytes)
    {
        ByteMover = 3; // 21 FF <byteCount>

        ByteMover += bytes[2]; // Should be byte length (+11)

        while (true)
        {
            ByteMover += bytes[ByteMover]; // Sub Byte

            ByteMover += 1; // Sub Byte Count Index

            if (bytes[ByteMover].ToString("X2") == "00") // 00
            {
                ByteMover += 1; // Terminator
                break;
            }
        }
    }
}

public class GIFColor
{
    public byte Red { get; private set; }
    public byte Green { get; private set; }
    public byte Blue { get; private set; }
    public bool Alpha { get; set; }
    public string Hex { get; private set; }

    public GIFColor(byte red, byte green, byte blue, bool alpha)
    {
        this.Red = red;
        this.Green = green;
        this.Blue = blue;
        this.Hex = GetHex() ?? string.Empty;
        Alpha = alpha;
    }

    private string GetHex()
    {
        return "#" + this.Red.ToString("X2") + this.Green.ToString("X2") + this.Blue.ToString("X2");
    }
}


public class GIFGlobalColorTable
{
    public int ByteMover { get; private set; }
    public GIFColor[] GlobalColors { get; private set; }

    public GIFGlobalColorTable(byte[] bytes, int gctSize)
    {
        GlobalColors = new GIFColor[gctSize / 3];

        for (int i = 0; i < gctSize; i += 3)
        {
            byte red = bytes[i];
            byte green = bytes[i + 1];
            byte blue = bytes[i + 2];
            int index = i == 0 ? 0 : i / 3;
            GlobalColors[index] = new(red, green, blue, false);
        }

        ByteMover = gctSize;
    }
}

public class Decompress
{
    public int ByteMover { get; private set; }

    private GIFGraphicsControl _gc;
    private GIFImageDescriptor _id;
    private GIFGlobalColorTable _gct;
    private List<int> _instructions;
    private List<string> _definitions;
    private List<GIFColor> _pixelColors;
    private int _lzwCodeSize;

    public Decompress(byte[] bytes, GIFGraphicsControl gc, GIFImageDescriptor id, GIFGlobalColorTable gct)
    {
        _gc = gc;
        _id = id;
        _gct = gct;

        int blockPointer = 0;
        int minimumCodeSize = bytes[blockPointer] + 1; // 8, 256, Clear, Init LZW 8, 8 + 1

        _lzwCodeSize = bytes[blockPointer]; // 8

        InitInstructionsAndDefinitions(_lzwCodeSize);

        blockPointer++;

        string binary = "";

        while (true)
        {
            int blockByteCount = bytes[blockPointer];

            blockPointer++;

            byte[] block = bytes[blockPointer..(blockByteCount + blockPointer)];

            blockPointer += blockByteCount;

            (int newCodeSize, string oldBinary) = BlockToPixelData(block, minimumCodeSize, binary);
            binary = oldBinary;
            minimumCodeSize = newCodeSize;

            if (bytes[blockPointer].ToString("X2") == "00") // Block Terminator
            {
                blockPointer++;

                EndOfImage();

                ByteMover = blockPointer;

                break;
            }
        }
    }

    private void InitInstructionsAndDefinitions(int codeSize)
    {
        int size = (int)Math.Pow(2, codeSize);
        _definitions = new List<string>();
        _instructions = new List<int>();
        for (int i = 0; i < size; i++) _definitions.Add(i.ToString());
        _definitions.Add("CLEAR");
        _definitions.Add("EOI");
    }

    private (int codeSize, string binary) BlockToPixelData(byte[] block, int codeSize, string oldBinary)
    {
        string binary = GetBinaryFromReverseBlock(block, oldBinary);

        while (binary.Length > codeSize)
        {
            (string instructionBinary, string remainder) = GetInstruction(binary, codeSize);
            binary = remainder;
            int instruction = Convert.ToInt32(instructionBinary, 2);
            int maxIndex = _definitions.Count - 1;

            NoDefintionExists(instruction, instruction < maxIndex);

            (bool breakFromLoop, int newCodeSize) = DefinitionExists(instruction, codeSize, instruction < maxIndex);
            codeSize = newCodeSize;

            if (breakFromLoop) break;

            BuildImageData(instruction);

            int max = ((int)Math.Pow(2, codeSize));

            if (_definitions.Count == max)
            {
                if (codeSize < 12)
                {
                    codeSize++;
                }
            }
        }

        return (codeSize, binary);
    }

    private string GetBinaryFromReverseBlock(byte[] block, string oldBinary)
    {
        Array.Reverse(block);
        string binary = "";
        foreach (byte b in block) binary += Conversions.ByteToBinary(b);
        binary += oldBinary;
        return binary;
    }

    private (string code, string remainder) GetInstruction(string binary, int codeSize)
    {
        if (codeSize > binary.Length) throw new Exception("Mismanaged code extractor, code size larger than remainder...");
        else
        {
            string code = binary.Substring(binary.Length - codeSize, codeSize);
            string remainder = binary[..^codeSize];
            return (code, remainder);
        }
    }

    private void NoDefintionExists(int instruction, bool exists)
    {
        if (exists) return;

        if (_instructions.Count == 0) _instructions.Add(instruction);
        else
        {
            string lastInstruction = _definitions[_instructions[^1]];
            AddNew(lastInstruction, lastInstruction.Split(',')[0], instruction);
        }
    }

    private (bool canReturn, int codeSize) DefinitionExists(int instruction, int codeSize, bool exists)
    {
        if (!exists) return (false, codeSize);

        if (_definitions[instruction] == "EOI") return (true, codeSize);
        else if (_definitions[instruction] == "CLEAR")
        {
            InitInstructionsAndDefinitions(_lzwCodeSize);
            return (false, _lzwCodeSize + 1);
        }
        else
        {
            if (_instructions.Count == 0) _instructions.Add(instruction);
            else
            {
                string lastInstruction = _definitions[_instructions[^1]];
                string currentInstruction = _definitions[instruction];
                AddNew(lastInstruction, currentInstruction.Split(',')[0], instruction);
            }
        }
        return (false, codeSize);
    }

    private void AddNew(string lastInstruction, string firstIndex, int instruction)
    {
        string newDefinition = lastInstruction + "," + firstIndex;
        _definitions.Add(newDefinition);
        _instructions.Add(instruction);
    }

    private void BuildImageData(int instruction)
    {
        if (_definitions[instruction] == "CLEAR" || _definitions[instruction] == "EOI") return;

        string s = _definitions[instruction];
        string[] instructions = s.Split(',');

        foreach (string instr in instructions)
        {
            int index = int.Parse(instr);

            if (_id.LocalColorTableFlag) _pixelColors.Add(_id.LocalColorTable[index]);
            else
            {
                GIFColor gc = _gct.GlobalColors[index];
                if (_gc.TransparencyIndex == index)
                {
                    gc.Alpha = true;
                }

                this._pixelColors.Add(gc);
            }
        }
    }

    private void EndOfImage()
    {
        /*ImageData data = new(_graphicsControl.dMethod, _imageDes.StartPixelX, _imageDes.StartPixelY, _imageDes.ImageWidth,
            _imageDes.ImageHeight, _graphicsControl.TransparencyFlag, _graphicsControl.TransparencyIndex, PixelColors);*/

        /*Images.Add(data);*/

        _pixelColors = new List<GIFColor>();
    }
}