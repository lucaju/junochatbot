import sendgrid from '@sendgrid/mail';
import { composer } from './composer.mjs';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ type, user }) => {
  let email;
  if (type === 'invitation') email = buildWelcomeEmail(type, user);
  if (type === 'requestPassword') email = buildPasswordResetEmail(type, user);

  email = {
    ...email,
    to: `${user.firstName} ${user.lastName} <${user.email}>`,
    from: process.env.EMAIL_FROM,
  };

  if (!email) return { error: 'Could not build email template' };

  return await sendgrid.send(email);
};

const buildWelcomeEmail = (type, user) => {
  return {
    subject: 'Invitation to Juno Chatbot',
    html: composer(type, user),
  };
};

const buildPasswordResetEmail = (type, user) => {
  return {
    subject: 'Juno Chatbot - Password Reset',
    html: composer(type, user),
  };
};

const buildCancelationEmail = (user) => {
  return {
    to: `${user.firstName} ${user.lastName} <${user.email}>`,
    from: process.env.EMAIL_FROM,
    subject: 'Juno Chatbot is sorry to see you go!',
    text: `Goodbye, ${user.firstName}. I hope to see you back sometime soon.`,
  };
};
