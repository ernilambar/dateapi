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
```javascript
<script src="http://nilambar.com.np/dateapi/widget.js"/>     
  <script id="mywidget">    
  DateJS.Widget();
  </script>
  ```

###Advanced Installation
```javascript
<script src="http://nilambar.com.np/dateapi/widget.js"/>  
<script id="mydatewidget">
DateJS.Widget({  
  dateLanguage : 'np',
  dateFormat : 6,
  showPoweredBy : true,
  widgetId : 'mydatewidget'
});
</script>   
```

##Settings

| Property | Default | Description |
| :--- | :---: | :--- |
| **dateLanguage** | *'np'* | Language to display date. Either 'en' or 'np'. <br/>Example : <br/>np : १९ साउन २०६९, शुक्रबार <br/>en : 19 Shrawan 2069, Friday |
| **dateFormat** | *6* | Integer value assigned for various date formats.<br/>Example: <br/>1 : १९ ०४ २०६९<br/>2 : २०६९ १९ ०४<br/>3 : २०६९ ०४ १९<br/>4 : १९ साउन २०६९<br/>5 : २०६९ साउन १९<br/>6 : १९ साउन २०६९, शुक्रबार<br/>7 : शुक्रबार, १९ साउन २०६९<br/>8 : २०६९ साउन १९, शुक्रबार<br/>9 : शुक्रबार, २०६९ साउन १९|
|**widgetId**|*'mywidget'*|ID of the widget. If you are using single widget in a page then no need to set this option.<br/>For multiple widgets, assign different name to each script's ID and pass that in this parameter.|
| **dateSeparator**|*' ' (space)*|Date separator. Default is _space_. You may use '-', '\', '/'.|
|**showTime**|*true*|Option to whether display time or not. Enter _false_ to disable|
|**militaryTime**|*false*|_true_ will show time in 24 HOUR format. _false_ for 12 HOUR format|
|**showTimeBeforeDate**|*false*|Show time after date if _false_. Use _true_ if you want to display time before date.|
|**multiLine**|*false*|Set to _true_ if you want to display date and time in separate line.|
|**showPoweredBy**|*true*|Enable of disable the banner display below the date. Setting _false_ will disable it. [ I would appreciate if you enable banner :P ]|
----
**For details** : [Click here](http://www.nilambar.net/2012/08/date-widget-show-today-nepali-date-easy.html)


Thanks to [Jonathan Julian](https://github.com/jjulian) for his [example_javascript_widget](https://github.com/jjulian/example_javascript_widget) using which I was able to make this widget. And also kudos to codeartsnepal for [Nepali-English Date conversion PHP class](http://nepalidateconve.sourceforge.net/).
