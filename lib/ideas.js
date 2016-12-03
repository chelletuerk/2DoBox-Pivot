class Ideas {
  constructor() {
    const holdingValue = JSON.parse(localStorage.ideaArray);
    if (holdingValue) {
      this.all = holdingValue;
    } else {
      this.all = [];
    }
  }

  storeIdea(idea) {
    this.all.push(idea);
    localStorage.ideaArray = JSON.stringify(this.all);
  }
}

module.exports = Ideas
