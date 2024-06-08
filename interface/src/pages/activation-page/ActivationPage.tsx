import { activationHandler } from '@/services/clientServices';
import  { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import Loader from '@/components/loader/Loader';

const ActivationPage = () => {
    const { activationToken } = useParams();
    const [loading, setLoading] = useState<boolean>(false);

    const activateAccount = async () => {
        if (activationToken && activationToken !== '') {
            setLoading(true);
            try {
                const activationPromise = activationHandler(activationToken as string);
                toast.promise(activationPromise, {
                    loading: 'Client Request is being processed 🕐',
                    success: (response) => <b> {response.message}</b>,
                    error: (error) => <b>{error.error}</b>,
                  })
             
            } catch (error) {
                console.error("Error Occurred:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        activateAccount();
    }, [activationToken]);

    return (
        <>
       <Toaster
        position="top-center"
        reverseOrder={false}
      />
            {loading ? (
                <Loader isLoading={loading} />
            ) : (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <div className="text-green-500 text-6xl mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 mx-auto"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m0 0l-4 4m4-4L9 16m0 0L5 12m0 0l4 4m4-4l4-4"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">Registration Successful!</h2>
                        <p className="text-green-600 mb-6">
                            Congratulations! Your account has been successfully created.
                            Now you can login to your account.
                        </p>
                        <Link
                            to={'/sign-in'}
                            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        >
                            LOGIN
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActivationPage;
