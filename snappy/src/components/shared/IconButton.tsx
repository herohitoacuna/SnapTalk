interface IconButtonProps {
	onClick?: () => void;
	className?: string;
	rounded?: boolean;
	icon: JSX.Element;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, className, icon, rounded = true }) => {
	return (
		<button
			onClick={onClick}
			className={`${className} p-2
            ${rounded ? "rounded-full" : "rounded-lg"}    
        `}>
			{icon}
		</button>
	);
};

export default IconButton;
