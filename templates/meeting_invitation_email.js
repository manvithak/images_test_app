const {footerTemplate} = require('./global_email_footer')

exports.generate_invite_template = (meeting) =>{
let template = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>MeetingFull</title>
</head>

<body style="
    background-color: #ffffff;
    color: #282832;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', 'Lato', 'Open Sans', 'Helvetica', 'Montserrat', sans-serif;
    font-weight: normal;
    line-height: 1.5;
">
    <table align="center" border="0" cellpadding="0" cellspacing="0"
        style="border-collapse: collapse; max-width: 600px;">
        <tr>
            <td bgcolor="#2819D6" height="56px;" style="color: #ffffff; background: #2819D6
            url('${meeting.meetright_logo_light_url}') no-repeat center;"></td>
        </tr>
        <tr>
            <td height="48px"></td>
        </tr>
        <tr>
            <td style="padding: 0 64px 0 64px; text-align: center;">
                <span style="display: block; font-size: 24px; margin-bottom: 30px; letter-spacing: -0.4px;">
                    You have been invited to the following event.
                </span>
                <h1 style="font-size: 24px; font-weight: bolder; margin: 0 0 8px 0;">
                    ${meeting.title} ${meeting.recurring?`<img src=${meeting.recurring_image_url} />`:''}
                </h1>
                <p style="margin: 8px 0 8px 0; font-size: 15px; font-weight: bold;">
                    ${meeting.priority} Priority
                </p>
                <p style="margin: 8px 0 8px 0; font-size: 15px;">
                    ${meeting.start_date }
                </p>
                <p style="margin: 8px 0 8px 0; font-size: 15px;">
                    ${meeting.start_time } – ${ meeting.end_time }, ${ meeting.timezone }
                </p>
                <p style="margin: 8px 0 48px 0;">
<!--                    <img src="img/time.png" style="margin-right: 5px;-->
<!--                        vertical-align: sub; height: 18px; width: 18px;"/>-->
<!--                    <a style="color: #2600DA; font-size: 15px; text-decoration: underline;"-->
<!--                       href="${meeting.suggest_time_url}" target="_blank">-->
<!--                        Suggest a new time-->
<!--                    </a>-->
                    <span style="display: inline-block; padding: 0 0 0 28px; margin: 0 10px 0 0; color: #2819D6;
                        text-decoration: underline; background: transparent url('img/snooze.png') no-repeat left center;">
                        <a style="color: #2600DA; font-size: 15px; text-decoration: underline;"
                           href="${meeting.suggest_time_url}" target="_blank">
                            Suggest a new time
                        </a>
                    </span>
                </p>
                <a style="background-color: #2819D6; color: #ffffff; display: block; font-size: 14px;
                    font-weight: bold; margin-top: 8px; padding: 16px 32px 16px 32px; text-transform: uppercase;
                    text-decoration: none;" href="${ meeting.meeting_url }" target="_blank">
                    View in MeetingFull
                </a>
            </td>
        </tr>
        <tr>
            <td style="padding: 32px 64px 32px 64px;">
                <hr style="margin: 0; height: 1px; background-color: #E9E9EA; border: 0;" />
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
        
        if(meeting.topics){
          template+=`<tr>
              <td style="padding: 0 64px 0 64px;">
                  <p style="color: #969EAA; font-size: 15px; margin: 0 0 8px 0;">
                      Agenda
                  </p>
              </td>
          </tr>`
          for(topic of meeting.topics){
            template+=`<tr>
                <td style="padding: 0 64px 0 64px;">
                    <h2 style="font-size: 18px; font-weight: bold; margin: 8px 0 8px 0;">
                        ${topic.name? topic.name: 'Description' }
                        ${topic.length? '('+ topic.length + 'mins'+')':'' }
                    </h2>
                    <p style="font-size: 15px; font-weight: bold; margin: 8px 0 16px 0;">
                        ${topic.priority ? topic.priority +'Priority':''} 
                        ${topic.topic_type ? (topic.topic_type): ''}
                    </p>
                    ${topic.subject_expert ?
                      '<p style="font-size: 13px; font-weight: bold; line-height: 1.2; margin: 4px 0 16px 0;">'+
                          'Subject Matter Expert'+
                          '<span style="display: block; font-weight: normal;">'+topic.subject_expert +'</span>'+
                      '</p>':''
                    }
                    ${topic.description?
                      '<p style="font-size: 15px; margin: 0;">'+
                        topic.description+
                    '  </p>':''
                    }
                </td>
            </tr>`
          }
        }
  template+=footerTemplate
  template+=`</table>
  </body>

  </html>`

  return template
}
