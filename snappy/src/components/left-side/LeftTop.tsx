import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import SearchInput from "./SearchInput";
import ResultList from "./ResultList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IUser from "../../interfaces/User";

const LeftTop = () => {
	const navigate = useNavigate();
	const [searchInput, setSearchInput] = useState("");
	const [results, setResults] = useState<IUser[]>([]);
	const [eventKey, setEventKey] = useState("");

	async function searchUsers() {
		try {
			const usersResult = await axios.get(
				`${import.meta.env.VITE_PORT}/api/users/user/search?search=${searchInput}`,
			);
			const usersData = usersResult.data;
			setResults(usersData);
		} catch (error) {
			console.log(error);
		}
	}

	function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchInput(e.target.value.trimStart());
		searchUsers();
	}

	function handleOnKeyUp(e: React.KeyboardEvent) {
		console.log(e.key);
		if (e.key === "Enter") {
			setSearchInput("");
		}
	}

	function handleRemoveSearchInput() {
		setSearchInput("");
	}

	return (
		<div className="w-full flex items-center py-6 px-4 border-r-[1px] border-violet-800 bg-container relative">
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
