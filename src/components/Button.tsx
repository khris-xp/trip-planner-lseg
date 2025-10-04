import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  icon,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles =
    'px-6 py-3.5 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]';
  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {icon && <span className='text-xl'>{icon}</span>}
      {children}
    </button>
  );
};
