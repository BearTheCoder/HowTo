f'''
  For loops in python are a bit different that most other languages.
  They use the range function and iterate through the loop.

  range(<start>, <stop(non-inclusive)>, <increment>)

  So, if you wanted to write the following loop:

  for (let i = 0; i < 10; i++) 
    console.log(i)

  You could do so in python by writing the following:
'''

for i in range(0, 10, 1):
    print(i)
