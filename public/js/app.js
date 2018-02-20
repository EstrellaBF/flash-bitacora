$(document).ready(function() {
  const $buttonsBitacora = $('#buttons-bitacora');
  const $modalContent = $('.modal-content');
  const $thumbnail = $('#thumbnail');
  let $inputFile = $('#input-file');
  let $inputText = $('#input-text');

  $('#map').hide();
  // Activando materialize form
  Materialize.updateTextFields();


  // función input file image
  let imgFileSelect = (e) => {
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
          $thumbnail.append(`<img src="${e.target.result}" class="responsive-img">`);
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  };

  // Evento botones
  $buttonsBitacora.on('click', 'li', function() {
    // console.log($(this));
    console.log();
    // Video
    if ($(this).find('i').text() === 'video_library') {

  $('#map').hide();
      console.log($(this));
    }
    // Calendar
    if ($(this).find('i').text() === 'today') {
      console.log($(this));

  $('#map').show();
      $inputText.show();
      $inputFile.hide();
      // Añadiendo el modal
      $(this).attr({ 'class': 'modal-trigger',
        'href': '#modal1' });
      $('#modal-footer').find('a').attr('id', 'send-calendar');
      // Cambiando valores a los input de texto 
      $('#title-text').next().text('Title Event');
      $('#message_text').next().text('Insert your event date').attr('class', 'active');
      $('#message_text').attr({'type': 'date'});
      // $thumbnail.append('<div id="map"></div>');
      // Evento que verificará el valor de la fecha al seleccionarlo
      $('#message_text').on('change', function() {
        debugger;
        console.log($(this).val());
        initMap();
        $thumbnail.append($(this).val());
      });
      $('#send-calendar').on('click', function() {
        initMap();
        // $modalContent.append('<div id="map"></div>');
      });
    }
    // images 
    if ($(this).find('i').text() === 'perm_media') {
      console.log($(this));

  $('#map').hide();
      $inputText.hide();
      $inputFile.show();
      $(this).attr({ 'class': 'modal-trigger',
        'href': '#modal1' });
      $('#modal-footer').find('a').attr('id', 'send-img');
      // Evento para subir archivo
      $inputFile.change(imgFileSelect);
      // agregar las fotos al dom
      $('#send-img').on('click', function() {
        console.log($thumbnail.find('img'));
        $.each($thumbnail.find('img'), function(i, val) {
          $('#message-box').append('<div class="box-image"><div>');
          $('.box-image').append(val);
        });
      });
    }
    // text
    if ($(this).find('i').text() === 'chat') {
      // debugger
      console.log($(this));
      $('#map').hide();
      
      // Cambiando valores a los input de texto
      $('#title-text').next().text('Title');
      $('#message_text').next().text('Message');
      $('#message_text').attr({'type': 'text'});
      $(this).attr({ 'class': 'modal-trigger',
        'href': '#modal1' });
      $('#modal-footer').find('a').attr('id', 'send-text');
      $('#send-text').attr('disabled', true);
      $inputText.show();
      $inputFile.hide();
      // Verificando que se escriba ambos campos
      $inputText.on('keyup', function() {
        console.log($('#title-text').val().length);
        if ($('#title-text').val().length > 3 && $('#message_text').val().length > 3) {
          console.log('cumple');
          $('#send-text').attr('disabled', false);
          $('#send-text').on('click', function() {
            $('#message-box').append(`<div class="box-message"><p>${$('#title-text').val()}</p><p>${$('#message_text').val()}</p></div>`);
          });
        } else {
          $('#send-text').attr('disabled', true);
        }
      });
    };
  });

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
