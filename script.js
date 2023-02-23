var text = "";
var id = 0;
var lines = [];
async function loadText(url) {
    try {
      const response = await fetch(url);
      const data = await response.text();
      text = data;
      text = text.split("\n");
      for(let i = 0;i<12;i++){
        var d = document.createElement("p");
        document.body.appendChild(d);
        d.innerText=text[i];
        lines.push(d);

      }
      document.getElementById("test").innerText = text[0];
    } catch (err) {
      console.error(err);
    }
  }
  function up(){
    id+=1;
    for(let i = 0;i<12;i++){
      lines[i].innerText=text[i+id];
    }
  }
  function down(){
    id-=1;
    for(let i = 0;i<12;i++){
      lines[i].innerText=text[i+id];
    }
  }

  document.addEventListener('keydown', function(event) {
    var d = document.getElementById("test");
    d.innerText = d.innerText+event.key;
});