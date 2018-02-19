$(document).ready(function () {
  const $buttonsBitacora = $('#buttons-bitacora');
  const $modalContent = $('.modal-content');
  const $thumbnail = $('#thumbnail');
  const $inputFile = $('#input-file');
  let $inputText = $('#input-text');

  $('#input-text').hide();
  $('#form-text-input').hide();

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
      reader.onload = (function (theFile) {
        return function (e) {
          // Render thumbnail.
          $thumbnail.append(`<img src="${e.target.result}" class="responsive-img">`);
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  };

  // Evento botones
  $buttonsBitacora.on('click', 'li', function () {
    // console.log($(this));
    console.log();
    // Video
    if ($(this).find('i').text() === 'video_library') {
      console.log($(this));
    }
    // Callendar
    if ($(this).find('i').text() === 'today') {
      console.log($(this));
    }
    // images 
    if ($(this).find('i').text() === 'perm_media') {
      console.log($(this));
      // Cambiando id al modal para identificar y manejarlo mejor
      $('#modal-box').find('#modal1').attr({ 'id': 'modal-img' });
      $('#modal-footer').find('a').attr({ 'id': 'send-img' });
      // Añadiendo modal
      $(this).attr('href', '#modal-img').addClass('modal-trigger');
      // Evento para subir archivo
      $inputFile.change(imgFileSelect);
      // agregar las fotos al dom
      $('#send-img').on('click', function () {
        console.log($thumbnail.find('img'));
        $.each($thumbnail.find('img'), function (i, val) {
          $('#message-box').append(val);
        });
      });
    }
    // text
    if ($(this).find('i').text() === 'chat') {
      console.log($(this));
      // Cambiando id al modal para identificar y manejarlo mejor
      $('#modal-box').find('#modal1').attr({ 'id': 'modal-text' });
      $('#modal-footer').find('a').attr({ 'id': 'send-text' });
      $('#send-text').attr('disabled', true);
      // Añadiendo modal
      $(this).attr('href', '#modal-text').addClass('modal-trigger');
      $inputFile.hide();

      $('#form-text-input').show();
      // Verificando que se escriba ambos campos
      $('#form-text-input').on('keyup', function () {
        console.log($('#title-text').val().length>3);
        if ($('#title-text').val().length > 3 && $('#message_text').val().length > 3) {
          $('#send-text').attr('disabled', false);
        } else {
          console.log('SIGUE INTENTANDO');
        }
      });
    };
  });

  // 
  // $buttonsBitacora.on('click', 'li', function (e) {
  //   let that = e.target.innerHTML;
  //   console.log(that);
  //   // Video
  //   if (that === 'video_library') {
  //     // console.log(that);
  //     $(e.target).parent().attr('href', '#modal1').addClass('modal-trigger');
  //     $inputFile.hide();
  //     $inputText.show();
  //     // $inputFile.change(videoFileSelect);
  //     // $agreeButton.on('click', function(e) {})
  //     console.log($inputText.val());
  //     console.log($modalContent.find($inputText).val());
  //     // Expresión regular para validar por ahora si es link de youtube
  //     let regEx = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
  //     // if(regEx.test($inputText.val())) {
  //     //   console.log('es link yt');
  //     // } else {
  //     //   console.log('no');
  //     //   $agreeButton.attr('disabled', true)
  //     // }

  //     // Calendar
  //   } else if (that === 'today') {
  //     $(e.target).parent().attr('href', '#modal1').addClass('modal-trigger');
  //     $modalContent.find('h4').text('Your Calendar');
  //     // Archivo
  //   } else if (that === 'perm_media') {
  //     $(e.target).parent().attr('href', '#modal1').addClass('modal-trigger');
  //     console.log($('.modal-footer').find('a').attr('id'));
  //     // Evento para subir archivo
  //     $inputFile.change(imgFileSelect);
  //     // agregar las fotos al dom
  //     $agreeButton.on('click', function () {
  //       console.log($thumbnail.find('img'));
  //       $.each($thumbnail.find('img'), function (i, val) {
  //         // console.log(i);
  //         // console.log(val);
  //         $('#message-box').append(val);
  //       });
  //     });
  //     // MENSAJE
  //   } else if (that === 'chat') {
  //     // console.log(that);
  //     $(e.target).parent().attr('href', '#modal1').addClass('modal-trigger');
  //     $modalContent.find('h4').text('Write something');
  //   }
  // });


  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: 0.5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      console.log(modal, trigger);
    },
    complete: function () {
      console.log('Closed');
    } // Callback for Modal close
  }
  );
});
