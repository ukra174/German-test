var text = "";
var id = 0;
var lines = [];
var userInput = [];
var linesReady = [];
var score = 0;
var difficulty = 2;
function makeLine(line){ 
  var newWords = [];
  var words = line.split(" ");
  words.forEach(element => {
    if(element.length>1 && Math.random()>(0.2+(5-difficulty)*0.15)){
      var gap = Math.ceil(element.length/2);
      var sym = "";
      var i1 = element.length-gap;
      if([".",",","?","!",":",'"',"."," ","\n",";"].includes(element.slice(-1))){
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
        document.getElementById("cont").appendChild(d);
        d.innerText=linesReady[i-5];
        d.className = "hoverable";
        lines.push(d);
        renderLine(lines[i],id-5+i);

      }
      //id = Math.floor(Math.random()*lines.length);
      for(let i = 0;i<Math.floor(Math.random()*1000);i++){
        up();
      }
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
      renderLine(lines[j],j+id-5,j<5);
    }
    checkLine();
  }
  function down(){
    id-=1;
    for(let i = 0;i<12;i++){
      lines[i].innerText=text[i+id];
    }
  }
  function renderLine(obj,id, show=false){
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
              score++;
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
    if(show){
    obj.innerHTML+= "<span class='hoverable__tooltip'>"+text[id]+ "</span>";
    }
  }
function checkLine(){
  if(!lines[5].innerText.includes("_")){
    up();
  }
  document.getElementById("score").innerText = score;
}
  document.addEventListener('click',function(event) {
    document.getElementById("credit-card-mask").focus();
  });
  if(true){//!navigator.userAgentData.mobile){
  document.addEventListener('keydown', function(event) {
    var d = document.getElementById("test");
    //d.innerText = d.innerText+event.key;
    //if(event.key.length>1){//turn this off for physical kb input
      return;
    //}
    userInput[userInput.length-1]+=event.key;
    //userInput[userInput.length-1]+=document.getElementById("dummyInput").value.slice(-1);
    console.log(userInput);
    renderLine(lines[5],id);
    checkLine();
});
  }
  const params = new URLSearchParams(window.location.search); 
   var pram = "text.txt"; 
   if(params.has("set")){ 
     pram = params.get("set"); 
   } 
   function loadPage(){ 
     //loadText(pram); 
     setTimeout(() => { 
         var slider = document.getElementById("dif"); 
         slider.oninput = function() { 
           difficulty = this.value; 

     lines = []; 
  userInput = []; 
  linesReady = []; 
 score = 0;  
document.getElementById("cont").innerHTML = "";
text = "";
loadText(pram);
  }; 
     }, 0.5); 
   } 
   window.addEventListener("load",loadPage());
function mobileWrite(){
      userInput[userInput.length-1]+=document.getElementById("dummyInput").value.slice(-1);
      renderLine(lines[5],id);
    checkLine();
}



if(true){

var input = document.getElementById('credit-card-mask'),
    oldValue,
    newValue,
    difference = function(value1, value2) {
      var output = [];
      for(i = 0; i < value2.length; i++) {
        if(value1[i] !== value2[i]) {
          output.push(value2[i]);
        }
      }
      return output.join("");
    },
    keyDownHandler = function(e) {
      oldValue = input.value;
      //document.getElementById("onkeydown-result").innerHTML = input.value;
    },
    inputHandler = function(e) {
      newValue = input.value;
      //document.getElementById("oninput-result").innerHTML = input.value;
      //document.getElementById("typedvalue-result").innerHTML = difference(oldValue, newValue);
      
      userInput[userInput.length-1]+=difference(oldValue, newValue);
      renderLine(lines[5],id);
    checkLine();

    }
;

input.addEventListener('keydown', keyDownHandler);
input.addEventListener('input', inputHandler);
  }