//load
jQuery(function($){
				//加载头部
				$('#_head').load('head.html');
			 //加载页脚部
				$('#_footer').load('footer.html');
				$('#_pos').load('pos.html');
			});
jQuery(function($){
				$.ajax({
					type:"get",
					url:"/data/detail.json",
					async:true,
					dataType:"json",
					success : function(res){
						console.log(res);
						var $goodsright = $('.goods-right');
						var $smallpic = $('.smallpic');
						var $goodsleft = $('.goods-left');
						var $ul = $('<ul/>');
						var $ul1 = $('<ul/>');
						$.each(res, function(idx,item) {
							$goodsleft.find('.fdj').find('img').attr("src",item.bigimgurl);//设置大图片的路径
							//小图片的路径
							if(item.smallimgurl){
								var $li = $('<li/>');
								$('<img/>').attr('src',item.smallimgurl).appendTo($li);
								$li.appendTo($ul);
							}
							//右边商品简介
							if(item.id){
							var $li1 = $('<li/>').css({"padding-bottom":"10px","border-bottom":"1px dashed #ccc"});
							 $('<p/>').html(item.brand).css({"color":"#666","font-size":"16px","margin-top":"10px"}).appendTo($li1);
							 $('<p/>').html(item.theme).css({"color":"#000","font-size":"16px","margin-top":"10px"}).appendTo($li1);
							 $('<p/>').html("货号:"+item.id).css({"color":"#666","font-size":"12px","margin-top":"10px"}).appendTo($li1);
							 
							 var $li2 = $('<li/>').css({"padding-bottom":"10px","position":"relative","border-bottom":"1px dashed #ccc"});
							 var price = (item.price-item.price*item.off).toFixed(2);
                             var $p = $('<p/>').addClass('price').html( '<span>&yen;' + price + '</span>').appendTo($li2);
                             $('<span/>').addClass('huiyuan').html("红卡会员价").appendTo($p);
                             $('<p/>').html('<del>专柜价:&yen;'+(item.price-0).toFixed(2) + '</del>').css({"color":"#ccc","font-size":"20px","margin-top":"10px"}).appendTo($li2);
                             $('<span/>').addClass('man').appendTo($li2);
                             
                             var $li3 = $('<li/>').css({"padding-bottom":"10px","position":"relative","border-bottom":"1px dashed #ccc"});
                             var $p1 = $('<p/>').html('<span>色系<span/>').appendTo($li3).css({"margin-top":"10px","padding-bottom":"20px"});
                             $('<span/>').html(item.color).addClass('color').appendTo($p1);
                             var $div =$('<div/>').html('<span>数量<span/>').appendTo($li3);
                             $('<input/>').attr({'type':'button','value':'-'}).addClass('jian').appendTo($div);
                             $('<input/>').attr({'type':'text'}).val("1").addClass('txt1').appendTo($div);
                             $('<input/>').attr({'type':'button','value':'+'}).addClass('jia').appendTo($div);
                             
                             var $li4 = $('<li/>').css({"padding-bottom":"10px","position":"relative"});
                              $('<p/>').html('发货门店：此货品将由第五大道奢侈品官网为您发货').css({"color":"#999","font-size":"14px","margin-top":"20px"}).appendTo($li4);
                              $('<p/>').html('发货时效：预计15个工作日发货，延迟发货慢必赔').css({"color":"#999","font-size":"14px","margin-top":"15px"}).appendTo($li4);
                              $('<p/>').html('温馨提示：本商品不支持货到付款，有质量问题7天退换货').css({"color":"#999","font-size":"14px","margin-top":"15px"}).appendTo($li4);
                              $('<p/>').html('包邮政策：白金砖石顺丰包邮，注册用户用满99元免邮').css({"color":"#999","font-size":"14px","margin-top":"15px"}).appendTo($li4);
                              $('<input/>').attr({'type':'button','value':'立即购买'}).addClass('mai').appendTo($li4);
                              $('<input/>').attr({'type':'button','value':'加入购物袋'}).addClass('addgood').appendTo($li4);
							 $li1.appendTo($ul1);
							 $li2.appendTo($ul1);
							 $li3.appendTo($ul1);
							 $li4.appendTo($ul1);
							}
						});
						$ul.appendTo($smallpic);
						$ul1.appendTo($goodsright);
						
						//小图列表的点击事件
						$smallpic.on('click','li',function(){                         
							$goodsleft.find('.fdj').remove();//移除放大镜的DIV
							var $fdj = $('<div/>').addClass('fdj');//重新添加放大镜的div
							$('<img/>').attr({'id':'bigimg','src':$(this).find('img').attr('src')}).appendTo($fdj);
							$fdj.prependTo($goodsleft);
							$(this).find('img').css('border','1px solid #FF8400').parent().siblings().find('img').css('border','1px solid #c1c1c1');
							
							fdj();//调用放大镜函数
						});
						//小图列表的左右移动
						var liwidth = $smallpic.find('li').width()+10;
						var i=0;
						$smallpic.parent().find(".left-sp").on('click',function(){
							i--;	
							$smallpic.find('ul').animate({left:-i*liwidth});
						});
						$smallpic.parent().find(".right-sp").on('click',function(){
							i++;
							$smallpic.find('ul').animate({left:-i*liwidth});	
						});
						//右边信息
						//商品数量
						var i=$goodsright.find('input[class=txt1]').val();
						$goodsright.find('input[class=jian]').on('click',function(){
							i--;
					         $('input[class=txt1]').val(i);
						});
						$goodsright.find('input[class=jia]').on('click',function(){
							i++;
						    $('input[class=txt1]').val(i);	
						});
						
						//放大镜
						function fdj(){
						$goodsleft.find('.fdj').xzoom({position:'right',width:400,height:400,backgroundcolor:"#FFCC00",opacity:0.2});
                        }
						fdj();
						
						//购物车移动
						 var $goodcar = $('.goodcar');
						$goodsright.find('ul').children('li').last().find('input[class=addgood]').click(function(){
							var $cruttenImg = $goodsleft.find('.fdj').find('img');
							var $copyImg = $cruttenImg.clone();   //复制原图
							var startPos = $cruttenImg.offset();   //获取原图坐标
	 			            var startWidth = $cruttenImg.width();  //获取原图宽度
                            //给复制图片添加一个样式
	 			        $copyImg.css({
	 				     position: "absolute",
	 				     left:startPos.left,
	 				     top:startPos.top,
	 				    width:startWidth
	 			                  });
                             //把复制的图片放到body中来
	 			           $copyImg.appendTo("body");
	 			          var $goodnum = $goodcar.find('.good-sp').find('span');
	 			          //获取购物车的坐标
	 			          var $goodpos = $goodcar.offset();
	 			          
	 			           //复制图片动画，移动到商品列表中
	 			           $copyImg.stop().animate({left:$goodpos.left,top:$goodpos.top+$goodcar.outerHeight(),width:0,heigth:0},1000,function(){
	 			           	   //获取购物袋中商品的数量
	 			           	   var _html = $goodnum.html();
	 			           	   var $goodcarlist = $goodcar.find('.goodcar_list');
	 			           	   $copyImg.remove();//移除复制的图片
	 			           	   $goodcarlist.find('p').remove();//移除列表中的p标签
	 			               $goodcarlist.find('h3').remove();//移除列表的H3标签
	 			               $goodcarlist.find('input[type=button]').remove();//移除列表中的button
	 			               //添加新的h3标签
	 			               $('<h3>').html('购物袋中的商品').css({"border-bottom":"1px solid #ccc","font-size":"14px","margin":"10px","padding-bottom":"10px"}).prependTo($goodcarlist);
	 			           	   var $ul = $('<ul/>');
	 			           	   var $li = $('<li/>').css({"position":"relative","padding-bottom":"10px"});
	 			           	
	 			           	   //添加商品信息
	 			           	   $.each(res,function(idx,item){
	 			           	   	//添加图片
	 			           	   	if(item.bigimgurl){
	 			           	   	$('<img/>').attr("src",item.bigimgurl).css({"float":"left",width:50,height:50,"border":"1px solid #c1c1c1","margin-left":"10px"}).appendTo($li);
	 			           	   	}
	 			           	   	if(item.theme){
	 			           	   	var $div = $('<div/>').css({"float":"left","width":"100px","margin-left":"10px"});
	 			           	   	 $('<span/>').html(item.brand).css({"display":"block","color":"#666","font-size":"12px"}).appendTo($div);
						        $('<span/>').html(item.theme).addClass('addgood_span').css({"display":"block","color":"#666","font-size":"12px"}).appendTo($div);
							    $('<span/>').html('&yen;'+(item.price-item.price*item.off).toFixed(2)+"&times;"+i).css({"display":"block","color":"orangered","font-size":"16px"}).appendTo($div);
				
							    $div.appendTo($li);//div添加到li
	 			           	   	}
	 			           	   	});
	 			           	   	//添加删除按钮
	 			           	   	 var $btnClose = $("<span/>");
	 				             $btnClose.addClass("btn-close").html("&times;").appendTo($li);
	 			           	   	$btnClose.click(function(){
	 					         $(this).closest("ul").remove();//移除ul
	 					         var _html = $goodnum.html();
	 					         _html--;
	 					         //创建cookies 商品数量
	 			           	   var d=new Date;
					           d.setDate(d.getDate() + 10);
					           setCookie("goodnums",_html,d,"/");
					           var cookiesnum = getCookie("goodnums");
	 					         $goodnum.html(cookiesnum).css({'color':'orangered'});//更改购物袋商品的数量，减1 
	 					         if(cookiesnum == 0){
	 					         	$goodcarlist.find('h3').remove();//移除列表的H3标签
	 					         	$('<p/>').html('目前还没有任何商品').appendTo($goodcarlist);
	 					         	$('<p/>').html('赶紧去选择自己心爱的商品吧！').appendTo($goodcarlist);
	 					         	$goodcarlist.find('input[type=button]').remove();//移除列表中的button
	 					         	$goodnum.html(cookiesnum).css({'color':'#000'});
	 					         	 
	 					         }
	 				             });

							   $li.appendTo($ul);   //li添加到ul，ul添加到商品列表
							   $ul.appendTo($goodcarlist);//将ul添加到商品列表
	 			           	   var $input = $('<input/>').attr({'type':'button'}).val('去购物袋结算').addClass('jiesuan').appendTo($goodcarlist);//添加新的button标签
	 			           	   $input.click(function(){
	 			           	   	  open("http://localhost:3000/project/src/html/goodscar_list.html");
	 			           	   });
	 			           	   _html++;
	 			           	    //创建cookies 商品数量
	 			           	   var d=new Date;
					           d.setDate(d.getDate() + 10);
					           setCookie("goodnums",_html,d,"/");
					           var cookiesnum = getCookie("goodnums");
	 			           	   $goodnum.html(cookiesnum).css({'color':'orangered'});//每点击一次购物袋中数量加1
	 			           	  
	 			           });
						});
						
					}
				});
			});
			
			//brand ajax加载
			jQuery(function($){
				$.ajax({
					type:"get",
					url:"/data/detail_brand.json",
					
					dataType:'json',
					async:true,
					success : function(res){
						console.log(res);
						var $brandleft = $('.brand_left');
						$.each(res.data, function(idx,item) {
							if(item.theme){
								$('<h3/>').html(item.theme).addClass('brand_h3').appendTo($brandleft);
							}
							$('<img/>').attr({"src":item.imgurl}).appendTo($brandleft);
							$('<p/>').addClass('brand_p1').html(item.name).appendTo($brandleft);
							$('<p/>').addClass('brand_p2').html("RMB:"+(item.price-0).toFixed(2)).appendTo($brandleft);
						});
					}
				});
			});
			jQuery(function($){
				var $list = $('#list');
				var $move = $('.move');
				var movewidth = $move.width();
				$list.on('click','li',function(){
					console.log(1);
					var i = $(this).index();
					$(this).css({'color':'orangered'}).siblings().css({'color':'#000'});
//					$move.find('ul').css({left:-i*movewidth});
                    $move.find('ul').find('li').eq(i).css({"display":"block"}).siblings().css("display","none");
				})
			});