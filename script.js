const API_KEY = 'AIzaSyCLSyVPhPv8W8cUfPUOo32HTuagPsKYxVw';
const CHANNEL_ID = 'UCL8ZicQIjx27RhG3nvnm5Uw';
const MAX_RESULTS = 4; // Number of latest videos to display

// Load YouTube API
function fetchLatestVideos() {
    const request = gapi.client.youtube.search.list({
        part: 'snippet',
        channelId: CHANNEL_ID,
        maxResults: MAX_RESULTS,
        order: 'date',
        type: 'video'
    });

    request.execute(function(response) {
        const videoContainer = document.getElementById('video-container');

        // Sort the items by published date in descending order
        const sortedItems = response.items.sort((a, b) => {
            const dateA = new Date(a.snippet.publishedAt);
            const dateB = new Date(b.snippet.publishedAt);
            return dateB - dateA;
        });

        sortedItems.forEach(item => {
            const videoId = item.id.videoId;
            const videoTitle = item.snippet.title;
            const videoThumbnail = item.snippet.thumbnails.medium.url;

            const videoElement = document.createElement('div');
            videoElement.className = 'video';

            const iframe = document.createElement('iframe');
            iframe.src = 'https://www.youtube.com/embed/' + videoId;
            iframe.width = 320;
            iframe.height = 480;
            iframe.frameBorder = 0;
            iframe.allowFullscreen = true;

            videoElement.appendChild(iframe);

            // Create copy link button
            const copyLinkButton = document.createElement('button');
            copyLinkButton.className = 'copy-link-button';
            copyLinkButton.innerText = 'Salin Link';
            copyLinkButton.style.position = 'absolute';
            copyLinkButton.style.bottom = '10px';
            copyLinkButton.style.left = '50%';
            copyLinkButton.style.transform = 'translateX(-50%)';
            copyLinkButton.addEventListener('click', function() {
                const videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
                navigator.clipboard.writeText(videoUrl)
                    .then(() => {
                        console.log('Link video berhasil disalin: ' + videoUrl);
                        alert('Link video berhasil disalin: ' + videoUrl);
                    })
                    .catch(err => {
                        console.error('Gagal menyalin link video: ' + err);
                    });
            });

            videoElement.appendChild(copyLinkButton);

            videoContainer.appendChild(videoElement);
        });

        // Initialize the slider
        $('.video-container').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev">Previous</button>',
            nextArrow: '<button type="button" class="slick-next">Next</button>',
            centerMode: true,
            centerPadding: '25%',
        });

        // Adjust button position
        const buttonContainer = document.querySelector('.slick-slider .slick-list');
        const buttonRow = document.createElement('div');
        buttonRow.className = 'button-row';

        const youtubeButton = document.createElement('a');
        youtubeButton.href = 'https://www.youtube.com/@reuploaderid';
        youtubeButton.target = '_blank';
        youtubeButton.className = 'button youtube-button';
        youtubeButton.innerHTML = 'YouTube';

        const saweriaButton = document.createElement('a');
        saweriaButton.href = 'https://www.saweria.co/reuploadid';
        saweriaButton.target = '_blank';
        saweriaButton.className = 'button saweria-button';
        saweriaButton.innerHTML = 'Saweria';

        const trakteerButton = document.createElement('a');
        trakteerButton.href = 'https://trakteer.id/reuploadid/tip';
        trakteerButton.target = '_blank';
        trakteerButton.className = 'button trakteer-button';
        trakteerButton.innerHTML = 'Trakteer';

        buttonRow.appendChild(youtubeButton);
        buttonRow.appendChild(saweriaButton);
        buttonRow.appendChild(trakteerButton);

        buttonContainer.appendChild(buttonRow);
    });
}

// Load Google API client library
function loadClient() {
    gapi.load('client', function() {
        gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
        }).then(function() {
            fetchLatestVideos();
        });
    });
}

// Load YouTube API client
function loadYouTubeAPI() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = function() {
        gapi.load('client', loadClient);
    };
    document.head.appendChild(script);
}

// Load YouTube API and fetch latest videos
loadYouTubeAPI();