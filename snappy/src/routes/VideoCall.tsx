import { useContext } from "react";
import { CallContext } from "../context/callContext";

export default function VideoCall() {
	const { localVideoRef, remoteVideoRef } = useContext(CallContext);

	return (
		<div className="relative">
			<video
				ref={remoteVideoRef}
				className="w-screen h-screen bg-blue-200"
			/>
			<video
				ref={localVideoRef}
				className="absolute w-[350px] h-[250px] z-50 bottom-8 right-8 rounded-md bg-white"
			/>
		</div>
	);
}
