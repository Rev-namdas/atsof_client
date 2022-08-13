import React, { createContext, useState } from "react";

const Context = createContext();

export default function ContextProvider(props) {
    const [auth, setAuth] = useState(null);

    return (
		<Context.Provider value={[auth, setAuth]}>
			{props.children}
		</Context.Provider>
	);
}
