import React from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { clientQueryHandler } from '@/services/clientServices';
import { ClientRequestForm } from '@/types/clientQuery';
import Loader from '@/components/loader/Loader';
import toast, { Toaster } from "react-hot-toast";
const ClientRequest: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const validationSchema = object().shape({
    name: string().required('Name is required').max(100, 'Name must be at most 100 characters'),
    phone: string().typeError('Phone number should be a string').required('Phone number is required'),
    email: string().matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email address').required('Email is required'),
    projectLink: string().required('Project link is required'),
    projectDetails: string().required('Project details are required').max(1000, 'Project detail must be at most 1000 characters'),
    issueArise: string().required('Issue description is required').max(1000, 'Issue arise must be at most 1000 characters'),
    projectCredentials: string().required('Project credentials is required').max(1000, 'Project credentials must be at most 1000 characters')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      projectLink: '',
      projectDetails: '',
      issueArise: '',
      projectCredentials: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values: ClientRequestForm) => {
      try {
        if (values) {
          setLoading(true);
          let clientQueryPromise = clientQueryHandler(values);
          toast.promise(clientQueryPromise, {
            loading: 'Client Request is being processed 🕐',
            success: (response) => <b> {response.message}</b>,
            error: (error) => <b>{error.error}</b>,
          })
          clientQueryPromise.then(() => {
            setTimeout(() => {
              // formik.resetForm();
              setLoading(false);
            }, 2000)
          }).catch((error: any) => {
            console.log("Error Occurred : ", error);
            setLoading(false);
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {
        loading ? <Loader isLoading={loading} /> : (
          <div className="relative flex items-center justify-center min-h-screen my-10">
            <div className="my-auto absolute inset-0 transform h-[60vh] -skew-y-12 "
              style={{
                background: 'linear-gradient(to right, #084aad, #28A4F9)',
                opacity: 0.8
              }}>
            </div>
            <div className="drop-shadow-2xl relative z-10 bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
              <h2 className="text-2xl font-bold mb-6 text-center">How May We Can Help You?</h2>
              <form onSubmit={formik.handleSubmit} >
                <div className='flex flex-col md:flex-row md:gap-x-2'>
                  <div className="mb-4 md:w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name  <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-red-600">{formik.errors.name}</div>
                    ) : null}
                  </div>
                  <div className="mb-4 md:w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                      Phone <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      placeholder="Enter phone number"
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className="text-red-600">{formik.errors.phone}</div>
                    ) : null}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectLink">
                    Project Link <span className='text-red-500'>*</span>
                  </label>
                  <input
                    id="projectLink"
                    type="text"
                    name="projectLink"
                    placeholder="Enter project link"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.projectLink}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {formik.touched.projectLink && formik.errors.projectLink ? (
                    <div className="text-red-600">{formik.errors.projectLink}</div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email <span className='text-red-500'>*</span>
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectDetails">
                    Project Details <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    placeholder="Describe the project"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.projectDetails}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  ></textarea>
                  {formik.touched.projectDetails && formik.errors.projectDetails ? (
                    <div className="text-red-600">{formik.errors.projectDetails}</div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issueArise">
                    Issue Arise <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    id="issueArise"
                    name="issueArise"
                    placeholder="Describe the issue"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.issueArise}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  ></textarea>
                  {formik.touched.issueArise && formik.errors.issueArise ? (
                    <div className="text-red-600">{formik.errors.issueArise}</div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issueArise">
                    Project Credentials <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    id="projectCredentials"
                    name="projectCredentials"
                    placeholder="Describe the project credentials"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.projectCredentials}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  ></textarea>
                  {formik.touched.projectCredentials && formik.errors.projectCredentials ? (
                    <div className="text-red-600">{formik.errors.projectCredentials}</div>
                  ) : null}
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="border-collapse bg-[--button-secondary] hover:bg-[--button-secondary-hover] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Send Report Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

    </>
  );
};

export default ClientRequest;
