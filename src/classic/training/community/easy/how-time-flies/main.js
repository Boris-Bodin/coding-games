var BEGIN = readline();
var END = readline();


beginDate = new Date(BEGIN.split('.')[2],+(BEGIN.split('.')[1])-1,BEGIN.split('.')[0])
endDate = new Date(END.split('.')[2],+(END.split('.')[1])-1,END.split('.')[0])


function dateDiff(dateold, datenew)
{
	var ynew = datenew.getFullYear();
	var mnew = datenew.getMonth();
	var dnew = datenew.getDate();
	var yold = dateold.getFullYear();
	var mold = dateold.getMonth();
	var dold = dateold.getDate();
	var diff = ynew - yold;
	if(mold > mnew) diff--;
	else
	{
		if(mold == mnew)
		{
			if(dold > dnew) diff--;
		}
	}
	return diff;
}

function monthDiff(dateold, datenew)
{
	var mnew = datenew.getMonth();
	var dnew = datenew.getDate();
	var mold = dateold.getMonth();
	var dold = dateold.getDate();
	var diff = mnew - mold;
	if(dold > dnew) diff--;
	return diff;
}

function dayDiff(d1, d2)
{
	d1 = d1.getTime() / 86400000;
	d2 = d2.getTime() / 86400000;
	return new Number(d2 - d1).toFixed(0);
}


var years = dateDiff(beginDate, endDate);
var month = Math.abs(beginDate.getMonth() - endDate.getMonth()) + 12 % 12;
var month = monthDiff(beginDate, endDate);
var days =  dayDiff(beginDate, endDate);

out = ''
if(years > 0){
	out += years +' year'
	if(years > 1){
		out += 's'
	}
	out += ', '
}
if(month > 0){
	out += month +' month'
	if(month > 1){
		out += 's'
	}
	out += ', '
}

print(out + 'total '+ days +' days');