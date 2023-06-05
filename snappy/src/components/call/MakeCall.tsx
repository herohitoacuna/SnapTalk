import { useContext } from "react";
import { CallContext } from "../../context/callContext";
import IUser from "../../interfaces/User";
import { defaultChars } from "../../utils/avatarDefaultChars";
import CallEndIcon from "@mui/icons-material/CallEnd";

export default function MakeCall(props: IUser) {
	const { avatar, firstName, lastName } = props;
	const { endCall } = useContext(CallContext);

	return (
		<div
			className="w-[350px] h-[400px] rounded-md
            bg-blue-200
            flex flex-col items-center justify-around">
			<div className="flex flex-col items-center">
				<div
					className={`w-28 h-28 mb-5 flex items-center justify-center text-3xl font-semibold rounded-full
                    bg-black/20 bg-cover]`}>
					{avatar ? (
						<img
							className="rounded-full object-cover "
							src={avatar}
							alt="Images"
						/>
					) : (
						defaultChars(firstName, lastName)
					)}
				</div>

				<p className="text-xl font-semibold">{`${firstName} ${lastName}`}</p>
				<p className="text-lg text-center">Ringing ...</p>
			</div>
			<div>
				<button
					onClick={endCall}
					className="h-12 w-12 rounded-full bg-red-500 self-start">
					<CallEndIcon sx={{ color: "white", fontSize: "2rem" }} />{" "}
				</button>
			</div>
		</div>
	);
}
