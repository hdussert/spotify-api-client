import React from 'react'
import { Link } from 'react-router-dom'

const MenuLink = ({ to, children }) => {
  return (
    <Link to={to}>
      <div className='menu-link'>
        {children}
      </div>
    </Link>
  )
}

export default MenuLink