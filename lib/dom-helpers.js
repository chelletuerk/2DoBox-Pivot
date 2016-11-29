const checkField = () => {
  let checkTitle = /\S/.test($("#title").val());
  let checkBody = /\S/.test($("#body").val());
  if(checkTitle && checkBody){
    $("#save").attr("disabled", false);
  } else {
    $("#save").attr("disabled", true);
  }
}

const emptyIdeas = () => $('#ideas').empty();

module.exports = {checkField: checkField,
                  emptyIdeas: emptyIdeas
                  }

//scripts.js

//let helpers = require(....)

//helpers.
