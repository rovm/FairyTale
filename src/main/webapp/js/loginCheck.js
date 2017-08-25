var mno;


$.getJSON('userinfo.json', function(result) {
	mno = result.data.no;
	console.log("mno"+mno)
})


function authCheck() {
  if(mno == null) {
    swal(
     '로그인이 필요합니다',
     '',
     'error'
   )}
}


$("#storeage").on("click", function() {
  authCheck()
})
$("#myWright").on("click", function() {
  authCheck()
})
$("#camera").on("click", function() {
  authCheck()
})
