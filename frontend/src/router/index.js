import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register/Register";
import CheckEmail from "../pages/EmailVerification/CheckEmail";
import Checkpassword from "../pages/Passwordverification/Checkpassword";
import Home from "../pages/Home/Home";
import MessagePage from "../component/MessagePage";
import AuthLayout from "../layout";
import ProtectedRoute from "./ProtectedRoute";
import TokenProtectedRoute from "./TokenProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: (
          <AuthLayout>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path: "emailVerification",
        element: (
          <AuthLayout>
            <CheckEmail />
          </AuthLayout>
        ),
      },
      {
        path: "passwordVerfication",
        element: (
          <ProtectedRoute>
            <AuthLayout>
              <Checkpassword />
            </AuthLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "",
        element: (
          <TokenProtectedRoute>
            <Home />
          </TokenProtectedRoute>
        ),
        children: [
          {
            path: ":userId",
            element: (
              <TokenProtectedRoute>
                <MessagePage />
              </TokenProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
