import './App.css';

import Signup from './components/authentication/Singup';
import Dashboard from './components/authentication/Dashborad';
import Login from './components/authentication/Login';
import ForgotPassword from './components/authentication/ForgotPassword';
import IGDBTest from './components/IGDBTest';

import { AuthProvider } from './contexts/AuthContext';
import { IGDBProvider } from './contexts/IGDBContext';
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
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
    path: '/test',
    element: <IGDBTest/>
  }
]);

function App() {
  return (
    <AuthProvider>
      <IGDBProvider>
        <RouterProvider router={router} />
      </IGDBProvider>
    </AuthProvider>
  );
}

export default App;