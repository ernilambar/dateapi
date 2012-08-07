(function() {
  var jQuery;
  var serverFQDN = 'http://nilambar.com.np/dateapi';
  var timeoutId, options, container;

  if (!window.DateJS) window.DateJS = {};
  DateJS.Widget = function(opts) {
    options = opts;	
		
	options.dateLanguage = (!options.dateLanguage)?'np':options.dateLanguage;
	options.dateFormat = (!options.dateFormat)?6:options.dateFormat;
	options.dateSeparator = (!options.dateSeparator)?' ':options.dateSeparator;
	options.showPoweredBy = (options.showPoweredBy === true || options.showPoweredBy === false)?options.showPoweredBy:true;
	//
	options.showTime = (options.showTime === true || options.showTime === false)?options.showTime:true;
	options.showSeconds = (options.showSeconds === true || options.showSeconds === false)?options.showSeconds:false;
	options.militaryTime = (options.militaryTime === true || options.militaryTime === false)?options.militaryTime:false;
	options.showTimeBeforeDate = (options.showTimeBeforeDate === true || options.showTimeBeforeDate === false)?options.showTimeBeforeDate:false;
	options.multiLine = (options.multiLine === true || options.multiLine === false)?options.multiLine:false;
	//
	options.widgetIdNH = (!options.widgetId)?'mywidget':options.widgetId;
	options.widgetId = '#'+options.widgetIdNH;
    
	container = options.widgetId+'1' ;
	
  };

  function init() {
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.7.2') {
      //console.log('we need to load jQuery');
      var script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js");
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
      if (script_tag.attachEvent) {
        //console.log('oh cool, this is IE');
        script_tag.onreadystatechange = function() { // for IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
            this.onreadystatechange = null;
            scriptLoadHandler();
          }
        };
      } else {
        script_tag.onload = scriptLoadHandler;
      }
    } else {
      jQuery = window.jQuery;
      //console.log('jQuery already exists on page');
      main();
    }
  }

  function scriptLoadHandler() {
    jQuery = window.jQuery.noConflict();
    //console.log('jQuery is now loaded');
    main();
  }
  
  function main() {
    jQuery(document).ready(function() {   
	
      if (jQuery(container).size() === 0) {
        jQuery(options.widgetId).after('<div id="'+ options.widgetIdNH+'1"></div>');
      }
	
      jQuery(container).addClass('cleancss');
      
      render(options);
    });
  }
  
  function render(params) {
    //
	jQuery.getJSON(serverFQDN+'/today.php?callback=?',params,serverResponse);
	//
  }
 
	function serverResponse(data) {
		var output ='';
		if(data.error == '1')
		{
			output = data.error_message;
		}
		else
		{
			output += '<div>';
			//
			//for Time
			var timestr = '';
			if(options.showTime === true)
			{
				timestr +=' ';
				timestr +='<span id="time-' + options.widgetIdNH + '"></span>';
				timestr +=' ';				
			}	
			//////
			if(options.showTime === true && options.showTimeBeforeDate === true)
			{
				output += timestr;
				if(options.multiLine === true)
				{
					output += '<br/>';
				}
			}
			//for Date part
			switch(options.dateFormat)
			{
				case 1:
				  //dd mm yyyy
				  output += data.date + options.dateSeparator + data.month +  options.dateSeparator +data.year;
				  break;
				case 2:
				  //yyyy dd mm 
				  output += data.year+ options.dateSeparator + data.date +  options.dateSeparator +data.month;
				  break;
				case 3:
				  //yyyy mm dd 
				  output += data.year+ options.dateSeparator + data.month +  options.dateSeparator +data.date;
				  break;				  
				case 4:
				  //dd monthName yyyy
				  output += data.date+ options.dateSeparator + data.month_name +  options.dateSeparator +data.year;
				  break;
				case 5:
				  //yyyy monthName dd
				  output += data.year+ options.dateSeparator + data.month_name +  options.dateSeparator +data.date;
				  break;
				case 6:
				  //dd monthName yyyy, Day
				  output += data.date+ options.dateSeparator + data.month_name +  options.dateSeparator +data.year + ', ' + data.day;
				  break;
				case 7:
				  //Day, dd monthName yyyy
				  output += data.day + ', ' + data.date+ options.dateSeparator + data.month_name +  options.dateSeparator +data.year;
				  break;
				case 8:
				  //yyyy monthName dd, Day
				  output += data.year+ options.dateSeparator + data.month_name +  options.dateSeparator +data.date + ', '+ data.day;
				  break;
				case 9:
				  //Day, yyyy monthName dd
				  output += data.day + ', '+ data.year+ options.dateSeparator + data.month_name +  options.dateSeparator +data.date;
				  break;
				default:
				  //default				  
			}
			//
			//////
			if(options.showTime === true && options.showTimeBeforeDate === false )
			{
				if(options.multiLine === true)
				{
					output += '<br/>';
				}
				output += timestr;
			}		
			//
			if(!(options.showPoweredBy === false))
			{
				output +='<p style="font-size:11px;"><em>Powered by <a href="http://www.nilambar.net" target="_blank"><strong>nilambar.net</strong></a></em></p>';
			}
			//
			output += '</div>'; 
			
		}
		
		updateOutput(output);
		//
		startTime('time-'+options.widgetIdNH,data.time_hour, data.time_minute, options.dateLanguage);
		//
	}
  //
  //Functions for Time
  function startTime(id, hour, minute, lang)
  {
	  minute = minute * 1;
	  hour = hour * 1;
	  updateTime( id, hour, minute , lang );
	  t = window.setInterval( function(){ 
	  		minute = minute*1 +1;
			hour = hour * 1;
			if(minute >= 60)
			{
				minute = 0*1;
				hour = hour*1 + 1;
			}
	  		updateTime( id, hour, minute , lang ); 
		}, 1000*60);
  }
  function updateTime(id, hour, minute, lang)
  {
	  var hr = checkTime(hour);
	  var mn = checkTime(minute);
	  if(lang == 'np')
	  {
		  hr = convertToUnicode(hour);
		  mn = convertToUnicode(minute);
	  }
	  jQuery('#'+id).html(hr+':'+mn);
  }
  function checkTime(i) {
		return ( i < 10 ) ? '0' + i : i;
	}
  function convertToUnicode(number)
	{
		output=[];
		new_arr=[];
		while (number) {
			output.push(number % 10);
			number = Math.floor(number/10);
		}
		var arr = output.reverse();
		if(arr.length==1)
		{
			arr.unshift('0');
		}
		if(arr.length == 0)
		{
			arr.unshift('0');
			arr.unshift('0');
		}
				
		for(i=0; i< arr.length; i++ )
		{
			new_arr[i]= digitInNepali(arr[i]);
		}
		return new_arr.join('');
	}
	function digitInNepali(num)
	{
		var nep_arr = Array('०','१','२','३','४','५','६','७','८','९');
		return nep_arr[num];
	}
  ///////////////////////////////////////
  function updateOutput(msg) {
	  jQuery(container).html(msg);
	  return;    
  }
    
  init();
  
})();
