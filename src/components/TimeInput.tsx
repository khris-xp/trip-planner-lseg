import type { InputHTMLAttributes } from 'react';

interface TimeInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  icon?: string;
  optional?: boolean;
}

export const TimeInput = ({
  label,
  error,
  icon,
  optional = false,
  className = '',
  ...props
}: TimeInputProps) => {
  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-sm font-medium text-slate-700 px-1 flex items-center gap-2'>
        {label}
        {optional && (
          <span className='text-xs text-slate-400 font-normal bg-slate-100 px-2 py-0.5 rounded-full'>
            Optional
          </span>
        )}
      </label>
      <div className='relative'>
        {icon && (
          <span className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl'>
            {icon}
          </span>
        )}
        <input
          type='time'
          className={`w-full ${
            icon ? 'pl-12 pr-4' : 'px-4'
          } py-3.5 text-base bg-white border border-slate-200 rounded-xl shadow-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
          hover:border-slate-300 transition-all duration-200
          [&::-webkit-calendar-picker-indicator]:cursor-pointer
          ${error ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <span className='text-xs text-red-600 px-1 flex items-center gap-1'>
          <span>⚠</span> {error}
        </span>
      )}
    </div>
  );
};
