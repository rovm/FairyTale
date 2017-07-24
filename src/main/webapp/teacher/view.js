var viewTags = $('.bit-view'),
    newTags = $('.bit-new'),
    fiNo = $('#fi-no'),
    fiEmail = $('#fi-email'),
    fiName = $('#fi-name'),
    fiTel = $('#fi-tel'),
    fiPassword = $('#fi-password'),
    fiHomepage = $('#fi-homepage'),
    fiFacebook = $('#fi-facebook'),
    fiTwitter = $('#fi-twitter'),
    fiFilenames = $('#fi-filenames');


var no = 0
try {
  no = location.href.split('?')[1].split('=')[1]
} catch (err) {}


if (no == 0) { // 새 학생 등록
  viewTags.css('display', 'none')

  $('#add-btn').click(function() {
    $.post('add.json', {
      'email': fiEmail.val(),
      'name': fiName.val(),
      'tel': fiTel.val(),
      'password': fiPassword.val(),
      'homepage': fiHomepage.val(),
      'facebook': fiFacebook.val(),
      'twitter': fiTwitter.val(),
      'filenames': fiFilenames.val()
    }, function(result) {
      location.href = 'index.html'
    }, 'json')
  })
} else { // 학생 정보 조회
  newTags.css('display', 'none')

  $.getJSON('detail.json', {'no': no}, function(result) {
    var data = result.data
    fiNo.text(data.no)
    fiEmail.val(data.email)
    fiName.val(data.name)
    fiTel.val(data.tel)
    fiHomepage.val(data.homepage)
    fiFacebook.val(data.facebook)
    fiTwitter.val(data.twitter)
  })

  $('#upd-btn').click(function() {
    $.post('update.json', {
      'no': fiNo.text(),
      'email': fiEmail.val(),
      'name': fiName.val(),
      'tel': fiTel.val(),
      'password': fiPassword.val(),
      'homepage': fiHomepage.val(),
      'facebook': fiFacebook.val(),
      'twitter': fiTwitter.val()
    }, function(result) {
      location.href = 'index.html'
    }, 'json')
  })

  $('#del-btn').click(function() {
    $.getJSON('delete.json', {'no': no}, function(result) {
      location.href = 'index.html'
    })
  })
}

$('#fi-photoupload').fileupload({
    url: 'upload.json',
    dataType: 'json',
    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.  
    done: function (e, data) { 
      console.log('done()...');
      console.log(data.result); // 서버가 보낸 JSON 객체는 data.result 에 보관되어 있다.
      var filenames = data.result.data;
      
      for (var i = 0; i < filenames.length; i++) {
        var val = fiFilenames.val();
        if (val.length > 0) val += ",";
        fiFilenames.val(val + filenames[i]);
      }
    }
});