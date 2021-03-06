$(document).ready(function(){

  let initialArray = [];
  let pin = [];
  let compareArray = [];
  let success = 0;
  const numArray =   ["1","2","3","4","5","6","7","8","9","asterisk","0","pound"];
  const numArray2 =  ["1","2","3","4","5","6","7","8","9","asterisk","0","pound"];
  const colourArray = ["red","orange","yellow","green","blue","purple","navy","maroon","lime","teal","gray","olive"]

  // Remove all dynamically generated divs;
  function clearDivs(){
    for(i=1;i<5;i++){
      var div = document.getElementById('row' + i);
      while(div.firstChild){
        div.removeChild(div.firstChild);
      }
    }
  }
    // Simple function for clearing initArray * #seqience
function clearValues(){
  initialArray = [];
  compareArray = [];
  if(!$("#submit").hasClass("unsubmitted")){
    $("#submit").hasClass("unsubmitted");
  }
  document.getElementById('sequence').innerHTML = '';
}

  function FisherYatesShuffle(array){
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex){
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function specialCharacter(character){
    var found = "";
    character === "asterisk" ? found = "*" : found = "#";
    return found;
  }
  //Add listeners to Divs each time they are dynamically created
  function addClickResponse(){
    var numberButtons = document.getElementsByClassName("numButton");

    var addListeners = function() {
      if($("#submit").hasClass("unsubmitted")){
        if(($(this).attr('id')) == "asterisk"){
          initialArray.push("*");
          document.getElementById("sequence").innerHTML = initialArray.join(' ').toString();
        }else if(($(this).attr('id')) == "pound"){
          initialArray.push("#");
          document.getElementById("sequence").innerHTML = initialArray.join(' ').toString();
        }else{
          initialArray.push($(this).attr('id'));
          document.getElementById("sequence").innerHTML = initialArray.join(' ').toString();
        }
      }else{
        if(($(this).attr('id')) == "asterisk"){
          initialArray.push("*");
          document.getElementById("sequence").innerHTML = compareArray.join(' ').toString();
        }else if(($(this).attr('id')) == "pound"){
          initialArray.push("#");
          document.getElementById("sequence").innerHTML = compareArray.join(' ').toString();
        }else{
          compareArray.push($(this).attr('id'));
          document.getElementById("sequence").innerHTML = compareArray.join(' ').toString();
        }
      }
    };
    for (var i = 0; i < numberButtons.length; i++) {
        numberButtons[i].addEventListener('click', addListeners, false);
    }
  }

  function addColours(){
      let randomColours = FisherYatesShuffle(colourArray);
      document.getElementById("asterisk").setAttribute("class", randomColours[10] + " " + "btn numButton btn-block btn-lg fallDown");
      document.getElementById("pound").setAttribute("class", randomColours[11] + " " + "btn numButton btn-block btn-lg fallDown");
      for(i=0;i<randomColours.length-2;i++){
        document.getElementById(i).setAttribute("class", randomColours[i] + " " + "btn numButton btn-block btn-lg fallDown");
      }
    }

  function generateGrid(array){
    var k = 0;
    for(i=1;i<5;i++){
      var currentRow = $("#row" + i);
      for(j=0;j<3;j++){
        var newKey = document.createElement("div");
        newKey.id = "btnDiv" + array[k];
        newKey.setAttribute("class", "col-xs-4");
        newKey.innerHTML = '<button id="' + array[k] +
        '" type="button" class="btn numButton btn-block btn-lg fallDown">' +
        (!isNaN(parseInt(array[k])) ? array[k] : specialCharacter(array[k])) + '</button>';
        $(currentRow).append(newKey);
        k++;
      }
    }
    addClickResponse();
  }

  function compare(a,b){
    if(a.toString() == b.toString()){
      $("#successContainer").removeClass("hidden");
      success++;
      document.getElementById("success").innerHTML = success;
      return true
    }else{
      return false;
    }
  }

  $('#submit').on("click", function(){
    if(initialArray.length === 0 && $("#submit").hasClass("unsubmitted"))
    {
      alert("Please enter an initial sequence of numbers");
    }else if(compareArray.length === 0 && !$("#submit").hasClass("unsubmitted")){
      alert("Please try to re-enter the submitted sequence");
    }else if(initialArray.length !== 0 && $("#submit").hasClass("unsubmitted")){
      pin = initialArray;
      var randomArray = FisherYatesShuffle(numArray);
      clearDivs();
      generateGrid(randomArray);
      if(document.getElementById("mode").checked){
        addColours();
      }
      $("#submit").removeClass("unsubmitted");
      clearValues();
    }else if (compareArray.length > 0){
      if(compare(pin, compareArray) === true){
        clearValues()
        $("#submit").addClass("unsubmitted");
      }else{
        alert("The two pins don't match. Restarting game");
        clearDivs();
        clearValues();
        generateGrid(numArray2);
        if(document.getElementById("mode").checked){
          addColours();
        }
        $("#submit").addClass("unsubmitted");
      }
    }
  });

  $('#restart').on("click", function(){
    $("#submit").addClass("unsubmitted");
    clearDivs();
    clearValues();
    success = 0;
    $("#successContainer").addClass("hidden");
    generateGrid(numArray2);
    if(document.getElementById("mode").checked){
      addColours();
    }
  });

  generateGrid(numArray);
// by default add colour
  if(document.getElementById("mode").checked){
    addColours();
  }

  $('#mode').change(function() {
      $("#submit").addClass("unsubmitted");
      clearDivs();
      clearValues();
      success = 0;
      $("#successContainer").addClass("hidden");
      generateGrid(numArray2);
      if(document.getElementById("mode").checked){
        addColours();
      }
  })

});
