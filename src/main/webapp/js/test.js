$.getJSON("../js/list.json", function (data) {
  console.log(data);
})

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

  //페이스북 로그인 버튼을 눌렀을 때의 루틴.
                     FB.login(function(response) {
                       var fbname;
                       var accessToken = response.authResponse.accessToken;
                       FB.api('/me', function(user) {
                         fbname = user.name;
                         $.post("콜백url", { "userid": user.id, "email":user.email, "username": fbname, "fbaccesstoken":accessToken},
                         function (responsephp) {
                           if(responsephp=="N"){
                            location.replace('/unmember/memberrege?flag=1');
                           }else{
                            location.replace('/');
                           }
                         });
                       });
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
