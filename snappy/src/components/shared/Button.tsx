type ButtonProps = {
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	type?: "submit" | "reset" | "button" | undefined;
	children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ disabled, className, type = "button", children, onClick }) => {
	const buttonState = disabled ? "cursor-not-allowed" : "hover-container bg-violet-900";

	return (
		<button
			onClick={onClick}
			type={type}
			className={`${buttonState} w-full py-2 rounded-md text-white  text-lg font-semibold border-[2px] border-white`}>
			{children}
		</button>
	);
};

export default Button;
