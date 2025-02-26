import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [searchFilter, setsearchFilter] = useState({ title: '', location: '' });
    const [isSearch, setIsSearch] = useState(false);
    const value = {
        searchFilter, setsearchFilter, isSearch, setIsSearch
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
