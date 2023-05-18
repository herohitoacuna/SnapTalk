import LeftMsgs from "./left-side/LeftMsgs";
import LeftTop from "./left-side/LeftTop";

const LeftSide = () => {
	return (
		<div className="w-screen h-screen lg:w-[30vw] overflow-hidden bg-white">
			<LeftTop />
			<LeftMsgs />
		</div>
	);
};

export default LeftSide;
