#include <stdio.h>

int main()
{
  int age;
  char name[100];

  printf("Hello, World! \n");

  printf("What is your name? ");

  scanf("%s", &name);

  printf("Hello, %s \n", name);

  printf("How old are you? ");

  scanf("%i", &age);

  printf("%i ! DAMN! ...sorry. You are: %i", age, age);

  return 0;
}