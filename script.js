var text = "";
var id = 0;
var lines = [];
var userInput = [];
var linesReady = [];
function makeLine(line){ 
  var newWords = [];
  var words = line.split(" ");
  words.forEach(element => {
    if(element.length>1 && Math.random()>0.8){
      var gap = Math.ceil(element.length/2);
      var sym = "";
      var i1 = element.length-gap;
      if([".",",","?","!",":",'"',"."," "].includes(element.slice(-1))){
        sym = element.slice(-1);
        gap = Math.ceil((element.length-1)/2);
        i1 = element.length-1-gap;
      }
      newWords.push(element.substring(0,i1)+"_".repeat(gap)+sym);
    }
    else{
      newWords.push(element);
    }
  });
  return(newWords.join(" "));
}
async function loadText(url) {
    try {
      const response = await fetch(url);
      const data = await response.text();
      text = data;
      userInput.push("");
      text = text.split("\n");
      text.forEach(element => {
        linesReady.push(makeLine(element));
      });
      for(let i = 0;i<12;i++){
        var d = document.createElement("p");
        document.body.appendChild(d);
        d.innerText=linesReady[i-5];
        lines.push(d);
        renderLine(lines[i],id-5);

      }
      setTimeout(function(){
    document.getElementById("dummyInput").focus();
},100);
      checkLine();
      //document.getElementById("test").innerText = makeLine(text[0]);
    } catch (err) {
      console.error(err);
    }
  }
  function up(){
    userInput.push("");
    id+=1;
    for(var j = 0;j<12;j++){
      renderLine(lines[j],j+id-5);
    }
    checkLine();
  }
  function down(){
    id-=1;
    for(let i = 0;i<12;i++){
      lines[i].innerText=text[i+id];
    }
  }
  function renderLine(obj,id){
    if(id<0){
      obj.innerText = "";
    }
    var index = 0;
    var outText = "";
    if(linesReady[id]==undefined){
      obj.innerText="";
      return;
    }
    for(var i = 0;i<linesReady[id].length;i++){
      if(linesReady[id][i]=="_"){
        if(userInput[id]!= undefined && userInput[id][index]!=undefined){
          if(userInput[id][index]==text[id][i]){
              outText+="<span class='right'>"+userInput[id][index]+"</span>";
          }else{
            outText+="<span class='wrong'>"+userInput[id][index]+"</span>";
          }
        }else{
          outText+="_";
        }
        index++;
        
      }else{
        outText+=linesReady[id][i];
      }
    }
    obj.innerHTML = outText;
  }
function checkLine(){
  if(!lines[5].innerText.includes("_")){
    up();
  }
}
  document.addEventListener('click',function(event) {
    document.getElementById("dummyInput").focus();
  });
  if(true){//!navigator.userAgentData.mobile){
  document.addEventListener('keydown', function(event) {
    var d = document.getElementById("test");
    //d.innerText = d.innerText+event.key;
    if(event.key.length>1){
      return;
    }
    userInput[userInput.length-1]+=event.key;
    //userInput[userInput.length-1]+=document.getElementById("dummyInput").value.slice(-1);
    console.log(userInput);
    renderLine(lines[5],id);
    checkLine();
});
  }
document.addEventListener("load",loadText("text.txt"));
function mobileWrite(){
      userInput[userInput.length-1]+=document.getElementById("dummyInput").value.slice(-1);
      renderLine(lines[5],id);
    checkLine();
}