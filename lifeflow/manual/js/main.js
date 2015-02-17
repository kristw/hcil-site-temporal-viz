function createHeader(){
	var _html = "";
	_html += '<div id="mainWrap">';
	_html += '<div id="header">';
	_html += '<a href="index.html">';
	_html += '	<span class="lifeflowText">LifeFlow</span>&nbsp;';
	_html += '	<span class="subtitle">User Manual</span>';
	_html += "</a>";
	_html += '</div>';
	_html += '<div id="contentWrap">';
	document.write(_html);
}

function createFooter(){
	var _html = "";
	_html += '</div>';
	_html += '<div id="footer">';
	_html += '	<hr class="footerRule" width="85%">';
	_html += '	Copyright &copy; 2011 Human-Computer Interaction Lab, University of Maryland. All rights reserved.<br>';
	_html += '	<i>Last updated Oct 11, 2011.</i>';
	_html += '</div>';
	_html += '</div>';
	document.write(_html);
}

function createTitle(chapterNo){
	document.write('<title>');
	document.write('LifeFlow User Manual - Chapter ');
	document.write(chapterNo);
	document.write('</title>');
}

function createH1(chapterNo, chapterName){
	document.write("<h1>");
	document.write('Chapter ');
	document.write(chapterNo);
	document.write(': ');
	document.write(chapterName);
	document.write("</h1>");
}

// default breadcrumb
lfdoc_addBreadCrumbStep('User Manual Home', 'index.html');
lfdoc_addBreadCrumbStep('LifeFlow User Manual', 'index.html');

$(document).ready(function(){
	lfdoc_fixOrderedList();
	lfdoc_boldFigureCaption();
	lfdoc_boldTableCaption();
	
	$("#breadCrumb").jBreadCrumb();
});
