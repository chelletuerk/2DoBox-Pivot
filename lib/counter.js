class Counter {
  countTitle() {
    let total = document.getElementById("title").value;
    total = total.replace(/\s/g, '');
    document.getElementById("titleCount").innerHTML = "Total Characters: "+total.length;
  }

  countBody() {
    let total = document.getElementById("body").value;
    total = total.replace(/\s/g, '');
    document.getElementById("bodyCount").innerHTML = "Total Characters: "+total.length;
  }
}

module.exports = Counter
