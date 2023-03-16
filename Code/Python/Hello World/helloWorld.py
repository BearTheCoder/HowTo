# To run this application, open a terminal at this file's location and type "py <insert file name>"
# If there is something that you are wanting to know that is not here, it is the same as any other language. 
# Google it.

import random;
import module;

# print and input is the same as console.log() and console.writeline()
print("Hello World!!!");
print("Hello " + input("What is your name? "));

# This is a comment.
print("\"Hello World!\" is this many digits long:")

# "len()" is the same as string.length
print(len("Hello World!"))
 
# Variables do not need a type nor a keyword.
occupation = input("What do you do for a living? ");
print(occupation + "? That's awesome!");

# "type()" will get what primitive the variable is.
print(type(occupation)) #outputs string

# Type conversions are done with functions. str() == .ToString(), float() == (float), int() == Parse.ToInt().
# (thought) it almost seems as though python does not have classes and objects, therefore no methods, 
# which is why everything is a function.
age = 30;
ageString = str(age); # "30"
print("I am " + ageString + " years old.")

# Division output is a float
print(type(6/3)) # outputs 2.0

print(2 ** 3) # exponential operator "**"

num = input("Give me a number")
num = int(num)

if num % 2 == 0:
  print("The number given is even.")
else:
  print("The number is odd.")

if True:
  print("It is true..");

num2 = input("Give me another number");
num2 = int(num2)

if num2 % 3 == 0:
  print("This number is divisible by 3");
elif num2 % 2 == 0:
  print("This number is not divisible by 3, but is divisible by 2.")
else:
  print("This number is not divisible by 3 or 2")

print(f"This is a random number: {random.randint(0, 100)}")

print(f"This was imported from another script: {module.pi}")

names = ["buttface", "tits mcghee", "sugar tits", "Steve",  "Conical Shaft Jr.", "John Jacob Jinglheimer Schmidt"]

print(names[-1]) #Will print the last name in the list. I did not know this.

for name in names:
  print(name);

