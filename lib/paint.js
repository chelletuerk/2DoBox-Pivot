class Paint {
  constructor(ideas, helpers) {
    this.ideas = ideas
    this.helpers = helpers
  }

  completeIdeas(e, ideas) {
    let id = +$(e.target).closest("article").attr('id');
    ideas.renderCompletedIdeas(this.createCard)
    $('#show-completed-btn').attr('disabled', true);
  }

  ideasByQuality(e, quality) {
    this.helpers.emptyIdeas();
    this.ideas.findIdeaByQuality(quality).forEach((e) => {
      $('ideas').prepend(this.createCard(e))
    })
  }

  searchedIdeas(e, render) {
    let searchText = e.target.value.toLowerCase();
    if (searchText === '') return render.render(this.ideas.all)
    let matches = this.ideas.all.filter(idea => {
      return idea.body.toLowerCase().includes(searchText) ||
        idea.title.toLowerCase().includes(searchText);
    });
    render.render([], matches);
  }

  completeAnIdea(e, ideas) {
    let id = +$(e.target).closest("article").attr('id');
    let createdCard = $(e.target).closest("article")
    let currentIdea = ideas.findIdeaById(id);
    currentIdea.completed = true;
    createdCard.toggleClass('completed');
    localStorage.ideaArray = JSON.stringify(ideas.all)
  }

  createCard(idea) {
    $('#ideas').prepend(`<article class="newIdea" id=${idea.id}>
      <div id = "card-top">
        <h1 id="idea-title" data-id=${idea.id} contenteditable>${idea.title}</h1>
        <button id="delete-btn"></button>
      </div>
      <div id = "card-middle">
        <p id="idea-body" data-id=${idea.id} contenteditable>${idea.body}</p>
      </div>
      <div id = "card-bottom">
        <button id="up-btn"></button>
        <button id="down-btn"></button>
        <h2 id="quality">quality: ${idea.quality}</h2>
        <button id='complete-btn'>Completed Task</button>
      </div>
    </article>`);
  }
}

module.exports = Paint
