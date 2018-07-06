var test = $("search").val();
$('div:not(:contains("'+test+'"))').hide();

//同高度
var $rows = $('.same-height-columns');
$rows.each(function () {
  $(this).find('.column').height($(this).height());
});

// 回到顶部
$('a.top').click(function (e) {
  e.preventDefault();
  $(document.body).animate({scrollTop: 0}, 800);
});