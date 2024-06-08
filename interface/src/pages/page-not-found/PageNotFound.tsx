import React from 'react';

const PageNotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="text-gray-500 text-6xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
        </div>
        <h1 className="text-4xl font-semibold mb-2">404</h1>
        <p className="text-gray-600 mb-4">Page not found</p>
        <p className="text-gray-500 mb-6">
          The page you are looking for doesn’t exist or an other error occurred.
          Go back, or head over to <a href="/" className="text-blue-500 hover:underline">our homepage</a> to choose a new direction.
        </p>
    
      </div>
    </div>
  );
}

export default PageNotFound;
