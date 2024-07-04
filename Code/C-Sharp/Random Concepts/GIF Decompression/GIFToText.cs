using System;
using System.IO;
using System.Text;

public class GIFToText
{
    public byte[] LogicalScreenDescriptor { get; private set; }
    public int GIFWidth { get; private set; }
    public int GIFHeight { get; private set; }
    public string LSDPackedData { get; private set; }
    public bool GlobalColorFlag { get; private set; }
    public int GCTSize { get; private set; }
    public bool GCTSortFlag { get; private set; }
    public int BackgroundColorIndex { get; private set; }
    private int bytePointer;

    private StringBuilder _builder;
    public GIF2TXT(string gifPath, string filename)
    {
        bytePointer = 0;
        byte[] bytes = File.ReadAllBytes(gifPath);

        StringBuilder _sb = new();

        foreach (byte b in bytes)
        {
            _sb.Append(b.ToString("X2") + " ");
        }

        File.WriteAllText("FILE_BYTES.txt", _sb.ToString());

        _builder = new StringBuilder();

        AddHeader(bytes[bytePointer..6]);
        AddLSD(bytes[bytePointer..13]);
        AddGCT(bytes[bytePointer..(bytePointer + GCTSize)]);

        StartLoopPoint(bytes);

        File.WriteAllText("FILE_CONVERTED.txt", _builder.ToString());
    }

    private void AddHeader(byte[] header)
    {
        string headerString = "";
        foreach (byte b in header) headerString += b.ToString("X2") + " ";
        _builder.Append(headerString.TrimEnd());
        _builder.Append(" - HEADER");
        _builder.Append("\n");
        bytePointer = 6;
    }

    private void AddLSD(byte[] bytes)
    {
        LogicalScreenDescriptor = bytes[..7];
        string lsdString = "";
        int length = LogicalScreenDescriptor.Length;
        for (int i = 0; i < length; i++) lsdString += LogicalScreenDescriptor[i].ToString("X2") + " ";

        _builder.Append(lsdString.TrimEnd());
        _builder.Append(" - LOGICAL SCREEN DESCRIPTOR");
        _builder.Append("\n");
        _builder.Append("\n");

        TranslateLSD();

        bytePointer += 7;
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
        int colorResolution = Convert.ToInt32(LSD_PD[1..4], 2);
        GCTSize = Convert.ToInt32(3 * (Math.Pow(2, colorResolution + 1)));
        GCTSortFlag = LSD_PD[4] == '1';
    }

    private void AddGCT(byte[] bytes)
    {
        if (!GlobalColorFlag) return;
        if (GCTSortFlag) throw new NotImplementedException("The GCT sort flag has not been managed...");

        _builder.Append("GLOBAL COLOR TABLE ----------");
        _builder.Append("\n");

        foreach (byte b in bytes[..GCTSize])
        {
            _builder.Append(b.ToString("X2") + " ");
        }

        _builder.Append("\n");
        _builder.Append("\n");

        bytePointer += GCTSize;
    }

    private void StartLoopPoint(byte[] bytes)
    {
        while (true)
        {
            if (bytes[bytePointer].ToString("X2") == "3B") break;

            if (bytes[bytePointer].ToString("X2") == "21")
            {
                switch (bytes[bytePointer + 1].ToString("X2"))
                {
                    case "FF":
                        SkipApplicationExtension(bytes[bytePointer..]);
                        break;
                    case "F9":
                        ExtractGCE(bytes[bytePointer..]);
                        break;
                    case "01":
                        throw new NotImplementedException("Entered Plain Text Extension.");
                    case "FE":
                        throw new NotImplementedException("Entered Comment Extension.");
                    default:
                        break;
                };
            }

            else if (bytes[bytePointer].ToString("X2") == "2C")
            {
                ExtractImageDescriptor(bytes[bytePointer..]);
                Decompress(bytes[bytePointer..]);
            }

            else throw new Exception($"Error in Loop Point. Byte: {bytes[bytePointer]:X2}");
        }
    }

