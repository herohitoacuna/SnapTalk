import { useContext, useRef } from "react";
import { VideoCallContext } from "../context/videoCallContext";

const VideoAudioCall = () => {
	const { localVideoRef, remoteVideoRef } = useContext(VideoCallContext);

	return (
		<div
			className={`absolute w-[500px] h-[400px]
            top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
            bg-black cursor-grab
            `}>
			<video
				ref={localVideoRef}
				className="w-full h-full"
				playsInline
				autoPlay
				controls={false}></video>
			<video
				ref={remoteVideoRef}
				className="w-[3rem] h-[3rem]"
				playsInline
				autoPlay
				controls={false}></video>
		</div>
	);
};

export default VideoAudioCall;
