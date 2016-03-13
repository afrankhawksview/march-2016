$( document ).ready(function(){

  var quiz = {};
  
  quiz.results = {
    gift:null,
    type:null,
    fname:null,
    lname:null,
    groupname:null,
    size:null,
    grind,null,
    period:null
  };   
  
  quiz.results.customize = {
    fruit:null,
    classic:null,
    dark:null,
    adventurous:null
  };
  
//////////// Events
  
//   Name
  $('#storename').click(function(fname,lname,groupname){
    quiz.results.fname = fname;
    quiz.results.lname = lname;
    quiz.results.groupname = groupname;
  });
  
  
//   Question Controls
  $('#start').click();
  
  $('#skipquiz').click(function(){
    quiz.results.customize = null;
  });
  $('.next').click(function(){
  	quiz.currentQuestion++;
  });
  $('.back').click(function(){
    quiz.currentQuestion--;
  });
  $('.startover').click(function(){
  quiz.currentQuestion = 0;
  });

  
  
//   General Preferences
  
//   Gift
  $('#gift').click(function(){
  quiz.results.gift = true;
  });
  
//   Size
  $('#taster').click(function(){
  quiz.results.size = "Taster";
  });
  $('#pack').click(function(){
  quiz.results.size = "Pack";
  });
  $('#crazy').click(function(){
  quiz.results.size = "Crazy";
  });
  
//   Grind
  
  $('#wholebean').click(function(){
  quiz.results.grind = "Whole Bean";
  });
  $('#extrafine').click(function(){
  quiz.results.grind = "Extra Fine";
  });
  $('#fine').click(function(){
  quiz.results.grind = "Fine";
  });
  $('#medium').click(function(){
  quiz.results.grind = "Medium";
  });
  $('#coarse').click(function(){
  quiz.results.grind = "Coarse";
  });
  
//   Period
  $('#one').click(function(){
  quiz.results.period = "One Month";
  });
  $('#three').click(function(){
  quiz.results.period = "Three Months";
  });
  $('#six').click(function(){
  quiz.results.period = "Six Months";
  });
  $('#twelve').click(function(){
  quiz.results.period = "Twelve Months";
  });
  
  quiz.currentQuestion = 0;
    
  quiz.loadQuestion = function(){
 	 $('#printarea').html(quiz.questions[quiz.currentQuestion]);
  	};
    
  quiz.loadNext = function(command){
    
     if (command == "yes" || command == "no") {
      quiz.answers[quiz.currentQuestion] = command;
      quiz.currentQuestion++;
      quiz.loadQuestion();
      
    } else if (command == "startover") {
      quiz.currentQuestion = 0;
      $('.options').show();
      quiz.loadQuestion();
      
    } else if (command == "back") {
      quiz.currentQuestion--;
      quiz.loadQuestion();
      
    } else if (command == "next") {
      quiz.currentQuestion++;
      quiz.loadQuestion();
    
    } 
        
    if (quiz.currentQuestion == 5) {
      $('#printarea').html(quiz.final());
      $('.options').hide();
    }
      
    };
    
  
//   LOAD
  
  quiz.loadQuestion("start");
  
//   LISTENERS

  $('#startover').click(function(){
    quiz.loadNext("startover");
  });

  $('#yes').click(function(){
    quiz.loadNext("yes");
    });

  $('#no').click(function(){
    quiz.loadNext("no");
    });
  
  $('#back').click(function(){
    quiz.loadNext("back");
    });
  
});