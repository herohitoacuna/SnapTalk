import { forwardRef, useState, ChangeEvent } from "react";
import { UseFormRegister, Validate } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type AuthInputProps = {
	type?: "text" | "email" | "number" | "password";
	name: string;
	placeholder: string;
	className?: string;
	register?: UseFormRegister<any>;
	onFocus?: () => void;
};

const AuthInput: React.FC<AuthInputProps> = ({ name, type = "text", placeholder, className, register, onFocus }) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="relative">
			<input
				{...register?.(name)}
				onFocus={onFocus}
				type={type === "password" ? (showPassword ? "text" : "password") : type}
				placeholder={placeholder}
				className={`${className} w-full h-[3rem] px-3 rounded-md outline-violet-900 outline-4 `}
			/>

			{type === "password" && (
				<div
					onClick={() => setShowPassword(!showPassword)}
					className="absolute top-[50%] translate-y-[-50%] right-[0.5rem] text-slate-500 cursor-pointer hover:opacity-60">
					{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
				</div>
			)}
		</div>
	);
};

export default AuthInput;
