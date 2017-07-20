$(document).ready(function(){

  var initialArray = [];
  var pin = [];
  var compareArray = [];
  var numArray = ["1","2","3","4","5","6","7","8","9","*","0","#"]

// Simple function for clearing initArray * #seqience
  function clearValues(){
    initialArray = [];
    document.getElementById('sequence').innerHTML = '';
  }

// Various Button Functions
  $(".numButton").on("click", function(){
    initialArray.push($(this).attr('id'));
    document.getElementById("sequence").innerHTML = initialArray.join(' ').toString();
  });

  $('#submit').on("click", function(){
    if(initialArray.length === 0){
        alert("Please enter a sequence of numbers to test");
    }else{
      pin = initialArray;
      $("#submit").addClass("disabled");
      clearValues();
    }
  });

  $('#restart').on("click", function(){
    $("#submit").removeClass("disabled");
    clearValues();
  });

});
