import { createContext } from 'react';

const ParamContext = createContext({
    params: {},
    setParams: () => {}
});

export default ParamContext; 