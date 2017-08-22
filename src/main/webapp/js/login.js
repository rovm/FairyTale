$(document).ready(function() {
	Kakao.init('eaeddfa1ade8ed3a16075bd54bb6f4b6');
 
})
 
$(window).on("load", function() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
})
 
 
 
function facebooklogin() {
	FB.login(function(response) {
		FB.api('/me?fields=id,name,email', function (response) {
			console.log(response);
			console.log(response.email)
			$.post('login2.json', {
				'email': response.email,
				'password': response.email
			},function(result) {
				console.log('login2')
				if(result.status=="success")
					location.href = 'main.html'
 
						else{
							$.post('add2.json', {
								'name' : response.name,
								'email': response.email,
								'password': response.email,
								'tel': response.email,
								'posi': 'facebook'
 
							}, function(result) {
								console.log('login2')
								$.post('login2.json', {
									'email'   : response.email,
									'password': response.email
								})
								if(result.status=="success")
									location.href = 'main.html'
 
							}, 'json') // add.json
						}
 
			}, 'json');
		}, {scope: 'public_profile,email'});
	})
}
 
 
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
 
function enter(){
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
}
var posi;
$.getJSON('userinfo.json', function (result) {
	console.log(result)
	if(result.data.no != null){
		$('.login-link').css('display', 'none');
		$('.logout-link').css('display', 'block');
		$('.sign-link').css('display', 'none');
		posi = result.data.posi;
	}
})
$('.logout-link').on('click', function() {
	$.getJSON('logout.json', function (result) {
		if (result.status != 'fail') {
			console.log(result)
			console.log(posi)
			$('.login-link').css('display', 'block');
			$('.logout-link').css('display', 'none');
			$('.sign-link').css('display', 'block');
			if(posi == 'kakao')
				logoutWithKakao()
			else if(posi == 'facebook'){
				fbLogout()
			}
			
		}
 
	})
})
 
 
function fbLogout(){
 FB.getLoginStatus(function(ret) {
    if(ret.authResponse) {
        FB.logout(function(response) {
        });
    }
});
 } 
 
 
 
 
 
////<![CDATA[
//function kakaoLogin() {
////사용할 앱의 JavaScript 키를 설정해 주세요.
//Kakao.init('eaeddfa1ade8ed3a16075bd54bb6f4b6');
////카카오 로그인 버튼을 생성합니다.
//Kakao.Auth.createLoginButton({
//container: '#kakao-login-btn',
//success: function(authObj) {
//alert(JSON.stringify(authObj));
//},
//fail: function(err) {
//alert(JSON.stringify(err));
//}
//});
//}
//]]>
////////////////////////////////카카오//////////////////////////////////////
 
function logoutWithKakao(){
	Kakao.Auth.logout();
	alert('카카오 로그아웃 완료!');
	deleteCookie( "kakao_login" );
}
 
///////////////////////////////페이스북//////////////////////////////////
//function loguotWithfacebook(){
 
//}
 
 
 
 
 
 
window.fbAsyncInit = function() {
	  FB.init({
	    appId : '650173568510994',
	    cookie : true,
	    xfbml : true,
	    version : 'v2.10'
	  });
	  FB.AppEvents.logPageView();
	};
 
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id))
	    return;
	  js = d.createElement(s);
	  js.id = id;
	  js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.10&appId=784647978380545";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
 
	
	
////////////////////////////////////////naver/////////////////////////////////////////////////
	
	
	  // 접근 토큰 값 출력
	//  alert(naver_id_login.oauthParams.access_token);
	  // 네이버 사용자 프로필 조회
	  // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
 
	  function naverSignInCallback() {
	   
	    /* window.close(); */
	    $.post('add2.json', {
	      'name' : naver_id_login.getProfileData('name'),
	      'email': naver_id_login.getProfileData('email'),
	      'password': naver_id_login.getProfileData('email'),
	      'tel': naver_id_login.getProfileData('email'),
	      'posi': 'naver'
	    }, function(result) {
	      if(result.status=="success") {
		      $.post('login2.json', {
		          'email': naver_id_login.getProfileData('email'),
		          'password': naver_id_login.getProfileData('email')
		        }, function(result) {
		          if(result.status=="success")
		          {
		            location.href = 'main.html'
		           /*  $('.login-link').css('display', 'none');
		            $('.logout-link').css('display', 'block'); */
		          // e.preventDefault();
		        } else {
		        }
		        }, 'json')
 
	        // e.preventDefault();
	      } else {
	      }
	    }, 'json')
	  }
	  
 
	  
	  function onKeyDown()
	  {
	       if(event.keyCode == 13)
	       {
	         enter()
	       }
	  }