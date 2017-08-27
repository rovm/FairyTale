var dt = new Date(),
year = dt.getFullYear(),
month = dt.getMonth() +1;



$(document).ready(function(){
	displayList()
	function displayList() {

		$.getJSON('BestList.json', {'year': year, 'month': month}, function(result) {


			var templateFn = Handlebars.compile($('#MainBest-template').text())
			var generatedHTML = templateFn(result.data)
			$(".img-box").text('') // tbody의 기존 tr 태그들을 지우고
			$(".img-box").html(generatedHTML) // 새 tr 태그들로 설정한다.
		}) // getJSON()

	}
	
	
	

	function animateSVG(section, dashedId, normalId, totalLengthTimes, totalLengthDivision) {

		$(section + " .description").css({'opacity': 0});
		$(section + " .description").removeClass("fadeInUpc");

		$(dashedId).css({'opacity': 1});
		$(normalId).css({'opacity': 0});

        var dashedSvg = Snap.select(dashedId),
       		dashedPath = dashedSvg.select("path");
        var totalLength = Snap.path.getTotalLength(dashedPath.attr("d"));
        var normalSvg = Snap.select(normalId);

        dashedPath.attr({'stroke-dashoffset': totalLength, 'stroke-dasharray': totalLength });

        Snap.animate(totalLength * totalLengthTimes , totalLength / totalLengthDivision, function( value ) {
            dashedPath.attr({ 'stroke-dashoffset': value});
        }, 2000);

        setTimeout(function() {

        	dashedSvg.animate({
                opacity: 0
            }, 400, mina.easeinout);

            normalSvg.animate({
                opacity: 1
            }, 400, mina.easeinout);

        }, 2000);

        setTimeout(function() {

        	$(section + " .description").addClass("fadeInUpc");

        }, 2500);

    }


    // $(".restart").click(function() {
    // 	$(".restart").addClass("patient");
    // 	animate();
    // });
    animate();

    function animate() {

    	// $(".restart").fadeOut(1000);

    	$(".section--fifth").addClass("fadeOutUpc");
    	$(".section--first").removeClass("fadeOutUpc");

    	animateSVG(".section--first","#lion-dashed", "#lion", 1.1, 1.5);

	    setTimeout(function() {
	    	$(".section--first").addClass("fadeOutUpc");
	    	$(".section--second").removeClass("fadeOutUpc");
	    	animateSVG(".section--second","#shark-dashed", "#shark", 1.1, 1.4);

	    }, 3000);

	    setTimeout(function() {
	    	$(".section--second").addClass("fadeOutUpc");
	    	$(".section--third").removeClass("fadeOutUpc");
	    	animateSVG(".section--third","#giraffe-dashed", "#giraffe", 1.1, 1.4);

	    }, 6000);

	    setTimeout(function() {
	    	$(".section--third").addClass("fadeOutUpc");
	    	$(".section--forth").removeClass("fadeOutUpc");
	    	animateSVG(".section--forth","#donkey-dashed", "#donkey", 1.1, 1.7);

	    }, 9000);

	    setTimeout(function() {
	    	$(".section--forth").addClass("fadeOutUpc");
	    	$(".section--fifth").removeClass("fadeOutUpc");
	    	animateSVG(".section--fifth","#cow-dashed", "#cow", 1.05, 1.6);

	    }, 12000);

			setTimeout(function() {
 			 animate()
 		 }, 16000);

    }


});

/* 모달  시작*/
$(document).ready(function(){
	  $("img").click(function(){
	  var t = $(this).attr("src");
	  $(".modal-body").html("<img src='"+t+"' class='modal-img'>");
	  $("#myModal").modal();
	});

	$("video").click(function(){
	  var v = $("video > source");
	  var t = v.attr("src");
	  $(".modal-body").html("<video class='model-vid' controls><source src='"+t+"' type='video/mp4'></source></video>");
	  $("#myModal").mosssdal();  
	});
	});//EOF Document.ready
	
$('#notic-btn').click(function(){
	location.href = 'notice.html'
})
$('#book-btn').click(function(){
	location.href = 'create.html'
})
$(document.body).on('click', '.detail-link', function(event) {
  location.href = 'create.html?no=' + $(this).attr('data-no') 
  event.preventDefault()
})

