var Titl = $('#bw_titl'),
    Con = $('#bw_con'),
    Div = "board",
    mno;



$('#conaddbtn').on('click',function() {
	console.log('fgaf');
    $.post('conAdd.json', {
      'mno' : mno,
      'bw_titl': Titl.val(),
      'bw_con': Con.val(),
      'bw_div': Div
    }, function(result) {
      location.href = 'community_boarder.html'
    }, 'json')
  })
  
  var no = 0
  try {
	  no = location.href.split('?')[1].split('=')[1]
  } catch (err) {}
  
  $.getJSON('detail.json', {'no': no}, function(result) {
	  var data = result.data
	  if(no != 0){
		  $('#updatebtn').css("display","block")	
		  $('#addbtn').css("display","none")
	  }
	  console.log(data)
		  
	  Titl.val(data.bw_titl)
      Con.text(data.bw_con)
	  })
	  
    $('#updatebtn').css("display","none")
    
	
	$('#updatebtn').on('click',function() {
		  
		  $.post('update.json', {
			  'bw_titl': Titl.val(),
			  'bw_con': Con.val(),
			  'no': no
		  }, function(result) {
			  location.href = 'community_boarder.html'
		  }, 'json')

	});
  $('#fileupload').fileupload({
	url : '/p-desktop/upload1.json', // 서버에 요청할 URL
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
     	$('#conaddbtn').css("display", "none")
     	$('#addbtn').css("display", "block")
		console.log('fileuploadprocessalways()...');
		console.log(data.files);
	
		var imagesDiv = $('#images-div')
		imagesDiv.html("");
		for (var i = 0; i < data.files.length; i++) {
			try {
				console.log(data.files[i].preview.toDataURL)
				if (data.files[i].preview.toDataURL) {
					$("<img>").attr('src',data.files[i].preview.toDataURL())
					.css('width', '100px').appendTo(imagesDiv);
				}
			} catch (err) {
			}
		}
		$('#addbtn').unbind("click");
		$('#addbtn').click(function() {
			
			data.submit();
		});
	},
	
	
	submit : function(e, data) { // 서버에 전송하기 직전에 호출된다.	
		console.log('submit()...');
		data.formData = {
				bw_titl : $('#bw_titl').val(),
				bw_con : $('#bw_con').val(),
				mno: mno
		};
		
		location.href = 'community_boarder.html'
	},
	
	
	done : function(e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
		console.log('done()...');
		console.log(data.result);
		var file = data.result.fileList;
		$('<p/>').text("name : " + data.result.name).appendTo(
				document.body);
		$.each(data.result.fileList, function(index, file) {
			$('<p/>').text(file.filename + " : " + file.filesize)
				.appendTo(document.body);
			});
		}
	});
	
$.getJSON('userinfo.json', function(result) {
    mno = result.data.no;
})