import { createContext, useState } from "react";

interface ShowCompContextType {
	midContainer: boolean;
	rightContainer: boolean;
	handleMidContainer: (state: boolean) => void;
	handleRightContainer: (state: boolean) => void;
}

const initialState = {
	midContainer: false,
	rightContainer: false,
	handleMidContainer: () => {},
	handleRightContainer: () => {},
};

export const ShowCompContext = createContext<ShowCompContextType>(initialState);

export const ShowCompProvider = ({ children }: { children: React.ReactNode }) => {
	const [midContainer, setMidcontainer] = useState(false);
	const [rightContainer, setRightContainer] = useState(false);

	function handleMidContainer(state: boolean) {
		setMidcontainer(state);
	}

	function handleRightContainer(state: boolean) {
		setRightContainer(state);
	}

	const contextValue: ShowCompContextType = {
		midContainer,
		rightContainer,
		handleMidContainer,
		handleRightContainer,
	};

	return <ShowCompContext.Provider value={contextValue}>{children}</ShowCompContext.Provider>;
};
