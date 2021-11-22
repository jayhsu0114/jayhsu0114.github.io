const =() => {
	const countdate = new Date ("Apr 2,2022 00:00:00").gettime()
	const now = new date().gettime();
	const gap = countdate - now;

	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;
	const textday = math.floor(gap/day);
	const texthour = maath.floor((gap % day) / hour );
	const textminute = maath.floor((gap % hour) / minute );
	const textsecond = maath.floor((gap % minute) / second );

	document.qureyselector('.day').innertext= textday;
	document.qureyselector('.hour').innertext= texthour;
	document.qureyselector('.minute').innertext= textminute;
	document.qureyselector('.second').innertext= textsecond;

};
setinterval(countdown,1000);