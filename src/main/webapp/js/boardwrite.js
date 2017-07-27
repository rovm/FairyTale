var Name = $('#bw_name'),
    Con = $('#bw_con'),
    Wdt = $('#bw_wdt');



$('#addbtn').on('click',function() {
	console.log('fgaf');
    $.post('add.json', {
      'bw_name': Name.val(),
      'bw_con': Con.val(),
      'bw_wdt': Wdt.val()
    }, function(result) {
      location.href = 'community_boarder.html'
    }, 'json')
    console.log(Name.val(), Con.val(), Wdt.val())
  })
  
  var no = 0
  try {
	  no = location.href.split('?')[1].split('=')[1]
  } catch (err) {}
  
  $.getJSON('detail.json', {'no': no}, function(result) {
	  var data = result.data
	  })

	
	$('#updatebtn').on('click',function() {
		  
		  $.post('update.json', {
			  'bw_name': Name.val(),
			  'bw_con': Con.val(),
			  'bw_wdt': Wdt.val(),
			  'no': no
		  }, function(result) {
			  location.href = 'community_boarder.html'
		  }, 'json')
	})
	
	
	
	
  $.getJSON('detail.json', {'no': no}, function(result) {
    var data = result.data
    Name.val(data.bw_name)
    Con.text(data.bw_con)
})
  
