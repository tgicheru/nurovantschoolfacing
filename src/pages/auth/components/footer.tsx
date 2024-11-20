import React from 'react'

function AuthFooter() {
  return (
    <div className='text-sm font-normal text-[#858689] text-center space-y-3'>
      <p>By registering, you agree to our <u>Terms of Service</u> and <u>Privacy Policy</u></p>
      <p>© NurovantAI {new Date().getFullYear()}. All rights reserved.</p>
    </div>
  )
}

export default AuthFooter