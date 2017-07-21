$(document).ready(function(){

  var initialArray = [];
  var pin = [];
  var compareArray = [];
  var numArray = ["1","2","3","4","5","6","7","8","9","*","0","#"]

  function compare(a,b){
    if(a.toString() == b.toString()){
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
      if($("#submit").hasClass("unsubmitted") && compareArray.length !== 0){
        document.getElementById("submit").removeClass("disabled");
      }
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
      console.log(pin);
      $("#submit").removeClass("unsubmitted");
      $("#submit").addClass("disabled");
      clearValues();
    }else if (compareArray.length > 0){
      console.log(pin);
      console.log(compareArray);
      alert(compare(pin, compareArray));
    }

  });
  $('#restart').on("click", function(){
    $("#submit").removeClass("disabled");
    clearValues();
    console.log(compareArray);
    console.log(initialArray);
  });

});