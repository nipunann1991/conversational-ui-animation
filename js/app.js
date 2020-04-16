
var app =  {

	init: function(){
		app.carousal('.users-list');  
		var mobileAnim = new TimelineMax();
		mobileAnim.to('.mobile-screen-wrapper', 0.4, { scale: 2, y: "50%", ease: Power1.easeNone })
	},

	carousal: function(elm){ 

		$(elm).slick({
		  infinite: true,
		  centerMode: true,
		  slidesToShow: 5,
		  slidesToScroll: 5
		});
		 
		app.userClicked();
	},

	userClicked: function(){
 
		$('html').one('click', '.users-list .slick-active.slick-center  .user', function(event) {
			event.preventDefault();
			app.animate.sliderHide();
		});
	},

	getUsers: function(){
		  
					 
	},


	animate: {

		sliderHide: function(){
			CSSPlugin.defaultTransformPerspective = 1000;

			TweenMax.set($(".message .message-back"), {opacity: 0, rotationX:180});
			TweenMax.set($(".message .message-front"), {opacity: 0, rotationX:180});
 
			
			var itemAnimLeft1 = new TimelineMax();  
 			var animMessage = new TimelineMax();
			var animMessageText = new TimelineMax();
  			 
 				
            animMessage
            	.to('.message-box-wrapper', 0, { opacity: 1, ease: Power1.easeNone })
            	.to('.message-box, .instruction-box', 0, { opacity: 0, ease: Power1.easeNone })
            	.fromTo('.message', 0, { opacity: 0 },{ opacity: 1, ease: Power1.easeNone })
                .to(".message .message-back, .message .message-front", 0.5, { opacity: 1, rotationX:0, ease: Elastic.easeNone  })  
               // 
                .add( function(){  
                	itemAnimLeft1
                	.fromTo('.message .message-front p', 0.2, { opacity: 0 }, { opacity: 1, ease: Power2.easeNone })
					app.animate.typeText();
					

 				})
 				.add(function(){
 					var itemAnimLeft = new TimelineMax();
 					var animUsers = new TimelineMax();
 					var animMessageBox = new TimelineMax();

 					itemAnimLeft
		                .to('.users-list .user', 0.3, { y: 0, opacity: 0, ease: Power1.easeNone });

		            animUsers 
		                .to('.users-list .slick-current .user', 0.1, {  scale: 0.9, y: 30, x: -10, opacity: 1, ease: Power4.easeIn })
		                .to('.users-list .slick-current .user', 0.2, { scale: 0.75, y: 30, x: -100, opacity: 1, ease: Power2.easeNone })

	            	animMessageBox
						.fromTo('.message-box', 0.3, { scaleY: 0.6, scaleX: 0.7, opacity: 0 }, { scaleY: 1, scaleX: 1,  opacity: 1 , ease: Power1.easeNone })
	                	.fromTo('.user-name', 0.2, { y: 8 }, { y: 1,  opacity: 1, ease: Power2.easeNone })
 				})
                
           
		},

		typeText: function(){

	 		var mySplitText = new SplitText(".message .message-front p", {
			    type: "chars",
			    charsClass: "text-animation"
			}),
 
			shuffleCharArray = app.animate.shuffleChar(mySplitText.chars) ,
			masterTL = new TimelineLite(); 
			
			shuffleCharArray.forEach(function(elem, index) { 
			  	var animText = new TimelineLite();
			  	animText
			  		.set(elem, { className: "+=glow-1" })
				    .set(elem, { delay: 0.05, className: "+=glow-2" })
    				.set(elem, { delay: 0.05, className: "+=glow-3" })

			  	masterTL.add(animText, index * 0.02);
			});
 
                
		},


		shuffleChar: function(array) {
		    for (var i = array.length - 1; i > 0; i--) {
		        var j = Math.floor(Math.random() * (i + 1));
		        var temp = array[i];
		        array[i] = array[j];
		        array[j] = temp;
		    }
		    return array;
		}



	}

}

app.init();
 




