import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [searchFilter, setsearchFilter] = useState({ title: '', location: '' });
    const [isSearch, setIsSearch] = useState(false);
    const [jobs, setJobs] = useState([]);

    // function to fetch jobs
    const fetchJobs = async () => { 
        setJobs(jobsData);
    }

    useEffect(() => {
        fetchJobs();
    }, [])

    const value = {
        searchFilter, setsearchFilter, isSearch, setIsSearch, jobs, setJobs
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
