import { useState, useEffect, useRef } from "react";

import axios from "axios";

import { useForm } from "react-hook-form";
import loginResolver from "../../utils/loginResolver";

import { NavLink, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadingPage from "../LoadingPage";
import Form from "../shared/FormContainer";
import AuthInput from "../shared/AuthInput";
import Button from "../shared/Button";
import Swal from "sweetalert2";

type FormValues = {
	email: string;
	password: string;
};

const Login = () => {
	const port = import.meta.env.VITE_PORT;

	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [errorStyle, setErrorStyle] = useState("");

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: loginResolver,
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(data: any) {
		setLoading(true);
		axios
			.post(`${port}/api/auth/login`, data)
			.then(({ data }) => {
				localStorage.setItem("id", JSON.stringify(data?._id));
				localStorage.setItem("token", data?.token);
				reset();
				Swal.fire("Login", "Welcome back to SnapTalk", "success");
				setLoading(false);
				navigate("/");
			})
			.catch((error) => {
				console.log(error.response.data?.error);
				setErrorStyle("border-[2px] border-red-500");
				showErrorNotify(error.response.data?.error);
				setLoading(false);
			});
	}

	function showErrorNotify(error: string) {
		toast.error(error, {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnFocusLoss: false,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	}

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<h3 className="text-center text-white text-4xl font-semibold">Welcome</h3>
				<AuthInput
					onFocus={() => setErrorStyle("")}
					className={errorStyle}
					register={register}
					type="text"
					name="email"
					placeholder="Email"
				/>
				{errors?.email && <p className="text-red-200 text-sm -mt-1">{errors.email.message}</p>}

				<AuthInput
					onFocus={() => setErrorStyle("")}
					className={errorStyle}
					register={register}
					type="password"
					name="password"
					placeholder="Password"
				/>
				{errors?.password && <p className="text-red-200 text-sm -mt-1">{errors.password.message}</p>}

				<NavLink to="forgot-password">
					<p className="text-white underline hover:opacity-40 cursor-pointer mb-3">Forgot Password?</p>
				</NavLink>

				<Button type="submit">Login</Button>

				<NavLink to="register">
					<p className="text-white underline hover:opacity-40 cursor-pointer mb-3">Don't have an Account?</p>
				</NavLink>
			</Form>
		</>
	);
};

export default Login;
