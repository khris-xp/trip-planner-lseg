import type { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <label className='flex items-center gap-3 cursor-pointer group'>
      <div className='relative'>
        <input type='checkbox' className='peer sr-only' {...props} />
        <div className='w-5 h-5 border-2 border-slate-300 rounded-md bg-white transition-all duration-200 peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-violet-600 peer-checked:border-transparent peer-focus:ring-2 peer-focus:ring-indigo-500/20 peer-focus:ring-offset-2 group-hover:border-slate-400'>
          <svg
            className='w-full h-full text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200'
            viewBox='0 0 20 20'
            fill='none'
            stroke='currentColor'
            strokeWidth='3'
          >
            <path d='M4 10l4 4 8-8' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </div>
      </div>
      <span className='text-sm font-medium text-slate-700 select-none group-hover:text-slate-900 transition-colors'>
        {label}
      </span>
    </label>
  );
};
