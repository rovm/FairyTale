
Kakao.init('eaeddfa1ade8ed3a16075bd54bb6f4b6');
    function loginWithKakao() {
      Kakao.Auth.login({
        success: function(authObj) {
        	console.log(authObj)
        	kakao.API.request({
        		url: 'main.html'
        		success: function(res){
        			console.log(JSON.stringify(res));
					console.log(res.id)
					
						$.post('login2.json', {
							'id' : res.id,
							'password' : res.id
						}, function(result) {
							console.log(res.id)
							console.log('로그인result:')
							console.log(result)
							
							if (result.data == 'ok') {
							    location.href = 'main.html'
							   } else {
				                $.post('//add.json', {'id': res.id, 'password': res.id, 'loginType': 'kakaoTalk'}, function(){console.log("okok")/*})*/
				                $.post('/auth/login.json', {
				                	'id': res.id,
								    'password': res.id
				                  }, function(result) {
				                    console.log('result가 fail일 때의 로그인result:')
				                    console.log(result)
				                    if (result.data == 'ok') {
				                    location.href = 'web/movieperson/mypage.html'
				                   } else {
				                	   console.log(result)
				                	   alert('kakaotalk 로그인 아니됩니다!')
				                   }
				                  }, 'json') })//add.json
							   }
							  }, 'json')  //login.json 
						
					},
					fail: function(error) {
						console.log(JSON.stringify(error));
					}
				});
