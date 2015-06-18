// Prototype for the iForm - jQuery plug-in
// Author : Somnath Mukherjee(somnathbm0@gmail.com)
// Available at plugins.jquery.com
// Stage : ready
// License : GPL, MIT, BSD

(function($){
 $.fn.iForm = function(opt){
  var defaults = {
    mode:"friendly",
	appliesTo:"text"
  };
  var options = $.extend({},defaults,opt);
 /* -=-=-=-=-=-=-=-=-=FUNCTION DEFINITIONS=-=-=-=-=-=-=-=-=-=-=-=- */
 /* From here starts the routines for friendly mode */
 
 // rectification routine for all input[type = text]
  function textCorrect(){
    var a = $(this).val();
	if(/([~!@#$\^`\*\+\/\?\,\\{}(\)[\]%\d"&\-=_|;:'<>]+)/gi.test(a)){
	    var c = a.replace(/([~!@#$\^`\*\+\/\?\,\\{}(\)[\]%\d"&\-=_|;:'<>]+)/g,"");
		$(this).val(c);
		$(".userval").html(a);
        $("#msg-success").show();
	}	

  }
// rectification routine for all input[type = email]
  function emailCorrect(){
    var b = $(this).val();
    var ut,vt,wt,xt;
  if(/outlook|gmail|live|facebook|yahoo|ymail|rediff/g.test(b)){	
	    ut = b.replace(/([#~!`$%\^&*\-\+=\\{\}\?\/\,(\)[\]"|;:'<>@]+)/g,"");
	   	vt = ut.search(/outlook|gmail|live|facebook|yahoo|ymail|rediff/)
            wt = ut.slice(0,vt);
			xt = ut.slice(vt,ut.length);
			yt = wt + "@" + xt;
			$(this).val(yt);
			if(yt != b){
              $(".userval").html(b);
              $("#msg-success").show();
            }			  
   }
	else{
	   $(this).val("");
	   $(".userval").html(b);
	   $("#msg-error").show();
	}   
   }
// rectification routine for all input[type = tel]
  function telCorrect(){
    var f = $(this).val();
    if(/([#~!-`$%\^_&*a-z\+=\\{}(\)[\]"|;:'<>@]+)/gi.test(f)){
        var e = f.replace(/([#~!`$%\^_&*|\,\.\?\/a-z=\\{}[\](\)"|;:'<>@]+)/g,"");
        $(this).val(e);
        $(".userval").html(f);
        $("#msg-success").show();
    }
  }	
// rectification routine for all input[type = url]
  function urlCorrect(){
    var a = $("#url").val();	
  if(/[a-z0-9\/.#:@%\^&~`!]+/.test(a)){ //this test only fails when user enters space
    var c = a.replace(/([!~`@#$_|%\^&\*\+=|\\[\](\){\};"'<>\?\,]+)/g,"");
    var b = c.search("://"); 
	if(b != -1){ //means if it contains ":" symbol adjacent to "//"
	  var d = parseInt(b)+3, 
	      e = a.substring(0,d);
	  if(e == "http://" || e == "https://" || e == "ws://" || e == "wss://" || e == "file://"){
	    console.info("A valid URL scheme was entered...");
	   }
	  else{
        e = "http://"; //force the URL scheme to be "http://"
       }		
     var g = c.replace(e,""); /* --replace URL scheme -- */
     var h = g.replace(/[:!@~`#$%\^&*=+|\\[\](\){\}\,\?;:"'<>]+/g,""); /* -- replace spcl. chars. URLwide -- */	 
     var i = e + h;		
	    $(this).val(i);
		if(i != a){
		  $(".userval").html(a);
          $("#msg-success").show();
		}  
	}
    else{ //if it does not contain the "://" symbol
       var j = c.search(/\./);  //Search the first '.' symbol occurrence
	   var k = c.substring(0,j);
	   var x = c.substring(j,a.length+1);
	   if(k.length <= 8){
	     var l = k.search("www");
		 if(l != -1){ //If it contains 'www' string
		   var m = k.substring(0,l);
		   var n = c.replace(m,"http://");
		    $(this).val(n);
			$(".userval").html(a);
            $("#msg-success").show();
		  }
         else{ //If it contains other than 'www' string
           	var o = k.substring(k.length-3,k.length);
             o = "www";
			var p = k.substring(0,k.length-3);
             p = "http://";
            var q = p + o + x;
             $(this).val(q);
             $(".userval").html(a);
             $("#msg-success").show();			 
          }			
		}	   
	   else{
         $(this).val(a);
        }		 
    }	   
  }
  else{
    throw new Error("Don't enter space, mate..");
   }
}
// rectification routine for all input[type = number]
function numCorrect(){
    var f = $(this).val();
    if(/([#~!`$%\^&*\-a-z\+=\\{\}\,\.\?\/(\)[\]"|;:'<>@]+)/gi.test(f)){
        var e = f.replace(/([#~!`$%\^&*\-a-z\+=\\{}(\)[\]"|;:'<>@]+)/g,"");
        $(this).val(e);
        $(".userval").html(f);
        $("#msg-success").show();
    }
 }

/* From here begins the routines for strict mode */

// routine for input[type = text] in strict mode
function textFilter(e){
    if(/([~!@#$\^`\*\+\/\?\,\\{}[\]%\d"&\-=(\)_|;:'<>]+)/g.test(String.fromCharCode(e.charCode))){
     e.preventDefault();
	}
}
 
// routine for input[type = email] in strict mode
function emailFilter(e){
    if(/([#~!`$%\^&*\-\+=\\{\}(\)\/\?\,[\]"|;:'<>]+)/g.test(String.fromCharCode(e.charCode))){
	 e.preventDefault();
	} 
}
 
// routine for input[type = tel] in strict mode
function telFilter(e){
    if(/([#~!`$@a-z%\^&*\?\,\.\/\+=\\{}(\)[\]"|;:'<>]+)/gi.test(String.fromCharCode(e.charCode))){
	 e.preventDefault();
	} 
}

// routine for input[type = url] in strict mode
function urlFilter(e){
    if(/([#~!`$\?\,@%\^&*\+=\\{\}(\)[\]"|;'<>]+)/g.test(String.fromCharCode(e.charCode))){
	 e.preventDefault();
	} 
}

// routine for input[type = number] in strict mode
function numFilter(e){
    if(/([#~!`$\/\,\.@a-z%\^&*\-\+=\\{\}(\)[\]"|;:'<>]+)/gi.test(String.fromCharCode(e.charCode))){
	 e.preventDefault();
	} 
}

$(".do_close").click(function(){
   $(".msg").hide();
});
/* -=-=-=-=-=-=-=-=-=ENDS OF ALL FUNCTION DEFINITIONS -=-=-=-=-=-=-=-=-=-=-=-=-=- */

/* -+-+-+-+-+-+-+-+-+-+ Functions get called according to the correct mode & context -+-+-+-+-+-+-+-+-+-+ */
  return this.each(function(){
    if(options.mode == "friendly"){
        if(options.appliesTo == "text"){
            $(this).on("change",textCorrect);
        }
        else if(options.appliesTo == "email"){
            $(this).on("change",emailCorrect);
        }
        else if(options.appliesTo == "tel"){
            $(this).on("change",telCorrect);
        }
        else if(options.appliesTo == "num"){
            $(this).on("change",numCorrect);
        }
        else if(options.appliesTo == "url"){
            $(this).on("change",urlCorrect);
        }
    }
    else if(options.mode == "strict"){
        if(options.appliesTo == "text"){
            $(this).on("keypress",textFilter);
        }
        else if(options.appliesTo == "email"){
            $(this).on("keypress",emailFilter);
        }
        else if(options.appliesTo == "tel"){
            $(this).on("keypress",telFilter);
        }
        else if(options.appliesTo == "num"){
            $(this).on("keypress",numFilter);
        }
        else if(options.appliesTo == "url"){
            $(this).on("keypress",urlFilter);
        }
    }
  });
 };
})(jQuery); 