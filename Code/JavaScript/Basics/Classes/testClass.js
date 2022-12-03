class testClass {
  constructor (name, occupation) {
    this.name = name;
    this.occupation = occupation;
  };

  logInfo () {
    console.log(`Hi my name is ${this.name} and I work as a ${this.occupation}`);
  }
}

module.exports = { testClass };