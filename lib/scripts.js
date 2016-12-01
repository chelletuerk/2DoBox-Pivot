require('./styles');
let Idea = require('./idea');
let helpers = require('./dom-helpers');
//const newAlert = require('./alert');
//newAlert();


let ideaArray = [];
let sortedArray = [];
const $title = $('#title');
const $body = $('#body');
let sortOrder = false;
const qualityChangers = {
  up: {critical: "critical", high: "critical", normal: "high", low: "normal", none: "low"},
  down: {critical: "high", high: "normal", normal: "low", low: "none", none: "none"}
};

$("#title, #body").keyup(e => helpers.checkField());

$('#save').click(e => {
  let title = $title.val();
  let body = $body.val();
  let idea = new Idea(title, body);
  storeIdea(idea);
  createCard(idea);
  $title.val("");
  $body.val("");
});

$("#show-completed-btn").on('click', (e) => {
  let id = +$(e.target).closest("article").attr('id');
  renderCompletedIdeas()
  $('#show-completed-btn').attr('disabled', true);
});

const renderCompletedIdeas = () => {
  const renderArray = ideaArray.filter(e => e.completed === true)
  renderArray.forEach((e) => {
    $('ideas').prepend(createCard(e))
  })
}

$("#ideas").on('click', "#complete-btn", (e) => {
  let id = +$(e.target).closest("article").attr('id');
  let createdCard = $(e.target).closest("article")
  let currentIdea = findIdeaByID(id);
  currentIdea.completed = true;
  createdCard.toggleClass('completed');
  localStorage.setItem('ideaArray', JSON.stringify(ideaArray))
});

$('#sort').click(e => {
  if (!sortOrder) {
    render(downSort());
    sortOrder = true;
  } else {
    render(upSort());
    sortOrder = false;
  }
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
  deleteIdea(id);
});

$("#ideas").on('click', "#up-btn", (e) => {
  const id = +e.currentTarget.closest('article').id;
  const currentIdea = findIdeaByID(id);
  const ideaQuality = currentIdea.quality;
  const nextQuality = qualityChangers.up[ideaQuality]
  const nearestQualityElement = e.target.parentElement.querySelector('#quality')
  ideaArray.forEach(idea => {
    if (idea.id === id) {
      idea.quality = nextQuality;
    }
  }); // mem
  nearestQualityElement.innerText = `quality: ${nextQuality}` // dom
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray)); // db
});

$("#ideas").on('click', "#down-btn", (e) => {
    const id = +e.currentTarget.closest('article').id;
    const currentIdea = findIdeaByID(id);
    const ideaQuality = currentIdea.quality;
    const nextQuality = qualityChangers.down[ideaQuality]
    const nearestQualityElement = e.target.parentElement.querySelector('#quality')
    ideaArray.forEach(idea => {
      if (idea.id === id) {
        idea.quality = qualityChangers.down[ideaQuality];
      }
    });
    nearestQualityElement.innerText = `quality: ${nextQuality}`
    localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
});

$('#ideas').on('keyup blur', "#idea-title",(e) => {
  if (e.which == 13 || e.type === "focusout") {
    e.preventDefault();
    let id = +$(this).closest("article").attr('id');
    let currentIdea = findIdeaByID(id);
    let newTitle = $(this).text();
    ideaArray.forEach = idea => {
      if (idea.id === id) {
        idea.title = newTitle;
      }
    };
    localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
  }
});

$('#ideas').on('keyup blur', "#idea-body", (e) => {
  if (e.which == 13 || e.type === "focusout") {
    e.preventDefault();
    let id = +$(e.currentTarget).closest("article").attr('id');
    let currentIdea = findIdeaByID(id);
    let newBody = $(e.currentTarget).text();
    ideaArray.forEach = idea => {
      if (idea.id === id) {
          idea.body = newBody;
      }
    };
    localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
  }
});

const loadPage = () => {
  let holdingValue = JSON.parse(localStorage.getItem("ideaArray"));
  if (holdingValue){
    ideaArray = holdingValue;
    render(ideaArray);
  }
}

const render = (givenArray, completed) => {
  const incompleteGiven = givenArray.filter(e => e.completed === false)
  helpers.emptyIdeas();
  if (completed) return completed.forEach(e => createCard(e))
  if (incompleteGiven) return incompleteGiven.forEach(e => createCard(e))
}

const storeIdea = idea => {
  ideaArray.push(idea);
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
}

const deleteIdea = id => {
  for (let i = 0; i < ideaArray.length; i++) {
    let ideaId = ideaArray[i].id;
    if (id == ideaId) ideaArray.splice(i, 1);
    localStorage.setItem("ideaArray",JSON.stringify(ideaArray));
  }
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

function findIdeaByID(id) {
  return ideaArray.filter(function(idea) {
    return idea.id === id;
  })[0];
}

const sortKey = {
  critical: 4,
  high: 3,
  normal: 2,
  low: 1,
  none: 0
}

const upSort = () => ideaArray
  .sort((a, b) => sortKey[a.quality] > sortKey[b.quality]);

const downSort = () => ideaArray
  .sort((a, b) => sortKey[a.quality] < sortKey[b.quality]);

loadPage();
