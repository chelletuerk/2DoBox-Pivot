require('./styles');
let Idea = require('./idea');
let helpers = require('./dom-helpers');
let ten = true;
const Ideas = require('./ideas');
const ideas = new Ideas();
const ideaArray = ideas.all;
const Sort = require('./sort');
const sort = new Sort();


let sortedArray = [];
const $title = $('#title');
const $body = $('#body');

$("#title, #body").keyup(e => helpers.checkField());

$('#save').click(e => {
  let title = $title.val();
  let body = $body.val();
  let idea = new Idea(title, body);
  ideas.storeIdea(idea);
  createCard(idea);
  $title.val("");
  $body.val("");
});

$("#show-completed-btn").on('click', (e) => {
  let id = +$(e.target).closest("article").attr('id');
  ideas.renderCompletedIdeas(ideaArray, createCard)
  $('#show-completed-btn').attr('disabled', true);
});

$('#all-ideas').on('click', (e) => {
  ten = false;
  render(ideaArray);
})

$("#ideas").on('click', "#complete-btn", (e) => {
  let id = +$(e.target).closest("article").attr('id');
  let createdCard = $(e.target).closest("article")
  let currentIdea = ideas.findIdeaById(id);
  currentIdea.completed = true;
  createdCard.toggleClass('completed');
  localStorage.ideaArray = JSON.stringify(ideaArray)
});

$('#sort').click(e => {
  sort.flip(render, ideaArray)
});

$('#critical').click(e => {
  helpers.emptyIdeas();
  ideas.findIdeaByQuality("critical").forEach((e) => {
    $('ideas').prepend(createCard(e))
  })
});

$('#high').click(e => {
  helpers.emptyIdeas();
  ideas.findIdeaByQuality("high").forEach((e) => {
    $('ideas').prepend(createCard(e))
  })
});

$('#normal').click(e => {
  helpers.emptyIdeas();
  ideas.findIdeaByQuality("normal").forEach((e) => {
    $('ideas').prepend(createCard(e))
  })
});

$('#low').click(e => {
  helpers.emptyIdeas();
  ideas.findIdeaByQuality("low").forEach((e) => {
    $('ideas').prepend(createCard(e))
  })
});

$('#none').click(e => {
  helpers.emptyIdeas();
  ideas.findIdeaByQuality("none").forEach((e) => {
    $('ideas').prepend(createCard(e))
  })
});

$('#search').keyup(e => {
  let searchText = e.target.value.toLowerCase();
  if (searchText === '') return render(ideaArray)
  let matches = ideaArray.filter(idea => {
    return idea.body.toLowerCase().includes(searchText) ||
      idea.title.toLowerCase().includes(searchText);
  });
  render([], matches);
});

$("#ideas").on("click", "#delete-btn", (e) => {
  e.currentTarget.closest("article").remove();
  let id = e.currentTarget.closest("article").id;
  ideas.deleteIdea(id);
});

$("#ideas").on('click', "#up-btn", (e) => {
  const id = +e.currentTarget.closest('article').id;
  const currentIdea = ideas.findIdeaById(id);
  const ideaQuality = currentIdea.quality;
  const nextQuality = sort.qualityChangers.up[ideaQuality]
  const nearestQualityElement = e.target.parentElement.querySelector('#quality')
  ideaArray.forEach(idea => {
    if (idea.id === id) {
      idea.quality = nextQuality;
    }
  }); // mem
  nearestQualityElement.innerText = `quality: ${nextQuality}` // dom
  localStorage.ideaArray = JSON.stringify(ideaArray); // db
});

$("#ideas").on('click', "#down-btn", (e) => {
    const id = +e.currentTarget.closest('article').id;
    const currentIdea = ideas.findIdeaById(id);
    const ideaQuality = currentIdea.quality;
    const nextQuality = sort.qualityChangers.down[ideaQuality]
    const nearestQualityElement = e.target.parentElement.querySelector('#quality')
    ideaArray.forEach(idea => {
      if (idea.id === id) {
        idea.quality = sort.qualityChangers.down[ideaQuality];
      }
    });
    nearestQualityElement.innerText = `quality: ${nextQuality}`
    localStorage.ideaArray = JSON.stringify(ideaArray);
});

$('#ideas').on('keyup blur', "#idea-title",(e) => {
  if (e.which == 13 || e.type === "focusout") {
    e.preventDefault();
    let id = +$(this).closest("article").attr('id');
    let currentIdea = ideas.findIdeaById(id);
    let newTitle = $(this).text();
    ideaArray.forEach = idea => {
      if (idea.id === id) {
        idea.title = newTitle;
      }
    };
    localStorage.ideaArray = JSON.stringify(ideaArray);
  }
});

const countTitle = () => {
  let total = document.getElementById("title").value;
  total = total.replace(/\s/g, '');
  document.getElementById("titleCount").innerHTML = "Total Characters: "+total.length;
}

$('#title').on('keyup', (e) => {
  countTitle();
})

const countBody = () => {
  let total = document.getElementById("body").value;
  total = total.replace(/\s/g, '');
  document.getElementById("bodyCount").innerHTML = "Total Characters: "+total.length;
}

$('#body').on('keyup', (e) =>{
  countBody();
})

$('#ideas').on('keyup blur', "#idea-body", (e) => {
  if (e.which == 13 || e.type === "focusout") {
    e.preventDefault();
    let id = +$(e.currentTarget).closest("article").attr('id');
    let currentIdea = ideas.findIdeaById(id);
    let newBody = $(e.currentTarget).text();
    ideaArray.forEach = idea => {
      if (idea.id === id) {
          idea.body = newBody;
      };
    };
    localStorage.ideaArray = JSON.stringify(ideaArray);
  }
});

const loadPage = () => {
  render(ideaArray);
}

const firstTen = (ideas) => {
  const incompleteIdeas = ideas.filter(e => e.completed === false);
  if (incompleteIdeas.length < 10) {
    return incompleteIdeas;
  } else {
    return incompleteIdeas.slice(0, 10);
  }
}

const render = (givenArray, completed) => {
  let incompleteGiven;
  if (ten) incompleteGiven = firstTen(givenArray);
  if (!ten) incompleteGiven = givenArray.filter(e => e.completed === false);
  helpers.emptyIdeas();
  if (completed) return completed.forEach(e => createCard(e));
  if (incompleteGiven) return incompleteGiven.forEach(e => createCard(e));
}

const createCard = idea => {
  $('#ideas').prepend(`<article class="newIdea" id=${idea.id}>
    <div id = "card-top">
      <h1 id="idea-title" contenteditable>${idea.title}</h1>
      <button id="delete-btn"></button>
    </div>
    <div id = "card-middle">
      <p id="idea-body" contenteditable>${idea.body}</p>
    </div>
    <div id = "card-bottom">
      <button id="up-btn"></button>
      <button id="down-btn"></button>
      <h2 id="quality">quality: ${idea.quality}</h2>
      <button id='complete-btn'>Completed Task</button>
    </div>
  </article>`);
}

loadPage();
