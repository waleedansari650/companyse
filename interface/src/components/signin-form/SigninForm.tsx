import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { SigninValidation } from '../../types/registerValidations';
import { Eye, EyeOff } from 'lucide-react';
import { signinHandler } from '@/services/clientServices';
import Loader from '@/components/loader/Loader';
import toast, { Toaster } from "react-hot-toast";

const SigninForm: React.FC = () => {
    const [passwordPreview, setPasswordPreview] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const navigate = useNavigate();   
    const validationSchema = object().shape({
        email: string()
            .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email address')
            .required('Email is required'),
        password: string()
            .trim()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters long')
            .max(100, 'Password must be at most 100 characters')
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values: SigninValidation) => {
            if (values) {
                setLoading(true);
                let signinPromise = signinHandler(values as SigninValidation);
                signinPromise.then((res) => {
                    setLoading(false);
                    console.log("Response : ", res.token)
                    localStorage.setItem("token", res.token);
                    setTimeout(()=>{
                        navigate('/dashboard')
                    }, 2000)
                }).catch((error: any) => {
                    console.log("Error Occurred : ", error);
                    setLoading(false);
                });
                toast.promise(signinPromise, {
                    loading: 'Client Request is being processed 🕐',
                    success: (response) => <b> {response.message}</b>,
                    error: (error) => <b>{error.error}</b>,
                })
            }
        }
    });
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("password", e.target.value.trim());
    };
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {
                loading ? <Loader isLoading={loading} /> : (
                    <div className="relative flex items-center justify-center min-h-screen my-10 p-8">
                        <div
                            className="my-auto absolute inset-0 transform h-[80vh] -skew-y-12"
                            style={{
                                background: 'linear-gradient(to right, #084aad, #28A4F9)',
                                opacity: 0.8
                            }}
                        ></div>
                        <div className="drop-shadow-2xl relative z-10  bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
                            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-8">
                                    <label
                                        className="block text-gray-700 text-lg  font-bold mb-2"
                                        htmlFor="email"
                                    >
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="text"
                                        name="email"
                                        placeholder="Enter email"
                                        required
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-red-600">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mb-8 relative">
                                    <label
                                        className="block text-gray-700 text-lg font-bold mb-2"
                                        htmlFor="password"
                                    >
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="password"
                                        type={passwordPreview ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter password"
                                        required
                                        onChange={handlePasswordChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPasswordPreview(!passwordPreview)}
                                        className="absolute top-12 right-0 pr-5 flex items-center text-sm leading-5"
                                    >
                                        {passwordPreview ? <Eye /> : <EyeOff />}
                                    </button>
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-red-600">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="mb-6">
                                    <button
                                        type="submit"
                                        className="bg-[--button-secondary] hover:bg-[--button-secondary-hover] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                    >
                                        Login
                                    </button>
                                </div>
                                <div className="text-center text-gray-500 mt-6">
                                    Don't have an account?{' '}
                                    <Link to="/" className="text-[--button-secondary] hover:text-[--button-secondary-hover]">
                                        Sign Up
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

        </>
    );
};

export default SigninForm;
