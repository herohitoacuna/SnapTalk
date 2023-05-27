import { ChangeEvent, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer } from "react-toastify";
import { showSuccessNotify, showErrorNotify } from "../../utils/showNotification";
import ProfileInput from "../shared/ProfileInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import updateProfileResolver from "../../formResolver/updateProfileResolver";

interface ProfileInfoProps {
	firstName: string;
	lastName: string;
	avatar: string;
	username: string;
	email: string;
	onOpenPersonInfo: (state: boolean) => void;
}

type FormValues = {
	firstName: string;
	lastName: string;
	avatar?: File | string;
	username: string;
	email: string;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({
	firstName,
	lastName,
	avatar,
	username,
	email,
	onOpenPersonInfo,
}) => {
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const [imageObj, setImageObj] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState("");

	const {
		register,
		getFieldState,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: updateProfileResolver,
		defaultValues: {
			firstName,
			lastName,
			username,
			email,
		},
	});

	useEffect(() => {
		setImageUrl(avatar);
	}, [avatar]);

	function handleImageFile(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		const fileTypeAllowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

		if (file) {
			if (fileTypeAllowed.includes(file.type)) {
				//set the imnage file and save it into the data that will sent to the backend
				setImageObj(file);

				//will read the file and create an object for it
				const imageReader = new FileReader();
				imageReader.onload = (e) => {
					const imageContent = e.target?.result as string;
					setImageUrl(imageContent);
				};
				imageReader.readAsDataURL(file);
			} else {
				showErrorNotify("Invalid file type");
			}
		}
	}

	async function onSubmit(data: FormValues) {
		const formData: Partial<FormValues> = {};

		// push all the fieldName that are modified in the form
		for (const dataProperty in data) {
			const fieldName = dataProperty as keyof FormValues;
			const { isDirty } = getFieldState(fieldName);
			if (isDirty) {
				formData[fieldName] = (data as any)[fieldName];
			}
		}

		if (imageObj) {
			formData.avatar = imageObj;
		}

		// dont run the http request if there is no changes in the formData
		if (Object.keys(formData).length === 0) {
			setDisabled(true);
			return;
		}

		try {
			setLoading(true);
			setButtonDisabled(true);

			const res = await axios.patch(`${import.meta.env.VITE_PORT}/api/users/user`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			const resData = res.data;
			// setImageUrl(resData.avatar);
			if (res.status === 200) {
				showSuccessNotify("Successfully updated.");
			} else {
				showErrorNotify("Sorry there is an error.");
			}
		} catch (error) {
			showErrorNotify("Sorry there is an error.");
			console.log(error);
		}
		setButtonDisabled(false);
		setLoading(false);
		setDisabled(true);
	}

	function handleCancelClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setDisabled(true);
		setImageUrl(avatar);
		reset();
	}

	return (
		<div
			className="h-screen w-screen absolute
			flex items-center justify-center top-0 letf-0 
			bg-black/40 ">
			<ToastContainer
				toastClassName="bg-red"
				limit={5}
			/>
			<div className="w-[30%] bg-white p-5 rounded-md">
				<h1 className="text-2xl text-center mb-5 font-semibold">Personal Information</h1>

				<form
					className="flex flex-col items-center grow gap-5"
					encType="multipart/form-data">
					<div
						className={`flex items-center justify-center h-[150px] w-[150px] relative
						text-bold text-white text-6xl
						bg-blue-500 rounded-full shadow-md shadow-black/20`}>
						{imageUrl ? (
							<img
								className="h-[150px] w-[150px] rounded-full object-cover "
								src={imageUrl}
								alt="Images"
							/>
						) : (
							"HA"
						)}
					</div>
					<label
						htmlFor="avatar"
						className={disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}>
						<span className="border px-2 py-1 rounded-md drop-shadow-2xl font-semibold">
							<EditIcon sx={{ fontSize: "1rem" }} /> Change Photo
						</span>
						<input
							onChange={handleImageFile}
							id="avatar"
							className="hidden"
							type="file"
							disabled={disabled}
						/>
					</label>

					<ProfileInput
						className={errors?.firstName ? "border-[2px] border-red-500 focus:outline-red-500" : ""}
						register={register}
						name="firstName"
						disabled={disabled}
						placeholder="Firstname"
					/>
					{errors?.firstName && <p className="text-red-600 text-sm -mt-4">{errors.firstName.message}</p>}

					<ProfileInput
						className={errors?.lastName ? "border-[2px] border-red-500 focus:outline-red-500" : ""}
						register={register}
						name="lastName"
						disabled={disabled}
						placeholder="Lastname"
					/>
					{errors?.lastName && <p className="text-red-600 text-sm -mt-4">{errors.lastName.message}</p>}

					<ProfileInput
						className={errors?.username ? "border-[2px] border-red-500 focus:outline-red-500" : ""}
						register={register}
						name="username"
						disabled={disabled}
						placeholder="Username"
					/>
					{errors?.username && <p className="text-red-600 text-sm -mt-4">{errors.username.message}</p>}

					<ProfileInput
						className={errors?.email ? "border-[2px] border-red-500 focus:outline-red-500" : ""}
						register={register}
						name="email"
						disabled={disabled}
						placeholder="Email"
					/>
					{errors?.email && <p className="text-red-600 text-sm -mt-4">{errors.email.message}</p>}

					<div className="w-full flex justify-end gap-5">
						{!disabled ? (
							<>
								<button
									onClick={handleSubmit(onSubmit)}
									type="submit"
									className="flex items-center gap-2 font-semibold text-white px-4 py-2 rounded-md shadow shadow-black/20 bg-sky-500
									disabled:opacity-50 disabled:cursor-not-allowed
									"
									disabled={buttonDisabled}>
									{loading && (
										<CircularProgress
											thickness={8}
											color="primary"
											size={20}
										/>
									)}
									Apply & Save
								</button>
								<button
									onClick={handleCancelClick}
									type="button"
									className="font-semibold px-4 py-2 rounded-md shadow shadow-black/20
									disabled:opacity-50 disabled:cursor-not-allowed
									"
									disabled={buttonDisabled}>
									Cancel
								</button>
							</>
						) : (
							<>
								<button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										setDisabled(false);
									}}
									className="font-semibold text-white px-4 py-2 rounded-md shadow shadow-black/20 bg-sky-500">
									Edit
								</button>
								<button
									onClick={(e) => {
										e.preventDefault();
										onOpenPersonInfo(false);
									}}
									type="button"
									className="font-semibold px-4 py-2 rounded-md shadow shadow-black/20">
									Close
								</button>
							</>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfileInfo;
