#Date Widget : Show Today's Nepali Date in your website#

##Overview
DateJS (Date Widget) is a simple javascript widget to display today's Nepali date in your site. If you want to display date in Bikram Sambat (BS) dynamically, then its easy now. This widget will do that job. You can either show date in English language or in Nepali unicode. It can be configuration easily. Different date formats are available. See Settings section for available date formats. It is not necessary to include any javascript library for using this widget.
##Features
- Simple and easy to install
- Customizable
- Supports display language; English or Nepali
- Various date formats
- Supports time also
- Time may be in 24hr or 12hr format
- Supports multiple instance in single page

##How to use
Intalling this widget is very easy. You just need to copy given code and after customizing it, paste it to your web page. If you are using any CMS or blogging service then paste it in Text/Html widget.

###Basic Installation
  `<script src="http://nilambar.com.np/dateapi/widget.js"></script>     
  <script id="mywidget">    
  DateJS.Widget();    
  </script>`

###Advanced Installation
`<script src="http://nilambar.com.np/dateapi/widget.js"></script> 
<script id="mydatewidget">
DateJS.Widget({  
  dateLanguage : 'np',
  dateFormat : 6,
  showPoweredBy : true,
  widgetId : 'mydatewidget'
});
</script>`

**For details** : [Click here](http://www.nilambar.net/2012/08/date-widget-show-today-nepali-date-easy.html)
