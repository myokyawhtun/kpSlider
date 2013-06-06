(function ($) {
	
	$.fn.kpSlider = function(options){
		
		var numItems = 3; // default items to be shown
		var total = 0;
		var bullets = 0;

		var totalWidth = 0;

		var itemWidth = 0;
		var itemHeight = 0;

		// default settings
		var settings = $.extend({
			displayItems: numItems
		}, options);
		
		numItems = settings.displayItems; // set the items number to be shown

		var parent = this;

		this.find('.item').each(function(i){
			total = i+1;

			$(this).css('position','absolute');
			$(this).css('left',totalWidth);
			$(this).attr('rel',i);

			totalWidth += $(this).outerWidth(); // total width
			itemWidth = $(this).outerWidth(); // each item width

		});

		if(total>numItems){
			if (total % numItems ==0){
				bullets = Math.floor(total/numItems) ;
			}else{
				bullets = Math.floor(total/numItems) +1;
			}
			var ulBullet = $("<ul>"); // bullets 
			ulBullet.addClass("navScroll");
			for(var b=1;b<=bullets;b++){
				var li = $("<li>"); // new li bullet
				var anc = $("<a>");
				anc.attr('href','#');
				anc.attr('rel', (b-1)* numItems );
				anc.addClass('bullet'); // add Class for handler
				anc.append(b);
				li.append(anc);
				ulBullet.append(li);		// append in ul
			}

			this.prepend(ulBullet); // prepand before all child elements

		}else{
			bullets=0;
		}
		
		this.css('width',Math.floor(itemWidth * numItems)); // set main layout width multiply by display number 

		this.css('overflow','hidden'); // just hidden the others * should set in CSS
		this.css('position','relative'); // * should set in CSS

		this.find('.bullet').live('click',function(e){

			e.preventDefault(); // prevent default anchor click # action

			var rel = $(this).attr('rel');
			var startX = (-(rel * itemWidth)) ; // selected bullet ID multiply by itemWidth 
			var prevX = startX;

			parent.find('.item').each(function(i){
				$(this).animate({
					left: prevX
				},400);
				prevX +=  itemWidth;
			});

		});
	};

}(jQuery));