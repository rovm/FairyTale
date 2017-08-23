var no = 0,
	mno,
	ctno,
	mbkno,
	StartPage,
	MovePage,
	EndPage,
	CreateBook,
	cust_rec,
	UrlEncode,
	RecordAraay = new Array(),
	recAudio;





$(document).ready(function() {
	$(".recorder").css("display", "none");
	$(".play").css("display", "none")
	$(".recorder_play").css("display", "none")
	$("#createModal").modal();

	$('#close').click(function() {
	    location.href = "bookList.html"
	});




$('#yes').on('click', function(){
	CreateBook = 1;
	$('#createModal').modal('hide');
		console.log("bkno"+MovePage);

	$.post('addCustbook.json', {
		'mno': mno,
		'mbkno': no
	}, function(result) {
		ctno = result.data
	 if(result.status=="success")
	 {
		 console.log("ctno"+result.data);
	 } else {
		 console.log(error)
	 }
	}, 'json')


	$(".recorder").css("display", "block");
	$(".play").css("display", "block")
	$("#basic_stop").css("display", "none");
	$(".recorder_play").css("display", "block");
	$("#rec_stop").css("display", "none");



	$('#basic_play').on('click', function() {
		$("#basic_stop").css("display", "block");
		$("#basic_play").css("display", "none");
	})
	$('#basic_stop').on('click', function() {
		$(".record" + MovePage)[0].pause();
		$("#basic_play").css("display", "block");
		$("#basic_stop").css("display", "none");
	})


})

$('#no').on('click', function(){
	CreateBook = 0;
	console.log("no누르고 모달창닫습니다..")

	$('#createModal').modal('hide');
	$(".recorder").css("display", "none");
	$(".play").css("display", "none")
	$(".recorder_play").css("display", "none")
})
 });//ready



try {
	no = location.href.split('?')[1].split('=')[1]
	console.log(no)
} catch (err) {}



$.getJSON('userinfo.json', function(result) {
	mno = result.data.no;
	console.log(mno)
})

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

	$('.record_btn').click(function () {
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
		if($(".record_btn"))
		navigator.mediaDevices.getUserMedia( { 'audio': true } ).then( function ( stream ) {
			mediaRecorder = new MediaRecorder( stream );
			mediaRecorder.start();

			button.classList.add( 'recording' );
			btn_status = 'recording';

			

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
					 UrlEncode = encodeURIComponent(base64str);

					 selectcust_rec(ctno, MovePage)

				});


				audioSrc = window.URL.createObjectURL( recodeFile );
				audio.src = audioSrc;

			  RecordAraay[MovePage-StartPage] = audioSrc
				recAudio = new Audio(RecordAraay[MovePage-StartPage])

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





$('#rec_play').on('click', function() {
	recAudio.play()
	console.log(RecordAraay);
	$("#rec_stop").css("display", "block");
	$("#rec_play").css("display", "none");
})


$('#rec_stop').on('click', function() {
	recAudio.pause()
	console.log(RecordAraay);
	$("#rec_play").css("display", "block");
	$("#rec_stop").css("display", "none");
})


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
		StartPage = data.list[0].bkno;
		MovePage = StartPage;
		EndPage = StartPage + data.list.length -1;

		console.log("Start " + StartPage)
		console.log("End " + EndPage)

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


function selectcust_rec(ctno, MovePage) {
	console.log(ctno, MovePage);


	$.getJSON('custpage_detail.json', {
		'ctno' : ctno,
		'bkno' : MovePage }, function(result) {
			if(result.data == undefined) {
				//파일업로드
				$.post('upload3.json', {
					'UrlEncode': UrlEncode,
					'ctno' : ctno,
					'bkno': MovePage
				}, function(result) {
					console.log(result);
					if(result.status=="success")
					{
						console.log("업로드성공");

						// e.preventDefault();
					} else {
						console.log(result)
					}
				}, 'json')

			} else {
				$.post('updateCustpage.json', {
					'UrlEncode': UrlEncode,
					'ctno' : ctno,
					'bkno': MovePage
				}, function(result) {
					console.log(result);
					if(result.status=="success")
					{
						console.log("업데이트성공...");
						// e.preventDefault();
					} else {
						console.log(result)
					}
				}, 'json')





				console.log("없당");
			}
	})
}







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
			MovePage -= 1;
			if(MovePage < StartPage){
				MovePage = EndPage;
			}
			// selectcust_rec(ctno, MovePage);
			console.log(MovePage)
		});

		$('a.control_next').click(function () {
			moveRight();
			MovePage += 1;

			if(MovePage > EndPage){
				if(CreateBook == 1) {
				swal({
					  title: "저장하시겠습니까?",
					  text: "<textarea id='savetext' style='resize:none;' placeholder='동화책에 대한 설명을 적어주세요~'></textarea>",
						confirmButtonColor: "#FFA500",
						showCancelButton: true,
						confirmButtonText: "Yes",
						html: true

					}, function(isConfirm) {
						if(isConfirm == true){
							console.log($('#savetext').val());
							$.post('updateCustbook.json', {
								'no': ctno,
							 'ct_dscp': $('#savetext').val()
						 }, function(result) {
							 location.href = 'storage.html'
						 }, 'json')
							$("#createModal").modal();
						}
					})
				}
					MovePage = StartPage;
					// selectcust_rec(ctno, MovePage);
					if(CreateBook == 0) {
						$("#createModal").modal();

					}
			}

			console.log(MovePage)
		});

	});



	$("#basic_play").on('click', function () {
		$(".record" + MovePage)[0].play();
	})
}

$("#pre_btn").on("click", function(){
	location.href='bookList.html'
})
