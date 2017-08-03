var mno;

function wrapWindowByMask(){
	//화면의 높이와 너비를 구한다.
	var maskHeight = $(document).height();  
	var maskWidth = $(window).width();  

	//마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
	$('#mask').css({'width':maskWidth,'height':maskHeight});  

	//애니메이션 효과 - 일단 1초동안 까맣게 됐다가 80% 불투명도로 간다.
	$('#mask').fadeIn(1000);      
	$('#mask').fadeTo("slow",0.8);    

	//윈도우 같은 거 띄운다.
	$('.window').show();
}



$(document).ready(function(){
	//검은 막 띄우기
	$('#photo-upload').click(function(e){
		e.preventDefault();
		wrapWindowByMask();
	});

	//닫기 버튼을 눌렀을 때
	$('.window .close').click(function (e) {  
		//링크 기본동작은 작동하지 않도록 한다.
		e.preventDefault();  
		$('#mask, .window').hide();  
	});       

	//검은 막을 눌렀을 때
	$('#mask').click(function () {  
		$(this).hide();  
		$('.window').hide();  
	});      
});

$('#fileupload').fileupload({
	url : '/control/photozip/upload.json', // 서버에 요청할 URL
	dataType : 'json', // 서버가 보낸 응답이 JSON임을 지정하기
	sequentialUploads : true, // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
	singleFileUploads : false, // 한 요청에 여러 개의 파일을 전송시키기.
	autoUpload : false, // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
	disableImageResize : /Android(?!.*Chrome)|Opera/
	.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
	previewMaxWidth : 100, // 미리보기 이미지 너비
	previewMaxHeight : 100, // 미리보기 이미지 높이
	previewCrop : true, // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
	processalways : function(e, data) {
		console.log('fileuploadprocessalways()...');
		console.log(data.files);

		var imagesDiv = $('#images-div')
		imagesDiv.html("");
		for (var i = 0; i < data.files.length; i++) {
			try {
				if (data.files[i].preview.toDataURL) {
					$("<img>").attr('src',data.files[i].preview.toDataURL())
					.css('width', '100px').appendTo(imagesDiv);
				}
			} catch (err) {
			}
		}
		$('#upload-btn').unbind("click");
		$('#upload-btn').click(function() {
			
			data.submit();
		});
	},


	submit : function(e, data) { // 서버에 전송하기 직전에 호출된다.	
		console.log('submit()...');
		
		data.formData = {
				bw_titl : $('#upload-titl').val(),
				bw_con : $('#upload-description').val(),
				mno: mno
		};
		
	},


	done : function(e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
		console.log('done()...');
		console.log(data.result);
		var file = data.result.fileList[0];
		$('<p/>').text("name : " + data.result.name).appendTo(
				document.body);
		$.each(data.result.fileList, function(index, file) {
			$('<p/>').text(file.filename + " : " + file.filesize)
			.appendTo(document.body);
		});
	}
});


//$(document).ready(function(){
//  $('#mask').draggable({ 
//    handle: "#mask-handler"
//  });
//});

$.getJSON('userinfo.json', function(result) {
    mno = result.data.no;
})
