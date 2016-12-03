const checkField = () => {
  let checkTitle = /\S/.test($("#title").val());
  let checkBody = /\S/.test($("#body").val());
  let countTitle = $('#title').val();
  let countBody = $('#body').val();

  if(checkTitle && checkBody &&
    countTitle.length <= 120 &&
    countBody.length <= 120) {
    $("#save").attr("disabled", false);
  } else {
    $("#save").attr("disabled", true);
  }
}


const emptyIdeas = () => $('#ideas').empty();

module.exports = {
  checkField,
  emptyIdeas
}

//scripts.js

//let helpers = require(....)

//helpers.
