$(document).ready(function() {

var menu = "close";
$(".mobile-one .menu-toggle, .mobile-three .menu-toggle").click(function() {
    
    if (menu === "close") {
      	$(this).parent().next(".mobile-nav").css("transform", "translate(0, 0)");
     	 menu = "open";
    } else {
      	$(this).parent().next(".mobile-nav").css("transform", "translate(-100%, 0)");
      	menu = "close";
    }
});

});

function communityBtn() {
    var com_btn= document.getElementById('community-btn');
    if (com_btn.style.display == 'none') {
        com_btn.style.display = 'block';
    } else {
        com_btn.style.display = 'none';
    }
}

function serviceBtn() {
    var com_btn= document.getElementById('service-center-btn');
    if (com_btn.style.display == 'none') {
        com_btn.style.display = 'block';
    } else {
        com_btn.style.display = 'none';
    }
}