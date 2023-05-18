import { useContext } from "react";

import { Avatar } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import IconButton from "../shared/IconButton";

import { ShowCompContext } from "../../context/show-comp";
import IUser from "../../interfaces/User";

type MidTopProps = {
	contact: IUser | undefined;
};

const MidTop: React.FC<MidTopProps> = ({ contact }) => {
	const { handleMidContainer } = useContext(ShowCompContext);

	function handleCloseMid() {
		handleMidContainer(false);
	}

	return (
		<div className="w-full flex items-center md:px-7 py-3 px-2 text-white bg-container">
			<IconButton
				className="lg:hidden hover-container"
				onClick={handleCloseMid}
				rounded={false}
				icon={<ArrowBackIosNewIcon sx={{ color: "white", fontSize: "1.7rem" }} />}
			/>

			<div className="max-w-[60%] flex items-center hover-container px-3 py-2 rounded-md cursor-pointer">
				<Avatar
					src={contact?.avatar}
					sx={{ height: 45, width: 45, fontSize: 20 }}>
					{`${contact?.firstName.substring(0, 1).toUpperCase()}${contact?.lastName
						.substring(0, 1)
						.toUpperCase()}`}
				</Avatar>
				<h1 className="max-w-[170px] md:max-w-[20rem] ml-4 text-[1.2rem] lg:text-[1.35rem] font-semibold truncate">
					{`${contact?.firstName} ${contact?.lastName}`}
				</h1>
			</div>

			<div className="ml-auto flex">
				<IconButton
					className="hover-container lg:mr-3"
					icon={<CallIcon sx={{ color: "white", fontSize: "2.5rem" }} />}
				/>
				<IconButton
					className="hover-container"
					icon={<VideocamIcon sx={{ color: "white", fontSize: "2.5rem" }} />}
				/>
			</div>
		</div>
	);
};

export default MidTop;
