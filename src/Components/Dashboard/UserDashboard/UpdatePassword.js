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
        <div class="card w-96 bg-base-100 border mx-auto mt-10">
            <div class="card-body">
                <h2 class="text-xl font-semibold text-center ">Reset Password</h2>
                <input className='text-center' disabled value={user?.email} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />

                <button disabled={sending || loading} onClick={() => handleResetPassword()} class="btn btn-sm rounded-full btn-primary mt-2 normal-case">Sent Reset Password Link</button>

            </div>
        </div>
    );
};

export default UpdatePassword;