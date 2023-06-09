const DateSeparator = ({ date }: { date: string }) => {
	return (
		<div className="text-[12px] text-slate-400 flex justify-center items-center mb-3 ">
			<HorizontalLine />
			{date}
			<HorizontalLine />
		</div>
	);
};

export default DateSeparator;

function HorizontalLine() {
	return <div className="w-[40%] mx-5 border-[0.5px] border-slate-500/10"></div>;
}
