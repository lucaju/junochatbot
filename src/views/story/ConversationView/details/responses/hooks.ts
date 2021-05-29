import { Message } from '@src/types';
import { useField } from 'formik';

const useMessage = () => {
  const [, , helpers] = useField('messages');
  const { setValue } = helpers;

  return {
    updateAllMessage: (messages: Message[]) => {
      setValue(messages);
    },
  };
};

export default useMessage;
