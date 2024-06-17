import './App.css';

import Signup from './components/authentication/Singup';
import Login from './components/authentication/Login';
import ForgotPassword from './components/authentication/ForgotPassword';

import Dashboard from './components/TestPages/Dashboard';
import IGDBTest from './components/TestPages/IGDBTest';
import FireStore from './components/TestPages/FireStore';
import Wishlist from './components/Wishlist';

import { AuthProvider } from './contexts/AuthContext';
import { IGDBProvider } from './contexts/IGDBContext';
import { FirestoreProvider } from './contexts/FirestoreContext';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/HomePage';

const router = createBrowserRouter([
  {
    // only available when signed in
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/wishlist',
        element: <Wishlist />
      }
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
    // only available when signed in
    path: '/firestore',
    element: <PrivateRoute />,
    children: [
      {
        path: '/firestore',
        // add Landing Page
        element: <FireStore />,
      },
    ],
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