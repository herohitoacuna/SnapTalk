import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import Form from "../shared/FormContainer";
import AuthInput from "../shared/AuthInput";
import Button from "../shared/Button";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingPage from "../LoadingPage";
import resetPassResolver from "../../utils/resetPassResolver";

interface FormValues {
	email: string;
	newPassword: string;
}

const ForgotPassword = () => {
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
		resolver: resetPassResolver,
		defaultValues: {
			email: "",
			newPassword: "",
		},
	});

	function onSubmit(data: FormValues) {
		setLoading(true);
		axios
			.put(`${port}/api/auth/reset-password`, data)
			.then(({ data }) => {
				reset();
				Swal.fire("Success", `Successfully changed password`, "success");
				navigate("/auth");
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
			<h3 className="text-center text-white text-4xl font-semibold">Reset Password</h3>
			<AuthInput
				register={register}
				name="email"
				type="email"
				placeholder="Email"
				className={errorStyle}
			/>
			{errors?.email && <p className="text-red-200 text-sm -mt-1">{errors.email.message}</p>}

			<AuthInput
				register={register}
				name="newPassword"
				type="password"
				placeholder="New Password"
				className={errorStyle}
			/>
			{errors?.newPassword && <p className="text-red-200 text-sm -mt-1">{errors.newPassword.message}</p>}

			<Button type="submit">Reset Password</Button>

			<NavLink to="/auth">
				<p className="text-white underline hover:opacity-40 cursor-pointer mb-3">Back to login</p>
			</NavLink>
		</Form>
	);
};

export default ForgotPassword;
