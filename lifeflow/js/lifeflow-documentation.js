var breadcrumb_array = new Array();

/**
 * Add one step to the breadcrumb
 */
function lfdoc_addBreadCrumbStep(label, link){
	breadcrumb_array.push({'label':label, 'link':link});
}

/**
 * Print breadcrumb HTML
 */
function lfdoc_createBreadCrumb(){
	var _html = "";
	_html += '<div class="breadCrumbHolder module">';
	_html += '<div id="breadCrumb" class="breadCrumb module">';
    _html += '<ul>';
    for(var i=0; i<breadcrumb_array.length; i++){
    	_html += '<li>';
    	if(breadcrumb_array[i].link && breadcrumb_array[i].link!=''){
    		_html += '<a href="'+breadcrumb_array[i].link+'">';
    	}
    	_html += breadcrumb_array[i].label;
    	if(breadcrumb_array[i].link && breadcrumb_array[i].link!=''){
    		_html += '</a>';
		}
    	_html += '</li>';
    }
    // _html += '    <li><a href="index.html">User Manual Home</a></li>';
    // _html += '    <li><a href="index.html">Table of Contents</a></li>';
    // _html += '    <li>'+current_page+'</li>';
    _html += '</ul>';
	_html += '</div>';
	_html += '</div>';
	document.write(_html);
}

var indices = [];

function lfdoc_addSectionNo() {
  // jQuery will give all the HNs in document order
  $('h2,h3').each(function(i,e) {
      var hIndex = parseInt(this.nodeName.substring(1)) - 1;

      // just found a levelUp event
      if (indices.length - 1 > hIndex) {
        indices= indices.slice(0, hIndex + 1 );
      }

      // just found a levelDown event
      if (indices[hIndex] == undefined) {
         indices[hIndex] = 0;
      }

      // count + 1 at current level
      indices[hIndex]++;

      // display the full position in the hierarchy
      var sectionNo = indices.join(".");
      $(this).prepend(sectionNo+' ');
      $(this).wrap('<a name="'+sectionNo+'" />');
      // var innerHTML = $(this).innerHTML;
      // $(this).innerHTML = '<a name="'+sectionNo+'">'+sectionNo+' ABC'+innerHTML+'</a>';
      // $(this).prepend('<a name="'+sectionNo+'">'+sectionNo);
      // $(this).append('</a>');

  });
}

function lfdoc_setChapter(chapter_no){
	indices[0] = chapter_no;
}

function lfdoc_fixOrderedList(){
	// Generate number for nested ordered list (IE6/7 only)
	// Code from:
	// http://stackoverflow.com/questions/2729927/number-nested-ordered-lists-in-html
	var version = getInternetExplorerVersion();
	
	// For IE6/7 only. 
	if(version==6||version==7){
	    if ($('ol.tableOfContents:first').css('list-style-type') != 'none') { 
	        $('ol.tableOfContents ol').each(function(i, ol) {
	            ol = $(ol);
	            var level1 = ol.closest('li').index() + 1;
	            ol.children('li').each(function(i, li) {
	                li = $(li);
	                var level2 = level1 + '.' + (li.index() + 1);
	                li.prepend('<span>' + level2 + '</span>');
	            });
	        });
	    }
	}
}

function lfdoc_boldFigureCaption(){
	// Fix figure caption
	$(".caption").each(function(index, element){
		// Find the text "Figure xxx:" and bold it		
		var captionText = element.innerHTML;
		var index = captionText.indexOf("Figure");
		var index2 = captionText.indexOf(":");
		
		if(index>=0 && index2>index){
			var newCaptionText = captionText.substr(0,index);
			newCaptionText += captionText.substring(index, index2).bold();
			newCaptionText += captionText.substr(index2);
			element.innerHTML = newCaptionText;
		}
	});
}

function lfdoc_boldTableCaption(){
	// Fix table caption
	$("table > caption").each(function(index, element){
		// Find the text "Figure xxx:" and bold it		
		var captionText = element.innerHTML;
		var index = captionText.indexOf("Table");
		var index2 = captionText.indexOf(":");
		
		if(index>=0 && index2>index){
			var newCaptionText = captionText.substr(0,index);
			newCaptionText += captionText.substring(index, index2).bold();
			newCaptionText += captionText.substr(index2);
			element.innerHTML = newCaptionText;
		}
	});
}

function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
	var rv = -1;
	// Return value assumes failure.
	if(navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if(re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
	}
	return rv;
}

function Section(title, link){
	this.title = title;
	this.link = link;
	this.subsectionList = [];
	
	this.addSubsection = function(subsection){
		this.subsectionList.push(subsection);
	}
}

function createTableOfContents(sectionList){
	document.write('<ol class="tableOfContents">');
	for(var i=0;i<sectionList.length;i++){
		var chapter = sectionList[i];
		var chapterNo = i+1;
		document.write('<li>');
		document.write(chapterNo);
		document.write('. ');
		document.write('<a href="');
		
		var chapterLink;
		if(chapter.link){
			chapterLink = chapter.link;
		}
		else{
			chapterLink = 'chapter'+chapterNo+'.html';
		}
		document.write(chapterLink);
		document.write('">');
		document.write(chapter.title);
		document.write('</a>');
		
		if(chapter.subsectionList.length>0){
			document.write('<ol>');
				for(var j=0;j<chapter.subsectionList.length;j++){
					var section = chapter.subsectionList[j];
					var sectionNo = chapterNo+'.'+(j+1);
					document.write('<li>');
					document.write(sectionNo);
					document.write(' ');
					document.write('<a href="');
					document.write(chapterLink);
					document.write('#'+sectionNo+'">');
					document.write(section.title);
					document.write('</a>');
					document.write('</li>');
				}
			document.write('</ol>');
		}
		
		document.write('</li>');
	}
	document.write('</ol>');
}

