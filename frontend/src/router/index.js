import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register/Register";
import CheckEmail from "../pages/EmailVerification/CheckEmail";
import Checkpassword from "../pages/Passwordverification/Checkpassword";
import Home from "../pages/Home/Home";
import MessagePage from "../component/MessagePage";
import AuthLayout from "../layout";
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
          <AuthLayout>
            <Checkpassword />
          </AuthLayout>
        ),
      },
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
