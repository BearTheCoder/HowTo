#include <stdio.h>
#include <stdbool.h> // Allows for "bool" type and "false" and "true" assignments

int main()
{
  char name[100];
  printf("Hello, World! \n");
  printf("What is your name? ");
  scanf("%s", &name);
  printf("Hello, %s \n", name);

  // int is a whole number.
  // By default an int is 32 bits, signed. Meaning a range from -2.1 million to 2.1 million
  int int1 = 1;
  int int2 = 0xCAFE; // Hex Code with 0x
  int int3 = -1;

  // float is a decimal point number that can be both negative and positive and stores in 32 bits.
  float float1 = .1f;
  float float2 = 1.7e4f; // Scientific notation
  float float3 = -1.4e2f;

  // double is a decimal point number that can be both negative and positive and stores in 64 bits.
  double double1 = .1;
  double double2 = 1.4e22;
  double double3 = -.111111111111;

  // int is a whole number. A standard data type.
  // By default an int is 32 bits, signed. Meaning a range from -2.1 billion to 2.1 billion
  int int1 = 1;

  // You can choose for the int to be unsigned, making the range from 0 to 4.2 billion
  unsigned int uInt = 4000000000U;

  // You can also shorten ints from 4 bytes to 2 bytes, making the range -32768 to 32768 if signed. 0 to 65k unsigned.
  unsigned short int uShort = 59000;

  // You can also lenghten ints from 4 bytes to 8 bytes.
  unsigned long int uShort = 200000000000000;

  // Lastly, you can extend the data type by choosing a long. which will range from -922 quadrillion to 922 quadrillion if signed.
  long int long1 = -4000000000000L;
  long float uFloat = 1.455555f;
  long double lDouble = 6.6666666666666666L;

  _Bool falseBool = 0; // False
  _Bool trueBool = 1;  // True
  bool stdBoolFalse = false;
  bool stdBoolTrue = true;

  // Enums
  enum primaryColor
  {
    red,
    yellow,
    blue
  };

  // Chars
  char letter = 'a';
  char letter_a = 97;
  char nl = '\n';

  return 0;
}