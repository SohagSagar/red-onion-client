import { useEffect } from "react";
import { useState } from "react"



const useToken = (user) => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const email= user?.user?.email;
        const name = user?.user?.displayName;
        const dateTime = new Date().toLocaleString();
        const currentUser = {email:email,name:name,lastLogged:dateTime}

        if(email){
            fetch(`https://vast-wave-53666.herokuapp.com/users/${email}`,{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(currentUser)
            })
            .then(res=>res.json())
            .then(data=>{
                const accessToken= data?.token;
                localStorage.setItem('accessToken',accessToken)
                setToken(accessToken);
            })
        }

    }, [user])


    return [token];
}

export default useToken;