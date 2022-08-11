import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import logo from '../../resources/logo.png';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase';
import toast from 'react-hot-toast';
import Loading from '../SharedComponents/Loading';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import '../../Styles/LoginPage.css'

const Signup = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);
    const password = watch('password');
    const navigate = useNavigate();

    // getting user information from form//
    const onSubmit =async data => {
        if (data) {
          await  createUserWithEmailAndPassword(data.email, data.password);
          await updateProfile({ displayName:data.name })
        }
    }


    if (error || updateProfileError) {
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
            toast.error('This email is already registered')
        }
        else {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            toast.success('User Created successfully.Login Now');
            signOut(auth);
            navigate('/login');
        }

    }, [user,navigate])

    if (loading || updating) {
        return <Loading />;
    }


    return (
        <div className='min-h-screen login-page py-12 xs:min-h-12 xs:py-12 '>

            <div className="card w-96 xs:max-w-xs bg-base-100 signup-card mx-auto bg-transparent backdrop-blur-sm">
                <div className="card-body">
                    <div className="card-actions justify-center">
                        <img className='lg:w-44  xs:w-36' src={logo} alt="" srcSet="" />

                        <div>
                            <form autoComplete='disabled' onSubmit={handleSubmit(onSubmit)} className='w-[300px] mx-auto  mb-5 gap-y-2'>

                                {/* customer name */}
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input {...register('name', {
                                    required: {
                                        value: true,
                                        message: "Field is required"
                                    },
                                    minLength: {
                                        value: 5,
                                        message: "Minimum length should be 5"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z ]{2,30}$/,
                                        message: 'Name should be a string.'
                                    }
                                })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs " />

                                {
                                    errors?.name &&
                                    <>
                                        {
                                            errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>

                                        }
                                        {
                                            errors.name?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.name.message}</span>
                                        }
                                        {
                                            errors.name?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.name.message}</span>
                                        }
                                    </>
                                }


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

                                {/* customer confirm password */}
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>

                                </label>
                                <input {...register('confirmPassword', {
                                    required: {
                                        value: true,
                                        message: 'Field is required'
                                    },
                                    validate: (value) =>
                                        value === password || 'Password do not match.'

                                })} type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs " />
                                {
                                    errors?.confirmPassword &&
                                    <>
                                        {
                                            errors.confirmPassword?.type === 'required' && <span className="label-text-alt text-red-500">{errors.confirmPassword.message}</span>

                                        }
                                        {
                                            errors.confirmPassword?.type === 'validate' && <span className="label-text-alt text-red-500">{errors.confirmPassword.message}</span>
                                        }
                                    </>
                                }

                                <button type='submit' className={`btn btn-primary w-full mt-4 normal-case ${loading | updating && 'loading'}`}>{loading | updating ? 'Loading ...' : 'Signup'}</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Signup;