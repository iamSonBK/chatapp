const e = require("express");

$(document).ready(function(){
  $('#favorite').on('submit', function(E){
      e.preventDefault();

      var id = $('#id').val();
      var clubName = $('#clubName').val();
  
      $.ajax({
          url: '/home',
          type: 'POST',
          data: {
              id: id,
              clubName: clubName
          },
          success: function(){
              console.log(clubName);
              
          }
      })
  });
});