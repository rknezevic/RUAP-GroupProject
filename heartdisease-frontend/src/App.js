import './App.css';
import { FirebaseDatabaseProvider } from "@react-firebase/database";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config/firebaseConfig';
import { HomePage } from './pages/HomePage';
import { BrowserRouter } from 'react-router-dom';

initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);

function App() {
  return (
    <FirebaseDatabaseProvider>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </FirebaseDatabaseProvider>

  );
}

export default App;
