$(document).ready(function() {
  const $buttonsBitacora = $('#buttons-bitacora');
  const $modalContent = $('.modal-content');
  const $thumbnail = $('#thumbnail');
  // 
  $buttonsBitacora.on('click', 'li', function(e) {
    let that = e.target.innerHTML;
    // console.log(e.target.innerHTML);
    if (that === 'video_library') {
      $(e.target).parent().attr('href', '#modal1').addClass('modal-trigger');
      $modalContent.prepend('<h4>Insert your video</h4><input type="file" id ="input-file">');
      $('#input-file').change(handleFileSelect);

      $('#agree-button').on('click', function() {
        console.log($thumbnail.find('img'));
        $.each($thumbnail.find('img'), function(i, val) {
          console.log(i);
          console.log(val);
          $('#message-box').append(val);
        });
      });
      localStorage.setItem('nombre', 'hola');
    } else if (that === 'today') {
      console.log(that);
      console.log(e.target);
      $(e.target).parent().attr('href', '#modal1').addClass('modal-trigger');
      $modalContent.find('h4').text('Your Calendar');
    } else if (that === 'perm_media') {
      console.log(that);
      $(e.target).parent().attr('href', '#modal1').addClass('modal-trigger');
      $modalContent.find('h4').text('Upload your photo');
    } else if (that === 'chat') {
      console.log(that);
      $(e.target).parent().attr('href', '#modal1').addClass('modal-trigger');
      $modalContent.find('h4').text('Write something');
    }
  });

  // función input file
  function handleFileSelect(e) {
    var files = e.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          $thumbnail.append(`<img src="${e.target.result}">`);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }


  // Evento click img


  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: 0.5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      console.log(modal, trigger);
    },
    complete: function() {
 console.log('Closed'); 
} // Callback for Modal close
  }
  );
});
