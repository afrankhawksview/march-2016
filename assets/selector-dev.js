$(document).ready(function(){

	console.log('TRP Subscription Selector');

	var sel = {

		'productIds': {
			'12oz' : {
				'One': {	
					'Whole Bean':	[13475010052, 11743, "One"],
					'Coarse':	[13475010116, 11743, "One"],
					'Medium':	[13475010180, 11743, "One"],
					'Fine':	[13475010308, 11743, "One"],
					'Extra Fine':	[13475010372, 11743, "One"],
					'Price': 29.95
				},
				'Three': {	
					'Whole Bean':	[13475019460, 11744, "Three"],
					'Coarse':	[13475019524, 11744, "Three"],
					'Medium':	[13475019588, 11744, "Three"],
					'Fine':	[13475019652, 11744, "Three"],
					'Extra Fine':	[13475019716, 11744, "Three"],
					'Price': 86.85
				},
				'Six': {	
					'Whole Bean':	[13475102084, 11745, "Six"],
					'Coarse':	[13475102148, 11745, "Six"],
					'Medium':	[13475102212, 11745, "Six"],
					'Fine':	[13475102276, 11745, "Six"],
					'Extra Fine':	[13475102340, 11745, "Six"],
					'Price': 167.70
				},
				'Twelve': {	
					'Whole Bean':	[13475130308, 11746, "Twelve"],
					'Coarse':	[13475130372, 11746, "Twelve"],
					'Medium':	[13475130436, 11746, "Twelve"],
					'Fine':	[13475130500, 11746, "Twelve"],
					'Extra Fine':	[13475130564, 11746, "Twelve"],
					'Price': 323.40
				}
			},

		 	'24oz': {
				'One':	{
					'Whole Bean':	[13475176324, 11747, "One"],
					'Coarse':	[13475176388, 11747, "One"],
					'Medium':	[13475176452, 11747, "One"],
					'Fine':	[13475176516, 11747, "One"],
					'Extra Fine':	[13475176580, 11747, "One"],
					'Price': 49.95
				},
				'Three':	{
					'Whole Bean':	[13475410948, 11748, "Three"],
					'Coarse':	[13475411012, 11748, "Three"],
					'Medium':	[13475411076, 11748, "Three"],
					'Fine':	[13475411140, 11748, "Three"],
					'Extra Fine':	[13475411204, 11748, "Three"],
					'Price': 146.85
				},
				'Six': {
					'Whole Bean':	[13475434052, 11749, "Six"],
					'Coarse':	[13475434116, 11749, "Six"],
					'Medium':	[13475434180, 11749, "Six"],
					'Fine':	[13475434244, 11749, "Six"],
					'Extra Fine':	[13475434308, 11749, "Six"],
					'Price': 287.70
				},
				'Twelve': {
					'Whole Bean':	[13475492228, 11750, "Twelve"],
					'Coarse':	[13475492292, 11750, "Twelve"],
					'Medium':	[13475492356, 11750, "Twelve"],
					'Fine':	[13475492420, 11750, "Twelve"],
					'Extra Fine':	[13475492484, 11750, "Twelve"],
					'Price': 563.40
				}
			},

			'36oz': {
				'One':	{
					'Whole Bean':	[13475690052, 11751, "One"],
					'Price': 69.95
				},
				'Three': {
					'Whole Bean':	[13475710212, 11752, "Three"],
					'Price': 206.85
				},
				'Six': {
					'Whole Bean':	[13475795716, 11753, "Six"],
					'Price': 407.70
				},
				'Twelve': {
					'Whole Bean':	[13475826372, 11754, "Twelve"],
					'Price': 803.40
				}
			}
		},

		recordSize: function(){
			sel.size = $(this).data('size');
			console.log(sel.size);
			sel.clearSection();
			sel.showPricing();
			$('.period').show();
		},

		recordPeriod: function(){
			sel.period = $(this).data('period');
			console.log(sel.period);
			sel.clearSection();
			if (sel.size === "36oz") {
				sel.grind = "Whole Bean";
				sel.composeConfirmation();
				$('.offer-box').show();
			} else {
				$('.grind').show();
			}
		},

		recordGrind: function(){
			sel.grind = $(this).data('grind');
			console.log(sel.grind);
			sel.clearSection();
			sel.composeConfirmation();
			$('.offer-box').show();
		},

		showPricing: function(){
			var price = [sel['productIds'][sel.size]['One']['Price'], sel['productIds'][sel.size]['Three']['Price'], sel['productIds'][sel.size]['Six']['Price'], sel['productIds'][sel.size]['Twelve']['Price']];
			$('.price-1').html("$" + price[0].toFixed(2) + " / Month");
			$('.price-2').html("$" + (price[1]/3).toFixed(2) + " / Month");
			$('.price-3').html("$" + (price[2]/6).toFixed(2) + " / Month");
			$('.price-4').html("$" + (price[3]/12).toFixed(2) + " / Month");
		},

		composeConfirmation: function(){
			$('span.size').text(sel.size);
			$('span.period').text(sel.period.toLowerCase());
			if (sel.grind == 'Whole Bean') {
				$('span.grind').text(sel.grind.toLowerCase());
			} else {
				$('span.grind').text(sel.grind.toLowerCase() + ' ground'); 
			}
		},
		

		productIdFind: function(){

			var productId = sel['productIds'][sel.size][sel.period][sel.grind][0];
			var subscriptionId = sel['productIds'][sel.size][sel.period][sel.grind][1];
			var shipping_interval_frequency = sel['productIds'][sel.size][sel.period][sel.grind][2]

			console.log(productId, subscriptionId);

			return [productId, subscriptionId, shipping_interval_frequency];

		},


		addToCart: function(){
			jQuery.ajax({
				type: 'POST',
				url: '/cart/add.js',
				data: { 
					"quantity": 1,
					"id": sel.productIdFind()[0],
					"properties[shipping_interval_frequency]": sel.productIdFind()[2], 
					"properties[shipping_interval_unit_type]": 'Months',            
					"properties[subscription_id]": sel.productIdFind()[1]
				},
				dataType: 'json',
				success: function(){
					console.log('added');
					window.location.href = '/cart';
				}
			});
		},

		clearSection: function(){
			$('.section').hide();
		},

		restart: function(){
			console.log('restart');
			sel.clearSection();
			$('.size').show();
		},
		
		startApp: function(){

			$('.size .subscription-button').click(sel.recordSize);

			$('.period .subscription-button').click(sel.recordPeriod);

			$('.grind .subscription-button').click(sel.recordGrind);

			$('.confirm-yes').click(function(){
				console.log('confirmed');
				sel.addToCart();
			});

			$('.confirm-restart').click(function(){
				console.log('confirm no');
				sel.restart();
			});
		}	

	};

	// Start App

	sel.startApp();

});