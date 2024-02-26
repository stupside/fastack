import type { ButtonHTMLAttributes, FC } from 'react'

const Submit: FC<Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>> = (
  props,
) => {
  return <button {...props} className="px-4 py-3 text-white bg-slate-700" />
}

export default Submit
