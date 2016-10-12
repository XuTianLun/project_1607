
$(function(){
	
	var $list_good = $('.list_good');
	var i = 0;
	$.ajaxSetup({
		type:"get",
		url:"/project/src/json/goodlist.json",
		dataType:'json',
		async:true,
		success : function(res){
			console.log(res);
			$.each(res, function(idx,item){
				if(i == 0){
				if(item.page == 1){
					 var $div = $('<div/>').addClass('list_div');
					 var $a = $('<a/>').appendTo($div);
		   			$('<img/>').attr('src',item.imgurl).addClass('pic').appendTo($a);
		   			$a.click(function(){
		   				open("http://localhost:3000/project/src/html/Detail.html");
		   			})
		   			$('<p/>').html(item.brand).addClass('list_p').appendTo($div);
		   			$('<h3/>').html(item.theme).addClass('list_h3').appendTo($div);
		   			$('<p/>').addClass('price').html( '<span>&yen;' + item.price + '</span>').appendTo($div);
		   			$('<p/>').html('<del>&yen;'+item.price_off + '</del>').css({"color":"#ccc","font-size":"12px","margin-top":"10px","text-align":"center"}).appendTo($div);
		   			$div.appendTo($list_good);
				}
				}
				if(i == 1){
				if(item.page == 2){
					 var $div = $('<div/>').addClass('list_div');
					 var $a = $('<a/>').appendTo($div);
		   			$('<img/>').attr('src',item.imgurl).addClass('pic').appendTo($a);
		   			$a.click(function(){
		   				open("http://localhost:3000/project/src/html/Detail.html");
		   			})
		   			$('<p/>').html(item.brand).addClass('list_p').appendTo($div);
		   			$('<h3/>').html(item.theme).addClass('list_h3').appendTo($div);
		   			$('<p/>').addClass('price').html( '<span>&yen;' + item.price + '</span>').appendTo($div);
		   			$('<p/>').html('<del>&yen;'+item.price_off + '</del>').css({"color":"#ccc","font-size":"12px","margin-top":"10px","text-align":"center"}).appendTo($div);
		   			$div.appendTo($list_good);
				}
				}
				if(i == 2){
				if(item.page == 3){
					 var $div = $('<div/>').addClass('list_div');
					  var $a = $('<a/>').appendTo($div);
		   			$('<img/>').attr('src',item.imgurl).addClass('pic').appendTo($a);
		   			$a.click(function(){
		   				open("http://localhost:3000/project/src/html/Detail.html");
		   			})
		   			$('<p/>').html(item.brand).addClass('list_p').appendTo($div);
		   			$('<h3/>').html(item.theme).addClass('list_h3').appendTo($div);
		   			$('<p/>').addClass('price').html( '<span>&yen;' + item.price + '</span>').appendTo($div);
		   			$('<p/>').html('<del>&yen;'+item.price_off + '</del>').css({"color":"#ccc","font-size":"12px","margin-top":"10px","text-align":"center"}).appendTo($div);
		   			$div.appendTo($list_good);
				}
				}
				if(i == 3){
				if(item.page == 4){
					 var $div = $('<div/>').addClass('list_div');
					  var $a = $('<a/>').appendTo($div);
		   			$('<img/>').attr('src',item.imgurl).addClass('pic').appendTo($a);
		   			$a.click(function(){
		   				open("http://localhost:3000/project/src/html/Detail.html");
		   			})
		   			$('<p/>').html(item.brand).addClass('list_p').appendTo($div);
		   			$('<h3/>').html(item.theme).addClass('list_h3').appendTo($div);
		   			$('<p/>').addClass('price').html( '<span>&yen;' + item.price + '</span>').appendTo($div);
		   			$('<p/>').html('<del>&yen;'+item.price_off + '</del>').css({"color":"#ccc","font-size":"12px","margin-top":"10px","text-align":"center"}).appendTo($div);
		   			$div.appendTo($list_good);
				}
				}
				
			});
		}
	});
	$.ajax();
	$(window).on('scroll',function(){
				// 获取滚动条滚动过的距离
				var scrollTop = $(window).scrollTop();
				// 当差不多滚动到底部是加载更多内容
				if(scrollTop >= $(document).height() - $(window).height() - 500  && i < 4){
					i++;
					console.log(i);
					$.ajax();
				}
	});
	
	
	$('.list_li').on('click','li',function(){
		$(this).find('a').addClass("first_a").parent().siblings().find('a').removeClass("first_a");
		i = $(this).index();
		$list_good.empty();
		
		$.ajax();
	})
                   
})