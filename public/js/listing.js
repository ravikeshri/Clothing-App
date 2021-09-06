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
