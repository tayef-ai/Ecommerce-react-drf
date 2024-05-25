import React from 'react'

const Logout = () => {
  localStorage.removeItem('customer_login')
  localStorage.removeItem('customer_email')
  window.location.href = '/login'
}

export default Logout