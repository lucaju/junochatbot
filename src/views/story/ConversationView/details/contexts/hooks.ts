import { useApp } from '@src/overmind';
import { Context as ContextType } from '@src/types';
import { useField } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { ContextData } from './Context';

const DEFAULT_LIFESPANCOUNT = 5;

interface props {
  type: 'input' | 'output';
  id?: string;
  name?: string;
  lifeSpan?: number;
}

const useContext = ({ type, id = '', name = '', lifeSpan }: props) => {
  const { state } = useApp();

  const [, metaIn, helpersIn] = useField('inputContextNames');
  const { value: inputValue }: { value: string[] } = metaIn;
  const { setValue: setInputValue } = helpersIn;

  const [, metaOut, helpersOut] = useField('outputContexts');
  const { value: outputValue }: { value: ContextType[] } = metaOut;
  const { setValue: setOutputValue } = helpersOut;

  const matchName = name.match(/contexts\/(.+)/);
  const contextName = matchName ? matchName[1] : '';

  const matchPathPrefix = name.match(/.+\//);
  const prefix = matchPathPrefix ? matchPathPrefix[0] : '';

  const addInputContext = ({ name }: ContextData) => {
    const source = inputValue ?? [];
    const updateSource = [...source, name];
    setInputValue(updateSource);

    addOutputContext({ name, lifeSpan: DEFAULT_LIFESPANCOUNT });
  };

  const addOutputContext = ({ name, lifeSpan }: ContextData) => {
    const source = outputValue ?? [];
    const updateSource = [...source, { name, lifespanCount: lifeSpan }];
    setOutputValue(updateSource);
  };

  const updateInputContext = (newName: string) => {
    if (newName === '') return removeInputContex(name);
    if (newName === contextName) return;

    const fullName = `${prefix}${newName}`;
    if (id.includes('new-')) return addInputContext({ name: fullName });

    const updateSource = inputValue.map((context) => {
      return context === id ? fullName : context;
    });

    setInputValue(updateSource);
  };

  const updateOutputContext = (newName: string, newLifeCount?: number) => {
    if (newName === '' || newLifeCount === 0) {
      removeOutputContex(name);
      return;
    }
    if (newName === contextName && newLifeCount === lifeSpan) return;

    const fullName = `${prefix}${newName}`;

    if (id.includes('new-')) {
      addOutputContext({ name: fullName, lifeSpan: newLifeCount });
      return;
    }

    const updateSource = outputValue.map((context) => {
      if (context.name === id) {
        context.name = fullName;
        context.lifespanCount = newLifeCount;
      }
      return context;
    });

    setOutputValue(updateSource);
  };

  const removeInputContex = (name: string) => {
    const updateSource = inputValue.filter((context) => context !== name);
    setInputValue(updateSource);
  };

  const removeOutputContex = (name: string) => {
    const updateSource = outputValue.filter((context) => context.name !== name);
    setOutputValue(updateSource);
  };

  return {
    inputContext: inputValue,
    outputContexts: outputValue,
    value: type === 'input' ? inputValue : outputValue,
    extractContextName: () => contextName,

    createFreshContext: (): ContextData => {
      const lifeSpan = type === 'output' ? DEFAULT_LIFESPANCOUNT : undefined;
      return {
        type,
        id: `new-${uuidv4()}`,
        name: `projects/${state.intents.currentProjectName}/agent/sessions/-/contexts/`,
        lifeSpan,
      };
    },

    addContext: (context: ContextData) => {
      type === 'input' ? addInputContext(context) : addOutputContext(context);
    },
    updateContext: (newName: string, newLifeCount?: number) => {
      type === 'input' ? updateInputContext(newName) : updateOutputContext(newName, newLifeCount);
    },
    removeContex: (id: string) => {
      type === 'input' ? removeInputContex(id) : removeOutputContex(id);
    },
  };
};

export default useContext;
