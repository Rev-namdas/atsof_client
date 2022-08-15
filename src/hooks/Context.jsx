import React, { createContext, useState } from "react";

export const GlobalStore = createContext();

export default function ContextProvider(props) {
    const [auth, setAuth] = useState(null);

    return (
		<GlobalStore.Provider value={{auth, setAuth}}>
			{props.children}
		</GlobalStore.Provider>
	);
}
