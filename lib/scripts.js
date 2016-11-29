require('./styles');

const newAlert = require('./alert');
newAlert();


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

$("#title, #body").keyup(e => checkField());


$('#save').click(e => {
  let title = $title.val();
  let body = $body.val();
  let idea = new Idea(title, body);
  storeIdea(idea);
  createCard(idea);
  $title.val("");
  $body.val("");
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

$("#ideas").on("click", "#delete-btn", () => {
  $(this).closest("article").remove();
  let id = this.closest("article").id;
  deleteIdea(id);
});

$("#ideas").on('click', "#up-btn", () => {
  let id = +$(this).closest("article").attr('id');
  let currentIdea = findIdeaByID(id);
  let ideaQuality = currentIdea.quality;
  ideaArray.forEach(function(idea) {
    if (idea.id === id) {
      idea.quality = qualityChangers.up[ideaQuality];
    }
  });
  $(this).siblings("h2").text("quality: "+qualityChangers.up[ideaQuality]);
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
});

$("#ideas").on('click', "#down-btn", () => {
  let id = +$(this).closest("article").attr('id');
  let currentIdea = findIdeaByID(id);
  let ideaQuality = currentIdea.quality;
  ideaArray.forEach(function(idea) {
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
    ideaArray.forEach(function(idea) {
      if (idea.id === id) {
          idea.title = newTitle;
      }
    });
    localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
    render();
  }
});

$('#ideas').on('keyup blur', "#idea-body",(e) => {
  if (e.which == 13 || e.type === "focusout") {
    e.preventDefault();
    let id = +$(this).closest("article").attr('id');
    let currentIdea = findIdeaByID(id);
    let newBody = $(this).text();
    ideaArray.forEach(function(idea) {
      if (idea.id === id) {
          idea.body = newBody;
      }
    });
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

const render = givenArray => {
  if (givenArray) renderArray = givenArray;
  if (!givenArray) renderArray = ideaArray;
  $('#ideas').empty();
  for (var i = 0; i < renderArray.length; i++) {
  createCard(renderArray[i]);
  }
}

const checkField = () => {
  let checkTitle = /\S/.test($("#title").val());
  let checkBody = /\S/.test($("#body").val());
  if(checkTitle && checkBody){
    $("#save").attr("disabled", false);
  } else {
    $("#save").attr("disabled", true);
  }
}

const Idea = (title, body) => {
  this.id = new Date().getTime();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
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
    </div>
  </article>`);
}

const findIdeaByID = id => ideaArray.filter(e = idea => idea.id === id)[0];

const upSort = () => ideaArray.sort(e = (a, b) => a.quality > b.quality);

const downSort = () => ideaArray.sort(e = (a, b)=> a.quality < b.quality);