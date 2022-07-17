const {footerTemplate} = require('./global_email_footer')

exports.generate_reminder_template = (meeting) =>{
let template = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>MeetingFull</title>
</head>

<body style="
    background-color: #ffffff;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', 'Lato', 'Open Sans', 'Helvetica', 'Montserrat', sans-serif;
    font-weight: normal;
    line-height: 1.5;
    color: #282832;
">
    <table align="center" border="0" cellpadding="0" cellspacing="0"
        style="border-collapse: collapse; max-width: 600px;">
        <tr>
            <td bgcolor="#2819D6" height="56px;" style="color: #ffffff; background: #2819D6
            url('${meeting.meetright_logo_light_url}') no-repeat center; background-size: 160px;"><a href="${meeting.mr_url}" target="_blank"
                    style="height: 100%; display: flex; flex: 1;" /> </td>
        </tr>
        <tr>
            <td height="48px"></td>
        </tr>
        <tr>
            <td style="padding: 0 64px 0 64px;">
                <span style="
                    display: block;
                    font-size: 24px;
                    margin-bottom: 30px;
                    letter-spacing: -0.4px;
                ">
                    Meeting Reminder
                </span>
                <h1 style="
                    font-size: 24px;
                    font-weight: bolder;
                    margin: 0 0 8px 0;
                ">
                    ${ meeting.title } ${meeting.recurring?`<img src=${meeting.recurring_image_url} />`:''}
                </h1>
                <p style="
                    margin: 8px 0 8px 0;
                    font-size: 15px;
                    font-weight: bold;
                ">
                    ${meeting.priority} Priority
                </p>
                <p style="
                    margin: 8px 0 8px 0;
                    font-size: 15px;
                ">
                    ${meeting.start_date }
                </p>
                <p style="
                    margin: 8px 0 8px 0;
                    font-size: 15px;
                ">
                    ${meeting.start_time } – ${ meeting.end_time }, ${ meeting.timezone==='utc'?'UTC': meeting.timezone}
                </p>
                <a style="
                    display: inline-block;
                    margin-top: 8px;
                    padding: 16px 32px 16px 32px;
                    background-color: #2819D6;
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: bold;
                    text-transform: uppercase;
                    text-decoration: none;
                    " href="${meeting.meeting_url }" target="_blank">
                    View in MeetingFull
                </a>
            </td>
        </tr>
        <tr>
            <td style="
                padding: 32px 64px 32px 64px;
            ">
                <hr style="
                margin: 0;
                height: 1px;
                background-color: #E9E9EA;
                border: 0;
                " />
            </td>
        </tr>`
        if(meeting.location || meeting.conferences){
          template+=`
            <tr>
              <td style="padding: 0 64px 0 64px;">
              <p style="color: #969EAA; font-size: 15px; margin: 0 0 8px 0;">
                  Joining info
              </p>`
          if(meeting.location){
            template+=`<p style="font-size: 15px; margin: 8px 0 8px 0;">
                        ${meeting.location} 
                    </p>`
          }
                
          if(meeting.conferences){
            for(let conference of meeting.conferences){
              if(conference.type == 'Generic'){
                if(conference.url){
                  //Generic with URL
                  template+=`
                    <p style="color: #2600DA; font-size: 15px; margin: 8px 0 8px 0; text-decoration: underline;">
                      <a href="${conference.url }" target="_blank">${conference.url }</a>
                    </p>
                  ` 
                }
                else{
                  template+=`<p style="font-size: 15px; margin: 8px 0 8px 0;">
                    ${conference.url }
                  </p>` 
                }
              }else{
                template+=`<p style="font-size: 15px; margin: 8px 0 8px 0;">
                  Join URL: 
                  <span style="color: #2600DA; text-decoration: underline;">
                      <a href="${conference.url }" target="_blank">${ conference.url }</a>
                  </span>    
                </p>`
              }
            }
          }
          template+=`
            <tr>
              <td height="32px"></td>
            </tr>
          `
        }
        template+=`
        <tr>
            <td style="padding: 0 64px 0 64px;">
                <p style=" margin: 0 0 8px 0; color: #969EAA; font-size: 15px;">
                    Attendees
                </p>
                <ul style="color: #2819D6; font-size: 15px; margin: 8px 0 0 0; padding: 0; list-style: none;
                    line-height: 1.2;">`
        for(let attendee of meeting.attendees){
          template+=`
            <li style="width: 220px; margin: 0 10px 10px 0;  display: inline-block; vertical-align: top;
                    overflow: hidden; text-overflow: ellipsis;">
                        ${attendee.email }
                        ${attendee.organizer?'<span style="color: #969EAA;">organizer</span>':''}
                        ${attendee.optional?'<span style="color: #969EAA;">optional</span>':''}
                        ${attendee.meeting_minutes?'<span style="color: #969EAA;">meeting_minutes</span>':''}
                    </li>
          `
        }
        template+=`
          </ul>
            </td>
          </tr>
          <tr>
            <td height="32px"></td>
          </tr>
        `           
        
        if(meeting.notes_only_attendees){
          template+=`<tr>
            <td style="padding: 0 64px 0 64px;">
                <p style=" margin: 0 0 8px 0; color: #969EAA; font-size: 15px;">
                    Notes only
                </p>
                <ul style="color: #2819D6; font-size: 15px; margin: 8px 0 0 0; padding: 0; list-style: none;
                    line-height: 1.2;">`
          for(let attendee of meeting.notes_only_attendees){
            template+=`<li style="width: 220px; margin: 0 10px 10px 0;  display: inline-block; vertical-align: top;
                    overflow: hidden; text-overflow: ellipsis;">
                        ${attendee.email }
                        ${attendee.organizer?'<span style="color: #969EAA;">organizer</span>':''}
                    </li>`
          }
          template+=`
            </ul>
                </td>
            </tr>
            <tr>
                <td height="32px"></td>
            </tr>
          `
        }
    template+=footerTemplate
    template+=`</table>
</body>

</html>`
return template
}