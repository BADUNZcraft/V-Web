import './App.css';

import Signup from './components/authentication/Singup';
import Login from './components/authentication/Login';
import ForgotPassword from './components/authentication/ForgotPassword';

import Dashboard from './components/TestPages/Dashboard';
import IGDBTest from './components/TestPages/IGDBTest';
import FireStore from './components/TestPages/FireStore';

import { AuthProvider } from './contexts/AuthContext';
import { IGDBProvider } from './contexts/IGDBContext';
import { FirestoreProvider } from './contexts/FirestoreContext';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    // only available when signed in
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        // add Landing Page
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword/>
  },

  // Temporary
  {
    path: '/testigdb',
    element: <IGDBTest/>
  },
  {
    path: '/firestore',
    element: <FireStore />
  }
]);

function App() {
  return (
    <AuthProvider>
      <IGDBProvider>
        <FirestoreProvider>
          <RouterProvider router={router} />
        </FirestoreProvider>
      </IGDBProvider>
    </AuthProvider>
  );
}

export default App;