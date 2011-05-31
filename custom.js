$(document).ready(function() {
//setup the regex filter
	jQuery.expr[':'].regex = function(elem, index, match) {
		var matchParams = match[3].split(','),
			validLabels = /^(data|css):/,
			attr = {
				method: matchParams[0].match(validLabels) ? 
							matchParams[0].split(':')[0] : 'attr',
				property: matchParams.shift().replace(validLabels,'')
			},
			regexFlags = 'ig',
			regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
		return regex.test(jQuery(elem)[attr.method](attr.property));
	}
	//setup the get getter
	var $_GET = {};
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
		function decode(s) {
			return decodeURIComponent(s.split("+").join(" "));
		}

		$_GET[decode(arguments[1])] = decode(arguments[2]);
	});
if(window.location.pathname !="/csms/wprin_menu.main" && $_GET['format'] != 'P'){
	


	//#################### BODY
	
	//remove the link attributes
	$("body").removeAttr("link");
	$("body").removeAttr("vlink");
	$("body").removeAttr("alink");
	
	
	//#################### NAV TABS 
	
	//little function telling JS how to sort by name in our multi-dimensional array to come
	function sortByName(a, b) {
		var x = a.name.toLowerCase();
		var y = b.name.toLowerCase();
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	}
	
	
	//get an array of navbar elements
	var navElements = new Array();
	var navHighlight;
	$("td[bgcolor=#7F94BB]").parents("TABLE").find("a").each(function(){
		//navHref.push($(this).attr("href"));
		//navName.push($(this).text());
		navElements[navElements.length++] = {href:$(this).attr("href"),name:$(this).text()};
		if($(this).parents('td').attr('bgcolor') == '#002A8F'){
			navHighlight = $(this).text();
		}
	});
	navElements.sort(sortByName);

	//prepare the new navbar
	var navBar = '<ul class="nav">';
	for(var i in navElements){
		var liClass = '';
		if(navElements[i].name == navHighlight){
			liClass=' highlight';
		}
		navBar += '<li class="nav '  + liClass + '"><a href="' + navElements[i].href +'" class="nav">' + navElements[i].name + '</a></li>';
	}
	navBar += '</ul><div style="clear:both;"></div>';
	//remove the old navbars
	$("td[bgcolor=#002A8F]").parents("TABLE").replaceWith(navBar);
	$("td[bgcolor=#7F94BB]").parents("TABLE").remove();
	
   
 
	//#################### HEADER
	//replace header
	$("td:contains('Personal Information Portal')").parents("table").replaceWith('<div id="header">&nbsp;</div>');
	
	//#################### TIME TABLE
	
	//add timeTable class to timetable table.. table...
	$("th:contains('Monday')").parentsUntil("table").addClass("timeTable");
	//add tableHeader class to headers
	$("th:contains('Monday')").parents("tr").addClass("tableHeader");
	//add TableHeaderCell class to header Cells
	$("th:contains('Monday')").parents("tr").children("th").addClass("tableHeaderCell");
	
	//remove the pointless event <tr>
	$("th:contains('Event')").parents("tr").remove();
	
	//remove the rowspan that /was/ needed for the above
	$("th:contains('Hours')").removeAttr("rowspan");
	
	//remove the pointless spacer
	$("th[bgcolor~=#888888]").parent("tr").remove();
	
	//remove the damn small tags
	$("small").remove();
	
	//add the timeTableRow and timeTableCell to the time table's rows 'n cells
	var timeSlots = ["9-10","10-11","11-12","12-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9"];
	for(var i in timeSlots){
		if(!(i % 2)){ //if the number's even
			$("th:contains('" +  timeSlots[i] + "')").parents("tr").addClass("timeTableRowEven");
		}
		$("th:contains('" +  timeSlots[i] + "')").parents("tr").children("td").addClass("timeTableCell");
	}
	
	//#################### REARRANGE MY PIP PAGE
	
	var firstTd = $("td:contains('Important Notices')").next();
	var secondTd = firstTd.next();
	secondTd.parents("tr").after("<tr><td><h2 class='custom'>Address Details</h2>" + secondTd.html() + "<td></tr>");
	secondTd.parents("tr").after("<tr><td><h2  class='custom'>Enrolment Details</h2>" + firstTd.html() + "</td></tr>");
	firstTd.remove();
	secondTd.remove();
	$("th:contains('Qualifications')").parent().parent().parent().before("<h2 class='custom'>Qualifications</h2>");
	
	//#################### FOOTER
	//remove the horizontal rule
	$("hr").remove();
	//remove the logo
	$("center").has("img[SRC~=/images/smalllogo.gif]").remove();
 }});