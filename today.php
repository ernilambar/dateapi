<?php
	error_reporting(0);
	//showpre($_GET,'',true,false);
	//die;
	$dateType = 'en';
	$dateFormat = $_GET['dateFormat'];
	$dateLanguage = $_GET['dateLanguage'];
	$showTime = ($_GET['showTime']=='true')?true:false;
	$militaryTime = ($_GET['militaryTime']=='true')?true:false;
	
	//
	date_default_timezone_set('Asia/Katmandu');
	include('nepali_calendar.php');
	$cal = new Nepali_Calendar();	
	$eflag=false;
	//	
	$date_arr=explode('-',date('Y-m-d'));
	//	
	//$eflag = true;
	if(!$cal->is_range_eng($date_arr[0],$date_arr[1],$date_arr[2]) && !$eflag)
	{
		$ret_op['error']=1;
		$ret_op['error_message']='Date out of range';
		$eflag=true;
	}
	
	if(!$eflag)
	{		
		$newd=$cal->eng_to_nep($date_arr[0],$date_arr[1],$date_arr[2]);
		
		if($dateLanguage=='np')
		{
			$newd=convertToNepali($newd);
		}
		$outpur_arr = $newd;	
		if($showTime == true)
		{
			if($militaryTime == true)	
				$current_time = date('H-i-s');
			else
				$current_time = date('h-i-s');
			list($time_hour, $time_minute, $time_second)=explode('-',$current_time);
			$outpur_arr['time_hour']	=	$time_hour;
			$outpur_arr['time_minute']	=	$time_minute;
			$outpur_arr['time_second']	=	$time_second;	
		}
	}
	else 
	{
		$outpur_arr =$ret_op;		
	}
	$json_encoded=json_encode($outpur_arr);
	$callback=$_GET['callback'];
	$op=$callback.'('.$json_encoded.')';
?>
<?php
	header('Content-type: text/html');	
	echo $op;
	//
	function convertToNepali($date)
	{
		//
		$date['year']=getNepaliNumber($date['year']);
		$date['month_name']=getMahina($date['month']);
		$date['month']=getNepaliNumber($date['month']);
		$date['day']=getBaar($date['num_day']);
		$date['date']=getNepaliNumber($date['date']);
		
		//print_r($date);
		return $date;
	}
	//////////////
	function getNepaliNumber($num)
	{
		$str=array();
		$numarr=str_split($num);
		if(count($numarr)==1) array_unshift($numarr,'0');
		$number=array('०','१','२','३','४','५','६','७','८','९');			
		for($i=0;$i<count($numarr);$i++)
		{
			$str[$i]=$number[$numarr[$i]];
		}
		return  implode('',$str);
	}
	////////////////
	function getMahina($num)
	{
		$bar=array('बैशाख','जेठ','असार','साउन','भदौ','असोज','कार्तिक','मङि्सर','पुष','माघ','फागुन','चैत');			
		$ret=$bar[$num-1];
		return  $ret;
	}
	//////////////
	function getBaar($num)
	{
		$bar=array('आइतबार','सोमबार','मङ्गलबार','बुधबार','बिहिबार','शुक्रबार','शनिबार');			
		$ret=$bar[$num-1];
		return  ($ret);
	}
	//
	/////////////////////////////////////////////
	function showpre($str,$variable='',$die=false, $style = true,$html=false)
		{
			$o = '<pre';
			if($style)$o.=' style="
			border:1px solid red; background-color:#eee;margin:3px;height:auto; margin-left:3%; 
			overflow:hidden; width:94%;padding:5px; color:#000; text-align:left;
			white-space: pre-wrap;
			white-space: -moz-pre-wrap !important;
			word-wrap: break-word;
			white-space: -o-pre-wrap;
			white-space: -pre-wrap;"';
			$o.='>';
		if($variable!='')
		{
			$o.= '<p';
			if($style) $o.= '  style="border-bottom:1px solid red; color:#f00;font-weight:bold;padding:2px; margin:0px; text-align:left;"';
			$o.= '>'.$variable.'</p>';
		}
		if(!$html)
		{
			$o.= print_r($str,true);			
		}
		else
		{
			$o.= print_r(htmlentities($str),true);			
		}
		
		$o.='</pre>';
		echo  $o;
		if($die) die;
		return ;
		}
	///////////////////////////
	//
	
?>