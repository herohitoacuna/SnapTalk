import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import socket from "./socket/socketConnection";

import { ShowCompProvider } from "./context/show-comp";

import RootLayout from "./routes/Root";
import Mid from "./components/Mid";
import MidDefaultView from "./components/MidDefaultView";
import Authentication from "./routes/Authentication";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <MidDefaultView />,
			},
			{
				path: ":contactId",
				element: <Mid />,
			},
		],
	},
	{
		path: "/auth",
		element: <Authentication />,
		children: [
			{
				index: true,
				element: <Login />,
			},
			{
				path: "register",
				element: <Register />,
			},
			{
				path: "forgot-password",
				element: <ForgotPassword />,
			},
		],
	},
]);

const App = () => {
	return (
		<ShowCompProvider>
			<RouterProvider router={router} />
		</ShowCompProvider>
	);
};

export default App;
