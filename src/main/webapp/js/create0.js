var no = 0;
try {
	no = location.href.split('?')[1].split('=')[1]
	console.log(no)
} catch (err) {}

var msg_box = document.getElementById( 'msg_box' ),
button = document.getElementById( 'button' ),
canvas = document.getElementById( 'canvas' ),
lang = {
	'mic_error': '마이크를 설치해 주세요',
	'press_to_start': '버튼을 눌러 녹음하세요!',
	'recording': '녹음중',
	'play': '시작',
	'stop': '정지',
	'download': 'Download'
		// 'use_https': 'This application in not working over insecure connection. Try to use HTTPS'
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
		}
	);
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
	recodeFile;

	$('#record-btn').click(function () {
		if ( btn_status == 'inactive' ) {
			start();
		} else if ( btn_status == 'recording' ) {
			stop();
		}
	})

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
				recodeFile = new Blob( chunks, type );
				var reader = new FileReader();

				reader.readAsArrayBuffer(recodeFile);

				reader.addEventListener("loadend", function() {
					var base64str = arrayBufferToBase64(reader.result);
					var UrlEncode = encodeURIComponent(base64str);

					//파일업로드
					$.post('upload3.json', {
						'UrlEncode': UrlEncode
					}, function(result) {
						if(result.status=="success")
						{console.log(result);
							location.href = 'login.html'
							// e.preventDefault();
						} else {
							console.log(result)
						}
					}, 'json')
				});


				audioSrc = window.URL.createObjectURL( recodeFile );
				audio.src = audioSrc;
				$('<source id="oggFile" src="' + audioSrc + '" type="audio/ogg"/>').appendTo(
					'#recordControl')
				console.log("audioSrc:", audioSrc);
				chunks = [];
			}



		} ).catch( function ( error ) {
			if ( location.protocol != 'http:' ) {
				msg_box.innerHTML = lang.mic_error;
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
		'<a href="#" onclick="save(); return false;" class="txt_btn" >' + lang.download + '</a>'
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



	var a = document.createElement( 'a' );
	function save() {

		a.download = 'record.ogg';
		a.href = audioSrc;
		console.log(audioSrc);
		document.body.appendChild( a );
		a.click();
		document.body.removeChild( a );
	}



} else {
	if ( location.protocol != 'http:' ) {
		msg_box.innerHTML = lang.mic_error;
	} else {
		msg_box.innerHTML = lang.mic_error;
	}
	button.disabled = true;
}


if(no != 0){
	$.getJSON('MSTBOOK_detail.json', {'no': no}, function(result) {
		var data = result.data
		var templateFn = Handlebars.compile($('#FairyTaleContent-template').text())
		var generatedHTML = templateFn(result.data)
		$("#FairyTale_Content").text('') // tbody의 기존 tr 태그들을 지우고
		$("#FairyTale_Content").html(generatedHTML) // 새 tr 태그들로 설정한다.
		Slider()
	})
} else{
	location.href='bookList.html'
}


function arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}






$('#upload-btn').click(function() {
	$.post('upload3.json', {
		'audioSrc' : audioSrc
	}, function(result) {
		if(result.status=="success")
		{console.log(result);
			// e.preventDefault();
		} else {
			console.log(result.data)
		}
	}, 'json')
	// e.preventDefault();
})







//슬라이드
function Slider(){
	jQuery(document).ready(function ($) {

		var slideCount = $('#slider ul li').length;
		var slideWidth = $('#slider ul li').width();
		var slideHeight = $('#slider ul li').height();
		var sliderUlWidth = slideCount * slideWidth;

		$('#slider').css({ width: slideWidth, height: slideHeight });

		$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

		$('#slider ul li:last-child').prependTo('#slider ul');

		function moveLeft() {
			$('#slider ul').animate({
				left: + slideWidth
			}, 200, function () {
				$('#slider ul li:last-child').prependTo('#slider ul');
				$('#slider ul').css('left', '');
			});
		};

		function moveRight() {
			$('#slider ul').animate({
				left: - slideWidth
			}, 200, function () {
				$('#slider ul li:first-child').appendTo('#slider ul');
				$('#slider ul').css('left', '');
			});
		};

		$('a.control_prev').click(function () {
			moveLeft();
		});

		$('a.control_next').click(function () {
			moveRight();
		});

	});
}

$("#pre_btn").on("click", function(){
	location.href='bookList.html'
})
