import { NavLink } from "react-router-dom";
import Result from "./Result";
import IUser from "../../interfaces/User";

interface ResultListProps {
	searchResults: IUser[];
	onUserClick: () => void;
	onKeyUp: (e: React.KeyboardEvent) => void;
}

const ResultList: React.FC<ResultListProps> = ({ searchResults, onUserClick, onKeyUp }) => {
	return (
		<div className="absolute top-[9vh] w-[94%] max-h-[25rem] overflow-y-auto z-20 px-5 py-2 rounded-sm bg-white shadow-md shadow-slate-400 ">
			{searchResults.length === 0 ? (
				<p className="text-center">User not found</p>
			) : (
				searchResults.map((result, index) => {
					const { _id, firstName, lastName, avatar, username } = result;
					return (
						<NavLink
							key={_id}
							to={_id}>
							<Result
								id={_id}
								firstName={firstName}
								lastName={lastName}
								avatar={avatar}
								username={username}
								index={index}
								onUserClick={onUserClick}
								onKeyUp={onKeyUp}
							/>
						</NavLink>
					);
				})
			)}
		</div>
	);
};

export default ResultList;
