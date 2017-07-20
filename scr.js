$(document).ready(function(){

  var pinArray = [];
  var numArray = ["1","2","3","4","5","6","7","8","9","*","0","#"]

  $(".numButton").on("click", function(){
    pinArray.push($(this).attr('id'));
    console.log(pinArray);
    document.getElementById("sequence").innerHTML = pinArray.toString();
  });
});
$("#submit").on("click", function(){
  console.log("fucker");
  document.getElementById("sequence").innerHTML = "";
});
