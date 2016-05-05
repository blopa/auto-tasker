// TODO fazer while invalid

//var doc = document.getElementsByTagName('pre')[0].firstChild.data;
var doc = document.body.innerHTML;
doc = doc.slice(0, doc.indexOf("--------------------")).replace(/^\s*\n/gm,"");
var atividades = doc.split("\n");
var sData = atividades[0];
var isFirst = true;
var horarios = new Array();
var ativs = new Array();
var task = new Array();
atividades.forEach(function(entry)
{
	if (isFirst)
		isFirst = false;
	else
	{
		horarios.push(entry.substring(0, 5));
		ativs.push(entry.slice(8, entry.indexOf(";")));
		task.push(entry.substr(entry.indexOf(";") + 1));
	}
});

var output = "";

for (var i = 1; i < horarios.length - 1; i++)
{
	if (task[i] != "000000")
	{		
		output += "function func" + i +"(){";
		output += "document.getElementById('btnAddAlocacao-btnWrap').click();";
		output += "var cont = null;";
		output += "while(cont == null)";
		output += "{";
		output += "setTimeout(function(){}, 50);";
		output += "cont = document.getElementById('ESFDATA-inputEl');";
		output += "if (cont != null)";
		output += "part2();";
		output += "}";
		output += "function part2(){";
		output += "document.getElementById('ESFDATA-inputEl').value = '" + sData + "';";
		output += "document.getElementById('ESFHORARIOINICIO-inputEl').value = '" + horarios[i] + "';";
		output += "document.getElementById('ESFHORARIOTERMINO-inputEl').value = '" + horarios[i-1] + "';";
		output += "document.getElementById('cmp_ESFSOLCOD-inputEl').value = '" + task[i] + "';";
		output += "document.getElementById('ESFCOMENTARIO').value = '" + ativs[i] + "';";
		output += "window.setTimeout(part3, 100);";
		output += "}";
		output += "function part3(){";
		output += "var btnId = document.getElementById('cmp_ESFSOLCOD-triggerWrap').getElementsByTagName('img')[1].id;";
		output += "document.getElementById(btnId).click();";
		output += "var cont = document.getElementById('cmp_ESFSOLCOD-inputEl').value;";
		output += "while(cont.length < 8)";
		output += "{";
		output += "setTimeout(function(){}, 50);";
		output += "cont = document.getElementById('cmp_ESFSOLCOD-inputEl').value;";
		output += "if (cont.length > 8)";
		output += "part4();";
		output += "}";
		output += "}";
		output += "function part4(){";
		output += "document.getElementById('btnConfirm_win-detail-mdlEsforco-btnIconEl').click();";
		output += "var cont = null;";
		output += "while(cont != null)";
		output += "{";
		output += "setTimeout(function(){}, 50);";
		output += "cont = document.getElementById('ESFDATA-inputEl');";
		output += "if (cont == null)";
		output += "func" + (i + 1) +"();";
		output += "}";
		//output += "window.setTimeout(func" + (i + 1) +", 5000);";
		output += "}";
		output += "}";
	}
	else
	{
		output += "function func" + i +"(){";
		output += "func" + (i + 1) + "();";
		output += "}";
	}
	
	if (i + 1 == horarios.length - 1)
	{
		output += "function func" + (i + 1) + "(){";
		output += "window.alert('Terminado!');";
		output += "}";
	}	
}

//console.log(output);

document.getElementsByTagName('body')[0].innerHTML = output;