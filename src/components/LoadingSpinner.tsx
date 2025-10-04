export const LoadingSpinner = () => {
  return (
    <div className='flex flex-col items-center justify-center py-12 animate-fadeIn'>
      <div className='relative'>
        {/* Outer ring */}
        <div className='w-16 h-16 rounded-full border-4 border-slate-200'></div>
        {/* Spinning ring */}
        <div className='absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-indigo-600 border-r-violet-600 animate-spin'></div>
      </div>
      <p className='mt-4 text-slate-600 font-medium'>Generating your trip plan...</p>
      <p className='text-sm text-slate-500 mt-1'>This may take a few moments</p>
    </div>
  );
};
