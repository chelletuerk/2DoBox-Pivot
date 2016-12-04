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

  deleteIdea(id, ideaId) {
    for (let i = 0; i < this.all.length; i++) {
      let ideaId = this.all[i].id;
      if (id == ideaId) this.all.splice(i, 1);
      localStorage.ideaArray = JSON.stringify(this.all);
    }
  }

  findIdeaById(id) {
    return this.all.filter(function(idea) {
      return idea.id === id;
    })[0];
  }

  findIdeaByQuality(quality) {
    return this.all.filter(e => (e).quality === quality);
  }

  renderCompletedIdeas(ideaArray, createCard) {
    const renderArray = ideaArray.filter(e => e.completed === true)
    renderArray.forEach((e) => {
      $('ideas').prepend(createCard(e))
    })
  }

}

module.exports = Ideas
