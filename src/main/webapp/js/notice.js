$(document).ready(function(){
  $("#keyword").keyup(function(){
      var k = $(this).val();
      $(".n-middle > div").hide();
      var temp = $(".n-middle > div > span > a:nth-child(n+1):contains('" + k + "')");

      temp.parent().parent().show();
  })
})
