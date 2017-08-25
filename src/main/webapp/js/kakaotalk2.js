    function loginWithKakao() {
      // 로그인 창을 띄웁니다.

      Kakao.Auth.login({
        success: function(authObj) {
          Kakao.API.request({
        	  url:'/v1/user/me',
        	  success: function(res) {
        		  $.post('login2.json', {
        			  'email': res.kaccount_email,
        			  'password': res.kaccount_email
        		  },function(result) {
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
