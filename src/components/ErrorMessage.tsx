interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export const ErrorMessage = ({ message, onRetry, onBack }: ErrorMessageProps) => {
  return (
    <div
      className='bg-red-50 border-2 border-red-200 rounded-2xl p-8 animate-fadeIn'
      data-testid='error_response'
    >
      <div className='flex flex-col items-center text-center'>
        {/* Error Icon */}
        <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
          <svg
            className='w-8 h-8 text-red-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
        </div>

        {/* Error Message */}
        <h3 className='text-xl font-bold text-red-900 mb-2'>
          Oops! Something went wrong
        </h3>
        <p className='text-red-700 text-sm mb-6 max-w-md'>{message}</p>

        {/* Action Buttons */}
        <div className='flex gap-3'>
          {onBack && (
            <button
              onClick={onBack}
              className='px-6 py-2.5 bg-white border-2 border-red-200 text-red-700 rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors'
              data-testid='error_back_button'
            >
              Back to Form
            </button>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className='px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl'
              data-testid='error_retry_button'
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
