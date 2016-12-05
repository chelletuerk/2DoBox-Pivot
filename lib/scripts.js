require('./styles');

const helpers = require('./helpers');

const Idea = require('./idea');
const Ideas = require('./ideas');
const ideas = new Ideas();

const Sort = require('./sort');
const sort = new Sort();

const Counter = require('./counter')
const counter = new Counter();

const Paint = require('./paint')
const paint = new Paint(ideas, helpers);

const Render = require('./render')
const render = new Render(helpers, paint.createCard)

const $title = $('#title');
const $body = $('#body');

$('#save').click(e => {
  let title = $title.val();
  let body = $body.val();
  let idea = new Idea(title, body);
  ideas.storeIdea(idea);
  $title.val('');
  $body.val('');
});

$('#all-ideas').on('click', (e) => {
  render.ten = false;
  render.render(ideas.all);
})

$('#show-completed-btn').on('click', (e) => {
  helpers.emptyIdeas();
  paint.completeIdeas(e, ideas, paint.createCard)
});

$('#sort').click(e => sort.flip(render.render, ideas.all));
$('#critical').click(e => paint.ideasByQuality(e, 'critical'));
$('#high').click(e => paint.ideasByQuality(e, 'high'));
$('#norm').click(e => paint.ideasByQuality(e, 'normal'));
$('#low').click(e => paint.ideasByQuality(e, 'low'));
$('#none').click(e => paint.ideasByQuality(e, 'none'));

$('#ideas').on('click', '#delete-btn', e => ideas.deleteOnClick(e));
$('#ideas').on('click', '#complete-btn', (e) => paint.completeAnIdea(e, ideas));
$('#ideas').on('click', '#up-btn', e => ideas.changeQuality(e, sort, 'up'));
$('#ideas').on('click', '#down-btn', e => ideas.changeQuality(e, sort, 'down'));

$('#search').keyup(e => paint.searchedIdeas(e, render));
$('#title, #body').keyup(e => helpers.checkField());

$('#title').on('keyup', e => counter.countTitle());
$('#body').on('keyup', e => counter.countBody())

$('#ideas').on('blur', '#idea-title', e => ideas.editIdea(e, 'title'));
$('#ideas').on('blur', '#idea-body', e => ideas.editIdea(e, 'body'));

render.loadPage(ideas.all)
