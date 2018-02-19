$(document).ready(function() {
  const $buttonsBitacora = $('#buttons-bitacora');

  // 
  $buttonsBitacora.on('click', 'li', function(e) {
    let that = e.target.innerHTML;
    // console.log(e.target.innerHTML);
    if(that=== 'video_library'){
      // console.log(that);
      $(e.target).parent().attr('href', '#modal1').addClass('modal-trigger');
      $('.modal-content').find('h4').text('Insert your video');
    } else if (that=== 'today'){
      console.log(that);
      console.log(e.target);
      $(e.target).parent().attr('href', '#modal1').addClass('modal-trigger');
      $('.modal-content').find('h4').text('Your Calendar');
    } else if (that=== 'perm_media'){
      console.log(that);
      $(e.target).parent().attr('href', '#modal1').addClass('modal-trigger');
      $('.modal-content').find('h4').text('Upload your photo');
    } else if (that === 'chat') {
      console.log(that);
      $(e.target).parent().attr('href', '#modal1').addClass('modal-trigger');
      $('.modal-content').find('h4').text('Write something');
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
