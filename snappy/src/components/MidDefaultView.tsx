import { useState } from "react";
import midBackground from "../assets/mid-bg.jpeg";
import midBackground2 from "../assets/mid-bg2.jpeg";

const MidDefaultView = () => {
	const [bgImage, setBgImage] = useState(midBackground);

	return (
		<div
			style={{ backgroundImage: `url(${bgImage})` }}
			className="hidden md:flex items-center justify-center w-[50%] bg-container relative">
			<div className="flex gap-4 absolute right-10 top-10">
				<button
					onClick={() => setBgImage(midBackground2)}
					style={{ backgroundImage: `url(${midBackground2})` }}
					className="w-[5rem] h-[5rem] bg-cover bg-white outline outline-white rounded-md"></button>
				<button
					onClick={() => setBgImage(midBackground)}
					style={{ backgroundImage: `url(${midBackground})` }}
					className="w-[5rem] h-[5rem] bg-cover bg-white outline outline-white rounded-md"></button>
			</div>
			<button className="px-6 py-4 outline outline-2 outline-white  text-white text-lg bg-violet-900/30 font-medium rounded-md item hover-container">
				Connect With People
			</button>
		</div>
	);
};

export default MidDefaultView;
