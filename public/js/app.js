$(document).ready(function() {
  const $buttonsBitacora = $('#buttons-bitacora');

  // 
  $buttonsBitacora.on('click', 'li', function(e) {
    // console.log(e.target.innerHTML);
    if(e.target.innerHTML === 'video_library'){
      console.log(e.target.innerHTML);
    } else if (e.target.innerHTML === 'today'){
      console.log(e.target.innerHTML);
    } else if (e.target.innerHTML === 'perm_media'){
      console.log();
    } else if (e.target.innerHTML === 'chat') {
      console.log(e.target.innerHTML);
    }
  });


  
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      console.log(modal, trigger);
    },
    complete: function() { console.log('Closed'); } // Callback for Modal close
  }
);

});
