import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import logo from '../../resources/logo.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase';
import toast from 'react-hot-toast';
import '../../Styles/LoginPage.css';
import useToken from '../Hooks/useToken';
import { Helmet } from 'react-helmet-async';

/* eslint-disable */
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
        signInWithEmailAndPassword(data?.email, data?.password);
    }


    const [token]=useToken(user || googleUser);
    
    useEffect(() => {
       
        if (token) {
            navigate(from, { replace: true });
            toast.success('Success! Welcome back.');
        }
    }, [user, googleUser, navigate,from,token]);

    useEffect(() => {   
        if (error || googleError) {

            if (googleError) {
                toast.error(googleError?.message)
            } else {
                toast.error(error?.message)

            }

        }
    }, [error, googleError])


    return (
        <div data-aos="fade-zoom-in"
        data-aos-easing="ease-in"
        data-aos-delay="30"
        data-aos-offset="0"
        >
            <Helmet><title>Login - Red Onion</title></Helmet>
            <div className='min-h-screen xs:min-h-12 xs:py-12 login-page  flex justify-center items-center '>
                <div className="card w-96 xs:max-w-xs bg-base-100 signup-card mx-auto bg-transparent backdrop-blur-sm">
                    <div className="card-body">
                        <div className="card-actions justify-center">
                            <img className='lg:w-44 xs:w-36' src={logo} alt="" srcSet="" />

                            <div>
                                <form autoComplete='disabled' onSubmit={handleSubmit(onSubmit)} className='w-[300px] mx-auto  mb-5 gap-y-2'>

                                    {/* customer email */}
                                    <label className="label">
                                        <span className="label-text">Email</span>

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
                                    })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs " />
                                    {
                                        errors?.email &&
                                        <>
                                            {
                                                errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>

                                            }
                                            {
                                                errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>
                                            }
                                        </>
                                    }


                                    {/* customer password */}
                                    <label className="label">
                                        <span className="label-text">Password</span>

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
                                    })} type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs " />
                                    {
                                        errors?.password &&
                                        <>
                                            {
                                                errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>

                                            }
                                            {
                                                errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>
                                            }
                                        </>
                                    }

                                    <button disabled={googleLoading} type='submit' className={`btn btn-primary w-full mt-4 normal-case ${loading && 'loading'}`}>Login</button>
                                    <p className='text-primary mt-2 text-center'>New to Red Onion? <Link className="font-semibold" to={'/signup'}>Register Now</Link> </p>
                                </form>

                                <div className="divider">Or</div>
                                <button disabled={googleLoading || loading} onClick={() => googleSignIn()} type='submit' className="btn btn-primary w-full mt-1 normal-case">Continue With Google</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;