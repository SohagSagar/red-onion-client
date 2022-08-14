import React from 'react';
import { useAuthState, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../../Firebase/Firebase';
import toast from 'react-hot-toast';

const UpdatePassword = () => {
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
      );
    const [user, loading] = useAuthState(auth);
    const handleResetPassword =async () => {
        if(user?.email){
          await sendPasswordResetEmail(user?.email);
          if(error){
            toast.error(error?.message)
          }else{
            toast.success('Link sent successfully')
          }
        }
    }
    return (
        <div data-aos="fade-zoom-in"
        data-aos-easing="ease-in"
        data-aos-delay="30"
        data-aos-offset="0" className="card lg:w-96 xs:w-80 bg-base-100 border mx-auto mt-10">
            <div className="card-body">
                <h2 className="text-xl font-semibold text-center ">Reset Password</h2>
                <div className='p-2 bg-slate-200 rounded-xl'>
                  <p className='text-center font-semibold '>{user?.email}</p>
                </div>
                <button disabled={sending || loading} onClick={() => handleResetPassword()} className="btn btn-sm rounded-full btn-primary mt-2 normal-case">Sent Reset Password Link</button>

            </div>
        </div>
    );
};

export default UpdatePassword;