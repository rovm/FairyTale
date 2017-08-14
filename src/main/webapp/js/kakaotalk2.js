//
//Kakao.init('eaeddfa1ade8ed3a16075bd54bb6f4b6');
//    function loginWithKakao() {
//      Kakao.Auth.login({
//        success: function(authObj) {
//        	kakao.API.request({
//        		url: 'main.html',
//        		success: function(res){
//        			console.log(JSON.stringify(res));
//					console.log(res.id)
//        		},
//					fail: function(error) {
//						console.log(JSON.stringify(error));
//					}
//        	});
//        },
//        fail: function (err) {
//        	alert(JSON.stringify(err));
//        }
//        }); 
//    };
      
      
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
        		  $.post('add2.json', {
        			  'name' : res.properties.nickname,
        			  'email': res.kaccount_email,
        			  'password': res.kaccount_email,
        			  'tel': res.kaccount_email
        			  
        		  }, function(result) {
        			  if(result.status=="success")
        			  {console.log(result);
        			  location.href = 'main.html'
        				  // e.preventDefault();
        			  } else {
        				  console.log(result.data)
        			  }
        		  }, 'json')
        	  }
          })
        },
        fail: function(err) {
          alert(JSON.stringify(err));
        }
      });
      
    };