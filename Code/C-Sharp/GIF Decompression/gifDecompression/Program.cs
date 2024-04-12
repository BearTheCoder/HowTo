string gifFilePath = "";

int _gifWidth = 0;
int _gifHeight = 0;
int _colorTableByteLength = 0;
int _transparencyColorIndex = 0;
int _backgroundColorIndex = 0;
int _colorCount = 0;
int _codeSize = 0;
int frameCount = 0;

bool _globalColorTableFlag;
bool _sortFlag;
bool _transparencyFlag;

List<string> _codeTable = new List<string>();
List<int> _instructionList = new List<int>();

DisposalMethods _disposalMethod;

new GIF2TXT("gif.gif", "txt.txt");


// Don't do anything yet.

return;

StartApp();

void StartApp()
{
	using (FileStream fs = File.OpenRead(gifFilePath))
	{
		bool isGifHeader = CheckHeader(fs);
		if (!isGifHeader) return;

		CheckLogialScreenDesc(fs);

		while (_globalColorTableFlag)
		{
			int nextByte = fs.ReadByte();
			bool canContinue = ManageBlockStart(nextByte, fs);
			if (!canContinue) break;
		}
	}
}

bool ManageBlockStart(int nextByte, FileStream fs)
{
	if (nextByte == 33) // HEX 21 - Extension Block
	{
		int secondByte = fs.ReadByte();

		if (secondByte == 255) // HEX FF - Application Data - Not needed.
		{
			return ManageApplicationDataExtension(fs);
		}

		else if (secondByte == 249) // HEX F9 - Graphics Control Extension.
		{
			return ManageGraphicsControlExtension(fs);
		}

		else if (secondByte == 1) // Plain Text Extension
		{
			throw new NotImplementedException("Plain text extension not managed yet...");
		}
		else if (secondByte == 254) // Comment Extension 
		{
			throw new NotImplementedException("Comment extension not managed yet...");
		}
		else
		{
			throw new NotImplementedException($"Found unmanaged extension flag... Flag: {secondByte.ToString("X2")}");
		}
	}
	else if (nextByte == 44) // HEX 2C - Image Descriptor
	{
		(int startingPixelX, int startingPixelY, int frameWidth, int frameHeight) = ManageImageDescriptor(fs);
		return PrepareForFrameDecompress(fs, startingPixelX, startingPixelY, frameWidth, frameHeight);
	}
	else
	{
		throw new NotImplementedException($"Came across unmanaged block start... Flag: {nextByte}");
	}
}

bool PrepareForFrameDecompress(FileStream fs, int startingPixelX, int startingPixelY, int frameWidth, int frameHeight)
{
	_codeSize = fs.ReadByte() + 1;

	while (true)
	{
		int byteCount = fs.ReadByte();

		if (byteCount == 0) break;

		byte[] frameData = new byte[byteCount];
		fs.Read(frameData, 0, byteCount);

		FrameDecompress(frameData);
		DrawFrameToPNG(startingPixelX, startingPixelY, frameWidth, frameHeight);
	}

	int gifTerminator = fs.ReadByte();

	if (gifTerminator == 59)
	{
		return false;// 3B
	}
	else
	{
		ManageBlockStart(gifTerminator, fs);
		return true;
	}
}

void DrawFrameToPNG(int startingPixelX, int startingPixelY, int frameWidth, int frameHeight)
{
	List<int> colorIndexs = new List<int>();

	foreach (int i in _instructionList)
	{
		string s = _codeTable[i];
		string[] splitInstruction = s.Split(',');
		foreach (string colorIndex in splitInstruction)
		{
			colorIndexs.Add(int.Parse(colorIndex));
		}
	}

	// Do something here.

	frameCount++;
}

