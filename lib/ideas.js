class Ideas {
  constructor() {
    const holdingValue = JSON.parse(localStorage.ideaArray);
    if (holdingValue) {
      this.all = holdingValue;
    } else {
      this.all = [];
    }
  }
}

module.exports = Ideas
