$(document).ready(a);
var curPhoto = 1;

function a() {

  /*              SETTINGS               */
  /*              SETTINGS               */
  /*              SETTINGS               */

  var animTime = 300; //animation time (also needs to be set in css)

  /*              /SETTINGS               */
  /*              /SETTINGS               */
  /*              /SETTINGS               */
  var delX;
  var delY;
  var phWid = parseInt($(".photo").css("width"));
  var topCard = "div[ph-index='0']";
  var numOfPhotos = $(".photo").length;

  var shift;
  var k = parseInt($("html").css("font-size")) / 16;

  for (i = 0; i <= (numOfPhotos - 1); i++) {
    loadBackground(".photo-" + i);
  }

  changeCounter();
  rearrangeStack();

  //takes care of photo counter
  function changeCounter(nope) {
    if (!nope) {
      $(".photo-counter").html(curPhoto + "/" + numOfPhotos);
      if (curPhoto != numOfPhotos)
        curPhoto++;
      else
        curPhoto = 1;
    }
    console.log("ch1:" + curPhoto);
    //  else
    //    $(".photo-counter").html((curPhoto - 1) + "/" + numOfPhotos);
  }


  function changeCounter2(nope) {
    if (!nope) {
      $(".photo-counter").html(curPhoto + "/" + numOfPhotos);
      if (curPhoto == 1)
      curPhoto = 1;
      else
      curPhoto--;
    }
    console.log("ch2:" + curPhoto);
    // else
    //   $(".photo-counter").html((curPhoto - 1) + "/" + numOfPhotos);
  }



  //adds and removes transition
  function handleAnimation() {
    $(".photo").addClass("animation");
    setTimeout(function() {
      $(".photo").removeClass("animation");
    }, animTime);
  }

  //animates position changes of photos in the stack
  function rearrangeStack() {
    // handleAnimation();

    //this timeput takes care of z-indexes after animating opacity and puts the shifted card back
    setTimeout(function() {

      //taking care of z-indexes
      for (i = 0; i < numOfPhotos; i++)
        $("div[ph-index=" + i + "]").css({
          "z-index": numOfPhotos - i - 1
        });

      //puts shifted card back in the stack with opacity 0
      if (numOfPhotos != 1)
        $("div[ph-index=" + (numOfPhotos - 1) + "]").css(
          "transform", "translate3d(0, " + 0.1 * (numOfPhotos - 1) + "rem, 0)"
        );

    }, animTime);

    //shifts picked card after mouseup event and removes info
    if (numOfPhotos != 1)
      $("div[ph-index=" + (numOfPhotos - 1) + "]").css({
        "opacity": 0,
        "transform": "translate3d" + shift
      }).children().removeClass("ph-info-active");
    else
      $("div[ph-index='0']").css("transform", "none");

    //makes info appear
    $("div[ph-index='0']").children().addClass("ph-info-active");

    //changing backgrounds
    $(".bg-pic").removeClass("bg-active");
    var n = $("div[ph-index='0']").attr("number");
    $(".bg-pic-" + n).addClass("bg-active");

    //the rearrangement itself
    for (i = 0; i < numOfPhotos - 1; i++) {
      if (i >= 5) var op = 0;
      else var op = 1;
      $("div[ph-index=" + i + "]").css({
        //"transform": "translate3d(0, " + 0.65 * i + "rem, 0)",
        "opacity": op
      });
    }
  }

  //recalculates ph-indexes of photos
  function reindexate() {
    for (i = 0; i < numOfPhotos; i++)
      $("div[ph-index=" + i + "]").attr("ph-index", i - 1);
    $("div[ph-index='-1']").attr("ph-index", numOfPhotos - 1);
    changeCounter();
  }

  function reindexate2() {
    for (i = numOfPhotos-1; i >= 0; i--)
      $("div[ph-index=" + i + "]").attr("ph-index", i + 1);
      $("div[ph-index="+ numOfPhotos +"]").attr("ph-index", 0);
    changeCounter2();
    $("div[ph-index='1']").removeAttr( 'style' );
  }

  //loads images for transparent backgrounds
  function loadBackground(selector) {
    var url = $(selector).css("background-image");
    var bgIndex = $(selector).attr("ph-index");
    $(".phone-screen").append("<div class='bg-pic bg-pic-" + $(selector).attr("number") + "'></div>");
    $(".bg-pic").last().css("background-image", url);
  }

  //main function that takes care of the interaction with cursor
  $(".photo-container").on("mousedown touchstart", function(event) {
    if (!event.pageX) event.preventDefault();
    var stX = event.pageX || event.originalEvent.touches[0].pageX;
    var stY = event.pageY || event.originalEvent.touches[0].pageY;
    $(".phone-screen").on("mousemove touchmove", function(event) {
      delX = (event.pageX || event.originalEvent.touches[0].pageX) - stX;
      delY = (event.pageY || event.originalEvent.touches[0].pageY) - stY;
      var rotY = delX / phWid;
      var rotX = delY / phWid;
      $(topCard).css("transform", "rotateY(" + rotY * 25 + "deg)" + " rotateX(" + rotX * (-25) + "deg)" + " translate3d(" + delX / 5 * k + "px, " + delY / 5 * k + "px, 0)");
    });
  });

  $(".phone-screen").on("mouseleave", function() {
    $(document).trigger("mouseup");
    delX = 0;
    delY = 0;
  });

  $(document).on("mouseup touchend", function() {
    $(".phone-screen").off("mousemove touchmove");
    if (delX > delY && delX > phWid / 2) {
      shift = "(" + phWid * 1.5 + "px, 0, 0)";
      console.log("1:" + delX, delY);
      reindexate();
    } else if (delX < delY && delY > phWid / 2) {
      shift = "(0, " + phWid * 1.5 + "px, 0)";
      console.log("2:" + delX, delY);
      reindexate();

    } else if (Math.abs(delX) > Math.abs(delY) && delX < -phWid / 2) {
      shift = "(" + (-phWid * 1.5) + "px, 0, 0)";
      console.log("3:" + delX, delY);

      reindexate2();
    } else if (Math.abs(delX) < Math.abs(delY) && delY < -phWid / 2) {
      shift = "(0, " + (-phWid * 1.5) + "px, 0)";
      console.log("4:" + delX, delY);

      reindexate();
    }
    delX = 0;
    delY = 0;
    rearrangeStack();
  });
}
