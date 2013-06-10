(function ($) {
	
	$.fn.kpSlider = function(options){
		
		var numItems = 3; // default items to be shown
		var navPrevNext = false; // default previous / next navigation
		var total = 0;
		
		var bullets = 0;
		var navBullets = true; // default show bullets

		var totalWidth = 0;

		var itemWidth = 0;
		var itemHeight = 0;

		var currentItem = 0;

		// default settings
		var settings = $.extend({
			displayItems: numItems,
			showPrevNext: navPrevNext,
			showBullets: navBullets
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

		// show previous / next navigation
		if(settings.showPrevNext==true){
			
			this.prepend("<div class='navNext'><a href='#'>Next</a></div>");
			this.prepend("<div class='navPrev'><a href='#'>Previous</a></div>");
		}

		if(total>numItems){
			if (total % numItems ==0){
				bullets = Math.floor(total/numItems) ;
			}else{
				bullets = Math.floor(total/numItems) +1;
			}
			var ulBullet = $("<ul>"); // bullets 
			ulBullet.addClass("navSlider");
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
			if(settings.showBullets==true){ // show bullets only when true
				this.prepend(ulBullet); // prepand before all child elements
			}
		}else{
			bullets=0;
		}

		this.css('width',Math.floor(itemWidth * numItems)); // set main layout width multiply by display number 

		this.css('overflow','hidden'); // just hidden the others * should set in CSS
		this.css('position','relative'); // * should set in CSS

		// previous click
		this.find('.navPrev a').live('click',function(e){
			
			e.preventDefault();

			currentItem = currentItem - 1;

			if(currentItem<=0){
				currentItem = 0;
			}

			moveItems(currentItem);
		});
		// next click
		this.find('.navNext a').live('click',function(e){
			
			e.preventDefault();

			currentItem = currentItem + 1;

			if(currentItem>=total-1){
				currentItem = total-1;
			}

			moveItems(currentItem);
		});

		this.find('.bullet').live('click',function(e){

			e.preventDefault(); // prevent default anchor click # action

			var rel = $(this).attr('rel');

			currentItem = rel;

			moveItems(currentItem);
		});

		function moveItems (rel) {
			// body...
			var startX = (-(rel * itemWidth)) ; // selected bullet ID multiply by itemWidth 
			var prevX = startX;

			parent.find('.item').each(function(i){
				$(this).animate({
					left: prevX
				},400);
				prevX +=  itemWidth;
			});
		}
	};

}(jQuery));