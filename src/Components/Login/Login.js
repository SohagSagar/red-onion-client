import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import logo from '../../resources/logo.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase';
import toast from 'react-hot-toast';
import Loading from '../SharedComponents/Loading';
import '../../Styles/LoginPage.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const googleSignIn = () => {
        signInWithGoogle();
    }

    const onSubmit = data => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password)
    }

    useEffect(() => {
        if (user || googleUser) {
            navigate(from, { replace: true });
            toast.success('Success! Welcome back.');
        }
    }, [user, googleUser, navigate]);

    useEffect(() => {
        console.log(googleError?.code?.message);    
        if (error || googleError) {

            if (googleError) {
                toast.error(googleError?.message)
            } else {
                toast.error(error?.message)

            }

        }
    }, [error, googleError])



    if (loading || googleLoading) {
        return <Loading />
    }

    return (
        <div className=''>
            <div className='min-h-screen login-page  flex justify-center items-center'>
                <div class="card w-96 bg-base-100 signup-card mx-auto ">
                    <div class="card-body">
                        <div class="card-actions justify-center">
                            <img className='w-44' src={logo} alt="" srcset="" />

                            <div>
                                <form autoComplete='disabled' onSubmit={handleSubmit(onSubmit)} className='w-[300px] mx-auto  mb-5 gap-y-2'>

                                    {/* customer email */}
                                    <label class="label">
                                        <span class="label-text">Email</span>

                                    </label>
                                    <input {...register('email', {
                                        required: {
                                            value: true,
                                            message: "Field is required"
                                        },
                                        pattern: {
                                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Invalid Email"
                                        }
                                    })} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs " />
                                    {
                                        errors?.email &&
                                        <>
                                            {
                                                errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>

                                            }
                                            {
                                                errors.email?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.email.message}</span>
                                            }
                                        </>
                                    }


                                    {/* customer password */}
                                    <label class="label">
                                        <span class="label-text">Password</span>

                                    </label>
                                    <input {...register('password', {
                                        required: {
                                            value: true,
                                            message: "Field is required"
                                        },
                                        minLength: {
                                            value: 6,
                                            message: "Minimum length should 6"
                                        }
                                    })} type="password" placeholder="Type here" class="input input-bordered w-full max-w-xs " />
                                    {
                                        errors?.password &&
                                        <>
                                            {
                                                errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>

                                            }
                                            {
                                                errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.password.message}</span>
                                            }
                                        </>
                                    }

                                    <button type='submit' class="btn btn-primary w-full mt-4 normal-case">Login</button>
                                    <p className='text-primary mt-2 text-center'>New to Red Onion? <Link className="font-semibold" to={'/signup'}>Register Now</Link> </p>
                                </form>

                                <div class="divider">Or</div>
                                <button onClick={() => googleSignIn()} type='submit' class="btn btn-primary w-full mt-1 normal-case">Continue With Google</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;