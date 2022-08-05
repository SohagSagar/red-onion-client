import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../Firebase/Firebase';


import Loading from './Loading';

function RequireAuth({ children }) {
  const [user, loading] = useAuthState(auth);
  let location = useLocation();
  if (loading) {
    return <Loading />
  }
    if (!user) {

      return <>
        <Navigate to="/login" state={{ from: location }} replace />
        {
          toast.error('Please login first !')
        }
      </>;
    }

    return children;
  }

  export default RequireAuth;