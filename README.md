##### Source
This solution is based on one from the University of Oregon, found here:
https://bitbucket.org/_vid/pup_req_job_ad_populate

##### Purpose
"Reduce the duplication of effort in filling out the PageUp People (PUP) Position Description Job Advertisement by dynamically populating the Wysiwyg text area with data from the relevant fields in the form." -UoO

On both Job Description and Requisition pages, we require to populate the Wysiwyg with a so-called Posting Table, which includes pre-populated text and formatting for each position posting.

##### Problem
PageUp doesn't have any built in mechanism to allow us to do that, and can't set it up for us.  We can add fields which can accept custom HTML, so it's possible to create an HTML button which can perform a Javascript action.  However, the custom fields have a limit of 256(?) characters, which is not enough to contain the required JS functions. The solution then, is to create HTML buttons which reference an external JS file, where we can put longer scripts.  This solution originally implemented by UoO was suggested by PageUp, but is officially unsupported.

##### Solution
Two Files: 
- jd_populate.js
- req_populate.js

JavaScript files(scriptlets) that automate populating the Wysiwyg textarea with pre-ready text as well as data from adjacent fields.  These were initially hosted on Github while testing, but are now hosted by CUIT.
These files are called by the following HTML buttons: 
- `<a href="#" onclick="javascript: void(z=document.body.appendChild(document.createElement('script'))); void(z.language='javascript'); void(z.type='text/javascript'); void(z.id='pup-req-pop'); void(z.src='https://columbiahr.github.io/pup_populate/jd_populate.js'); return false;">Job Ad Pre-Populate</a>`
- `<a href="#" onclick="javascript: void(z=document.body.appendChild(document.createElement('script'))); void(z.language='javascript'); void(z.type='text/javascript'); void(z.id='pup-req-pop'); void(z.src='https://columbiahr.github.io/pup_populate/req_populate.js'); return false;">Req Pre-Populate</a>`

The URL paths and filenames should also be as short as possible to stay within the field character limit.

##### How it works
When the HTML button is pressed on the Job Description page, the JavaScript file (jd_populate.js) is called and a job posting template is inserted into the job advertisement text area.

When the HTML button is pressed on the Requisition page, the JavaScript (req_populate.js) is called and a job posting template is inserted into the requisition text area. This template is populated from relevant field values elsewhere on the page.
