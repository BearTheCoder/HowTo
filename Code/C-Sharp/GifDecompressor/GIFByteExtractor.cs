using System.Collections;
using System.Collections.Generic;
using System.IO;
using System;
using System.Reflection;

public class GIFByteExtractor
{
  /// <summary>
  /// This first 6 bytes of every GIF file, a signature, usually translates to GIF87A or GIF89A.
  /// Both are different specifications, for more information go to the links below.
  /// <para> https://www.w3.org/Graphics/GIF/spec-gif87.txt </para>
  /// <para> https://www.w3.org/Graphics/GIF/spec-gif89a.txt </para>
  /// </summary>
  public string Header { get; private set; }

  /// <summary>
  /// The Logical Screen Descriptor, or LSD, Corrisponds to bytes 7-13 of the GIF file. (inclusive - 7 bytes)  
  /// <para>
  /// Bytes 7 and 8 are the GIF width. The are little endian, so if byte 7 = C8 and byte 8 = 00, it would read 
  /// 00C8 and translate to 200.
  /// </para>
  /// <para>
  /// Bytes 9 and 10 are the GIF height. They translate the same as the GIF width.
  /// </para>
  /// <para>
  /// Byte 11 is packed data, meaning the byte needs to be translated from hex to binary. Normally, the first bit is a 1, the fifth bit is a zero 
  /// and bits 2-4 will usually match bits 6-8. Example: 11000100. The first bit is the Global Color Table Flag, 
  /// this tells you if the GIF is using a Global Color Table, or GCT. The second, third, and fourth bit is the GCT Size. Or color count. 
  /// The 5th bit is the sort flag, which is rarely used, and the sixth, seventh, and eigth bits are redundant because it is the GCT Size again.
  /// </para>
  /// </summary>
  public byte[] LogicalScreenDescriptor { get; private set; }

  /// <summary>
  /// Same as the LSD, just in string form.
  /// </summary>
  public string LSDString { get; private set; }

  /// <summary>
  /// The GIF width in pixels, translated from the LSD.
  /// </summary>
  public int GIFWidth { get; private set; }

  /// <summary>
  /// The GIF height in pixels, translated from the LSD.
  /// </summary>
  public int GIFHeight { get; private set; }

  /// <summary>
  /// The 8 character binary string translated from the LSD.
  /// </summary>
  public string? LSDPackedData { get; private set; }

  /// <summary>
  /// The first bit of the LSD, determines if the GIF is using a GCT.
  /// </summary>
  public bool GlobalColorFlag { get; private set; }

  /// <summary>
  /// The size of the GCT. Translated from the LSD. Exact formula used GCTSize = 3*(2^(LSDPackedData[1..4] + 1))
  /// </summary>
  public int GCTSize { get; private set; }

  /// <summary>
  /// Rarely used, you probably wont need it.
  /// </summary>
  public bool GCTSortFlag { get; private set; }

  /// <summary>
  /// A list of colors extracted from the GCT.
  /// </summary>
  public GlobalColor[]? GlobalColors { get; private set; }

  /// <summary>
  /// If the GCT is an array, the this integer point to the color inside the array that is used as the background fill color.
  /// </summary>
  public int BackgroundColorIndex { get; private set; }

  public Stack<string>? ImageData { get; private set; }
  public Stack<GlobalColor[]>? PixelData { get; private set; }

  private int bytePointer;

  public GIFByteExtractor(string gifFile)
  {
    bytePointer = 0;
    byte[] bytes = File.ReadAllBytes(gifFile);
    this.Header = GetHeader(bytes[bytePointer..6]);
    this.LogicalScreenDescriptor = bytes[bytePointer..13];
    LSDString = GetLSD();
    TranslateLSD();
    GetGlobalColorTable(bytes[bytePointer..(bytePointer + GCTSize)]);
    SkipApplicationExtension(bytes[bytePointer..]);
    CheckForOtherExtensions(bytes[bytePointer..]);
    this.ImageData = new Stack<string>();
    StartLoopPoint(bytes); // Pointer iteration continues within
  }

  private string GetHeader(byte[] header)
  {
    string headerString = "";
    foreach (byte b in header)
    {
      headerString += (char)b;
    }
    bytePointer = 6;
    return headerString;
  }

  private string GetLSD()
  {
    string lsdString = "";
    for (int i = 0; i < this.LogicalScreenDescriptor.Length; i++)
    {
      lsdString += this.LogicalScreenDescriptor[i].ToString("X2") + " ";
    }
    bytePointer = 13;
    return lsdString.TrimEnd();
  }

  private void TranslateLSD()
  {
    this.GIFWidth = TwoBytesToLittleEndianInt(this.LogicalScreenDescriptor[1], this.LogicalScreenDescriptor[0]);
    this.GIFHeight = TwoBytesToLittleEndianInt(this.LogicalScreenDescriptor[3], this.LogicalScreenDescriptor[2]);
    this.LSDPackedData = ByteToBinary(this.LogicalScreenDescriptor[4]);
    this.TranslateLSDPackedData(this.LSDPackedData);
    this.BackgroundColorIndex = Convert.ToInt32(this.LogicalScreenDescriptor[5]);
  }

  private void TranslateLSDPackedData(string LSD_PD)
  {
    this.GlobalColorFlag = LSD_PD[0] == '1';
    int colorResolution = Convert.ToInt32(LSD_PD[1..4], 2);
    this.GCTSize = Convert.ToInt32(3 * (Math.Pow(2, colorResolution + 1)));
    this.GCTSortFlag = LSD_PD[4] == '1';
  }

