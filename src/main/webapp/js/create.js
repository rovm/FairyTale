var msg_box = document.getElementById( 'msg_box' ),
    button = document.getElementById( 'button' ),
    canvas = document.getElementById( 'canvas' ),
lang = {
    'mic_error': '마이크를 설치해 주세요', //Ошибка доступа к микрофону
    'press_to_start': '버튼을 눌러 녹음하세요!', //Нажмите для начала записи
    'recording': '녹음중', //Запись
    'play': '시작', //Воспроизвести
    'stop': '정지', //Остановить
    'download': 'Download', //Скачать
    'use_https': 'This application in not working over insecure connection. Try to use HTTPS'
},
time;


msg_box.innerHTML = lang.press_to_start;

if ( navigator.mediaDevices === undefined ) {
    navigator.mediaDevices = {};
}


if ( navigator.mediaDevices.getUserMedia === undefined ) {
    navigator.mediaDevices.getUserMedia = function ( constrains ) {
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia
        if ( !getUserMedia )  {
            return Promise.reject( new Error( 'getUserMedia is not implemented in this browser' ) );
        }

        return new Promise( function( resolve, reject ) {
            getUserMedia.call( navigator, constrains, resolve, reject );
        } );
    }
}


if ( navigator.mediaDevices.getUserMedia ) {
    var btn_status = 'inactive',
        mediaRecorder,
        chunks = [],
        audio = new Audio(),
        mediaStream,
        audioSrc,
        type = {
            'type': 'audio/ogg,codecs=opus'
        },
        ctx,
        analys,
        blob;

    button.onclick = function () {
        if ( btn_status == 'inactive' ) {
            start();
        } else if ( btn_status == 'recording' ) {
            stop();
        }
    }

    function parseTime( sec ) {
        var h = parseInt( sec / 3600 );
        var m = parseInt( sec / 60 );
        var sec = sec - ( h * 3600 + m * 60 );

        h = h == 0 ? '' : h + ':';
        sec = sec < 10 ? '0' + sec : sec;

        return h + m + ':' + sec;
    }


    function start() {
        navigator.mediaDevices.getUserMedia( { 'audio': true } ).then( function ( stream ) {
            mediaRecorder = new MediaRecorder( stream );
            mediaRecorder.start();

            button.classList.add( 'recording' );
            btn_status = 'recording';

            msg_box.innerHTML = lang.recording;

            if ( navigator.vibrate ) navigator.vibrate( 150 );

            time = Math.ceil( new Date().getTime() / 1000 );


            mediaRecorder.ondataavailable = function ( event ) {
                chunks.push( event.data );
            }

            mediaRecorder.onstop = function () {
                stream.getTracks().forEach( function( track ) { track.stop() } );

                blob = new Blob( chunks, type );
                audioSrc = window.URL.createObjectURL( blob );

                audio.src = audioSrc;

                chunks = [];
            }



        } ).catch( function ( error ) {
            if ( location.protocol != 'https:' ) {
              msg_box.innerHTML = lang.mic_error + '<br>'  + lang.use_https;
            } else {
              msg_box.innerHTML = lang.mic_error;
            }
            button.disabled = true;
        });
    }

    function stop() {
        mediaRecorder.stop();
        button.classList.remove( 'recording' );
        btn_status = 'inactive';

        if ( navigator.vibrate ) navigator.vibrate( [ 200, 100, 200 ] );

        var now = Math.ceil( new Date().getTime() / 1000 );

        var t = parseTime( now - time );

        msg_box.innerHTML = '<a href="#" onclick="play(); return false;" class="txt_btn">' + lang.play + ' (' + t + 's)</a><br>' +
                            '<a href="#" onclick="save(); return false;" class="txt_btn">' + lang.download + '</a>'
    }



    function play() {
        audio.play();
        msg_box.innerHTML = '<a href="#" onclick="pause(); return false;" class="txt_btn">' + lang.stop + '</a><br>' +
                            '<a href="#" onclick="save(); return false;" class="txt_btn">' + lang.download + '</a>';
    }

    function pause() {
        audio.pause();
        audio.currentTime = 0;
        msg_box.innerHTML = '<a href="#" onclick="play(); return false;" class="txt_btn">' + lang.play + '</a><br>' +
                            '<a href="#" onclick="save(); return false;" class="txt_btn">' + lang.download + '</a>'
    }

    function roundedRect(ctx, x, y, width, height, radius, fill) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);

        ctx.fillStyle = fill;
        ctx.fill();
    }

    function save() {
        var a = document.createElement( 'a' );
        a.download = 'record.ogg';
        a.href = audioSrc;
        document.body.appendChild( a );
        a.click();

        document.body.removeChild( a );
    }

} else {
    if ( location.protocol != 'https:' ) {
      msg_box.innerHTML = lang.mic_error + '<br>'  + lang.use_https;
    } else {
      msg_box.innerHTML = lang.mic_error;
    }
    button.disabled = true;
}

