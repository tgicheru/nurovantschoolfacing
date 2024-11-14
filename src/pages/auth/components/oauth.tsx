import React from 'react'
import { Button, notification } from 'antd'
import { FcGoogle } from "react-icons/fc";
import { FaApple } from 'react-icons/fa';
import { signInWithPopup } from 'firebase/auth';
import { appleProvider, auth, provider } from '../../../firebaseAuth/config';

type Props = {
  isLoading?: boolean,
  successAction?: any,
}
function OAuth({ isLoading, successAction }: Props) {

  const handleGoogleLogin = () => signInWithPopup(auth, provider)
    .then((res) => successAction?.({
      ...(res?.user || {}),
        sign_up_type: "google",
      } as unknown as void))
    .catch((err) => notification.error({message: "Error!", description: err?.message}));

  const handleAppleLogin = () => signInWithPopup(auth, appleProvider)
    .then((res) => successAction?.({
        ...(res?.user || {}),
        sign_up_type: "apple",
      } as unknown as void))
    .catch((err) => notification.error({message: "Error!", description: err?.message}));
  return (
    <div className='w-full flex flex-col items-center gap-3'>
      <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
        <Button
          block
          size="large"
          loading={isLoading}
          onClick={handleGoogleLogin}
          icon={<FcGoogle className='text-xl' />}
          className="!w-full !h-[50px] !rounded-xl !border-none bg-white flex justify-center items-center text-sm font-semibold"
        >Continue with Google</Button>
      </div>
      <div className="w-full rounded-xl p-[1px] bg-gradient-to-b from-[#D8B4E240] to-[#4970FC40]">
        <Button
          block
          size="large"
          loading={isLoading}
          onClick={handleAppleLogin}
          icon={<FaApple className='text-xl' />}
          className="!w-full !h-[50px] !rounded-xl !border-none bg-white flex justify-center items-center text-sm font-semibold"
        >Continue with Apple</Button>
      </div>
    </div>
  )
}

export default OAuth