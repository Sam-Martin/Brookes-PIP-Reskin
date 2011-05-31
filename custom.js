$(document).ready(function() {
if(window.location.pathname !="/csms/wprin_menu.main"){
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

	//#################### BODY
	
	//remove the link attributes
	$("body").removeAttr("link");
	$("body").removeAttr("vlink");
	$("body").removeAttr("alink");
	
	
	//#################### NAV TABS 
	
	//add navBar class to navbar tables
	$(":contains('Admin Services')").parents("table").addClass("navBar");
	$(":contains('My Enrolment & Accounts')").parents("table").addClass("navBar");
	$(":contains('My PIP')").parents("table").addClass("navBar");
	
	//remove the random unclosed TDs
	$("td[width=2][valign=TOP]").remove();
	
	//remove the pointless extra TR
	$("td[colspan=6][rowspan=1][height=1]").parent().remove();
	
	//remove the spacer gif
   $("img[SRC~=/images/spacer.gif]").remove();
   
   //remove the pointless spacer
   $("td[background~=/images/bline.gif]").removeAttr('background');
   
   //add the tab class to the tabs and remove the bgcolor
   $("td[BGCOLOR~=#7F94BB]").addClass("navTabs").removeAttr("bgcolor");
   
   //add navTabsCorner class
   $("img[SRC~=/images/tab_end0.gif]").parents("td").removeClass("navTabs").addClass("navTabsCorner");
   
   //add the highlight class to the highlighted tab
   $("td[bgcolor~=#002A8F]").addClass("navTabsHighlight");
   
 
	//#################### HEADER
	//replace header
	$("td:contains('Personal Information Portal')").parents("table").replaceWith('<div id="header">&nbsp;</div>');
	
	//#################### TIME TABLE
	
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
	
	
	//#################### FOOTER
	//remove the horizontal rule
	$("hr").remove();
	//remove the logo
	$("center").has("img[SRC~=/images/smalllogo.gif]").remove();
 }});