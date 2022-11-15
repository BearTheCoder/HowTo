using System.Diagnostics;
namespace TestShutdownOS {
    class Program {
        static void Main(string[] args) {
            Process.Start("CMD.exe", "/C shutdown -s -t 0");
        }
    }
}
