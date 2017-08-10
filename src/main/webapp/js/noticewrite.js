var Titl = $('#bw_titl'),
    Con = $('#bw_con'),
    Div = "notice",
    mno


$('#conaddbtn').on('click',function() {
	console.log('fgaf');
    $.post('conAdd.json', {
      'mno' : mno,
      'bw_titl': Titl.val(),
      'bw_con': Con.val(),
      'bw_div': Div
    }, function(result) {
      location.href = 'notice.html'
    }, 'json')
  })
  
  var no = 0
  try {
	  no = location.href.split('?')[1].split('=')[1]
  } catch (err) {}
  
  if(no == 0) {
	  $('#fileupload2').css("display","none")
  } else {
	  $('#fileupload').css("display","none")
	  $('#fileupload2').css("display","block")
  }
  
  
  
  $.getJSON('detail.json', {'no': no}, function(result) {
	  var data = result.data
	  if(no != 0){
		  $('#conupdatebtn').css("display","block")
		  $('#conaddbtn').css("display", "none")
	  }
	  console.log(data)
		  
	  Titl.val(data.bw_titl)
      Con.text(data.bw_con)
	  })
    $('#conupdatebtn').css("display","none")
    

  
  $('#conupdatebtn').on('click',function() {
	  
	  $.post('conUpdate.json', {
		  'bw_titl': Titl.val(),
		  'bw_con': Con.val(),
		  'no': no,
		  'bw_div': Div
	  }, function(result) {
		  location.href = 'notice.html'
	  }, 'json')

  });
  
$.getJSON('userinfo.json', function(result) {
    mno = result.data.no;
})