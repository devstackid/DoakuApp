export function gmod(n, m) {
  return ((n % m) + m) % m;
}

function kuwaiticalendar(adjust){
	var today = new Date();
	if(adjust) {
		var adjustmili = 1000*60*60*24*adjust;
		var todaymili = today.getTime()+adjustmili;
		today = new Date(todaymili);
	}
	var day = today.getDate();
	var month = today.getMonth();
	var year = today.getFullYear();
	var m = month+1;
	var y = year;
	if(m<3) {
		y -= 1;
		m += 12;
	}

	var a = Math.floor(y/100.);
	var b = 2-a+Math.floor(a/4.);
	if(y<1583) b = 0;
	if(y==1582) {
		if(m>10)  b = -10;
		if(m==10) {
			b = 0;
			if(day>4) b = -10;
		}
	}

	var jd = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day+b-1524;

	b = 0;
	if(jd>2299160){
		a = Math.floor((jd-1867216.25)/36524.25);
		b = 1+a-Math.floor(a/4.);
	}
	var bb = jd+b+1524;
	var cc = Math.floor((bb-122.1)/365.25);
	var dd = Math.floor(365.25*cc);
	var ee = Math.floor((bb-dd)/30.6001);
	day =(bb-dd)-Math.floor(30.6001*ee);
	month = ee-1;
	if(ee>13) {
		cc += 1;
		month = ee-13;
	}
	year = cc-4716;

	if(adjust) {
		var wd = gmod(jd+1-adjust,7)+1;
	} else {
		wd = gmod(jd+1,7)+1;
	}

	var iyear = 10631./30.;
	var epochastro = 1948084;
	var epochcivil = 1948085;

	var shift1 = 8.01/60.;

	var z = jd-epochastro;
	var cyc = Math.floor(z/10631.);
	z = z-10631*cyc;
	var j = Math.floor((z-shift1)/iyear);
	var iy = 30*cyc+j;
	z = z-Math.floor(j*iyear+shift1);
	var im = Math.floor((z+28.5001)/29.5);
	if(im==13) im = 12;
	var id = z-Math.floor(29.5001*im-29);

	var myRes = new Array(8);

	myRes[0] = day; //calculated day (CE)
	myRes[1] = month-1; //calculated month (CE)
	myRes[2] = year; //calculated year (CE)
	myRes[3] = jd-1; //julian day number
	myRes[4] = wd-1; //weekday number
	myRes[5] = id; //islamic date
	myRes[6] = im-1; //islamic month
	myRes[7] = iy; //islamic year

	return myRes;
}

function writeIslamicDate(adjustment) {
	var wdNames = new Array("Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu");
	var iMonthNames = new Array("Muharram","Shafar","Rabi'ul Awwal","Rabi'ul Akhir",
	"Jumadil Awwal","Jumadil Akhir","Rajab","Sya'ban",
	"Ramadan","Syawal","Dzul Qa'adah","Dzul Hijjah");
	var iDate = kuwaiticalendar(adjustment - 2);
	var Masehi = new Date();
	var JamSekarang = Masehi.getHours();
	var outputIslamicDate = wdNames[iDate[4]] + ", "
	+ iDate[5] + " " + iMonthNames[iDate[6]] + " " + iDate[7] + " H.";
	return "<h3 style='margin-bottom: 10px;'>" + outputIslamicDate + "</h3>";
}

