const {footerTemplate} = require('./global_email_footer')

exports.generate_running_5_minutes_late_template = (meeting) =>{
  let template =  `<!DOCTYPE html>
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
      color: #282832;
  ">
      <table align="center" border="0" cellpadding="0" cellspacing="0"
          style="border-collapse: collapse; max-width: 600px;">
          <tr>
              <td bgcolor="#2819D6" height="56px;" style="color: #ffffff; background: #2819D6
              url('${meeting.meetright_logo_light_url}') no-repeat center; background-size: 160px;"></td>
          </tr>
          <tr>
              <td height="48px"></td>
          </tr>
          <tr>
              <td style="padding: 0 64px 0 64px;">
                  <h1 style="
                      font-size: 24px;
                      font-weight: bolder;
                      margin: 0 0 28px 0;
                  ">
                      ${meeting.title}
                  </h1>
                  <h2 style="
                      font-size: 18px;
                      font-weight: bold;
                      margin: 24px 0 8px 0;
                  ">
                      Status Change:
                  </h2>
                  <p style="
                      margin: 8px 0 8px 0;
                      font-size: 16px;
                      line-height: 1.5;
                  ">
                      ${ meeting.respondee } has an upcoming meeting with you at ${meeting.start_time}, ${meeting.timezone} <a href="${meeting.meeting_url}"
                          target="_blank" style="color: #2600DA; text-decoration: underline;">${ meeting.title }</a>. To be respectful of your time, they
                      want you to know that there's been a last minute change to their schedule.
  
                  </p>
                  <h2 style="
                      font-size: 18px;
                      font-weight: bold;
                      margin: 24px 0 8px 0;
                  ">
                      New Status:
                  </h2>
                  <p style="
                      margin: 8px 0 8px 0;
                      font-size: 16px;
                      line-height: 1.5;
                  ">
                      I'm running 5 minutes late
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
                  " href="${ meeting.meeting_url }" target="_blank">
                      View in MeetingFull
                  </a>
              </td>
          </tr>`
  

    template+=footerTemplate
    template+=`</table>
    </body>

    </html>`
    return template
}

