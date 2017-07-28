var tbody = $('.box-form'),
	title=$('#bw_titl'),
	creater=$('#name'),
	con=$('#bw_con'),
	wdt=$('#bw_wdt');


var no = 0
try {
	no = location.href.split('?')[1].split('=')[1]
} catch (err) {}


$.getJSON('detail.json', {'no': no}, function(result) {
    var data = result.data
    creater.text(data.name)
    title.text(data.bw_titl)
    con.text(data.bw_con)
    wdt.text(data.bw_wdt)
    console.log(result)
})


  $('#board-delete').click(function() {
    $.getJSON('delete.json', {'no': no}, function(result) {
      location.href = 'community_boarder.html'
    })
  })
  
  
  $('#board-update').click(function(){
	location.href = 'boardwrite.html?no=' + no
})

 $('#board-list').click(function(){
	location.href = 'community_boarder.html'
})

