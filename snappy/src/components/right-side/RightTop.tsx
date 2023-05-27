import { Avatar } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "../shared/IconButton";

interface RightTopProps {
	firstName: string;
	lastName: string;
	username: string;
	avatar: string;
	onClick: () => void;
}

const RightTop: React.FC<RightTopProps> = ({ firstName, lastName, username, avatar, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="w-full h-[10%] flex border-l-[1px] border-violet-600">
			<IconButton
				className={`md:hidden`}
				onClick={() => {}}
				rounded={false}
				icon={<ArrowBackIosNewIcon sx={{ color: "white", fontSize: 20 }} />}
			/>
			<div className="h-full w-full flex items-center px-5 hover-container">
				<Avatar
					src={avatar}
					sx={{ height: 50, width: 50 }}>
					{firstName.substring(0, 1).toUpperCase() + lastName.substring(0, 1).toUpperCase()}
				</Avatar>
				<div className="ml-2">
					<p className="max-w-[270px] text-white font-bold text-lg truncate">{`${firstName} ${lastName}`}</p>
					<p className="max-w-[270px] text-white text-sm truncate">@{username}</p>
				</div>
			</div>
		</div>
	);
};

export default RightTop;
