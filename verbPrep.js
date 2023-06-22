var verbs = [];
Array.prototype.remove = function(item) {
    var index = this.indexOf(item);
    if (index !== -1) {
      this.splice(index, 1);
    }
  };
function getRandomPrep(count, blacklisted){
    var preps = ["an","auf","mit","zu","in","gegen","von","aus","vor","bis","um"];
    preps.remove(blacklisted);
    var output = [];
    for(var i = 0;i<count;i++){
        output.push(preps.pop(Math.floor(Math.random()*preps.length)));
    }
    return(output);
}
async function loadText(url) {
    try {
    const response = await fetch(url);
    const data = await response.text();
    verbs = data.split("\n");
    newVerb();
    } catch (err) {
    console.error(err);
    }
}
function newVerb(){
    var line = verbs[Math.floor(Math.random()*verbs.length)];
    var words = line.split(" ");
    console.log(words);
    var answer = words.pop(line.length-1);
    words.push("...");
    document.getElementById("verb").innerText = words.join(" ");
    var variants = getRandomPrep(4,answer);
    variants[Math.floor(Math.random()*variants.length)] = answer;
    var buttons = document.getElementById("answers");
    buttons.innerHTML = "";

    for(var i = 0;i<variants.length;i++){
        var b1 = document.createElement("button");
        buttons.appendChild(b1);
        b1.innerHTML= variants[i];
        if(variants[i]==answer){
            b1.onclick = right;
        }else{
            b1.onclick = wrong;
        }
    }

}
function wrong(event){
    var buttonBox = event.target;
    buttonBox.style.boxShadow = "0 0 30px rgb(255, 158, 170)";
    buttonBox.style.backgroundColor = "rgb(255, 158, 170)";
}
function right(event){
    var buttonBox = event.target;
    buttonBox.style.boxShadow = "0 0 30px rgb(193, 236, 228)";
    buttonBox.style.backgroundColor = "rgb(193, 236, 228)";
    setTimeout(newVerb,500);
}
loadText("verbPrepText.txt");