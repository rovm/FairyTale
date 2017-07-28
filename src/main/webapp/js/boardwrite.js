var Titl = $('#bw_titl'),
    Con = $('#bw_con'),
    Div = "board";




$('#addbtn').on('click',function() {
	console.log('fgaf');
    $.post('add.json', {
      'bw_titl': Titl.val(),
      'bw_con': Con.val(),
      'bw_div': Div
    }, function(result) {
      location.href = 'community_boarder.html'
    }, 'json')
    console.log(Titl.val(), Con.val(), Wdt.val())
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
			  'bw_wdt': Wdt.val(),
			  'no': no
		  }, function(result) {
			  location.href = 'community_boarder.html'
		  }, 'json')
	})