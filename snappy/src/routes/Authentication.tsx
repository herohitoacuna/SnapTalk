import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getItem } from "../utils/localStorageItems";

const Authentication = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (getItem("token")) {
			navigate("/");
		} else {
			navigate("/auth");
		}
	}, []);
	return (
		<div className="min-h-screen p-5 w-screen flex items-center justify-center relative bg-auth-pattern bg-cover bg-center bg-violet-700">
			<ToastContainer
				toastClassName="bg-red"
				limit={5}
			/>
			<h1 className="absolute md:left-12 top-14 text-center text-white text-6xl font-bold duration-200">
				SnapTalk
			</h1>
			<Outlet />
		</div>
	);
};

export default Authentication;
