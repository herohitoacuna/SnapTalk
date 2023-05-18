import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
	onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputValue: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, inputValue }) => {
	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		onSearch(e);
	}

	return (
		<>
			<div className="w-full flex items-center justify-center rounded-md py-2 pr-2 bg-white">
				<input
					onChange={handleOnChange}
					value={inputValue}
					type="text"
					placeholder="Search"
					className="w-[95%] text-lg pl-4 outline-none"
				/>
				<SearchIcon sx={{ fontSize: 30, color: "rgba(0,0,0,0.6)", cursor: "text" }} />
			</div>
		</>
	);
};

export default SearchInput;
