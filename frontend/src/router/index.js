import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import CheckEmail from "../pages/CheckEmail";
import Checkpassword from "../pages/Checkpassword";
import Home from "../pages/Home";
import Message from "../component/Message";
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
        path: "email",
        element: (
            <AuthLayout>
            <CheckEmail />
          </AuthLayout>
        ),
      },
      {
        path: "password",
        element:  <AuthLayout>
        <Checkpassword />
      </AuthLayout>,
      },
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":userId",
            element: <Message />,
          },
        ],
      },
    ],
  },
]);

export default router;
