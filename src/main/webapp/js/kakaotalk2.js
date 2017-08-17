    function loginWithKakao() {
    	Kakao.init('eaeddfa1ade8ed3a16075bd54bb6f4b6');
      // 로그인 창을 띄웁니다.
      Kakao.Auth.login({
        success: function(authObj) {
          console.log(JSON.stringify(authObj));
          Kakao.API.request({
        	  url:'/v1/user/me',
        	  success: function(res) {
        		  console.log(res.id)
        		  console.log(res.kaccount_email)
        		  console.log(res.properties.nickname)
        		  $.post('login2.json', {
        			  'email': res.kaccount_email,
        			  'password': res.kaccount_email
        		  },function(result) {
        			  console.log('login2')
        			if(result.data == 'ok')
        				location.href = 'main.html'
        				
        			else{
                      $.post('add2.json', {
        			  'name' : res.properties.nickname,
        			  'email': res.kaccount_email,
        			  'password': res.kaccount_email,
        			  'tel': res.kaccount_email,
        			  'posi':'kakao'
        		  }, function(result) {
                      console.log('login2')
                      $.post('login2.json', {
                    	'email'   : res.kaccount_email,
                    	'password': res.kaccount_email
                      })
                      if(result.data == 'ok')
                        location.href = 'main.html'

                    }, 'json') // add.json
                  }

              }, 'json'); // login.json

            },
            fail: function(err) {
              alert(JSON.stringify(err));
            }
          })
        }
      })
    }


    $('#Header_logout').on("click", function(){
    function logoutWithKakao(){
    Kakao.Auth.logout();
	alert('카카오 로그아웃 완료!');
	deleteCookie( "kakao_login" );
	createLoginKakao();
    }
    });