

type ButtonProps = {
  children: React.ReactNode;
  type?: 'normal' | 'eliminar';
  className?: string;
  onClick?: ( event: React.MouseEvent<HTMLButtonElement> ) => void;
}

export function Button( { children, type = 'normal', className, onClick }: ButtonProps ) {
  return (
    <button onClick={ onClick } className={ `py-2 px-10 ${ type === 'eliminar' ? 'bg-red-600 hover:bg-red-700' : className ? className : 'bg-indigo-600 hover:bg-indigo-700' } text-white font-bold uppercase rounded-lg` }>
      { children }
    </button>
  )
}

