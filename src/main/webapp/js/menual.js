var MenuTitl = $("#menual-title");

$("#Site_Intro").on("click", function() {
	$("#Photo_Menual").text('');
	MenuTitl.text("사이트소개");
	$("<img class='Menual_img' src='../img/사이트소개사진.png'>").appendTo( $( "#Photo_Menual" ) );
})

$("#Story_Making_Way").on("click", function() {
	$("#Photo_Menual").text('');
	MenuTitl.text("제작방법");
	$("<img class='Menual_img' src='../img/메뉴얼1.png'>").appendTo( $( "#Photo_Menual" ) );
	$("<img class='Menual_img' src='../img/메뉴얼2.png'>").appendTo( $( "#Photo_Menual" ) );
	$("<img class='Menual_img' src='../img/메뉴얼3.png'>").appendTo( $( "#Photo_Menual" ) );
})

$("#Work_Appreciation").on("click", function() {
	$("#Photo_Menual").text('');
	MenuTitl.text("작품감상");
	$("<img class='Menual_img' src='../img/작품감상.png'>").appendTo( $( "#Photo_Menual" ) );
})