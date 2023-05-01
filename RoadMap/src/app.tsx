import { useRoutes } from 'react-router-dom'
import { routes } from './router'
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getQueryClient } from './hooks/queryClient';

const App = () => {
  const elem = useRoutes(routes);
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client = {queryClient}>
      <div className="App">
        {elem}
      </div>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App;
