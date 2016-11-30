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
  up: {genius: "genius", plausible: "genius", swill: "plausible"},
  down: {genius: "plausible", plausible: "swill", swill: "swill"}
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

// $("#ideas").on('click', "#complete-btn", () => {
//   let id = +$(this).closest("article").attr('id');
//   let currentIdea = findIdeaByID(id);
//   let ideaQuality = currentIdea.quality;
//   ideaArray.forEach(e = idea => {
//     if (idea.id === id) {
//       idea.quality = qualityChangers.down[ideaQuality];
//     }
//   });

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
  let id = +e.currentTarget.closest('article').id;
  let currentIdea = findIdeaByID(id);
  let ideaQuality = currentIdea.quality;
  ideaArray.forEach(function(idea) {
    if (idea.id === id) {
      idea.quality = qualityChangers.up[ideaQuality];
    }
  });
  $(e.currentTarget).closest("h2").text("quality: "+qualityChangers.up[ideaQuality]);
  // console.log("quality:"+qualityChangers.up[ideaQuality])
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
});

$("#ideas").on('click', "#down-btn", () => {
  let id = +$(this).closest("article").attr('id');
  let currentIdea = findIdeaByID(id);
  let ideaQuality = currentIdea.quality;
  ideaArray.forEach(e = idea => {
    if (idea.id === id) {
      idea.quality = qualityChangers.down[ideaQuality];
    }
  });
  $(this).siblings("h2").text("quality: "+qualityChangers.down[ideaQuality]);
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
    debugger
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

const render = (givenArray, renderArray) => {
  if (givenArray) renderArray = givenArray;
  if (!givenArray) renderArray = ideaArray;
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
  $('#ideas').prepend(`<article class="newIdea completed" id=${idea.id}>
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

const upSort = () => ideaArray.sort(e = (a, b) => a.quality > b.quality);

const downSort = () => ideaArray.sort(e = (a, b)=> a.quality < b.quality);
