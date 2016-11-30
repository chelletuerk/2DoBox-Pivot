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

$('document').ready(e => loadPage());

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
  $('newIdea').addClass('completed')
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
    sortOrder = !sortOrder;
  } else {
    render(upSort());
    sortOrder = !sortOrder;
  }
});

$('#search').keyup(e => {
  let searchText = e.target.value.toLowerCase();
  let matches = ideaArray.filter(e = idea => {
    return idea.body.toLowerCase().includes(searchText) || idea.title.toLowerCase().includes(searchText);
  });
  if (matches) return render(matches);
  return render();
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
  ideaArray.forEach(idea => {
    if (idea.id === id) {
      idea.quality = qualityChangers.up[ideaQuality];
    }
  });
  const nextQuality = qualityChangers.up[ideaQuality]
  const nearestQualityElement = e.target.parentElement.querySelector('#quality')
  e.target.dataset.quality = nextQuality
  nearestQualityElement.innerText = `quality: ${nextQuality}`
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
});

$("#ideas").on('click', "#down-btn", (e) => {
    const id = +e.currentTarget.closest('article').id;
    const currentIdea = findIdeaByID(id);
    const ideaQuality = currentIdea.quality;
    ideaArray.forEach(idea => {
      if (idea.id === id) {
        idea.quality = qualityChangers.down[ideaQuality];
      }
    });
    const nextQuality = qualityChangers.down[ideaQuality]
    const nearestQualityElement = e.target.parentElement.querySelector('#quality')
    e.target.dataset.quality = nextQuality
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
    render();
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
    render();
  }
});

const loadPage = () => {
  let holdingValue = JSON.parse(localStorage.getItem("ideaArray"));
  if (holdingValue){
    ideaArray = holdingValue;
    render(ideaArray);
  }
}

const render = (givenArray, completed, renderArray) => {
  if (completed === 'completed') return renderCompletedIdeas()
  const incompleteIdeas = ideaArray.filter(e => e.completed === false)
  const incompleteGiven = givenArray.filter(e => e.completed === false)
  if (incompleteGiven) renderArray = incompleteGiven;
  if (!givenArray) renderArray = incompleteGiven;
  helpers.emptyIdeas();
  for (var i = 0; i < renderArray.length; i++) {
    createCard(renderArray[i]);
  }
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
      <button data-quality=${idea.quality} id="up-btn"></button>
      <button data-quality=${idea.quality} id="down-btn"></button>
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

const upSort = () => ideaArray.sort(e = (a, b) => a.quality > b.quality);

const downSort = () => ideaArray.sort(e = (a, b)=> a.quality < b.quality);
