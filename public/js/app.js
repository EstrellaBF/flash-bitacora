$(document).ready(function() {
  const $buttonsBitacora = $('#buttons-bitacora');
  const $modalContent = $('.modal-content');
  let $inputFile = $('#input-file');
  let $inputText = $('#input-text');
  // $('#map').hide();
  // Activando materialize form
  Materialize.updateTextFields();


  // Evento para elegir las opciones
  $buttonsBitacora.on('click', 'li', function() {
    $('.file-path').val('');
    if ($(this).find('i').text() === 'video_library') {
      // console.log($(this));
      $('#title-media').val('');
      let videoInput = $('#video-upload');
      let thumbnailVid = $('#thumbnail-vid');
      $('#video-upload').change(function() {
        // console.log(this);
        let videoAudioUpload = this.files[0];
        let typeFile;
        if (videoAudioUpload.type.match('audio.*')) {
          $('#send-media').attr('disabled', false);
          typeFile = 'audio';
          $('#thumbnail-vid').append(`<div class="audio"><audio src="${URL.createObjectURL(videoAudioUpload)}" controls></audio></div>`);
        } else if (videoAudioUpload.type.match('video.*')) {
          $('#send-media').attr('disabled', false);
          typeFile = 'video';
          $('#thumbnail-vid').append(`<div class="video"><video class="responsive-video" src="${URL.createObjectURL(videoAudioUpload)}" controls></video></div>`);
        } else {
          $('#send-media').attr('disabled', true);
        };
        $('#send-media').on('click', function() {
          console.log(typeFile);
          $('#message-box').prepend(`<div class="media-box"><p>${$('#title-media').val()}</p>${$('#thumbnail-vid').html()}</div>`)
        });
      });
    }  
    // Calendar
    if ($(this).find('i').text() === 'today') {
      $('#thumbnail-cal').val('');
      // Evento que verificará el valor de la fecha al seleccionarlo
      $('#message_cal').on('change', function() {
        if ($(this).val().length === 10 && $('#title-cal').val()) {
          $('#send-calendar').attr('disabled', false);
          let getDate = $(this).val();
          // $modalContent.append(`<div class="event-box"><p>${$('#title-cal').val()}</p><p>${getDate}</p></div>`);
          initMap();
          $('#send-calendar').on('click', function() {
            initMap();
            $('#message-box').prepend(`<div class="event-box"><p>${$('#title-cal').val()}</p><p>${getDate}</p><div id="map"></div></div>`);
          });
        } else {
          $('#send-calendar').attr('disabled', true);
        }
      });
    }
    // images 
    if ($(this).find('i').text() === 'perm_media') {
      let fileInput = document.getElementById('image-upload');
      let thumbnailImg = document.getElementById('thumbnail-img'); 
      fileInput.addEventListener('change', function(e) {
        // console.log(fileInput.files[0]); //blob
        let file = fileInput.files[0];
        let imageType = /image.*/;
        if (file.type.match(imageType)) {
          let reader = new FileReader();
          reader.onload = function(e) {
            thumbnailImg.innerHTML = '';
            // Creando una nueva imagen
            let img = new Image();
            img.src = reader.result;
            thumbnailImg.appendChild(img);
            $('#send-img').attr('disabled', false);
          }
          reader.readAsDataURL(file);
        } else {
          thumbnailImg.innerHTML ="archivo no soportado";
          $('#send-img').attr('disabled', true);
        }
        $('#send-img').on('click', function() {
          var imageSelected = thumbnailImg.innerHTML;
          console.log(imageSelected);
          $('#message-box').prepend(`<div class="img-selected">${imageSelected}</div>`);
        });

      });
    }
    // text
    if ($(this).find('i').text() === 'chat') {
      // debugger
      $('#message_text').val('');
      $('#title-text').val('')
      // Verificando que se escriba ambos campos
      $('#input-text-ms').on('keyup', function() {
        console.log($('#message_text').val());
        console.log($('#title-text').val());
        if ($('#title-text').val().length > 2 && $('#message_text').val().length > 2) {
          console.log('cumple');
          $('#send-message').attr('disabled', false);
          $('#send-message').on('click', function() {
            $('#message-box').append(`<div class="box-message"><p>${$('#title-text').val()}</p><p>${$('#message_text').val()}</p></div>`);
          });
        } else {
          $('#send-message').attr('disabled', true);
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
      // console.log(modal, trigger);
    },
    complete: function() {
      console.log('Closed');
    } // Callback for Modal close
  }
  );
});