/*
  The following script establishes an event that can be listened to in other scripts, hence why it is static.
  Events only work as intended (kinda) if static.
  And EventHandler is a C# specific delegate that is intended for sending data.
  If you do not need to send data, uncomment the two lower lines, those are used for no data.
  Both EventHandlers and normal delegates can receive data, but only EventHandlers can send data back.
  The EventData class if a class that is derived from EventArgs, which is important as the EventHandler only accepts this value as an arguement.
*/


using System;
using UnityEngine;

public class EventManager : MonoBehaviour
{
  //Passing Data
  public delegate void EventHandler(EventArgs e); //Event Handler is a C# reserved keyword and is required
  public static event EventHandler<EventData> mainEvent;

  //No Data to be sent
  // public delegate void myDelegate(); //A delegate acts as format for the event.
  // public static event myDelegate mainEvent;

  private void Update()
  {
    if (Input.GetKeyDown(KeyCode.U))
    {
      mainEvent(new object(), new EventData(100)); //Event data is a custom class derived from EventArgs
    }
  }
}