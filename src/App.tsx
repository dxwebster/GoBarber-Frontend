import React from 'react';

// import SignIn from './pages/Signin';
import SignIn from './pages/Signin';
import GlobalStyle from './styles/global';
// import { isPrimitive } from 'util';

import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
