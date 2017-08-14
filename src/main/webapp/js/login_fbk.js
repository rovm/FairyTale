function checkLoginState(){
	FB.getLoginStatus(function(response) {
		console.log("하하하하")
		console.log(response)
	})
}



window.fbAsyncInit = function() {
                FB.init({
                  appId      : '826146367542206',
                  xfbml      : true,
                  version    : 'v2.9'
                });
                FB.AppEvents.logPageView();
              };

              (function(d, s, id){
                 var js, fjs = d.getElementsByTagName(s)[0];
                 if (d.getElementById(id)) {return;}
                 js = d.createElement(s); js.id = id;
                 js.src = "//connect.facebook.net/ko_KR/sdk.js";
                 fjs.parentNode.insertBefore(js, fjs);
               }(document, 'script', 'facebook-jssdk'));

               function facebooklogin() {
            	   	console.log("dddddddddddddd")
  //페이스북 로그인 버튼을 눌렀을 때의 루틴.
                     FB.login(function(response) {
                    	 console.log("dddddddddddddd")
                    	 window.close();
                       //var fbname;
                       //var accessToken = response.authResponse.accessToken;
//                       FB.api('/me?fields=id,name,email', function(response) {
//                    	   
//                    	   console.log("dddddddddddddd")
//                         fbname = user.name;
//                         console.log(response);
//                         $.post("login2.json", { 
//                        	 console.log("dddddddddddddd")
//                        	 "email":response.email, 
//                        	 "password": response.email
//                         }, function (result) {
//                        	 
//                        	 
//                        	 if(result.status=="success"){
//                        		 location.href = 'main.html'
//                        	 }
//                          else{
//                            location.replace('/');
//                           }
//                         });
//                       });
                     }, {scope: "user_about_me,publish_stream,read_friendlists,offline_access,email,user_birthday"});
                   }

                      function getMyProfile(){
                       FB.api('/me',function(user){

                       var myName= user.name ;
                       var myEmail = user.email;
                       var myId = user.id;

                       if(myEmail != ""){
                         //정보를 post로 보내고 submit처리
                       }

                        });
                       FB.api('/me/picture?type=large',function(data){
                       var myImg = data.data.url;
                       });
                      }
