

$('#login-btn').on('click',function(e) {
    $.post('login2.json', {
      'email': $('#login-email').val(),
      'password': $('#login-password').val()
    }, function(result) {
      if(result.status=="success")
      {
        // console.log();
        location.href = 'main.html'
        $('.login-link').css('display', 'none');
        $('.logout-link').css('display', 'block');

      // e.preventDefault();
    } else {
      console.log(result.data)
    }
    }, 'json')
    // e.preventDefault();
  })
  
var posi;
  $.getJSON('userinfo.json', function (result) {
    if(result.data.no != null){
      $('.login-link').css('display', 'none');
      $('.logout-link').css('display', 'block');
      $('.sign-link').css('display', 'none');
      posi = result.data.posi;
    }
  })
  $('.logout-link').on('click', function() {
    $.getJSON('logout.json', function (result) {
      $('.login-link').css('display', 'block');
      $('.logout-link').css('display', 'none');
      $('.sign-link').css('display', 'block');
      if(posi == 'kakao')
    	  logoutWithKakao()
    })
  })
  
  
  
  
//   //<![CDATA[
//  function kakaoLogin() {
//        // 사용할 앱의 JavaScript 키를 설정해 주세요.
//        Kakao.init('eaeddfa1ade8ed3a16075bd54bb6f4b6');
//        // 카카오 로그인 버튼을 생성합니다.
//        Kakao.Auth.createLoginButton({
//          container: '#kakao-login-btn',
//          success: function(authObj) {
//            alert(JSON.stringify(authObj));
//          },
//          fail: function(err) {
//             alert(JSON.stringify(err));
//          }
//        });
//}
      //]]>
////////////////////////////////카카오//////////////////////////////////////
    
function logoutWithKakao(){
	  Kakao.init('eaeddfa1ade8ed3a16075bd54bb6f4b6');
	            Kakao.Auth.logout();
	        	alert('카카오 로그아웃 완료!');
	        	deleteCookie( "kakao_login" );
	        	createLoginKakao();
	            }
  
    
    