    private void SkipApplicationExtension(byte[] bytes)
    {
        _builder.Append("APPLICATION EXTENSION ----------");
        _builder.Append("\n");
        _builder.Append(bytes[0].ToString("X2") + " ");
        _builder.Append("\n");
        _builder.Append(bytes[1].ToString("X2") + " ");
        _builder.Append("\n");
        _builder.Append(bytes[2].ToString("X2") + $" - APPLICATION EXTENSION FIRST BLOCK BYTES: {bytes[2]}");
        _builder.Append("\n");
        _builder.Append("\n");

        int byteCount = 3; // 21 FF <byteCount>

        int firstBlockByteCount = bytes[2];

        byteCount += firstBlockByteCount; // Should be byte length (+11)

        _builder.Append("APPLICATION EXTENSION FIRST BLOCK ----------");
        _builder.Append("\n");

        for (int i = 0; i < firstBlockByteCount; i++)
        {
            _builder.Append(bytes[3 + i].ToString("X2") + " ");
        }
        _builder.Append("\n");
        _builder.Append("\n");

        while (true)
        {
            byteCount += bytes[byteCount]; // Sub Byte

            _builder.Append($"SUB BLOCK ----------");
            _builder.Append("\n");
            _builder.Append(bytes[byteCount].ToString("X2") + $" - SUB BLOCK LENGTH:{bytes[byteCount]}");
            _builder.Append("\n");
            _builder.Append("\n");

            byteCount += 1; // Sub Byte Count Index

            _builder.Append("SUB BLOCK DATA ----------");
            _builder.Append("\n");

            for (int i = 0; i < bytes[byteCount]; i++)
            {
                _builder.Append(bytes[byteCount + i].ToString("X2") + " ");
            }
            _builder.Append("\n");
            _builder.Append("\n");

            if (bytes[byteCount].ToString("X2") == "00") // 00
            {
                bytePointer += 1; // Terminator
                bytePointer += byteCount; // Previous Bytes

                _builder.Append("APPLICATION EXTENSION TERMINATOR ----------");
                _builder.Append("\n");
                _builder.Append(bytes[byteCount].ToString("X2") + " ");
                _builder.Append("\n");
                _builder.Append("\n");
                break;
            }
        }
    }

    private void ExtractGCE(byte[] bytes)
    {
        _builder.Append("GRAPHICS CONTROL EXTENSION ----------");
        _builder.Append("\n");

        // Add Graphics Control Extension
        foreach (byte b in bytes[..8])
        {
            _builder.Append(b.ToString("X2") + " ");
        }

        _builder.Append("\n");
        _builder.Append("\n");

        bytePointer += 8;
    }

    private void ExtractImageDescriptor(byte[] bytes)
    {
        _builder.Append("IMAGE DESCRIPTOR ----------");
        _builder.Append("\n");

        if (bytes[0].ToString("X2") != "2C") throw new Exception("Error extracting Image Descriptor...");
        string pdString = ByteToBinary(bytes[9]);
        bool lctFlag = pdString[0] == '1';

        // Add Image Descriptor
        foreach (byte b in bytes[..10])
        {
            _builder.Append(b.ToString("X2") + " ");
        }

        _builder.Append("\n");
        _builder.Append("\n");

        bytePointer += 10;

        if (lctFlag)
        {
            int lctSizeExtract = Convert.ToInt32(pdString[^3..], 2);
            int lctColorCount = (int)Math.Pow(2, lctSizeExtract + 1);
            int lctByteCount = 3 * lctColorCount;

            _builder.Append("LOCAL COLOR TABLE ----------");
            _builder.Append("\n");

            // Add Local Color Table
            foreach (byte b in bytes[10..lctByteCount])
            {
                _builder.Append(b.ToString("X2"));
            }

            bytePointer += lctByteCount;
        }
    }

    private void Decompress(byte[] bytes)
    {
        int blockPointer = 0;

        // Add Code Size
        _builder.Append(bytes[blockPointer].ToString("X2") + " - CODE SIZE (+1)");
        _builder.Append("\n");

        blockPointer++;

        while (true)
        {
            int blockByteCount = bytes[blockPointer];

            // Add Block Byte Count
            _builder.Append(bytes[blockPointer].ToString("X2") + " - BLOCK BYTE COUNT");
            _builder.Append("\n");

            blockPointer++;

            byte[] block = bytes[blockPointer..(blockByteCount + blockPointer)];

            // Add Block
            foreach (byte b in block)
            {
                _builder.Append(b.ToString("X2") + " ");
            }

            _builder.Append("\n");
            _builder.Append("\n");

            blockPointer += blockByteCount;

            if (bytes[blockPointer].ToString("X2") == "00")
            {
                _builder.Append(bytes[blockPointer].ToString("X2"));
                _builder.Append("\n");
                _builder.Append("\n");

                bytePointer += blockPointer;
                bytePointer++;
                break;
            }
        }
    }

    // Conversions -------------------------------------------------------
    private string ByteToBinary(byte currentByte) => Convert.ToString(currentByte, 2).PadLeft(8, '0');

    private int TwoBytesToLittleEndianInt(byte startByte, byte endByte)
    {
        string littleEndianString = startByte.ToString("X2") + endByte.ToString("X2");
        return Convert.ToInt32(littleEndianString, 16);
    }
}
