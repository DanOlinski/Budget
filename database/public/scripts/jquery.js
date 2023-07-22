//bellow is how you start up jquery
//this prevents server from accessing information that hasn't been loaded yet, since that would cause an error
$(document).ready(function() {
  $( "#t" ).on( "click", function() {
    alert( "Handler for `click` called." );
  } );


  if($("#t").length > 0){
    $.ajax({
      method: 'post',
      url: '/test'
    })
    .then((response) => {
      $('#t').append($(`<div>jkashdgf</div>`))
    });
  }
 

});