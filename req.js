javascript:
void(z.type='text/javascript');
function getMceFrame(wysiwygIframeId){
  var x = document.getElementById(wysiwygIframeId);
  var y = (x.contentWindow || x.contentDocument);
  if (y.document)y = y.document;
  return y.getElementById('tinymce');
}
function replaceText(text,wysiwygIframeId) {
  var sel;
  sel = getMceFrame(wysiwygIframeId);
  if (sel) {
    if ((sel.innerHTML.length > 30 && confirm('Are you sure you want to replace the current text to appear in job advertisement?')) || sel.innerHTML.length <= 30) {
      sel.innerHTML = text;
    }
  }
}

/**
 * Create template w/ object values inserted
 * insert a clean table w/ id's. Note: this was a nice multi-line string but didn't function well as a bookmarklet
 */
newBody = '<hr />';
newBody += '<p><span style="color: #2c6bac; font-family: arial, helvetica, sans-serif; font-size: 18pt;">Position Summary</span></p>';
newBody += '<p>Enter details here</p><hr />';
newBody += '<p><span style="color: #2c6bac; font-family: arial, helvetica, sans-serif; font-size: 18pt;">Responsibilities</span></p>';
newBody += '<ul><li>Type responsibilities</li></ul><hr />';
newBody += '<p><span style="color: #2c6bac; font-family: arial, helvetica, sans-serif; font-size: 18pt;">Minimum Qualifications</span></p>';
newBody += '<ul><li>Type minimum qualifications</li></ul><hr />';
newBody += '<p><span style="color: #2c6bac; font-family: arial, helvetica, sans-serif; font-size: 18pt;">Preferred Qualifications</span></p>';
newBody += '<ul><li>Type preferred qualifications</li></ul><hr />';
newBody += '<p><span style="color: #2c6bac; font-family: arial, helvetica, sans-serif; font-size: 18pt;">Other Requirements</span></p>';
newBody += '<ul><li>Type other requirements and/or special indicators if CUIMC</li></ul><hr />';
newBody += '<p>Equal Opportunity Employer / Disability / Veteran</p>';
newBody += '<p>Columbia University is committed to the hiring of qualified local residents.</p>';
//newBody = '<p><span style="color: #2c6bac; font-family: arial, helvetica, sans-serif; font-size: 18pt;">Position Summary</span></p><p>Enter details here. If temporary, indicate duration here.</p><hr /><p><span style="color: #2c6bac; font-family: arial, helvetica, sans-serif; font-size: 18pt;">Responsibilities</span></p><ul><li>Type responsibilities</li></ul><hr /><p><span style="color: #2c6bac; font-family: arial, helvetica, sans-serif; font-size: 18pt;">Minimum Qualifications</span></p><ul><li>Type minimum qualifications</li></ul><hr /><p><span style="color: #2c6bac; font-family: arial, helvetica, sans-serif; font-size: 18pt;">Preferred Qualifications</span></p><ul><li>Type preferred qualifications</li></ul><hr /><p><span style="color: #2c6bac; font-family: arial, helvetica, sans-serif; font-size: 18pt;">Other Requirements</span></p><ul><li>Type other requirements and/or special indicators if CUIMC</li></ul><hr /><p>&nbsp;</p><p><span style="font-size: 9pt;"></span></p>';
replaceText(newBody, "sOverview_ifr");

/**
 * Trigger MCE code evaluation (to format code if needed)
 * click the code button
 * locate the open modal source code div and click() the first button Ok
 */
tinyMCE.activeEditor.buttons.code.onclick();
document.querySelectorAll('[aria-label=\'Source code\'] .mce-panel button')[0].click();