void FrameDecompress(byte[] frameData)
{
	string frameDataConcat = "";

	foreach (byte b in frameData)
	{
		frameDataConcat += b.ToString("X2") + " ";
	}

	string remainder = "";
	string binaryString = "";

	for (int i = 0; i < frameData.Length; i++)
	{
		binaryString += ByteToBinary(frameData[i]) + " ";
		string binary = ByteToBinary(frameData[i]) + remainder;

		int startIndex = binary.Length - _codeSize;

		if (startIndex < 0)
		{
			remainder = binary;
			continue;
		}

		string code = binary.Substring(startIndex);
		string byteRemainder = binary.Substring(0, startIndex);

		bool EOI = WriteToInstructions(code);

		if (EOI) return;

		while (byteRemainder.Length >= _codeSize)
		{
			code = byteRemainder.Substring(byteRemainder.Length - _codeSize);
			byteRemainder = byteRemainder.Substring(0, byteRemainder.Length - _codeSize);
			EOI = WriteToInstructions(code);

			if (EOI) return;
		}

		remainder = byteRemainder;
	}
}

bool WriteToInstructions(string code)
{
	int codeIndex = Convert.ToInt32(code, 2);

	bool exists = true;
	if (codeIndex >= _codeTable.Count)
	{
		exists = false;
	}

	if (exists)
	{
		if (_codeTable[codeIndex] == "CLEAR")
		{
			initColorTable();
			return false;
		}
		else if (_instructionList.Count == 0)
		{
			_instructionList.Add(codeIndex);
		}
		else if (_codeTable[codeIndex] == "EOI") { } // Do Nothing
		else
		{
			int priorCode = _instructionList[_instructionList.Count - 1];
			string priorInstruction = _codeTable[priorCode];

			char currentInstruction = _codeTable[codeIndex][0];

			string newCode = priorInstruction + "," + currentInstruction;

			_codeTable.Add(newCode);

			_instructionList.Add(codeIndex);
		}
	}

	else
	{
		int priorCode = _instructionList[_instructionList.Count - 1];
		string priorInstruction = _codeTable[priorCode];

		char firstIndex = _codeTable[priorCode][0];

		string newCode = priorInstruction + "," + firstIndex;

		_codeTable.Add(newCode);

		_instructionList.Add(codeIndex);
	}

	if (_codeTable.Count > MathF.Pow(2, _codeSize) - 1)
	{
		_codeSize++;
	}

	return _codeTable[codeIndex] == "EOI";
}

(int startingPixelX, int startingPixelY, int frameWidth, int frameHeight) ManageImageDescriptor(FileStream fs)
{
	byte[] imageDescriptor = new byte[9];
	fs.Read(imageDescriptor, 0, 9);

	int startingPixelX = TwoBytesToLittleEndianInt(imageDescriptor[1], imageDescriptor[0]);

	int startingPixelY = TwoBytesToLittleEndianInt(imageDescriptor[3], imageDescriptor[2]);

	int frameWidth = TwoBytesToLittleEndianInt(imageDescriptor[5], imageDescriptor[4]);

	int frameHeight = TwoBytesToLittleEndianInt(imageDescriptor[7], imageDescriptor[6]);

	string localColorTablePackedDataBinary = ByteToBinary(imageDescriptor[8]);

	if (localColorTablePackedDataBinary[0] == '0') return (startingPixelX, startingPixelY, frameWidth, frameHeight);
	else
	{
		throw new NotImplementedException("Have not accounted for Local Color Tables...");
	}

}

bool ManageGraphicsControlExtension(FileStream fs)
{
	int byteCount = fs.ReadByte();

	byte[] data = new byte[byteCount];
	fs.Read(data, 0, byteCount);

	string dataBlockPackedFieldBinary = ByteToBinary(data[0]);

	// Bits 0, 1, and 2 are unused....

	string disposal1 = dataBlockPackedFieldBinary[3].ToString();
	string disposal2 = dataBlockPackedFieldBinary[4].ToString();
	string disposal3 = dataBlockPackedFieldBinary[5].ToString();
	string disposalString = disposal1 + disposal2 + disposal3;
	int disposalInt = Convert.ToInt32(disposalString, 2);

	bool userInput = dataBlockPackedFieldBinary[7] == '1';

	_transparencyFlag = dataBlockPackedFieldBinary[7] == '1';

	_disposalMethod = disposalInt switch
	{
		1 => DisposalMethods.Leave,
		2 => DisposalMethods.BackgroundRestore,
		3 => DisposalMethods.PreviousState,
		_ => DisposalMethods.None,
	};

	_transparencyColorIndex = data[3];

	int terminator = fs.ReadByte();
	if (terminator == 0)
	{
		return true;
	}
	else
	{
		Console.WriteLine("Missed Graphics Control Extension Terminator...");
		Console.WriteLine("Graphics Control Extension Block Byte Count: " + byteCount);
		return false;
	}
}

