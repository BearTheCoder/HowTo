/*
**********
*
* Command Line Arguments
*   If you have done any tinkering within the command line you are firmiliar with command line arguments.
*   For example "make", which is a program that is inside of your computer's environment variables, takes an argument.
*   You know it, the "c" program file name.
*   eg: $> make commandLineArgs
*   The program will take the name of the application as an argument and do work with it, like compiling the application.
*
*   python, for example, is an application that was programmed in c.
*   Which is why when you run a python program, you use "py fileName".
*   py runs python
*   fileName finds the file and executes it.
*
*   Command line arguments are used as parameters for the main() function.
*   The first parameter is an int, which is a count of the arguments provided.
*   The second parameter is an array of characters, or strings, that is a collection of the strings input in the command line.
*   The firs element of the array is the
*
**********
*/

#include <stdio.h>
#include <stdbool.h>

int main(int argc, char *argv[])
{

  if (argc == 2)
  {
    printf("%s\n", argv[1]);
  }
  else
  {
    printf("One argument expected");
  }

  return 0;
}