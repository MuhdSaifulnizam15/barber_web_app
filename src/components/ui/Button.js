import Link from 'next/link';
import React from 'react';

import { Spinner } from '@/components/ui';

const Button = ({
  onClick,
  href,
  type = 'button',
  title,
  style,
  disabled,
  icon,
  loading,
}) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <a role="button" style={style}>
            {title}
          </a>
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className={rootClassName}
          style={style}
          disabled={disabled}
        >
          {loading ? (
            <Spinner color="#fff" size={30} />
          ) : (
            <>
              {icon && <span>{icon}</span>}
              {title}
            </>
          )}
        </button>
      )}
    </>
  );
};

export default Button;