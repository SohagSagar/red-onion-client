import { useEffect, useState } from "react"

const useAdmin = (user) => {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {

            // get the data from the api
            const data = await fetch(`http://localhost:5000/super-admin/${user?.email}`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            // convert the data to json
            const json = await data.json();
            setIsAdmin(json?.admin);
        }
        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [user])

    return isAdmin;


}
export default useAdmin;