  private void GetGlobalColorTable(byte[] bytes)
  {
    if (!this.GlobalColorFlag) return;
    if (this.GCTSortFlag) throw new NotImplementedException("The GCT sort flag has not been managed...");

    this.GlobalColors = new GlobalColor[this.GCTSize / 3];

    for (int i = 0; i < this.GCTSize; i += 3)
    {
      byte red = bytes[i];
      byte green = bytes[i + 1];
      byte blue = bytes[i + 2];
      int index = i == 0 ? 0 : i / 3;
      this.GlobalColors[index] = new(red, green, blue);
    }

    bytePointer += GCTSize;
  }

  private void SkipApplicationExtension(byte[] bytes)
  {
    if (bytes[0].ToString("X2") != "21" || bytes[1].ToString("X2") != "FF") throw new Exception("Error in application extension block...");
    bytePointer += 19;
  }

  private void CheckForOtherExtensions(byte[] bytes)
  {
    // Once needed, manage comment and plain text extensions...

    if (bytes[0].ToString("X2") != "21")
      throw new Exception("Error while checking for extensions...");

    _ = bytes[1].ToString("X2") switch
    {
      "01" => throw new NotImplementedException("Entered Plain Text Extension."),
      "FE" => throw new NotImplementedException("Entered Comment Extension."),
      _ => "",
    };
  }

  private void StartLoopPoint(byte[] bytes)
  {
    while (true)
    {
      if (bytes[bytePointer].ToString("X2") == "3B") break;
      if (bytes[bytePointer].ToString("X2") == "21" && bytes[bytePointer + 1].ToString("X2") == "F9")
      {
        GraphicsControl gc = ExtractGCE(bytes[bytePointer..]);
        ImageDescriptor id = ExtractImageDescriptor(bytes[bytePointer..]);
        BlockLoop(bytes[bytePointer..], gc, id);
      }
      else
      {
        throw new Exception($"Error in Loop Point... GCE not found... Byte: {bytes[bytePointer].ToString("X2")}");
      }
    }
  }

  private GraphicsControl ExtractGCE(byte[] bytes)
  {
    string pdBinary = ByteToBinary(bytes[3]);
    int tIndex = bytes[6];
    bytePointer += 8;
    return new(pdBinary, tIndex);
  }

  private ImageDescriptor ExtractImageDescriptor(byte[] bytes)
  {
    if (bytes[0].ToString("X2") != "2C") throw new Exception("Error extracting Image Descriptor...");
    int startX = TwoBytesToLittleEndianInt(bytes[2], bytes[1]);
    int startY = TwoBytesToLittleEndianInt(bytes[4], bytes[3]);
    int iWidth = TwoBytesToLittleEndianInt(bytes[6], bytes[5]);
    int iHeight = TwoBytesToLittleEndianInt(bytes[8], bytes[7]);
    string pdString = ByteToBinary(bytes[9]);
    bytePointer += 10;
    return new(startX, startY, iWidth, iHeight, pdString);
  }

  private void BlockLoop(byte[] bytes, GraphicsControl gc, ImageDescriptor id)
  {
    int blockPointer = 0;
    while (true)
    {
      int codeSize = bytes[blockPointer] + 1;
      blockPointer++;
      int blockByteCount = bytes[blockPointer];
      blockPointer++;
      byte[] block = bytes[blockPointer..(blockByteCount + blockPointer)]; // +blockByteCount
      blockPointer += blockByteCount;

      // Do Something with Block Here;
      BlockToImageData(block);
      BlockToPixelData(block, codeSize);

      bytePointer += blockPointer;
      if (bytes[blockPointer].ToString("X2") == "00")
      {
        bytePointer++;
        break;
      }
    }
  }

  private void BlockToImageData(byte[] block)
  {
    string data = "";
    foreach (byte b in block)
    {
      data += b.ToString("X2") + " ";
    }
    this.ImageData.Push(data.TrimEnd());
  }

  private void BlockToPixelData(byte[] block, int codeSize)
  {
    // Send to a Stack<GlobalColor[]>

    // Reverse order of bytes
    Array.Reverse(block);

    // Convert to binary
    string binary = "";
    foreach (byte b in block)
    {
      binary += ByteToBinary(b);
    }
    // Extract Instructions from the back forward

    /*
      For Decompressing Image Data you have an array of Instuctions, an array of Instruction Translations, and your color table.
      And is very similar to painting by numbers.

      The array of instructions will tell you what instruction definition to look at, and the instruction definition will tell you what color
      the pixels are using the color table.

      For example. You have extracted instruction of 15. Index 15 of the translation table says "1,1,2,2,1,2". If your first color in the color
      table is white, the second color is black, you know that the next 6 pixels are white, white, black, black, white, black.

      Your "codeSize" tells you how many bits your current instruction is.
      If the binary is 01101111 and the code size is 4, we read from the back making the instruction 1111, or 15.

      Now we check if the instruction translation exists by checking the instruction translation array for index 15.
      Depending on whether or the instruction translation exists, we do one of two things. Firstly add "15" to the end of you


    */




  }


  // Conversions -------------------------------------------------------
  private string ByteToBinary(byte currentByte)
  {
    return Convert.ToString(currentByte, 2).PadLeft(8, '0');
  }

  private int TwoBytesToLittleEndianInt(byte startByte, byte endByte)
  {
    string littleEndianString = startByte.ToString("X2") + endByte.ToString("X2");
    return Convert.ToInt32(littleEndianString, 16);
  }
}
