# To run this application, open a terminal at this file's location and type "py <insert file name>"
# If there is something that you are wanting to know that is not here, it is the same as any other language. Google it.

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
# (thought) it almost seems as though python does not have classes and objects, therefore no methods, which is why everything is a function.
age = 30;
ageString = str(age); # "30"
print("I am " + ageString + " years old.")

# Division output is a float
print(type(6/3)) # outputs 2.0

print(2 ** 3) # exponential operator "**"