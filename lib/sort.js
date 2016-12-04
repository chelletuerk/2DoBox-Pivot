class Sort {
  constructor() {
    this.order = false;
    this.qualityChangers = {
      up: {critical: "critical", high: "critical", normal: "high", low: "normal", none: "low"},
      down: {critical: "high", high: "normal", normal: "low", low: "none", none: "none"}
    };
    this.sortKey = {
      critical: 4,
      high: 3,
      normal: 2,
      low: 1,
      none: 0
    }
  }

  upSort(ideaArray) {
    return ideaArray
      .sort((a, b) => this.sortKey[a.quality] < this.sortKey[b.quality]);
  }

  downSort(ideaArray) {
    return ideaArray
      .sort((a, b) => this.sortKey[a.quality] > this.sortKey[b.quality]);
  }

  flip(render, ideaArray) {
    if (!this.order) {
      render(this.downSort(ideaArray));
      this.order = true;
    } else {
      render(this.upSort(ideaArray));
      this.order = false;
    }
  }
}

module.exports = Sort;
