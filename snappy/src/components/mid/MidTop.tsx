import { useContext } from "react";
import IUser from "../../interfaces/User";

import { Avatar } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";

import { defaultChars } from "../../utils/avatarDefaultChars";
import IconButton from "../shared/IconButton";
import { CallContext } from "../../context/callContext";

type MidTopProps = {
	contact: IUser | undefined;
};

const MidTop: React.FC<MidTopProps> = ({ contact }) => {
	const { makeCall } = useContext(CallContext);

	return (
		<div className="w-full flex items-center px-5 py-1 text-white bg-container">
			<IconButton
				className="lg:hidden hover-container"
				rounded={false}
				icon={<ArrowBackIosNewIcon sx={{ color: "white", fontSize: "1.7rem" }} />}
			/>

			<div className="max-w-[60%] flex items-center px-3 py-2 rounded-md">
				<Avatar
					src={contact?.avatar}
					sx={{ fontSize: "1.5rem", width: 50, height: 50, backgroundColor: "#0ea5e9" }}>
					{defaultChars(contact?.firstName, contact?.lastName)}
				</Avatar>
				<h1 className="max-w-[170px] md:max-w-[20rem] ml-4 text-[1.2rem] lg:text-[1.35rem] font-semibold truncate">
					{`${contact?.firstName} ${contact?.lastName}`}
				</h1>
			</div>

			<div className="ml-auto flex">
				<IconButton
					onClick={makeCall}
					className="hover-container"
					icon={<VideocamIcon sx={{ color: "white", fontSize: "2rem" }} />}
				/>
				<IconButton
					onClick={() => {}}
					className="hover-container lg:mr-3"
					icon={<CallIcon sx={{ color: "white", fontSize: "2rem" }} />}
				/>
			</div>
		</div>
	);
};

export default MidTop;
