import React from 'react';
import { RefreshIcon } from '@heroicons/react/outline';

const SpinnerLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <RefreshIcon className="animate-spin h-8 w-8 mr-3 text-blue-600" />
    </div>
  );
};

export default SpinnerLoader;
