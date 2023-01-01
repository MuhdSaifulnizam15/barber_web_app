import React from 'react'

const Input = ({
  label,
  name,
  id,
  value,
  onChange,
  type,
  error,
  placeholder,
  autoComplete = 'false',
  required,
  ...rest
}) => {
  const inputClassName = error
    ? 'block mb-2 border-1 border-solid border-b-red-700'
    : 'block mb-2'

  return (
    <>
      <div className='mx-1'>
        {label && (
          <label className='block mb-2' htmlFor={name}>
            {label}
          </label>
        )}
        <input
          className={inputClassName}
          type={type}
          id={id}
          onChange={onChange}
          name={name}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          {...rest}
        />
      </div>
    </>
  )
}

export default Input
