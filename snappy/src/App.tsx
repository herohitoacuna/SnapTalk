import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContactProvider } from "./context/contactsContext";

import RootLayout from "./routes/Root";
import Mid from "./components/Mid";
import MidDefaultView from "./components/MidDefaultView";
import Authentication from "./routes/Authentication";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import { MessagesProvider } from "./context/messagesContext";
import { SearchProvider } from "./context/searchContext";

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
		<SearchProvider>
			<MessagesProvider>
				<ContactProvider>
					<RouterProvider router={router} />
				</ContactProvider>
			</MessagesProvider>
		</SearchProvider>
	);
};

export default App;
