
const ignoreWords = ["ist","sind","bin","seid","bist","werden","werde","wird","werdet","werdest","wurde","wurden","wurdet","wurdest","als","wie","dass","auch","nur","wegen","von","aus","auf","mit","ohne"];
async function loadText(url) {
        try {
        const response = await fetch(url);
        const data = await response.text();
        allText = data;
        var sentences = allText.split(".");
        var text = sentence[Math.floor(Math.random()*sentences.length)];
        var words = text.split(" ");
        var wordCount = Math.floor(words.length/2);
        var start = 1+Math.round(Math.random()*(words.length-wordCount));
        var newText = "";
        var prompt = "(";
        for(let i = 0;i<words.length;i++){
            if(i<start || i>(start+wordCount)){
                newText+=words[i]+"\n";
            }else{
                if(!word[i].replace(",","").replace(".","").lower() in ignoreWords){
                    prompt+=word[i]+", ";
                    newText+="_______";
                }
            }
        }
        prompt+=")";
        document.getElementById("sentence").text = newText;
        document.getElementById("spoiler").text = prompt;

        } catch (err) {
        console.error(err);
        }
    }
    function newSentence(){

  }
  document.addEventListener("load",loadText("text.txt"));