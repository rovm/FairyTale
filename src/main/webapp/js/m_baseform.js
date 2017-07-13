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

function headerBtn() {
	menu_reset()
    var menu_btn= document.getElementById('menubar');
    if (menu_btn.style.display == 'none') {
    	menu_btn.style.display = 'block';
    } else {
    	menu_btn.style.display = 'none';
    }
}

function communityBtn() {
    var com_btn= document.getElementById('communityBtn');
    var service_btn= document.getElementById('serviceBtn');
    if (com_btn.style.display == 'none') {
    	service_btn.style.display = 'none';
        com_btn.style.display = 'block';
    } else {
        com_btn.style.display = 'none';
    }
}

function serviceBtn() {
	var com_btn= document.getElementById('communityBtn');
    var service_btn= document.getElementById('serviceBtn');
    if (service_btn.style.display == 'none') {
    	com_btn.style.display = 'none';
    	service_btn.style.display = 'block';
    } else {
    	service_btn.style.display = 'none';
    }
}

function menu_reset(){
  var com_btn= document.getElementById('communityBtn');
  var service_btn= document.getElementById('serviceBtn');
  service_btn.style.display = 'none';
  com_btn.style.display = 'none';
}