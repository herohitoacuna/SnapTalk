import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Form from "../shared/FormContainer";
import AuthInput from "../shared/AuthInput";
import Button from "../shared/Button";
import LoadingPage from "../LoadingPage";
import Swal from "sweetalert2";
import registerResolver from "../../utils/registerResolver";

interface FormValues {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	verifyPassword: string;
}

const Register = () => {
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
		resolver: registerResolver,
		defaultValues: {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			verifyPassword: "",
		},
	});

	function onSubmit(data: FormValues) {
		const { firstName, lastName, username, email, password } = data;

		setLoading(true);
		axios
			.post(`${port}/api/auth/register`, {
				firstName,
				lastName,
				username,
				email,
				password,
			})
			.then((res) => {
				console.log(res.data);
				reset();
				Swal.fire("Success", "Succesfully created an account!", "success");
				navigate("/auth");
			})
			.catch((error) => {
				console.log(error.response?.data);
				setErrorStyle("border-[2px] border-red-500");
				showErrorNotify(error.response?.data.error);
				setLoading(false);
			});
	}

	function showErrorNotify(error: string) {
		toast.error(error, {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
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
		<Form onSubmit={handleSubmit(onSubmit)}>
			<h3 className="text-center text-white text-4xl font-semibold">Create Account</h3>
			<AuthInput
				register={register}
				name="firstName"
				placeholder="Firstname"
				className={errorStyle}
			/>
			{errors?.firstName && <p className="text-red-200 text-sm -mt-1">{errors.firstName.message}</p>}

			<AuthInput
				register={register}
				name="lastName"
				placeholder="Lastname"
				className={errorStyle}
			/>
			{errors?.lastName && <p className="text-red-200 text-sm -mt-1">{errors.lastName.message}</p>}

			<AuthInput
				register={register}
				name="username"
				placeholder="Username"
				className={errorStyle}
			/>
			{errors?.username && <p className="text-red-200 text-sm -mt-1">{errors.username.message}</p>}

			<AuthInput
				register={register}
				name="email"
				type="text"
				placeholder="Email"
				className={errorStyle}
			/>
			{errors?.email && <p className="text-red-200 text-sm -mt-1">{errors.email.message}</p>}

			<AuthInput
				register={register}
				type="password"
				name="password"
				placeholder="Password"
				className={errorStyle}
			/>
			{errors?.password && <p className="text-red-200 text-sm -mt-1">{errors.password.message}</p>}

			<AuthInput
				register={register}
				type="password"
				name="verifyPassword"
				placeholder="Verify Password"
				className={errorStyle}
			/>
			{errors?.verifyPassword && <p className="text-red-200 text-sm -mt-1">{errors.verifyPassword.message}</p>}

			<Button type="submit">Register</Button>

			<NavLink to="/auth">
				<p className="text-white underline hover:opacity-40 cursor-pointer mb-3">Have an Account?</p>
			</NavLink>
		</Form>
	);
};

export default Register;
