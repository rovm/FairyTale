var naver_id_login = new naver_id_login("QlviNYhWZzZOo_bIq3IR", "http://192.168.0.18/p-desktop/main.html");
  // 접근 토큰 값 출력
  // 네이버 사용자 프로필 조회
  naver_id_login.get_naver_userprofile("naverSignInCallback()");
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
    	  console.log(result);
	      $.post('login2.json', {
	          'email': naver_id_login.getProfileData('email'),
	          'password': naver_id_login.getProfileData('email')
	        }, function(result) {
	          if(result.status=="success")
	          {
	            console.log(naver_id_login.getProfileData('email'));
	            location.href = 'main.html'
	           /*  $('.login-link').css('display', 'none');
	            $('.logout-link').css('display', 'block'); */
	          // e.preventDefault();
	        } else {
	          console.log(result.data)
	        }
	        }, 'json')

        // e.preventDefault();
      } else {
        console.log(result.data)
      }
    }, 'json')
  }
