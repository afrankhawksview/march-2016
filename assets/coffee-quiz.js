$(document).ready(function () {

  var quiz = {};

  quiz.results = [];

  quiz.counter = 0;

  quiz.questions = [
    $('#qtype'),
    $('#qfruit'),
    $('#qfamiliar'),
    $('#qbetween'),
    $('#qdark'),
    $('#qadventure'),
    $('#qcomments'),
    $('#qsublength'),
    $('#qconfirm')
  ];

  var products = {};

  products.onemonth = 208619553;
  products.threemonth = 2827920068;
  products.sixmonth = 2827927940;
  products.twelvemonth = 2827938564;

  // buttons

  var nextButton = $('#next');
  var backButton = $('#back');
  var startOverButton = $('#restart');


  function start() {
    $('.question').hide();
    quiz.counter = 0;
    quiz.questions[quiz.counter].show();
    backButton.addClass('disabled');
    console.log("There are " + (quiz.questions.length - 1) + " Questions in this quiz.");
    displayQuestionNumber();
    console.log('Quiz Counter = ' + quiz.counter);

  }

  function displayQuestionNumber(){
    $('.question-num').html((quiz.counter + 1) + ' out of ' + quiz.questions.length);
    counterBar((quiz.counter + 1), quiz.questions.length);
  }

  function goNext() {
    quiz.questions[quiz.counter].hide();
    quiz.counter += 1;
    quiz.questions[quiz.counter].show();

    if (quiz.counter > 0) {
      backButton.removeClass('disabled');
    }

    if ((quiz.counter + 1) === quiz.questions.length)  {
      nextButton.addClass('disabled');
      console.log('disabled added to next');
      collectAnswers();
      displaySelections();
    }

    console.log('Quiz Counter = ' + quiz.counter);
    displayQuestionNumber();
  }

  function goBack() {
    quiz.questions[quiz.counter].hide();
    quiz.counter -= 1;
    quiz.questions[quiz.counter].show();

    if (quiz.counter === 0) {
      backButton.addClass('disabled');
      console.log('disabled added to back');
    }

    if (quiz.counter <= quiz.questions.length) {
      nextButton.removeClass('disabled');
    }

    displayQuestionNumber();


  }


  function collectAnswers() {
    quiz.results.kind = $("input:radio[name=type]:checked").val();
    quiz.results.fruit = $("input:radio[name=fruit]:checked").val();
    quiz.results.familiar = $("input:radio[name=familiar]:checked").val();
    quiz.results.between = $("input:radio[name=between]:checked").val();
    quiz.results.dark = $("input:radio[name=dark]:checked").val();
    quiz.results.adventure = $("input:radio[name=adventure]:checked").val();
    quiz.results.comments = $("textarea[name=comments]").val();
    quiz.results.subscription_choice = $("input:radio[name=subid]:checked").val();
    if (quiz.results.subscription_choice === "one") {
      quiz.results.subid = 3875;
      quiz.results.varid = 545700893;
    } else if (quiz.results.subscription_choice === "three") {
      quiz.results.subid = 3874;
      quiz.results.varid = 2827920068;
    } else if (quiz.results.subscription_choice === "six") {
      quiz.results.subid = 3873;
      quiz.results.varid = 2827927940;
    } else if (quiz.results.subscription_choice === "twelve") {
      quiz.results.subid = 3872;
      quiz.results.varid = 2827938564;
    }
    console.log(quiz.results);

  }


  function displaySelections() {

    for (var key in quiz.results) {
      $('li.' + key + ' span').html(quiz.results[key]);
    };

  }


  function ajaxAdd(variant_id, subscription_id, kind, fruit, familiar, between, dark, adventure, comments) {

    jQuery.post('/cart/add.js', {

      quantity : 1,
      id: variant_id,
      properties: {
        "shipping_interval_frequency": 1, 
        "shipping_interval_unit_type": "Month",            
        "subscription_id": subscription_id,
        "Kind": kind,
        "Fruit": fruit,
        "Familiar": familiar,
        "Between": between,
        "Dark": dark,
        "Adventure": adventure,
        "Comments": comments
      },
      success: function() { 
        window.location.href = '/cart'; 
      }

    });

  }

  start();

  $('#next').click(function () {
    if (!$(this).hasClass('disabled')) {
      goNext();
    }
  });

  $('#back').click(function () {
    if (!$(this).hasClass('disabled')) {
      goBack();
    }
  });

  $('#restart').click(function () {
    start();
  });


  $('#quizform').submit(function (event) {
    event.preventDefault();
    console.log('submit');
    ajaxAdd(
      quiz.results.varid,
      quiz.results.subid,
      quiz.results.kind,
      quiz.results.fruit,
      quiz.results.familiar,
      quiz.results.between,
      quiz.results.dark,
      quiz.results.adventure,
      quiz.results.comments
    );

  });

  $('.button-style').click(function() {
    $('input' , this).prop('checked', true);
    setTimeout( goNext , 300);
  });

  

});//End Document Ready