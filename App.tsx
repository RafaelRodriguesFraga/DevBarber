import React from 'react';
import StackRoutes from './src/routes/stack.routes';
import {UserProvider} from './src/contexts/User/userContext';

const App = () => {
  return (
    <UserProvider>
      <StackRoutes />
    </UserProvider>
  );
};

export default App;
