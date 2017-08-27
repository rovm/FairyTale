var loginData,
	href;


$.getJSON('userinfo.json', function(result) {
	loginData = result.data
	console.log("loginData!!!!!!!!!!!!!",loginData);
})


function authCheck(href) {
	if(loginData == undefined) {
		swal({
			title: "로그인이 필요합니다",
			text: "서비스를 이용하시려면 로그인이 필요합니다.",
			confirmButtonText: "확인",
			confirmButtonColor: "#6384E1",
			html: true
		}, function(isConfirm){
			console.log("isConfirm!!!!!1",isConfirm)
			if(isConfirm == true){
				location.href = "login.html"
			}
		})
	} else {
		location.href = href
	}
}


$("#storeage").on("click", function() {
	href = $("#storeage a").attr("href");
	authCheck(href)
	return false;
})
$("#myWright").on("click", function() {
	href = $("#myWright a").attr("href");
	authCheck(href)
	return false;
})
$("#camera").on("click", function() {
	href = $("#camera a").attr("href");
	authCheck(href)
	return false;
})
$("#Header_storeage").on("click", function() {
	href = $(this).attr("href");
	authCheck(href)
	return false;
})
$("#Header_myWright").on("click", function() {
	href = $(this).attr("href");
	authCheck(href)
	return false;
})
$("#Header_camera").on("click", function() {
	href = $(this).attr("href");
	authCheck(href)
	return false;
})
