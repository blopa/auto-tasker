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
		output += "function func" + i +"part1(){";
		output += "document.getElementById('btnAddAlocacao-btnWrap').click();";
		output += "var cont = document.getElementById('ESFCOMENTARIO');";
		output += "if (cont != null)func" + i +"part1();";
		output += "else setTimeout(func" + i +"part2, 1000);";
		output += "}";
		output += "function func" + i +"part2(){";
		output += "document.getElementById('ESFDATA-inputEl').value = '" + sData + "';";
		output += "document.getElementById('ESFHORARIOINICIO-inputEl').value = '" + horarios[i] + "';";
		output += "document.getElementById('ESFHORARIOTERMINO-inputEl').value = '" + horarios[i-1] + "';";
		output += "document.getElementById('cmp_ESFSOLCOD-inputEl').value = '" + task[i] + "';";
		output += "document.getElementById('ESFCOMENTARIO').value = '" + ativs[i] + "';";
		output += "setTimeout(func" + i +"part3, 300);";
		output += "}";
		output += "function func" + i +"part3(){";
		output += "var btnId = document.getElementById('cmp_ESFSOLCOD-triggerWrap').getElementsByTagName('img')[1].id;";
		output += "var cont = document.getElementById('cmp_ESFSOLCOD-inputEl');";
		output += "if (!cont.disabled && cont.value.length < 8)document.getElementById(btnId).click();";
		output += "if (cont.value.length > 8)func" + i +"part4();";
		output += "else setTimeout(func" + i +"part3, 1000);";
		output += "}";
		output += "function func" + i +"part4(){";
		output += "var click = document.getElementById('btnConfirm_win-detail-mdlEsforco-btnIconEl');";
		output += "if(click != null) click.click();";
		output += "var apagarbtn = document.getElementById('btnConfirm_win-detail-mdlEsforco');";
		output += "if(apagarbtn != null) apagarbtn.innerHTML = '';";
		output += "var cont = document.getElementById('ESFDATA-inputEl');";
		output += "if (cont == null)func" + (i + 1) +"part1();";
		output += "else setTimeout(func" + i +"part4, 1000);";
		output += "}";
	}
	else
	{
		output += "function func" + i +"part1(){";
		output += "func" + (i + 1) + "part1();";
		output += "}";
	}
	
	if (i + 1 == horarios.length - 1)
	{
		output += "function func" + (i + 1) + "part1(){";
		output += "window.alert('Terminado!');";
		output += "}";
	}
}

output += "func1part1();";

//console.log(output);

document.getElementsByTagName('body')[0].innerHTML = output;