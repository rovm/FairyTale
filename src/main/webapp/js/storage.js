var jsNo;

var gallery = (function(){
	  'use strict';
	  return {
	    // this.js(obj)
	    js: function(e){
	    	no = e;
	    	return $("[data-js="+e+"]");},
	    // this.lk(obj)
	    lk: function(e){
	    	no = e;
	    	return $("[data-lk="+e+"]");},
	    // Ready functions
	    ready_: function(){this.events();},
	    //  functions
	    events:function(){
	      var self = this;
	      var close = $('.gallery_item_full');
	      // Get all data js and add clickOn function
	      $('.gallery_item_preview a[data-js]').click(function() {
	        jsNo = $(this).attr("data-js")
	        self.fx_in($('div[data-lk=' + jsNo + ']')); 
	        self.fx_in($('.box'));
	      });
	      
	      // close on click
	      $('.gallery_item_full').on("click",function(){
	        self.fx_out($('.gallery_item_full'));
	        self.fx_out($('.box'));
	      });
	  
	    },
 
	    // out function
	    fx_out: function(el){
	      el.addClass('efOut')
	      .delay(500)
	      .fadeOut('fast')
	      .removeClass('efIn');
	      $('body').css({overflow:'auto'});
	      return false;
	    }, 
	    // in function
	    fx_in: function(el){
	      el.removeClass('efOut')
	      .show()
	      .addClass('efIn');
	      $('body').css({overflow:'hidden'});
	      return false;
	    }
	  };
	})();
// ready function of gallery
gallery.ready_();