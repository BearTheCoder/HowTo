using TMPro;
using UnityEngine;

public class TimerTest : MonoBehaviour
{
    [SerializeField] TextMeshProUGUI Timer1;
    [SerializeField] TextMeshProUGUI Timer2;
    [SerializeField] TextMeshProUGUI Timer3;
    [SerializeField] int CountdownMinutes = 20;
    private int _countdownTotalSeconds = 0;

    private void Start()
    {
        _countdownTotalSeconds = (CountdownMinutes * 60);
    }

    void Update()
    {
        int secondsPassed = (int)Time.time;

        ElapsedSeconds(secondsPassed);
        ElapsedTime(secondsPassed);
        CountdownTimer(secondsPassed);
    }

    private void ElapsedSeconds(int secondsPassed)
    {
        Timer1.text = secondsPassed.ToString();
    }

    private void ElapsedTime(int secondsPassed)
    {
        int calcMilli = (int)((Time.time - secondsPassed) * 100);
        int calcSec = secondsPassed % 60;
        int calcMin = secondsPassed / 60;
        int calcHour = calcMin / 60;

        Timer2.text = $"{calcHour:D2}:{calcMin:D2}:{calcSec:D2}.{calcMilli:D2}";
    }

    private void CountdownTimer(int secondsPassed)
    {
        int calcSec = (_countdownTotalSeconds - secondsPassed) % 60;
        int calcMin = (_countdownTotalSeconds - secondsPassed) / 60;

        Timer3.text = $"{calcMin}:{calcSec:D2}";
    }
}
