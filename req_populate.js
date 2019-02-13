
javascript:
/**
 * PUP Req Job Ad Pre-Populate
 * Version pup_req_job_ad_populate-1.1
 * Populate the PUP Position Description Job Posting Wysiwyg text area from fields above in the form.
 * Note: This is a proof of concept;
 * Usage:
 ** Authenticate to your PUP account.
 ** Navigate to manage requisitions: https://admin.dc4.pageuppeople.com/v5.3/provider/manageJobs/manageJobs.asp
 ** Open a position
 ** Click the bookmarklet
 ** bask in the pre-populated text to appear in job advertisement
 * TODO: Cross Browser Support
 ** FF PC
 ** Chrome PC
 ** Edge ?
 ** DONE - FF Mac - OK as of v. new_pd_template8-bookmarklet6 2016-08-23
 ** DONE - Chrome Mac - OK as of v. new_pd_template9-bookmarklet1 2016-08-23
 ** DONE - Safari Mac - OK as of v. new_pd_template9-bookmarklet1 2016-08-23
 * DONE - add confirm when replacing exiting text. Done as of v. new_pd_template9-bookmarklet1 2016-08-23
 * DONE - Note: PUP doesn't support IE; Drop support for IE. Done.
 *
 * This code is served up remotely to ensure quality source control.
 * The local Bookmarklet src:
javascript:
void(z=document.body.appendChild(document.createElement('script')));
void(z.language='javascript');
void(z.type='text/javascript');
void(z.src='https://bitbucket.org/_vid/pup_req_job_ad_populate/raw/master/pup_req_job_ad_populate.js');
 * *** Contents ***
 * Functions
 * Object mapping, capturing values of fields on the page: 'pupPdElements'
 * Create template w/ object values inserted
 * Trigger MCE code evaluation (to format code if needed)
 */

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
      sel.innerHTML = text + sel.innerHTML;
    }
  }
}
function getTextField(elementID){
  return document.getElementById(elementID).value;
}
/* ex: getTextField("lRoleID_fieldTitle"); */
}
function getDropdown(elementID){
  return document.getElementById(elementID).text;
}
function getSelectField(elementID){
  return document.getElementById(elementID).options[document.getElementById(elementID).selectedIndex].text;
}
/* ex getSelectField("lDepartmentID"); */
function getDropSearchField(elementID){
  result = null;
  if (typeof document.querySelectorAll('#' + elementID + ' .result-selected')[0] !== "undefined") {
    result = document.querySelectorAll('#' + elementID + ' .result-selected')[0].innerHTML;
  }
  else
    if (typeof document.querySelectorAll('#' + elementID + ' .chosen-single span')[0] !== "undefined") {
      result = document.querySelectorAll('#' + elementID + ' .chosen-single span')[0].innerHTML;
    }
  return result;
}
/* ex getDropSearchField("GenericListType_appointment_chosen"); */

function getEssentialJobDuties(){
  /* for each document.querySelectorAll('#JobDutyWrapper div.jobDuty')
  if(div.jobDuty .dutyLevel == "Essential")
  div.jobDuty .dutyPercent
  div.jobDuty .dutyDuties
  */
  dutyOutput = [];
  dutyList = document.querySelectorAll('#JobDutyWrapper div.jobDuty');
  //console.log(dutyList.length);
  for(i=0;i<dutyList.length;i++){
    console.log('Pass: '+i);
    //dutyList[i].innerHTML;
    console.log("what: " + dutyList[i].querySelectorAll('.dutyLevel')[0].innerHTML);
    console.log(dutyList[i].querySelectorAll('.dutyLevel').length);
    if(dutyList[i].querySelectorAll('.dutyLevel')[0].innerHTML == "Essential"){
      dutyOutput.push( dutyList[i].querySelectorAll('.dutyPercent')[0].innerHTML + '%' + ' - ' + dutyList[i].querySelectorAll('.dutyDuties')[0].innerHTML);
    }
  }
  //console.log(dutyOutput);
  return dutyOutput.join("<br />");
}

/**
 * Object mapping, capturing values of fields on the page: 'pupPdElements'
 * Set up the data elements to populate the wysiwyg:
 */
var pupPdElements = {
  pupPdJobType:    '<p>' + getTextfield('GenericListType_regulartemporary') + '</p>',
  pupPdBargainingUnit:    '<p>' + getTextfield('lAgreementTypeID') + '</p>',
  pupPdRegTemp:    '<p>' + getTextField('sOther3') + '</p>',
  pupPdTempDuration:    '<p>' + getTextField('sOther6') + '</p>',
  pupPdHours:    '<p>' + getTextField('sOther5') + '</p>',
  pupPdSalaryDetails:    '<p>' + getTextField('sSalary') + '</p>'
 
};

/**
 * Create template w/ object values inserted
 * insert a clean table w/ id's. Note: this was a nice multi-line string but didn't function well as a bookmarklet
 */
newBody  = '<ul>';
newBody += '<li id="pupPdJobType">Job Type: ' + pupPdElements.pupPdJobType  + '</li>';
newBody += '<li id="pupPdBargainingUnit">Bargaining Unit: ' + pupPdElements.pupPdBargainingUnit + '</li>';
newBody += '<li id="pupPdRegTemp">Regular/Temporary: ' + pupPdElements.pupPdRegTemp  + '</li>';
newBody += '<li id="pupPdTempDuration">Duration if Temporary: ' + pupPdElements.pupPdTempDuration  + '</li>';
newBody += '<li id="pupPdHours">Hours Per Week: ' + pupPdElements.pupPdHours  + '</li>';
newBody += '<li id="pupPdSalaryDetails">Salary Range: ' + pupPdElements.pupPdSalaryDetails  + '</li>';
newBody += '</ul>';
replaceText(newBody, "sOverview_ifr");

/**
 * Trigger MCE code evaluation (to format code if needed)
 * click the code button
 * locate the open modal source code div and click() the first button Ok
 */
tinyMCE.activeEditor.buttons.code.onclick();
document.querySelectorAll('[aria-label=\'Source code\'] .mce-panel button')[0].click();
