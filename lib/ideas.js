class Ideas {
  constructor() {
    if (!localStorage.ideaArray) localStorage.ideaArray = "[]";
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

  deleteIdea(id) {
    this.all = this.all.filter(e => +e.id !== +id);
    localStorage.ideaArray = JSON.stringify(this.all);
  }

  findIdeaById(id) {
    return this.all.filter(function(idea) {
      return idea.id === id;
    })[0];
  }

  findIdeaByQuality(quality) {
    return this.all.filter(e => (e).quality === quality);
  }

  renderCompletedIdeas(createCard) {
    const renderArray = this.all.filter(e => e.completed === true)
    renderArray.forEach((e) => {
      $('ideas').prepend(createCard(e));
    });
  }

  changeQuality(e, sort, direction) {
    const id = +e.currentTarget.closest('article').id;
    const currentIdea = this.findIdeaById(id);
    const ideaQuality = currentIdea.quality;
    const nextQuality = sort.qualityChangers[direction][ideaQuality];
    const nearestQualityElement = e.target.parentElement.querySelector('#quality')
    this.all.forEach(idea => {
      if (idea.id === id) {
        idea.quality = nextQuality;
      }
    });
    nearestQualityElement.innerText = `quality: ${nextQuality}`;
    localStorage.ideaArray = JSON.stringify(this.all);
  }

  editIdea(e, property) {
    e.preventDefault();
    let id = +e.target.dataset.id;
    let currentIdea = this.findIdeaById(id);
    let newTitle = e.target.innerText;
    this.all.forEach(idea => {
      if (idea.id === id) idea[property] = newTitle;
    });
    localStorage.ideaArray = JSON.stringify(this.all);
  }

  deleteOnClick(e) {
    e.currentTarget.closest("article").remove();
    let id = e.currentTarget.closest("article").id;
    this.deleteIdea(id);
  }
}

module.exports = Ideas
