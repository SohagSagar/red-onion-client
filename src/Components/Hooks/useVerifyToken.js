import { signOut } from "firebase/auth";
import auth from "../../Firebase/Firebase";
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

const useVerifyToken = (statusCode401,statusCode403) =>{
    const navigate=useNavigate()
    if(statusCode401===403 || statusCode403===403){
        signOut(auth);
        navigate('/login');
        localStorage.removeItem('accessToken');
        toast.error('Forbidden Access');
    }
}

export default useVerifyToken;