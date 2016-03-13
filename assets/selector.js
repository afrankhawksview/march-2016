$(document).ready(function () {

// INIT OBJECTS

  var selector = {};

  selector.sublength = {};

  selector.grind = {};

  var products = {};

  var cartid = [];
  
  var offer = '';

  products.onemonth = { 
    id:3875,
    wholebean: 545700893,
    coarse: 545700897,
    medium: 545700905,
    fine: 545700909,
    extrafine: 545700913
  };

  products.threemonth = {
    id: 3874,
    wholebean: 2827920068,
    coarse: 2827920132,
    medium: 2827920196,
    fine: 2827920324,
    extrafine: 2827920388
  };

  products.sixmonth = {
    id: 3873,
    wholebean: 2827927940,
    coarse: 2827928004,
    medium: 2827928068,
    fine: 2827928132,
    extrafine: 2827928196
  };

  products.twelvemonth = {
    id: 3872,
    wholebean: 2827938564,
    coarse: 2827938628,
    medium: 2827938692,
    fine: 2827938756,
    extrafine: 2827938820
  };

// FUNCTIONS

  function recordPeriod(x) {
    selector.sublength = x;
    console.log("Subscription Length: " + selector.sublength);
    $(".period").hide();
    $(".grind").show();
  }

  function recordGrind(x) {
    selector.grind = x;
    console.log("Grind Setting: " + selector.grind);
    switch (x) {
      case "Whole Bean":
        switch (selector.sublength) {
          case 1:
            cartid[0] = products.onemonth.wholebean;
            cartid[1] = products.onemonth.id;            
            break;
          case 3:
            cartid[0] = products.threemonth.wholebean;
            cartid[1] = products.threemonth.id;
            break;
          case 6:
            cartid[0] = products.sixmonth.wholebean;
            cartid[1] = products.sixmonth.id;
            break;
          case 12:
            cartid[0] = products.twelvemonth.wholebean;
            cartid[1] = products.twelvemonth.id;
            break;
        }
      break;

      case "Coarse":
        switch (selector.sublength) {
          case 1:
            cartid[0] = products.onemonth.coarse;
            cartid[1] = products.onemonth.id; 
            break;
          case 3:
            cartid[0] = products.threemonth.coarse;
            cartid[1] = products.threemonth.id;
            break;
          case 6:
            cartid[0] = products.sixmonth.coarse;
            cartid[1] = products.sixmonth.id;
            break;
          case 12:
            cartid[0] = products.twelvemonth.coarse;
            cartid[1] = products.twelvemonth.id;
            break;
        }
      break;

      case "Medium":
        switch (selector.sublength) {
          case 1:
            cartid[0] = products.onemonth.medium;
            cartid[1] = products.onemonth.id; 
            break;
          case 3:
            cartid[0] = products.threemonth.medium;
            cartid[1] = products.threemonth.id;
            break;
          case 6:
            cartid[0] = products.sixmonth.medium;
            cartid[1] = products.sixmonth.id;
            break;
          case 12:
            cartid[0] = products.twelvemonth.medium;
            cartid[1] = products.twelvemonth.id;
            break;
        }
      break;

      case "Fine":
        switch (selector.sublength) {
          case 1:
            cartid[0] = products.onemonth.fine;
            cartid[1] = products.onemonth.id; 
            break;
          case 3:
            cartid[0] = products.threemonth.fine;
            cartid[1] = products.threemonth.id;
            break;
          case 6:
            cartid[0] = products.sixmonth.fine;
            cartid[1] = products.sixmonth.id;
            break;
          case 12:
            cartid[0] = products.twelvemonth.fine;
            cartid[1] = products.twelvemonth.id;
            break;
        }
      break;

      case "Extra Fine":
        switch (selector.sublength) {
          case 1:
            cartid[0] = products.onemonth.extrafine;
            cartid[1] = products.onemonth.id; 
            break;
          case 3:
            cartid[0] = products.threemonth.extrafine;
            cartid[1] = products.threemonth.id;
            break;
          case 6:
            cartid[0] = products.sixmonth.extrafine;
            cartid[1] = products.sixmonth.id;
            break;
          case 12:
            cartid[0] = products.twelvemonth.extrafine;
            cartid[1] = products.twelvemonth.id;
            break;
        }
      break;
    }
    console.log(cartid[0] + "-" + cartid[1]);
    offerCart();
  }

  function offerCart(){
    $('.grind').hide();
    offer = "<h2>Your Selection:</h2><p><b>";
    offer += selector.sublength;
    offer += " Month";
    if (selector.sublength > 1) {
      offer += "s";
    }
    offer += "</b> Subscripton<br>";
    offer += "<b>Grind</b>: ";
    offer += selector.grind;
    offer += "</p>";
    $('.offer').prepend(offer);
    $('.offer-box').show();    
  }
  
  function addItemToCart (variant_id, quantity, shipping_interval_frequency, shipping_interval_unit_type, subscription_id) {
    data = {
      "quantity": quantity,
      "id": variant_id,
      "properties[shipping_interval_frequency]": shipping_interval_frequency, 
      "properties[shipping_interval_unit_type]": shipping_interval_unit_type,            
      "properties[subscription_id]": subscription_id
    }
    jQuery.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: data,
      dataType: 'json',
      success: function() { 
        window.location.href = '/cart'; 
      }
    });
  }

// START

// Hiders
  $('.grind').hide();
  $('.offer-box').hide();


// CONTROLS 

// Period
  $(".one-month").click(function () {
    recordPeriod(1);
  });

  $(".three-month").click(function () {
    recordPeriod(3);
  });

  $(".six-month").click(function () {
    recordPeriod(6);
  });

  $(".twelve-month").click(function () {
    recordPeriod(12);
  });

// Grind

  $('.whole-bean').click(function(){
    recordGrind("Whole Bean");

  });

  $('.coarse').click(function(){
    recordGrind("Coarse");
  });

  $('.medium').click(function(){
    recordGrind("Medium");
  });

  $('.fine').click(function(){
    recordGrind("Fine");
  });

  $('.xfine').click(function(){
    recordGrind("Extra Fine");
  });

// Cart

  $('#add-to-cart').click(function () {
    addItemToCart(cartid[0] , 1, 1 , "Month", cartid[1]);
  });
  
  

});
