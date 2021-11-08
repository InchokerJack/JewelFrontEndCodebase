import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Layout from './components/Layout';
import '@fontsource/inter';
import { createContext, Dispatch, useReducer } from 'react';

interface State {
  address: string | null;
}

const initialState: State = {
  address: null,
};

interface Actions {
  type: actionType;
  address: string | null;
}

export enum actionType {
  NEW_ADDRESS = 'NEW_ADDRESS',
}

const reducer = (state: State, actions: Actions) => {
  switch (actions.type) {
    case actionType.NEW_ADDRESS:
      return {
        ...state,
        address: actions.address,
      };
  }
};
interface ContextProps {
  state: State;
  dispatch: Dispatch<Actions>;
}
export const StoreContext = createContext({} as ContextProps);
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <ChakraProvider theme={theme}>
        <Layout />
      </ChakraProvider>
    </StoreContext.Provider>
  );
}

export default App;
