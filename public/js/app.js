$(document).ready(function() {
  const $buttonsBitacora = $('#buttons-bitacora');
  const $modalContent = $('.modal-content');
  let $inputFile = $('#input-file');
  let $inputText = $('#input-text');
  // $('#map').hide();
  // Activando materialize form
  Materialize.updateTextFields();

  // Evento botones
  $buttonsBitacora.on('click', 'li', function() {
    // console.log($(this));
    // Video
    if ($(this).find('i').text() === 'video_library') {
      // console.log($(this));
      $('#send-media').attr('disabled', false);
      let videoInput = document.getElementById('video-upload');
      let thumbnailVid = document.getElementById('thumbnail-vid');
      $('#video-upload').change(function() {
        console.log(this);
        let videoAudioUpload = this.files[0];
        let typeFile;
        console.log(videoAudioUpload);
        if (videoAudioUpload.type.match('audio.*')) {
          typeFile = 'audio';
          console.log('audio'); // typo
          console.log(URL.createObjectURL(videoAudioUpload)); 
          // console.log(url);

          $('#thumbnail-vid').append(`<div class="audio"><audio src="${URL.createObjectURL(videoAudioUpload)}" controls></audio></div>`)

        //   <video class="responsive-video" controls>
        //   <source src="movie.mp4" type="video/mp4">
        // </video>
        } else if (videoAudioUpload.type.match('video.*')) {
          typeFile = 'video';
          console.log('video');

          $('#thumbnail-vid').append(`<div class="audio"><video src="${URL.createObjectURL(videoAudioUpload)}" controls></audio></div>`)
        } else {
          alert('only video and audio');
        };
        $('#send-media').on('click', function() {
          console.log($('#thumbnail-vid').html());
          $('#message-box').prepend(`${$('#thumbnail-vid').html()}`)
        });
      });
    }
    // Calendar
    if ($(this).find('i').text() === 'today') {

      // Evento que verificará el valor de la fecha al seleccionarlo
      $('#message_cal').on('change', function() {
        // console.log($('#title-cal').val());
        // console.log($(this).val());
        if ($(this).val().length === 10 && $('#title-cal').val()) {
          // initMap();
          // $thumbnail.append(`<p>${$('#title-text').val()}</p><p>${$(this).val()}</p>`);
          $('#send-calendar').attr('disabled', false);
          let getDate = $(this).val();
          $modalContent.append(`<div class="event-box"><p>${$('#title-cal').val()}</p><p>${getDate}</p></div>`);
          initMap();
          $('#send-calendar').on('click', function() {
            initMap();
            // $('#map').toggle();
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
          $('#message-box').append(`<div class="img-selected">${imageSelected}</div>`);
        });

      });
    }
    // text
    if ($(this).find('i').text() === 'chat') {
      // debugger
      $('#message_text').val('');
      // Verificando que se escriba ambos campos
      $inputText.on('keyup', function() {
        console.log($('#title-text').val().length);
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