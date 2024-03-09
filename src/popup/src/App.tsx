import React, {useEffect} from 'react';
import { MainLayout } from "./setup/MainLayout";
import { listenMessages } from 'shared';
import {Router} from "./setup/Router";


function App() {

  useEffect(() => {
    listenMessages('popup');
  }, []);

  return (
      <MainLayout>
        <Router />
      </MainLayout>
  );
}

export default App;
