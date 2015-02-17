function createHeader(){
	var _html = "";
	_html += '<div id="mainWrap">';
	_html += '<div id="header">';
	_html += '<a href="index.html">';
	_html += '	<span class="lifeflowText">LifeFlow</span>&nbsp;';
	_html += '	<span class="subtitle">Developer\'s Manual</span>';
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
	_html += '	Copyright &copy; 2011-2012 Human-Computer Interaction Lab, University of Maryland. All rights reserved.<br>';
	_html += '	<i>Last updated May 12, 2012.</i>';
	_html += '</div>';
	_html += '</div>';
	document.write(_html);
}

// default breadcrumb
lfdoc_addBreadCrumbStep('Developer\'s Manual Home', 'index.html');
lfdoc_addBreadCrumbStep('LifeFlow Developer\'s Guide', 'index.html');

$(document).ready(function(){
	lfdoc_fixOrderedList();
	lfdoc_boldFigureCaption();
	lfdoc_boldTableCaption();
	
	$("#breadCrumb").jBreadCrumb();
});
