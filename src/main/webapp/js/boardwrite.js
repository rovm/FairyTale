var No = $('#no'),
    Name = $('#bw_name'),
    Con = $('#bw_con'),
    Wdt = $('#bw_wdt');

$('#addbtn').on('click',function() {
	console.log('fgaf');
    $.post('add.json', {
      'bw_name': Name.val(),
      'bw_con': Con.val(),
      'bw_wdt': Wdt.val(),
    }, function(result) {
      location.href = 'community_boarder.html'
    }, 'json')
    console.log(Name.val(), Con.val(), Wdt.val())
  })
  
