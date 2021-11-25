import {Button, ChakraProvider} from '@chakra-ui/react';
import theme from './theme';
import Layout from './components/Layout';
import '@fontsource/dm-sans';
import {createContext, Dispatch, useReducer} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface State {
    address?: string | null;
    balance?: string | null;
}

const initialState: State = {
    address: null,
    balance: null
};

interface Actions {
    type: actionType;
    address?: string | null;
    balance?: string | null;
}

export enum actionType {
    NEW_ADDRESS = 'NEW_ADDRESS',
    UPDATE_BALANCE = 'UPDATE_BALANCE'
}

const reducer = (state: State, actions: Actions) => {
    switch (actions.type) {
        case actionType.NEW_ADDRESS:
            return {
                ...state,
                ...actions.address && {address: actions.address,}
            };
        case actionType.UPDATE_BALANCE:
            return {
                ...state,
                balance: actions.balance,
            };
    }
};

interface ContextProps {
    state: State;
    dispatch: Dispatch<Actions>;
}

export const StoreContext = createContext({} as ContextProps);

function App(): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{state, dispatch}}>
            <ChakraProvider theme={theme}>
                <ToastContainer/>
                <Layout/>
            </ChakraProvider>
        </StoreContext.Provider>
    );
}

export default App;
