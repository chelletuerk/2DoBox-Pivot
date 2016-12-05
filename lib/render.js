class Render {
  constructor(helpers, createCard) {
    this.helpers = helpers;
    this.ten = true;
    this.createCard = createCard;
    this.render = this.render.bind(this);
    this.loadPage = this.loadPage.bind(this);
  }

  firstTen(ideas) {
    const incompleteIdeas = ideas.filter(e => e.completed === false);
    if (incompleteIdeas.length < 10) {
      return incompleteIdeas;
    } else {
      return incompleteIdeas.slice(0, 10);
    }
  }

  render(givenArray, completed) {
    let incompleteGiven;
    if (this.ten) incompleteGiven = this.firstTen(givenArray);
    if (!this.ten) incompleteGiven = givenArray.filter(e => e.completed === false);
    this.helpers.emptyIdeas();
    if (completed) return completed.forEach(e => this.createCard(e));
    if (incompleteGiven) return incompleteGiven.forEach(e => this.createCard(e));
  }

  loadPage(ideaArray) {
    this.render(ideaArray);
  }
}

module.exports = Render
