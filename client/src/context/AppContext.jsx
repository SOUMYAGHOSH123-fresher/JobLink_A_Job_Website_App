import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth, useUser } from '@clerk/clerk-react';


export const AppContext = createContext();

export const AppContextProvider = (props) => {

    // Add url for backend file
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { user } = useUser()
    const { getToken } = useAuth();

    const [searchFilter, setsearchFilter] = useState({ title: '', location: '' });
    const [isSearch, setIsSearch] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
    const [companyToken, setCompanyToken] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    const [userData, setUserData] = useState(null);
    const [userApplications, setUserApplications] = useState([]);


    // function to fetch jobs
    const fetchJobs = async () => { 
        try {
            const { data } = await axios.get(backendUrl + '/api/jobs');
            if (data.success) {
                setJobs(data.jobs);
                console.log(data.jobs);                
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        
    }

    // function to fetch jobs
    const fetchCompanyData = async () => { 
        try {
            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } });
            if (data.success) {
                setCompanyData(data.company);
                console.log(data);                
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //   function to fetch the user data
    const fetchUserData = async () => {
        try {
            // Get the token from Clerk
            const token = await getToken();
            
            if (!token) {
                console.error('No token received from Clerk');
                return toast.error('Authentication failed. Please try logging in again.');
                
            }            
            console.log('Got token from Clerk');
            
            // Make the API request with the token in the Authorization header
            const { data } = await axios.get(backendUrl + '/api/users/user', {
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (data.success) {
                setUserData(data.user);
                console.log('User data fetched successfully');
            } else {
                console.error('Error fetching user data:', data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error in fetchUserData:', error);
            
            // Handle specific error cases
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response:', error.response.data);
                toast.error(error.response.data.message || 'Failed to fetch user data');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                toast.error('No response from server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up request:', error.message);
                toast.error('Error setting up request: ' + error.message);
            }
        }
    }


    // function to fetch user's Application data
    const fetchUserApplications = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get(backendUrl + '/api/users/applications', 
                {headers:{Authorization: `Bearer ${token}`}}
            )
            if (data.success) {
                setUserApplications(data.applications.reverse());
            } else {
                toast.error(data.message); 
            }
        } catch (error) {
            toast.error(error.message);
        }
    } 

    useEffect(() => {
        fetchJobs();
        const storedCompanyToken = localStorage.getItem('companyToken');
        if (storedCompanyToken) { 
            setCompanyToken(storedCompanyToken);
        }
    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData();
        }
    }, [companyToken])

    useEffect(() => {
        if (user) {
            fetchUserData();
            fetchUserApplications();
        }
    }, [user])

    const value = {
        searchFilter, setsearchFilter,
        isSearch, setIsSearch,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        userData, setUserData,
        userApplications, setUserApplications,
        backendUrl,
        fetchUserData,
        fetchUserApplications
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
