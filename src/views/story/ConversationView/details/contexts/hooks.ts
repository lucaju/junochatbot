import { useAppState, useActions } from '@src/overmind';
import type { Context as ContextIntent } from '@src/types';
import { v4 as uuidv4 } from 'uuid';
export interface ContextData {
  id?: string;
  lifeSpan?: number;
  name: string;
  type?: 'input' | 'output';
}

interface props {
  currentLifeSpan?: number;
  currentName?: string;
  id?: string;
  type: 'input' | 'output';
}

const DEFAULT_LIFESPANCOUNT = 5;

const useContext = ({ type, id = '', currentName = '', currentLifeSpan }: props) => {
  const { intents } = useAppState();
  const actions = useActions();
  const currentIntent = intents.currentIntent;

  const NAME_PREFIX = `projects/${intents.currentProjectName}/agent/sessions/-/contexts/`;

  const addInputContext = ({ name }: ContextData) => {
    const fullName = `${NAME_PREFIX}${name}`;
    actions.intents.addInputContext(fullName);
    addOutputContext({ name, lifeSpan: DEFAULT_LIFESPANCOUNT });
  };

  const addOutputContext = ({ name, lifeSpan }: ContextData) => {
    const fullName = `${NAME_PREFIX}${name}`;
    actions.intents.addOutputContext({ name: fullName, lifeSpan });
  };

  const updateInputContext = ({ name }: ContextData) => {
    if (name === currentName) return;
    if (name === '') return removeInputContex(name);

    if (id.includes('new-')) return addInputContext({ name });

    const fullName = `${NAME_PREFIX}${name}`;
    actions.intents.updateInputContextName({ oldName: id, newName: fullName });
  };

  const updateOutputContext = ({ name, lifeSpan }: ContextData) => {
    if (name === currentName && lifeSpan === currentLifeSpan) return;
    if (name === '' || lifeSpan === 0) return removeOutputContex(name);

    if (id.includes('new-')) {
      return addOutputContext({ name, lifeSpan });
    }

    const updatedContext: ContextIntent = {
      name: `${NAME_PREFIX}${name}`,
      lifespanCount: lifeSpan,
    };

    actions.intents.updateOutputContex({ oldName: id, newContext: updatedContext });
  };

  const removeInputContex = (name: string) => {
    actions.intents.removeInputContextName(name);
  };

  const removeOutputContex = (name: string) => {
    actions.intents.removeOutputContext(name);
  };

  return {
    contexts: type === 'input' ? currentIntent?.inputContextNames : currentIntent?.outputContexts,

    extractContextName: (name: string) => {
      const matchName = name.match(/contexts\/(.+)/);
      const currentName = matchName ? matchName[1] : '';
      return currentName;
    },

    createFreshContext: (): ContextData => {
      const lifeSpan = type === 'output' ? DEFAULT_LIFESPANCOUNT : undefined;
      return {
        type,
        id: `new-${uuidv4()}`,
        name: '',
        lifeSpan,
      };
    },

    addContext: (context: ContextData) => {
      type === 'input' ? addInputContext(context) : addOutputContext(context);
    },
    updateContext: (context: ContextData) => {
      type === 'input' ? updateInputContext(context) : updateOutputContext(context);
    },
    removeContex: (id: string) => {
      type === 'input' ? removeInputContex(id) : removeOutputContex(id);
    },
  };
};

export default useContext;
