import './App.css'
import axiosInstance from './utils/axios'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from './layout/index'
import LandingPage from './pages/LandingPage/index'
import CreatePostPage from './pages/CreatePostPage/index'
import LoginPage from './pages/LoginPage/index'
import RegisterPage from './pages/RegisterPage/index'
import PostDetailPage from './pages/PostDetailPage/index'
import EditPostPage from './pages/EditPostPage'
import ProtectedRoute from './components/ProtectedRoute';
import NotAuthRoute from './components/NotAuthRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <LandingPage />
        },
        {
          element: <NotAuthRoute />,
          children: [{
            path: "register",
            element: <RegisterPage />
          },
          {
            path: "login",
            element: <LoginPage />
          }],
        },
        {
          path: "post",
          children: [
            {
              element: <ProtectedRoute />,
              children: [
                {
                  path: ":postId/edit",
                  element: <EditPostPage />
                },
                {
                  path: "create-post",
                  element: <CreatePostPage />
                }
              ]
            },
            {
              path: ':postId',
              element: <PostDetailPage />
            }
          ]
        }

      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
