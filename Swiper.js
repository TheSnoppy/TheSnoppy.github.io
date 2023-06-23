var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
  });
  
  // Kode JavaScript untuk memuat dan menampilkan video
  function loadVideos() {
    // Ganti 'CHANNEL_ID' dengan Channel ID saluran YouTube Anda
    var channelId = 'CHANNEL_ID';
    var apiKey = 'API_KEY';
    var maxResults = 10; // Jumlah video maksimal yang akan diambil
  
    var apiUrl =
      'https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=' +
      channelId +
      '&maxResults=' +
      maxResults +
      '&type=video' +
      '&key=' +
      apiKey;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        var items = data.items;
        var videos = items.filter((item) => item.id.kind === 'youtube#video');
  
        if (videos.length >= 2) {
          var videoCards = document.querySelectorAll('.video-card');
  
          for (var i = 0; i < 2; i++) {
            var item = videos[i];
            var videoCard = videoCards[i];
            var videoTitle = videoCard.querySelector('.video-title');
            var videoIframe = videoCard.querySelector('.video-iframe');
            var copyButton = videoCard.querySelector('.copy-button');
  
            videoTitle.textContent = item.snippet.title;
            videoIframe.src = 'https://www.youtube.com/embed/' + item.id.videoId;
  
            copyButton.addEventListener('click', function () {
              var tempInput = document.createElement('input');
              tempInput.value = 'https://www.youtube.com/watch?v=' + item.id.videoId;
              document.body.appendChild(tempInput);
              tempInput.select();
              document.execCommand('copy');
              document.body.removeChild(tempInput);
              alert('Link video telah disalin!');
            });
  
            videoCard.style.display = 'block';
          }
  
          mySwiper.update(); // Perbarui Swiper setelah video ditambahkan
        } else {
          console.log('Tidak cukup video.');
        }
      })
      .catch((error) => {
        console.log('Terjadi kesalahan:', error);
      });
  }
  
  loadVideos();