bool ManageApplicationDataExtension(FileStream fs)
{
	int byteCount = fs.ReadByte();
	byte[] bytes = new byte[byteCount];
	fs.Read(bytes, 0, byteCount); // SKIP
	int dataSubBlockByteCount = fs.ReadByte();
	byte[] bytes1 = new byte[dataSubBlockByteCount];
	fs.Read(bytes1, 0, dataSubBlockByteCount); // SKIP
	int terminator = fs.ReadByte();
	if (terminator == 0)
	{
		return true;
	}
	else
	{
		Console.WriteLine("Missed Application Extension Terminator...");
		Console.WriteLine("Application Extension Block Byte Count: " + byteCount);
		Console.WriteLine("Application Extension Data Sub Block Byte Count: " + dataSubBlockByteCount);
		return false;
	}
}

void CheckLogialScreenDesc(FileStream fs)
{
	byte[] logicalScreenDescriptor = new byte[7];
	fs.Read(logicalScreenDescriptor, 0, 7);

	_gifWidth = TwoBytesToLittleEndianInt(logicalScreenDescriptor[1], logicalScreenDescriptor[0]);

	_gifHeight = TwoBytesToLittleEndianInt(logicalScreenDescriptor[3], logicalScreenDescriptor[2]);

	string globalColorTablePackedFieldBinary = ByteToBinary(logicalScreenDescriptor[4]);

	_globalColorTableFlag = globalColorTablePackedFieldBinary[0] == '1';

	if (!_globalColorTableFlag) return;

	string colorTableByteCountString = globalColorTablePackedFieldBinary[1..4].ToString();

	int colorResolution = Convert.ToInt16(colorTableByteCountString, 2);
	_colorCount = (int)Math.Pow(2, colorResolution + 1);
	_colorTableByteLength = _colorCount * 3;

	_sortFlag = globalColorTablePackedFieldBinary[4] == '1';

	// Background Color Index
	_backgroundColorIndex = globalColorTablePackedFieldBinary[5];

	ExtractGlobalColorTableData(fs);
}

void ExtractGlobalColorTableData(FileStream fs)
{
	byte[] globalColorBytes = new byte[_colorTableByteLength];
	fs.Read(globalColorBytes, 0, _colorTableByteLength);

	int j = 0;
	for (int i = 0; i < globalColorBytes.Length; i += 3, j++)
	{
		byte colorR = globalColorBytes[i];
		byte colorG = globalColorBytes[i + 1];
		byte colorB = globalColorBytes[i + 2];

		// Do something with color
	}

}

bool CheckHeader(FileStream fs)
{
	byte[] headerBytes = new byte[6];
	fs.Read(headerBytes, 0, 6);
	string header = System.Text.Encoding.ASCII.GetString(headerBytes);
	return (header == "GIF89a" || header == "GIF87a");
}

void initColorTable()
{
	_instructionList = new List<int>();

	_codeTable = new List<string>();
	int j = 0;
	for (int i = 0; i < _colorCount; i++, j++)
	{
		_codeTable.Add(i.ToString());
	}
	_codeTable.Add("CLEAR");
	_codeTable.Add("EOI");
}


// Conversions ------------------------------------------------------
string ByteToBinary(byte currentByte)
{
	return Convert.ToString(currentByte, 2).PadLeft(8, '0');
}

int TwoBytesToLittleEndianInt(byte startByte, byte endByte)
{
	string littleEndianString = startByte.ToString("X2") + endByte.ToString("X2");
	return Convert.ToInt32(littleEndianString, 16);
}



enum DisposalMethods
{
	None,
	Leave,
	BackgroundRestore,
	PreviousState
}