$(".category-list div").click(function(){
  let clicked_element = $(this);
  let category_list = $(".category-list div");
  for(let i = 0; i<category_list.length; i++)
  {
    category_list.eq(i).removeClass("active");
    category_list.eq(i).find(".cat-icon").removeClass("active");
  }
  clicked_element.eq(0).addClass("active");
  clicked_element.eq(0).find(".cat-icon").addClass("active");
});

function categoryFind()
{
  let x = window.location.href.split('/');
  let category = x[x.length - 1];
  if(category == "tshirts")
  {
    $('.category-list > div').eq(0).addClass('active');
    $('.category-list > div').eq(0).children().eq(0).addClass('active');
  }
  if(category == "shirts")
  {
    $('.category-list > div').eq(1).addClass('active');
    $('.category-list > div').eq(1).children().eq(0).addClass('active');
  }
  if(category == "bottoms")
  {
    $('.category-list > div').eq(2).addClass('active');
    $('.category-list > div').eq(2).children().eq(0).addClass('active');
  }
  if(category == "outerwears")
  {
    $('.category-list > div').eq(3).addClass('active');
    $('.category-list > div').eq(3).children().eq(0).addClass('active');
  }
  if(category == "knitwears")
  {
    $('.category-list > div').eq(4).addClass('active');
    $('.category-list > div').eq(4).children().eq(0).addClass('active');
  }
  if(category == "accessories")
  {
    $('.category-list > div').eq(5).addClass('active');
    $('.category-list > div').eq(5).children().eq(0).addClass('active');
  }
}
