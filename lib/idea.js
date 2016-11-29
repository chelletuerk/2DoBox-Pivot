class Idea {
  constructor(title, body) {
  this.id = new Date().getTime();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  }
}

module.exports = Idea
