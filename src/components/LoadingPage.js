const LoadingPage = () => {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="relative w-20 h-20">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Loading Dashboard</h2>
          <p className="text-gray-500">Please wait while we prepare your dashboard...</p>
        </div>
      </div>
    );
  };
  
  export default LoadingPage;