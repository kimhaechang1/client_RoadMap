import { useRoutes } from 'react-router-dom'
import { routes } from './router'
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getQueryClient } from './hooks/queryClient';
import { createContext, useCallback, useEffect, useState } from 'react';
import { CurrentUserAuthContext } from './pages/CurrentUserAuthContext';

//const CurrentUserAuthContext = createContext({});
const App = () => {
  const elem = useRoutes(routes);
  const queryClient = getQueryClient();
  const [auth, setAuth] = useState("");
 
  return (
    <QueryClientProvider client = {queryClient}>
      <CurrentUserAuthContext.Provider 
        value={{
          auth,
          setAuth
        }}>  
        <div className="App">
          {elem}
        </div>
      </CurrentUserAuthContext.Provider>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App;
