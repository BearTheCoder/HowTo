/*
  The "mainListener" is the function that we want to fire when the event happens.
  As you can see the function takes an argument of "EventData" and when the event fires and new EventData object is created in the EventManager
    and that object is sent to all listeners.
  In the start method we "subscribe" to an event by using the assignment operator on the static event.
  If we instantiated a new EventManager here, the event would never fire.
*/

using UnityEngine;

public class EventListener : MonoBehaviour
{
  private void Start()
  {
    EventManager.mainEvent += mainListener;
  }

  void mainListener(object sender, EventData e)
  {
    Debug.Log("Listener Fired...");
    Debug.Log(e.Value);
  }
}
