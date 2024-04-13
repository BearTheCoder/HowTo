public class GlobalColor
{
  public byte Red { get; private set; }
  public byte Green { get; private set; }
  public byte Blue { get; private set; }
  public string Hex { get; private set; }

  public GlobalColor(byte red, byte green, byte blue)
  {
    this.Red = red;
    this.Green = green;
    this.Blue = blue;
    this.Hex = GetHex() ?? string.Empty;
  }

  private string GetHex()
  {
    return "#" + this.Red.ToString("X2") + this.Green.ToString("X2") + this.Blue.ToString("X2");
  }
}
