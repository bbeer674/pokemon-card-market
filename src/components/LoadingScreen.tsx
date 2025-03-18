import React from "react";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white mt-3 text-lg">Loading...</p>
      </div>
    </div>
  );
};
