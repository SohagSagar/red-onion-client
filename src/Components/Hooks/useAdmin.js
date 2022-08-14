import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import Loading from "../SharedComponents/Loading"

const useAdmin = (user) => {
    const [isAdmin, setIsAdmin] = useState(false)

    const { data, isLoading } = useQuery(['super-admin', user], async () => await fetch(`http://localhost:5000/super-admin/${user?.email}`, {
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    // .then(res => {

    //     res.status === 200 ? setIsAdmin(true) : setIsAdmin(false)
    //     return res.json()
    // })
    // , { enabled: !!user }


    //     useEffect(() => {
    //     // declare the async data fetching function
    //     // setLoading(true)
    //     const fetchData = async () => {

    //       // get the data from the api
    //       const data = await fetch(`http://localhost:5000/super-admin/${user?.email}`, {
    //         headers: {
    //           'content-type': 'application/json',
    //           'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         }
    //       });
    //       // convert the data to json
    //       const json = await data.json();
    //       console.log(json);

    //       // set state with the result
    //       await json.status === 200 ? setIsAdmin(true) : setIsAdmin(false);

    //     //   setLoading(false)
    //     }
    //     // call the function
    //     fetchData()
    //       // make sure to catch any error
    //       .catch(console.error);
    //   }, [user])

    // if(isLoading){
    //     console.log('get loading');
    //     return ;
    // }else{
    //     console.log('get admin');
    //     return isAdmin;

    // }

    // if(isLoading){
    //     console.log('loading',isLoading);
    //     return ;
    // }else{

    //     return isAdmin;
    // }
    setIsAdmin(data.admin);
    if (isLoading) {
        return;
    } else {

        return isAdmin;
    }





}
export default useAdmin;