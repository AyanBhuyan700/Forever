import React from 'react';

function Loader() {
  return (
    <div className="h-screen flex justify-center items-center bg-[#f9fafb]">
      <div className="w-12 h-12 bg-[#fa91c6] rounded-full animate-ping"></div>
    </div>
  );
}

export default Loader;

