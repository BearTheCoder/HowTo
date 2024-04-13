using System.Collections;
using System.Collections.Generic;

public class ImageDescriptor
{
  public int StartPixelX { get; private set; }
  public int StartPixelY { get; private set; }
  public int ImageWidth { get; private set; }
  public int ImageHeight { get; private set; }
  public bool LocalColorTableFlag { get; private set; }

  public ImageDescriptor(int startX, int startY, int iWidth, int iHeight, string pdString)
  {
    this.StartPixelX = startX;
    this.StartPixelY = startY;
    this.ImageWidth = iWidth;
    this.ImageHeight = iHeight;
    LocalColorTableFlag = pdString[0] == '1';
  }
}
