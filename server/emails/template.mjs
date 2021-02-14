export const template = ({
  actionUrl,
  bodyText,
  buttonLabel,
  firstName,
  logoUrl,
  title,
  url,
}) =>
  `<!doctype html>
  <html lang='en'>
  <head>
      <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1'>
      <meta http-equiv='X-UA-Compatible' content='IE=edge'>
      <meta name='format-detection' content='telephone=no'>
  </head>

  <body style='margin:0;
      padding:0;
      font-family:Helvetica, Arial, sans-serif;
      font-size:14px;
      font-weight:400;
      color:#374550;
      text-align:left;'
      leftmargin='0'
      topmargin='0'
      marginwidth='0'
      marginheight='0'>

      <table border='0'
          width='100%'
          height='100%'
          cellpadding='0'
          cellspacing='0'>
      <tr>
          <td align='center'
              valign='top'>

          <br>
          
          <table border='0'
                  width='600'
                  cellpadding='0'
                  cellspacing='0'
                  class='container'
                  style='width:600px;
                  max-width:600px'>

              <tr>
                  <td align='left'
                      style='padding-bottom: 24px;'>
                      <img
                          src='${logoUrl}'
                          alt='${title}'
                          title='${title}'
                      />
                  </td>
              </tr>

              <tr>
              <td align='left'
                  style='padding-left:24px;
                  padding-right:24px;
                  padding-top:12px;
                  padding-bottom:12px;
                  background-color:#f3f9ff;
                  border: 1px solid #e3e3e3;
                  border-radius: 6px;'>
                  
                  <p class='title'
                      style='font-size:18px;
                      font-weight:600;
                      color:#374550'>Hello ${firstName}.</p>

                  
                  <p style='font-family:Helvetica, Arial, sans-serif;
                      font-size:14px;
                      line-height:20px;
                      text-align:left;
                      color:#333333;
                      line-height:22px;'>${bodyText}</p><br>

                  <table border='0'
                      width='300'
                      cellpadding='0'
                      cellspacing='0'
                      style='width:300px;
                      max-width:300px;
                      background-color:#03a9f4;
                      color:#ffffff'>
                      <tr>
                      <td align='left'
                          style='padding-left:24px;
                          padding-right:24px;
                          padding-top:12px;
                          padding-bottom:12px;'>
                                 
                          <a href='${actionUrl}'
                              target='_blank'
                              style='color:#ffffff;
                              text-decoration: none;'>${buttonLabel}</a>
                      </td>
                      </tr>

                  </table>

                  <br>

              </td>
              </tr>

              <tr>
              <td align='left'
                  style='padding-left:24px;
                      padding-right:24px;
                      padding-top:12px;
                      padding-bottom:12px;
                      color:#666666;'>
                  <p style='text-align:left;
                      font-size:12px;
                      font-weight:400;
                      line-height:18px;'>
                      <strong>${title}</strong></br>
                      <a href='${url}' style='color:#555555;'>${url}</a>
                  </p>
              </td>
              </tr>

          </table>
          
          <br><br>

          </td>
      </tr>
      </table>

  </body>
</html>
`;
