$(document).ready(function(){
	$(".box").click(function(){
	  $(this).next().slideToggle("fast");
	  $(this).find('i').toggle();
	});

});
