import { NavLink } from "react-router-dom";
import Result from "./Result";
import IUser from "../../interfaces/User";
import { useContext } from "react";
import { ContactContext } from "../../context/contactsContext";
import { SearchContext } from "../../context/searchContext";

interface ResultListProps {
	searchResults: IUser[];
	onUserClick: () => void;
	onKeyUp: (e: React.KeyboardEvent) => void;
}

const ResultList: React.FC<ResultListProps> = ({ searchResults, onUserClick, onKeyUp }) => {
	const { contacts } = useContext(ContactContext);

	const arrayContactsId = contacts.map((contact) => contact.user._id);

	return (
		<div className="absolute top-[9vh] w-[94%] max-h-[25rem] overflow-y-auto z-20 px-3 py-2 rounded-sm bg-white shadow-md shadow-slate-400 ">
			{searchResults.length === 0 && <p className="text-center">User not found</p>}
			{searchResults.length !== 0 &&
				searchResults
					.sort((a, b) => a.firstName.localeCompare(b.firstName))
					.map((result, index) => {
						const { _id, firstName, lastName, avatar, username } = result;
						let inContacts = false;
						if (arrayContactsId.includes(_id)) {
							inContacts = true;
						}
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
									onUserClick={onUserClick}
									onKeyUp={onKeyUp}
									inContacts={inContacts}
								/>
							</NavLink>
						);
					})}
		</div>
	);
};

export default ResultList;
