//ABCnet Translit
//All rights reserved by Assem Aimaganova a.aimaganova@gmail.com
//Version 6.8
//Last edited 18/10/2020



// /*Translit function gets the source as an input from the textarea, it should be passed as UTF-8 by calling onClick="Translit(document.getElementById('input1').value)", 
//the output is passed from the function as a newSource, before returning it, it writes it into output textarea by document.getElementById('output').value=newSource;*/
function Translit(source)
{
	var output = document.getElementById('output'); // аударылған тексті қайда шығарады

	var Alphabet="аәбвгғдеёжзийкқлмнңоөпрстуүұфхһцчшщъыіьэюя";
	var CyrAlph = "йцукенгзхфывапролджэсмтбіқһъьЙЦУКЕНГЗХФЫВАПРОЛДЖЭСМТБІҚҺЪЬ"; // the default Kazakh Cyrillic alphabet
	var LatAlph = "ysukengzhfyvaproldjesmtbiqhiiYSUKENGZHFYVAPROLDJESMTBIQHII"; // letter by letter transliteration
	var QazAlph = "әғүұөшщячюиёӘҒҮҰӨШЩЯЧЮИЁ"; // irregular letters in Cyrillic
	var QazLat = ["á", "gh", "ý", "ú", "ó", "sh", "sh", "ya", "ch", "yu", "iy", "yo",
		"Á", "Gh", "Ý", "Ú", "Ó", "Sh", "Sh", "Ya", "Ch", "Yu", "Iy", "Yo"
	]; //irregular letters in Latin

	var DauystyJuan = "йаиоуүыэюяч";// буквы после И подобны иностранным словам или исключениям
	var DauystyJing = "әеөүұі";
	var Dauyssyz = "йцкнгзхфвпрлджсмтбшщчъь";
	var JJbelgiler = "ьъЬЪ";
	var Dauysty = "еяёю";	//буквы после Ь ил Ъ
	var YYY = "ӘәӨөҮүҰұыЫ"; //Й алдынды кездесетін дауысты әріптер
	var AOE="АаОоЕе"; // Тек осы әріптерден басталса ғана І деп жазылатын Й
	var newSource = "";
	var TekQZ="ңғқһ"; //исключительно каз буквы
	var TekRus="вйцуфч";//исключительно рус буквы

	for (i = 0; i < source.length; i++)
	{ //проверяем каждую букву на буквы исключения от самой часто встречающейся 

		// ***И әрпі ережелеріне сәйкестендіру
		if (source[i] == "и" || source[i] == "И")
		{
					
			try
			{
				nextIY1 = source[i + 1]; //кейінгі әріпті алу
			}
			catch (err)
			{
				
			}
			try
			{
				nextIY2 = source[i + 2]; //кейінгі екінші әріпті алу, бұл жағдай тек шет тілінен енген сөзді анықтау үшін керек болады
			}
			catch (err)
			{
				
			}
			try
			{
				prevIY1 = source[i - 1]; //кейінгі әріпті алу
			}
			catch (err)
			{
				
			}
			try
			{
				prevIY2 = source[i - 2]; //кейінгі әріпті алу
			}
			catch (err)
			{
				
			}
			finally
			{
				if(nextIY1==null || (Alphabet.indexOf(nextIY1.toLowerCase()) == -1))//если и последняя буква слова
				{
					if (source[i] == source[i].toUpperCase())
						current = "IY";
					else current = "iy";
				}
				else if((prevIY1!=null && (TekQZ.indexOf(prevIY1.toLowerCase())!=-1)) ||(nextIY1!=null && (TekQZ.indexOf(nextIY1.toLowerCase())!=-1))) //если вокруг 'и' казахская буква
				{
					if (source[i] == source[i].toUpperCase())
					current = "Iy";
					else current = "iy";
				}
				else if((prevIY1!=null && (TekRus.indexOf(prevIY1.toLowerCase())!=-1)) ||(nextIY1!=null && (TekRus.indexOf(nextIY1.toLowerCase())!=-1))) //если вокруг 'и' русская буква
				{
					if (source[i] == source[i].toUpperCase())
					current = "I";
					else current = "i";
				}
				else if((prevIY1!=null && (prevIY1.toLowerCase()=="м"|| prevIY1.toLowerCase()=="н" || prevIY1.toLowerCase()=="л" || prevIY1.toLowerCase()=="т")) && (nextIY1!=null && (nextIY1.toLowerCase()=="к" || nextIY1.toLowerCase()=="н"))) //если вокруг 'и' м,н,л и к,н буквы, то это иностранное слово
				{
					if (source[i] == source[i].toUpperCase())
					current = "I";
					else current = "i";
				}
				else if((prevIY1!=null && prevIY1.toLowerCase()=="з") && (nextIY1!=null && nextIY1.toLowerCase()=="д")) //если вокруг 'и' з и д буквы, как в "президент"
				{
					if (source[i] == source[i].toUpperCase())
					current = "I";
					else current = "i";
				}
				else if((nextIY1!=null && 
					     nextIY1.toLowerCase()!="т" && 
						(Dauyssyz.indexOf(nextIY1.toLowerCase())!=-1)) &&
						(nextIY2!=null && 
						(Dauyssyz.indexOf(nextIY2.toLowerCase())!=-1))) //если после "и" стоят две согласной, кроме слова "ит", это скорее всего иностранное слово
				{
					if (source[i] == source[i].toUpperCase())
					current = "I";
					else current = "i";
				}
				else if (nextIY1!=null && (DauystyJuan.indexOf(nextIY1.toLowerCase()) != -1)) //окончания -ия, -ию...
				{
					if (source[i] == source[i].toUpperCase())
						current = "I";
					else current = "i";
				}
				
				else
				{
					if (source[i] == source[i].toUpperCase())
						current = "Iy";
					else current = "iy";
				}
			newSource = newSource + current;
		}
		}
		// *** Й әрпі ережелеріне сәйкестендіру
		else if (source[i] == "й" || source[i] == "Й")
		{
			try
			{
				prevIY = source[i - 1]; //алдыңғы әріпті алу
			}
			catch (err)
			{
				
			}
			try
			{
				nextIY = source[i + 1];
			}
			catch (err)
			{
				
			}
			finally{
			if (nextIY==null || (Alphabet.indexOf(nextIY.toLowerCase()) == -1))
			{ // если Й последняя буква слова
				if (source[i] == source[i].toUpperCase())
					current = "Y";
				else current = "y";
			}
			else if ((prevIY!=null)&&(AOE.indexOf(prevIY) != -1))
			{
				try
				{
					prevAOE=source[i-2];
				}
				catch(err)
				{
					
				}
				finally
				{
					if (prevAOE==null || (Alphabet.indexOf(prevAOE.toLowerCase()) == -1))
					{
						if (source[i] == source[i].toUpperCase())
							current = "I";
						else current = "i";
					}
					else{
						if (source[i] == source[i].toUpperCase())
							current = "Y";
						else current = "y";
					}
				}
				
			}
			else if ((prevIY!=null)&&(YYY.indexOf(prevIY) != -1))
			{ // если одно из гласных после которой должна писаться как і
				if (source[i] == source[i].toUpperCase())
					current = "I";
				else current = "i";
			}
			else
			{
				if (source[i] == source[i].toUpperCase())
					current = "Y";
				else current = "y";
			}
			newSource = newSource + current;
		}
		}
		
		// *** егер ь немесе ъ кездессе
		else if (JJbelgiler.indexOf(source[i], 0) != -1)
		{
			try
			{
			nextJ = source[i + 1];
			}
			catch (err)
			{
				
			}
			finally 
			{
			if ((nextJ!=null)&&(Dauysty.indexOf(nextJ.toLowerCase()) != -1)) //русские имена, например Татьяна
			{
				if (source[i] == source[i].toUpperCase())
					current = "I";
				else current = "i";
			}
			else current = "";
			newSource = newSource + current;
			}
		}

		// *** Ң әрпі ережелері
		else if (source[i] == "ң" || source[i] == "Ң")
		{
			try
			{
				nextNG = source[i + 1];
			}
			catch
			{
				
			}
			finally
			{
			if (nextNG==null || (Alphabet.indexOf(nextNG.toLowerCase()) == -1))
			{ // если Ң последняя буква слова
				if (source[i] == source[i].toUpperCase())
					current = "NG";
				else current = "ng";
			}
			else if ((CyrAlph.indexOf(nextNG)) == -1 || (QazAlph.indexOf(nextNG) == -1))
			{
				if (source[i] == source[i].toUpperCase())
					current = "N";
				else current = "n";
			}
			else
			{
				if (source[i] == source[i].toUpperCase())
					current = "NG";
				else current = "ng";
			}
			newSource = newSource + current;
			}
		}

		// *** Ю әрпін тексеру
		else if (source[i] == "ю" || source[i] == "Ю")
		{
			try
			{
				prevYU = source[i - 1];

			}
			catch (err)
			{
				
			}
			finally
			{
				if (prevYU != null)
				{
					if (Dauyssyz.indexOf(prevYU.toLowerCase()) != -1)
					{ // если перед Ю согласная, скорее всего это иностранное слово, тогда пишем U
						if (source[i] == source[i].toUpperCase())
							current = "U";
						else current = "u";
					}
				}
				else
				{ // by default translit ti YU
					if (source[i] == source[i].toUpperCase())
						current = "Yu";
					else current = "yu";

				}
				newSource = newSource + current;
			}
		}
		else if (source[i] == "ц" || source[i] == "Ц")//правила буквы Ц
		{
			try
			{
				nextIY1 = source[i + 1]; //кейінгі әріпті алу
			}
			catch (err)
			{
				
			}
			try
			{
				nextIY2 = source[i + 2]; //кейінгі екінші әріпті алу, бұл жағдай тек шет тілінен енген сөзді анықтау үшін керек болады
			}
			catch (err)
			{
				
			}
			finally
			{
				if ((nextIY1!=null && nextIY1.toLowerCase()=="и") && 
						(nextIY2!=null && nextIY2.toLowerCase()=="я")) //если после "ц" стоят "и" и "я", иностранный слова заканчивающиеся на -ция
				{
					if (source[i] == source[i].toUpperCase())
					current = "S";
					else current = "s";
				}
				else
				{ // by default translit to C
					if (source[i] == source[i].toUpperCase())
						current = "C";
					else current = "c";

				}
				newSource = newSource + current;
			}
		}
		else if (source[i] == "з" || source[i] == "З")//правила буквы З
		{
			try
			{
				prevZ = source[i - 1]; //алдынғы әріпті алу
			}
			catch (err)
			{
				
			}
			try
			{
				nextIY1 = source[i + 1]; //кейінгі әріпті алу
			}
			catch (err)
			{
				
			}
			try
			{
				nextIY2 = source[i + 2]; //кейінгі екінші әріпті алу, бұл жағдай тек шет тілінен енген сөзді анықтау үшін керек болады
			}
			catch (err)
			{
				
			}
			finally
			{
				if(prevZ!=null && (prevZ.toLowerCase()=="а" || prevZ.toLowerCase()=="е" || prevZ.toLowerCase()=="й" )) //если з не первая буква
				{
					if ((nextIY1!=null && nextIY1.toLowerCase()=="и") &&
					(nextIY2!=null &&
							(nextIY2.toLowerCase()=="я" || nextIY2.toLowerCase()=="д"))) // Азия, президент
					{
						if (source[i] == source[i].toUpperCase())
						current = "S";
						else current = "s";
					}
				
					else
					{ // by default translit to Z
						if (source[i] == source[i].toUpperCase())
							current = "Z";
						else current = "z";

					}
				}
				else
					{ // by default translit to Z
						if (source[i] == source[i].toUpperCase())
							current = "Z";
						else current = "z";

					}
			
				newSource = newSource + current;
			}
		}
		// *** Қалған әріптерді алмастыру
		else if (CyrAlph.indexOf(source[i], 0) != -1)
		{ //бірлікті (буква в букву) әріптерді алмастыру
			var j = CyrAlph.indexOf(source[i]);
			newSource = newSource + LatAlph[j];

		}
		else if (QazAlph.indexOf(source[i]) != -1)
		{ // екілікті (буквосочетания и окутные) әріптерді алмастыру
			j = QazAlph.indexOf(source[i]);

			newSource = newSource + QazLat[j];

		}

		// *** егер әріп кириллдік болмаса
		else newSource = newSource + source[i]; //оставить как есть
	}
	output.value = newSource;
	return newSource;


}
