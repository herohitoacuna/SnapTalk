const Form = ({ children, onSubmit }: { children: React.ReactNode; onSubmit: () => void }) => {
	return (
		<form
			onSubmit={onSubmit}
			className="flex flex-col w-[22rem] md:w-[30rem] gap-3 p-5 md:p-10 shadow-md shadow-white backdrop-blur-md rounded-md">
			{children}
		</form>
	);
};

export default Form;
