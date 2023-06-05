import { useState, useContext, useEffect } from "react";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { defaultChars } from "../../utils/avatarDefaultChars";
import IUser from "../../interfaces/User";
import { CallContext } from "../../context/callContext";
import { getContactInfo } from "../../fetchingApi/users";
import { IContact } from "../../interfaces/Contact";

export default function ReceiveCall() {
	const { offerSDP, answerCall, endCall } = useContext(CallContext);
	const [callerInfo, setCallerInfo] = useState<IContact | null>(null);

	useEffect(() => {
		const fetchCallerInfo = async () => {
			try {
				if (!offerSDP) return;
				const { responseData } = await getContactInfo(offerSDP?.callerId);
				console.log(responseData);

				setCallerInfo(responseData);
			} catch (error) {
				console.log(error);
			}
		};
		if (!offerSDP) return;
		fetchCallerInfo();
	}, [offerSDP]);

	return (
		<div
			className="w-[350px] h-[400px] 
            bg-blue-200
            flex flex-col items-center justify-around">
			<div className="flex flex-col items-center">
				<div
					className={`w-28 h-28 mb-5 flex items-center justify-center text-3xl font-semibold rounded-full
                    bg-black/20 bg-cover]`}>
					{callerInfo?.avatar ? (
						<img
							className="rounded-full object-cover "
							src={callerInfo?.avatar}
							alt="Images"
						/>
					) : (
						defaultChars(callerInfo?.firstName, callerInfo?.lastName)
					)}
				</div>

				<p className="text-xl font-semibold">{`${callerInfo?.firstName} ${callerInfo?.lastName}`}</p>
				<p className="text-lg text-center">Calling ...</p>
			</div>

			<div className="flex gap-10">
				<button
					onClick={answerCall}
					className="h-12 w-12 rounded-full bg-green-500 self-start">
					<CallIcon sx={{ color: "white", fontSize: "2rem" }} />
				</button>
				<button
					onClick={endCall}
					className="h-12 w-12 rounded-full bg-red-500 self-start">
					<CallEndIcon sx={{ color: "white", fontSize: "2rem" }} />
				</button>
			</div>
		</div>
	);
}