function GetMunasabah(adjustment){
	var Masehi = new Date();
	var JamSekarang = Masehi.getHours();
	var KalenderMunasabah = kuwaiticalendar(adjustment - 2);
	var HariBerapa = KalenderMunasabah[5];
	var BulanBerapa = KalenderMunasabah[6];
	BulanBerapa = BulanBerapa + 1;
	var TahunBerapa = KalenderMunasabah[7];
	var BerapaHariLagi = "HARI INI";
	var outputString = "";
	var LoopLimit = 30;
	var LoopCounter = 0;
	while(LoopCounter < LoopLimit)
	{
		if(LoopCounter == 0)
		{
			BerapaHariLagi = "HARI INI";
		}
		else if(LoopCounter >= 0)
		{
			BerapaHariLagi = "<span style='font-weight: bold;'>" + LoopCounter + " Hari Lagi</span>";
		}
		if(HariBerapa == 30)
		{
			HariBerapa = 1;
			BulanBerapa = BulanBerapa + 1;
			if(BulanBerapa == 13)
			{
				BulanBerapa = 1;
				TahunBerapa = TahunBerapa + 1;
			}
		}
		if(MunasabahDB() != undefined)
			outputString += "<cilik>" + MunasabahDB() + "</cilik>";
		HariBerapa += 1;
		LoopCounter += 1;
	}
	
	return outputString;
	
	function MunasabahDB()
	{
		//console.log(HariBerapa + "-" + BulanBerapa);
		switch (HariBerapa + "-" + BulanBerapa) {
			case "9-1":
				return "Tasu'a - Syahidnya Abul Fadhl Abbas as"+" ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "10-1":
				return "Asyura - Syahidnya Imam Husain as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "12-1":
				return "Wafat Imam Ali Zainal Abidin as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "3-2":
				return "Lahirnya Imam Muhammad Baqir as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "7-2":
				return "Lahirnya Imam Musa Al-Kadhim as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "20-2":
				return "Arba'in ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "28-2":
				return "Wafat Rasulullah saw & Wafat Imam Hasan Mujtaba as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "8-3":
				return "Wafat Imam Hasan Askari as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "12-3":
				return "Maulid Nabi Muhammad saw (Ahlu Sunnah) ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "17-3":
				return "Maulid Nabi Muhammad saw (Syiah) ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "8-4":
				return "Lahirnya Imam Hasan Askari as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "10-4":
				return "Wafat Sayyidah Fathimah Ma'shumah as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "5-5":
				return "Lahirnya Sayyidah Zainab as "+"("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "3-6":
				return "Wafat Sayyidah Fathimah Azzahra as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "20-6":
				return "Lahirnya Sayyidah Fathimah Azzahra as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "1-7":
				return "Lahirnya Imam Muhammad Baqir as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "3-7":
				return "Wafat Imam Ali An-Naqi as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "10-7":
				return "Lahirnya Imam Muhammad Taqi as (" + BerapaHariLagi +")"+"<br/>";
				break;
			case "13-7":
				return "Lahirnya Imam Ali bin Abi Thalib as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "15-7":
				return "Wafat Sayyidah Zainab as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "25-7":
				return "Wafat Imam Musa Al-Kadhim as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "3-8":
				return "Lahirnya Imam Husain as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "4-8":
				return "Lahirnya Abul Fadhl Abbas as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "5-8":
				return "Lahirnya Imam Ali Zanal Abidin as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "11-8":
				return "Lahirnya Ali Al-Akbar as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "15-8":
				return "Lahirnya Mahdi Shahbuz Zaman as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "15-9":
				return "Lahirnya Imam Hasan Mujtaba as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "18-9":
				return "Malam Lailatul Qadar 1 ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "19-9":
				return "Malam kepala Imam Ali as terpukul pedang Ibnu Muljam ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "21-9":
				return "Malam Lailatul Qadar 2 & Wafat Imam Ali as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "23-9":
				return "Malam Lailatul Qadar 3 ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "1-10":
				return "Hari Raya Iedul Fitri ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "25-10":
				return "Wafat Imam Ja'far Shadiq as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "1-11":
				return "Lahirnya Sayyidah Fathimah Ma'shumah as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "11-11":
				return "Lahirnya Imam Ali Ridha as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "30-11":
				return "Wafat Imam Muhammad Taqi Al-Jawad as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "7-12":
				return "Wafat Imam Muhammad Baqir as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "9-12":
				return "Hari 'Arafah ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "10-12":
				return "Hari Raya Iedul Adha ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "15-12":
				return "Lahirnya Imam Ali An-Naqi Al-Hadi as ("+ BerapaHariLagi +")"+"<br/>";
				break;
			case "18-12":
				return "Hari Raya Iedul Ghadir ("+ BerapaHariLagi +")"+"<br/>";
				break;
			default:
		}
		return;
	}
}

export { kuwaiticalendar, writeIslamicDate, GetMunasabah };