//current position
var pos = 0;
//number of slides
var totalSlides = $('#slider-wrap ul li').length;
//get the slide width
var sliderWidth = $('#slider-wrap').width();


$(document).ready(function(){


	/*****************
	 BUILD THE SLIDER
	*****************/
	//set width to be 'x' times the number of slides
	$('#slider-wrap ul#slider').width(sliderWidth*totalSlides);

    //next slide
	$('#next').click(function(){
		slideRight();
	});

	//previous slide
	$('#previous').click(function(){
		slideLeft();
	});



	/*************************
	 //*> OPTIONAL SETTINGS
	************************/
	//automatic slider


	//for each slide
	$.each($('#slider-wrap ul li'), function() {
	   //set its color
	   var c = $(this).attr("data-color");
	   $(this).css("background",c);

	   //create a pagination
	   var li = document.createElement('li');
	   $('#pagination-wrap ul').append(li);
	});

	//counter
	countSlides();

	//pagination
	pagination();

	//hide/show controls/btns when hover
	//pause automatic slide when hover




});//DOCUMENT READY



/***********
 SLIDE LEFT
************/
function slideLeft(){
	pos--;
	if(pos==-1){ pos = totalSlides-1; }
	$('#slider-wrap ul#slider').css('left', -(sliderWidth*pos));

	//*> optional
	countSlides();
	pagination();
}


/************
 SLIDE RIGHT
*************/
function slideRight(){
	pos++;
	if(pos==totalSlides){ pos = 0; }
	$('#slider-wrap ul#slider').css('left', -(sliderWidth*pos));

	//*> optional
	countSlides();
	pagination();
}




/************************
 //*> OPTIONAL SETTINGS
************************/
function countSlides(){
	$('#counter').html(pos+1 + ' / ' + totalSlides);
}

function pagination(){
	$('#pagination-wrap ul li').removeClass('active');
	$('#pagination-wrap ul li:eq('+pos+')').addClass('active');
}





