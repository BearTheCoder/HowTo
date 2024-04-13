using System.Collections;
using System.Collections.Generic;

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
    TransparencyFlag = packedDataString[6] == '1';
    dMethod = packedDataString[3..6] switch
    {
      "001" => DisposalMethod.Cover,
      "010" => DisposalMethod.BackgroundFill,
      "011" => DisposalMethod.UnusedState,
      _ => DisposalMethod.None,
    };
  }
}
