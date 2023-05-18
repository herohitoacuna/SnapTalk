import { NavLink } from "react-router-dom";
import Message from "./Message";

const LeftMsgs = () => {
	// fetch contacts and their last message (useEffect)
	// pass the user details in "SideMessage" component

	return (
		<div className="h-[91%] max-w-full overflow-y-auto border-r-[1px] border-slate-300 scroll-smooth">
			<Message />
		</div>
	);
};

export default LeftMsgs;