// html5media enables <video> and <audio> tags in all major browsers
// External File: https://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: https://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
		var supportsAudio = !!document.createElement('audio').canPlayType;
		if (supportsAudio) {
				var index = 0,
						playing = false,
						mediaPath = 'https://archive.org/download/mythium/',
						extension = '',
						tracks = [{
								"track": 1,
								"name": "All This Is - Joe L.'s Studio",
								"length": "2:46",
								"file": "JLS_ATI"
						}, {
								"track": 2,
								"name": "The Forsaken - Broadwing Studio (Final Mix)",
								"length": "8:31",
								"file": "BS_TF"
						}, {
								"track": 3,
								"name": "All The King's Men - Broadwing Studio (Final Mix)",
								"length": "5:02",
								"file": "BS_ATKM"
						// }, {
						//     "track": 4,
						//     "name": "The Forsaken - Broadwing Studio (First Mix)",
						//     "length": "8:32",
						//     "file": "BSFM_TF"
						// }, {
						//     "track": 5,
						//     "name": "All The King's Men - Broadwing Studio (First Mix)",
						//     "length": "5:05",
						//     "file": "BSFM_ATKM"
						// }, {
						//     "track": 6,
						//     "name": "All This Is - Alternate Cuts",
						//     "length": "2:49",
						//     "file": "AC_ATI"
						// }, {
						//     "track": 7,
						//     "name": "All The King's Men (Take 1) - Alternate Cuts",
						//     "length": "5:45",
						//     "file": "AC_ATKMTake_1"
						// }, {
						//     "track": 8,
						//     "name": "All The King's Men (Take 2) - Alternate Cuts",
						//     "length": "5:27",
						//     "file": "AC_ATKMTake_2"
						// }, {
						//     "track": 9,
						//     "name": "Magus - Alternate Cuts",
						//     "length": "5:46",
						//     "file": "AC_M"
						// }, {
						//     "track": 10,
						//     "name": "The State Of Wearing Address (fucked up) - Alternate Cuts",
						//     "length": "5:25",
						//     "file": "AC_TSOWAfucked_up"
						// }, {
						//     "track": 11,
						//     "name": "Magus - Popeye's (New Years '04 - '05)",
						//     "length": "5:54",
						//     "file": "PNY04-05_M"
						// }, {
						//     "track": 12,
						//     "name": "On The Waterfront - Popeye's (New Years '04 - '05)",
						//     "length": "4:41",
						//     "file": "PNY04-05_OTW"
						// }, {
						//     "track": 13,
						//     "name": "Trance - Popeye's (New Years '04 - '05)",
						//     "length": "13:17",
						//     "file": "PNY04-05_T"
						// }, {
						//     "track": 14,
						//     "name": "The Forsaken - Popeye's (New Years '04 - '05)",
						//     "length": "8:13",
						//     "file": "PNY04-05_TF"
						// }, {
						//     "track": 15,
						//     "name": "The State Of Wearing Address - Popeye's (New Years '04 - '05)",
						//     "length": "7:03",
						//     "file": "PNY04-05_TSOWA"
						// }, {
						//     "track": 16,
						//     "name": "Magus - Popeye's (Valentine's Day '05)",
						//     "length": "5:44",
						//     "file": "PVD_M"
						// }, {
						//     "track": 17,
						//     "name": "Trance - Popeye's (Valentine's Day '05)",
						//     "length": "10:47",
						//     "file": "PVD_T"
						// }, {
						//     "track": 18,
						//     "name": "The State Of Wearing Address - Popeye's (Valentine's Day '05)",
						//     "length": "5:37",
						//     "file": "PVD_TSOWA"
						// }, {
						//     "track": 19,
						//     "name": "All This Is - Smith St. Basement (01/08/04)",
						//     "length": "2:49",
						//     "file": "SSB01_08_04_ATI"
						// }, {
						//     "track": 20,
						//     "name": "Magus - Smith St. Basement (01/08/04)",
						//     "length": "5:46",
						//     "file": "SSB01_08_04_M"
						// }, {
						//     "track": 21,
						//     "name": "Beneath The Painted Eye - Smith St. Basement (06/06/03)",
						//     "length": "13:08",
						//     "file": "SSB06_06_03_BTPE"
						// }, {
						//     "track": 22,
						//     "name": "Innocence - Smith St. Basement (06/06/03)",
						//     "length": "5:16",
						//     "file": "SSB06_06_03_I"
						// }, {
						//     "track": 23,
						//     "name": "Magus - Smith St. Basement (06/06/03)",
						//     "length": "5:47",
						//     "file": "SSB06_06_03_M"
						// }, {
						//     "track": 24,
						//     "name": "Madness Explored - Smith St. Basement (06/06/03)",
						//     "length": "4:52",
						//     "file": "SSB06_06_03_ME"
						// }, {
						//     "track": 25,
						//     "name": "The Forsaken - Smith St. Basement (06/06/03)",
						//     "length": "8:44",
						//     "file": "SSB06_06_03_TF"
						// }, {
						//     "track": 26,
						//     "name": "All This Is - Smith St. Basement (12/28/03)",
						//     "length": "3:01",
						//     "file": "SSB12_28_03_ATI"
						// }, {
						//     "track": 27,
						//     "name": "Magus - Smith St. Basement (12/28/03)",
						//     "length": "6:10",
						//     "file": "SSB12_28_03_M"
						// }, {
						//     "track": 28,
						//     "name": "Madness Explored - Smith St. Basement (12/28/03)",
						//     "length": "5:06",
						//     "file": "SSB12_28_03_ME"
						// }, {
						//     "track": 29,
						//     "name": "Trance - Smith St. Basement (12/28/03)",
						//     "length": "12:33",
						//     "file": "SSB12_28_03_T"
						// }, {
						//     "track": 30,
						//     "name": "The Forsaken - Smith St. Basement (12/28/03)",
						//     "length": "8:57",
						//     "file": "SSB12_28_03_TF"
						// }, {
						//     "track": 31,
						//     "name": "All This Is (Take 1) - Smith St. Basement (Nov. '03)",
						//     "length": "4:55",
						//     "file": "SSB___11_03_ATITake_1"
						// }, {
						//     "track": 32,
						//     "name": "All This Is (Take 2) - Smith St. Basement (Nov. '03)",
						//     "length": "5:46",
						//     "file": "SSB___11_03_ATITake_2"
						// }, {
						//     "track": 33,
						//     "name": "Beneath The Painted Eye (Take 1) - Smith St. Basement (Nov. '03)",
						//     "length": "14:06",
						//     "file": "SSB___11_03_BTPETake_1"
						// }, {
						//     "track": 34,
						//     "name": "Beneath The Painted Eye (Take 2) - Smith St. Basement (Nov. '03)",
						//     "length": "13:26",
						//     "file": "SSB___11_03_BTPETake_2"
						// }, {
						//     "track": 35,
						//     "name": "The Forsaken (Take 1) - Smith St. Basement (Nov. '03)",
						//     "length": "8:38",
						//     "file": "SSB___11_03_TFTake_1"
						// }, {
						//     "track": 36,
						//     "name": "The Forsaken (Take 2) - Smith St. Basement (Nov. '03)",
						//     "length": "8:37",
						//     "file": "SSB___11_03_TFTake_2"
						}],
						buildPlaylist = $.each(tracks, function(key, value) {
								var trackNumber = value.track,
										trackName = value.name,
										trackLength = value.length;
								if (trackNumber.toString().length === 1) {
										trackNumber = '0' + trackNumber;
								} else {
										trackNumber = '' + trackNumber;
								}
								$('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
						}),
						trackCount = tracks.length,
						npAction = $('#npAction'),
						npTitle = $('#npTitle'),
						audio = $('#audio1').bind('play', function () {
								playing = true;
								npAction.text('Now Playing...');
						}).bind('pause', function () {
								playing = false;
								npAction.text('Paused...');
						}).bind('ended', function () {
								npAction.text('Paused...');
								if ((index + 1) < trackCount) {
										index++;
										loadTrack(index);
										audio.play();
								} else {
										audio.pause();
										index = 0;
										loadTrack(index);
								}
						}).get(0),
						btnPrev = $('#btnPrev').click(function () {
								if ((index - 1) > -1) {
										index--;
										loadTrack(index);
										if (playing) {
												audio.play();
										}
								} else {
										audio.pause();
										index = 0;
										loadTrack(index);
								}
						}),
						btnNext = $('#btnNext').click(function () {
								if ((index + 1) < trackCount) {
										index++;
										loadTrack(index);
										if (playing) {
												audio.play();
										}
								} else {
										audio.pause();
										index = 0;
										loadTrack(index);
								}
						}),
						li = $('#plList li').click(function () {
								var id = parseInt($(this).index());
								if (id !== index) {
										playTrack(id);
								}
						}),
						loadTrack = function (id) {
								$('.plSel').removeClass('plSel');
								$('#plList li:eq(' + id + ')').addClass('plSel');
								npTitle.text(tracks[id].name);
								index = id;
								audio.src = mediaPath + tracks[id].file + extension;
						},
						playTrack = function (id) {
								loadTrack(id);
								audio.play();
						};
				extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
				loadTrack(index);
		}
});
