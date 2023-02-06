/*
  Because this class is derived from EventArgs means this class can be used with EventHandlers.
  Other than that, this is a standard C# class.
*/

using System;

public class EventData : EventArgs
{
  public int Value { get; set; }
  public EventData(int newValue)
  {
    this.Value = newValue;
  }
}