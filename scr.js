$(document).ready(function(){

  var initialArray = [];
  var pin = [];
  var compareArray = [];
  var success = 0;
  var numArray = ["1","2","3","4","5","6","7","8","9","asterisk","0","pound"];

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

  function specialCharacter(char){
    var found = "";
    char === "asterisk" ? found = "*" : found = "#";
    return found;
  }

  function generateGrid(){
    var k = 0;
    for(i=1;i<5;i++){
      var currentRow = $("#row" + i);
      for(j=0;j<3;j++){
        var newKey = document.createElement("div");
        newKey.id = numArray[k];
        newKey.setAttribute("class", "col-xs-4");
        newKey.innerHTML = '<button id="' + numArray[k] +
        '" type="button" class="btn numButton btn-block btn-lg">' +
        (!isNaN(parseInt(numArray[k])) ? numArray[k] : specialCharacter(numArray[k])) + '</button>';
        $(currentRow).append(newKey);
        k++;
      }
    }
  }

  function clearDivs(){
    for(i=1;i<5;i++){
      $('#row' + i).html('');
    }
  }

  generateGrid();

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

// Simple function for clearing initArray * #seqience
  function clearValues(){
    initialArray = [];
    compareArray = [];
    if(!$("#submit").hasClass("unsubmitted")){
      $("#submit").hasClass("unsubmitted");
    }
    document.getElementById('sequence').innerHTML = '';
  }

// Various Button Functions
  $(".numButton").on("click", function(){
    if($("#submit").hasClass("unsubmitted")){
      initialArray.push($(this).attr('id'));
      document.getElementById("sequence").innerHTML = initialArray.join(' ').toString();
    }else{
      compareArray.push($(this).attr('id'));
      document.getElementById("sequence").innerHTML = compareArray.join(' ').toString();
    }
  });

  $('#submit').on("click", function(){
    if(initialArray.length === 0 && $("#submit").hasClass("unsubmitted"))
    {
      alert("Please enter an initial sequence of numbers");
    }else if(compareArray.length === 0 && !$("#submit").hasClass("unsubmitted")){
      alert("Pleasetry to re-enter the submitted sequence");
    }else if(initialArray.length !== 0 && $("#submit").hasClass("unsubmitted")){
      pin = initialArray;
      numArray = FisherYatesShuffle(numArray);
      clearDivs();
      generateGrid();
      $("#submit").removeClass("unsubmitted");
      clearValues();
    }else if (compareArray.length > 0){
      if(compare(pin, compareArray) === true){
        clearValues()
        $("#submit").addClass("unsubmitted");
      }
    }
  });

  $('#restart').on("click", function(){
    $("#submit").addClass("unsubmitted");
    clearValues();
    success = 0;
    $("#successContainer").addClass("hidden");
  });

});
