function Translit(source){
	var CyrAlph = "йцукенгзхфывапролджэсмтбіқһъьЙЦУКЕНГЗХФЫВАПРОЛДЖЭСМТБІҚҺЪЬ";
	var LatAlph = "ysukengzhfyvaproldjesmtbiqhiiYSUKENGZHFYVAPROLDJESMTBIQHII";
	var QazAlph = "әңғүұөшщячюиёӘҢҒҮҰӨШЩЯЧЮИЁ";
	var QazLat =["á", "ng", "gh", "ý", "ú", "ó", "sh", "sh", "ya", "ch", "yu", "iy", "yo",
	                            "Á", "Ng", "Gh", "Ý", "Ú", "Ó", "Sh", "Sh", "Ya", "Ch", "Yu", "Iy", "Yo"];
								
	var DauystyJuan = "аиоуүыэюяч";
    var  DauystyJing = "әеөүұі";
    var  Dauyssyz = "йцкнгзхфвпрлджсмтбшщчъь";
	var  JJbelgiler="ьъЬЪ";
	var Dauysty="еяёю";
	var YYY="үҮыЫ";
	var newSource="";
	
	for (i=0; i<source.length; i++){

		if (source[i]=="и" || source[i]=="И"){		// И әрпі ережелеріне сәйкестендіру
					prevIY = source[i - 1].toLowerCase();
                    nextIY1 = source[i + 1].toLowerCase();
                    nextIY2 = source[i + 2].toLowerCase();

                    if ((DauystyJuan.indexOf(nextIY1) != -1) ||
                        (Dauyssyz.indexOf(nextIY1) != -1 &&
                        (Dauyssyz.indexOf(nextIY2) != -1) || DauystyJuan.indexOf(nextIY2) != -1) || nextIY2 == " ")
                    {
                        if (source[i]==source[i].toUpperCase())
						current = "I";
						else current = "i";
                    }
                    else if ((DauystyJing.indexOf(nextIY1) != -1) ||
                        (Dauyssyz.indexOf(nextIY1) != -1 && DauystyJing.indexOf(nextIY2) != -1))
                    {
                        if (source[i]==source[i].toUpperCase())
						current = "IY";
						else current = "iy";
                    }
                    else
                        { if (source[i]==source[i].toUpperCase())
						current = "IY";
						else current = "iy"; 
						}
					newSource=newSource+current;
		}
		
		else if (source[i]=="й" || source[i]=="Й"){		// Й әрпі ережелеріне сәйкестендіру
					prevIY = source[i - 1].toLowerCase();
                    if (YYY.indexOf(prevIY)!=-1){
						if (source[i]==source[i].toUpperCase())
							current = "I";
							else current = "i";
						} 
					else { if (source[i]==source[i].toUpperCase())
							current = "Y";
							else current = "y"; 
						}
			newSource=newSource+current;
		}
		else if (JJbelgiler.indexOf(source[i],0)!=-1){  // егер ь немесе ъ кездессе
			nextJ=source[i+1].toLowerCase();
			if (Dauysty.indexOf(nextJ)!=-1){
				if (source[i]==source[i].toUpperCase())
						current = "I";
						else current = "i";
			}
			else current="";
			newSource=newSource+current;
		}
		
		else if (CyrAlph.indexOf(source[i],0)!=-1){			// бірлікті әріптерді алмастыру
			var j=CyrAlph.indexOf(source[i]);
			newSource=newSource+LatAlph[j];

		}
		else if (QazAlph.indexOf(source[i])!=-1){			// екілікті әріптерді алмастыру
			j=QazAlph.indexOf(source[i]);

			newSource=newSource+QazLat[j];

		}
		else newSource=newSource+source[i];					// егер әріп кириллдік болмаса
	}
	document.getElementById('output').value=newSource;
	return newSource;
	
}