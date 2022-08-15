import React from 'react'
import Layout from './components/layouts/Layout';
import ContextProvider from './hooks/Context';

function App() {
  return (
    <ContextProvider>
      <Layout />
    </ContextProvider>
  );
}

export default App;
