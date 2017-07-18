/*******************slider*********************/
$(document).ready(function(){

var first = true;

		$('.nextbtn').on("click", function(){
			console.log("next")
			if( first == true) {
				$('#fst').attr("id","four")
				$('#sec').attr("id","fst")
				$('#thr').attr("id","sec")
				first=false
			} else {
				$('#fst').attr("id","thr")
				$('#sec').attr("id","fst")
				$('#four').attr("id","sec")
				first=true
			}
		})



		$('.prevbtn').on("click", function(){
			console.log('prev');
			if(first==true) {
				$('#fst').attr('id', 'four')
				$('#sec').attr('id', 'fst')
				$('#thr').attr('id', 'sec')
				first=false
			} else {
				$('#fst').attr('id', 'thr')
				$('#sec').attr('id', 'fst')
				$('#four').attr('id', 'sec')
				first=true
			}
		})

})
