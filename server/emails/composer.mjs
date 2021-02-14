import { template } from './template.mjs';

export const composer = (type, { firstName, email, token }) => {
  const title = 'Juno Chatbot & Recit';
  const url = 'https://www.junochatbot.ca';
  const logoUrl = 'http://localhost:3000/assets/logo/logo_full.png';

  let bodyText = '';
  let actionUrl = url;
  let buttonLabel = 'Click here';

  switch (type) {
    case 'invitation':
      actionUrl = `${url}/newuser?token=${token}`;
      bodyText = invitationText({ email, title });
      buttonLabel = 'Access Juno Chatbot';
      break;
    case 'requestPassword':
      actionUrl = `${url}/reset-password?token=${token}`;
      bodyText = resetText({ title });
      buttonLabel = 'Reset your password';
      break;
    case 'default':
      bodyText = '';
      actionUrl = url;
      buttonLabel = 'Click here';
      break;
  }

  return template({
    actionUrl,
    bodyText,
    buttonLabel,
    firstName,
    logoUrl,
    title,
    url,
  });
};

const invitationText = ({ email, title }) => {
  return `You have been invited to <b>${title}</b>. Use your email (${email}) to sign in.`;
};

const resetText = ({ title }) => {
  return `We've received a request to recover your password to access <b>${title}</b>.
  If you didn't make the request, just ignore this email. Otherwise you can reset your password using this link:`;
};
