import React, { createContext, useRef, useState } from "react";

interface SearchContextValue {
	ref: React.RefObject<HTMLInputElement>;
	focus: boolean;
	onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isFocus, setIsFocus] = useState(false);

	function handleSearchFocus(event: React.FocusEvent<HTMLInputElement>) {
		setIsFocus(true);
	}

	const contextValue: SearchContextValue = {
		ref: inputRef,
		onFocus: handleSearchFocus,
		focus: isFocus,
	};

	return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};
