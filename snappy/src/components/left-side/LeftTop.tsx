import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import SearchInput from "./SearchInput";
import ResultList from "./ResultList";
import IUser from "../../interfaces/User";
import { queryUsers } from "../../fetchingApi/users";

const LeftTop = () => {
	const [searchInput, setSearchInput] = useState("");
	const [results, setResults] = useState<IUser[]>([]);

	async function searchUsers() {
		try {
			const { responseData } = await queryUsers(searchInput);
			setResults(responseData);
		} catch (error) {
			console.log(error);
		}
	}

	function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchInput(e.target.value.trimStart());
		searchUsers();
	}

	function handleOnKeyUp(e: React.KeyboardEvent) {
		if (e.key === "Enter") {
			setSearchInput("");
		}
	}

	function handleRemoveSearchInput() {
		setSearchInput("");
	}

	return (
		<div className="w-full flex items-center py-4 px-3 border-r-[1px] border-violet-800 bg-container relative">
			<button
				onClick={() => {}}
				className="md:hidden hover:opacity-80 mr-3 cursor-pointer">
				<Avatar sx={{ fontSize: 18 }}>HA</Avatar>
			</button>
			<SearchInput
				onSearch={handleSearchInputChange}
				inputValue={searchInput}
			/>
			{searchInput && (
				<ResultList
					onUserClick={handleRemoveSearchInput}
					onKeyUp={handleOnKeyUp}
					searchResults={results}
				/>
			)}
		</div>
	);
};
export default LeftTop;
