import { UseFormRegister } from "react-hook-form";

interface ProfileInputProps {
	disabled: boolean;
	placeholder: string;
	className?: string;
	name: string;
	register?: UseFormRegister<any>;
}

const ProfileInput: React.FC<ProfileInputProps> = ({ register, name, disabled, placeholder, className }) => {
	return (
		<input
			{...register?.(name)}
			className={`${className} w-full px-5 py-2 shadow shadow-slate-500 text-lg
						disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-70`}
			type="text"
			placeholder={placeholder}
			disabled={disabled}
		/>
	);
};

export default ProfileInput;
