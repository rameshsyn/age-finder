// ===== Coded by Ramesh Syangtan ==========
$(document).ready(function() {
	var step = 1;
	var count = 4; // timing before next button enables
	var ranOpOne = (Math.random() < 0.5)?true:false; // giving 50% possibility to both operaters
	var ranNumOne = undefined;
	var ranNumTwo = undefined;			
	var steps = [1,2,3,4,5,6,7,8]; // steps to be done
	// instructions to be followed
	var instructions = ["multiply your age with 20","add today's date to answer - see hint below","again multiply answer with 5","add your grade to answer - see hint below","Now subtract 5 times of today's date from answer",(ranOpOne)?'add '+ GranOpOne() + ' to answer': 'subtract ' + GranOpOne() + ' from answer' ,"reverse your answer",'multiply ' + GranOpTwo() + ' to the answer'];
	// hints to be followed
	var hints = ["age * 20","if today is 3rd day of the month, add 3  to your answer","answer * 5","grade should be in number(positive)","answer - 5 times of today's date","N/A","if you have 1234, it'll be 4321","N/A","N/A"];
	
	$("#try-again").click(function(){
		$(this).attr("href",window.location.href);
	});
	// Generates one random operater between + and -
	function GranOpOne() {				
		// if true that is + operater
		if(ranOpOne) {
			// generates random number below 100
			ranNumOne = Math.floor(Math.random() * 101);
			while(ranNumOne < 1) {
				ranNumOne = Math.floor(Math.random() * 101);
			}
			return ranNumOne;
		}
		else {
			ranNumOne = Math.floor(Math.random() * 101);
			while(ranNumOne < 1) {
				ranNumOne = Math.floor(Math.random() * 101);
			}
			return ranNumOne;
		}
	}
	// generates random operater for multiply
	function GranOpTwo() {				
		//generates random number below 20		
		ranNumTwo = Math.floor(Math.random() * 21);
		while(ranNumTwo < 1) {
			ranNumTwo = Math.floor(Math.random() * 21);
		}
		return ranNumTwo;						
	}
	// checks whether input is number or not
	function checkAns() {
		var ans = $('#ans').val();
		var decimal = /^[-+]?[0-9]+\.[0-9]+$/;
		if(isNaN(ans)) {
			$('.warning').text("Input number");
			$('#find-out').attr('disabled','disabled');
		}
		else if(ans.match(decimal)) {
			$('.warning').text("No decimal number");
			$('#find-out').attr('disabled','disabled');
		}
		else {
			$('#find-out').removeAttr('disabled');
			$('.warning').text(" ");
		}
	}
	// countdown for next instruction
	function countDown() {		
		$('.next').text(count);
		count = count - 1;
	}
	// stops setInterval function
	function clearSetInterval() {
		clearInterval(timeInterval);
		$('.next').removeAttr('disabled');
		$('.next').text('Next');
		count = 4;
	}
	// hides processing 
	function hideProcessing() {
		$('.loading').hide();
	}
	// Hides initial display and shows needed display
	$(".get-started").click(function() {
		$(".first-show").hide();
		$(".second-show").slideDown(); 
	});
	// hides displayed content and shows instructons
	$(".go").click(function() {
		$(".second-show").hide();
		$(".third-show").fadeIn();
		$('.next').attr('disabled','disabled');		
		timeInterval = setInterval(countDown,1000);
		setTimeout(clearSetInterval,6000);
	});	
	// changes step, instruction, hint as step
	$(".next").click(function() {
		if(step == 8) {
			$(".third-show").hide();
			$('.up img:first-child').attr('src','http://rameshsyangtan.com.np/backup/robot-knows-ur-age/7.gif');
			$(".final-show").fadeIn(1000);				
		}
		$(".step-count span").text(steps[step]);
		$(".instructions span").text(steps[step]);
		$(".instructions div").text(instructions[step]);
		$(".hint span").text(hints[step]);
		$('.next').attr('disabled','disabled');
		timeInterval = setInterval(countDown,1000);
		setTimeout(clearSetInterval,6000);
		step++;
	});
	$('#ans').keyup(function() {
		checkAns();
	});
	$('#ans').keydown(function() {
		checkAns();
	});	
	//result area
	$('#find-out').click(function() {
		var ans = $('#ans').val();
		if(ans == "") {
			$('.warning').text("Enter your final answer");
		}
		else if((ans > 201980) || (ans < 1) || (ans%10 == 0)) {
			$('.final-show').hide();
			$('.wrong').show('fast');
		}
		else{
			ans = ans/ranNumTwo;
			var rev = 0;
			var rem;
			while(ans > 0) {
				rem = ans % 10;
				rev = rev * 10 + rem;
				ans = ans / 10;
				ans = Math.floor(ans);
			}
			ans = rev;
			ans = (ranOpOne)?ans-ranNumOne:ans+ranNumOne;				
			ans = ans/100;
			var age = Math.floor(ans);
			ans = ans % 1;
			var grade = ans.toFixed(2).substring(2);
			if((age<1) || (age>100) || (grade>20)) {
				$('.final-show').hide();
				$('.wrong').show('fast');
			}
			else {	
				$('.loading').show(100);		
				$('.final-show').hide();
				$('.up').hide();				
				$('.start-again').show();
				$('.info').fadeIn(1000);
				$('.age').text(age);
				$('.grade').text(grade);
				$('.see-guide').click(function() {
					$('.info').hide();
					$('.alert').hide();
					$('.wrong img').hide();
					$('.wrong').show();
				});
				setTimeout(hideProcessing,3000);
			}
		}
	});

});