import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CircularProgress from "@mui/material/CircularProgress";

const SenderMessage: React.FC<{ content: string; timestamp: Date; seen: boolean | undefined }> = ({
	content,
	timestamp,
	seen,
}) => {
	return (
		<div className="flex justify-end">
			<div className="inline-block max-w-[60%] text-right py-2 px-5 rounded-md bg-yellow-200">
				<p className="whitespace-pre-line break-words text-base text-left">{content}</p>

				<div className="flex flex-row-reverse gap-1">
					<p className="text-xs text-slate-700">
						{new Date(timestamp).toLocaleTimeString([], {
							hour12: true,
							hour: "numeric",
							minute: "2-digit",
						})}
					</p>

					{seen === undefined ? (
						<CircularProgress size={15} />
					) : seen ? (
						<DoneAllIcon sx={{ width: "15px", height: "15px" }} />
					) : (
						<DoneIcon style={{ width: "15px", height: "15px" }} />
					)}
				</div>
			</div>
		</div>
	);
};

export default SenderMessage;
