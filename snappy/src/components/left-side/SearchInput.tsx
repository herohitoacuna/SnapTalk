import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { SearchContext } from "../../context/searchContext";

interface SearchInputProps {
	onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputValue: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, inputValue }) => {
	const searchCtx = useContext(SearchContext);

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		onSearch(e);
	}

	return (
		<>
			<div className="w-full flex items-center justify-center rounded-md py-2 pr-2 bg-white">
				<input
					ref={searchCtx?.ref}
					onFocus={(e) => searchCtx?.onFocus(e)} // Pass the onFocus event handler
					onChange={handleOnChange}
					value={inputValue}
					type="text"
					placeholder="Search"
					className="w-[95%] text-base pl-4 outline-none"
				/>
				<SearchIcon sx={{ fontSize: 30, color: "rgba(0,0,0,0.6)", cursor: "text" }} />
			</div>
		</>
	);
};

export default SearchInput;
