import AppleIcon from "../../assets/Apple.svg";
import GoogleIcon from "../../assets/Google.svg";
import { CustomButton } from "../../components";
import { Link } from "react-router-dom";
import { auth, provider, appleProvider } from "../../firebaseAuth/config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
} from "firebase/auth";
import { useGoogleRegister } from "../../hooks/auth/authentications";
import AuthContainer from "../../components/AuthContainer";
import { useRecoilState } from "recoil";
import authAtom from "../../atoms/auth/auth.atom";
import { Button } from "antd";

function AuthPage() {
  const {isLoading,  mutate } = useGoogleRegister();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        mutate({
          email: user.email,
          name: user.displayName,
          sign_up_type: "google",
        } as unknown as void);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleAppleLogin = () => {
    signInWithPopup(auth, appleProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // console.log(user);

        // Apple credential
        const credential = OAuthProvider.credentialFromResult(result);
        console.log(credential);
        const accessToken = credential?.accessToken;
        const idToken = credential?.idToken;

        // console.log(user);
        mutate({
          email: user.email,
          name: user.displayName,
          sign_up_type: "apple",
        } as unknown as void);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The credential that was used.
        const credential = OAuthProvider.credentialFromError(error);
        console.log(error);

        // ...
      });
  };

  return (
    <AuthContainer>
      <div className="max-w-[420px] w-full flex items-center justify-center flex-col gap-[23px] h-screen">
        <div className="flex w-full items-center justify-center gap-[14px] flex-col">
          <div style={{ width: "124px" }}>
            {/* <LogoIcon /> */}
            <img
              src="https://res.cloudinary.com/depqqbyyn/image/upload/v1689696632/Favicon_Transparent_yo3v6b.ico"
              alt="nurovant-logo"
            />
          </div>
          <h2 className="text-dark text-[30px] leading-[36px] lg:text-[36px] lg:leading-[48px] tracking-[-0.72px] font-bold text-center">
            Capturing live lectures with AI
          </h2>
        </div>

        {/*Buttons*/}
        <div className="w-full flex items-center justify-center flex-col gap-[11px]">
          <Link to={"/auth/email-register"}>
            <CustomButton text="Get Started" onClick={() => {}} />
          </Link>
          <Link to={"/auth/login"}>
            <CustomButton
              text="I Have An Account"
              onClick={() => {}}
              variant="outline"
            />
          </Link>
        </div>

        <div className="flex w-full items-center justify-center gap-2">
          <div
            className="w-[105px] h-[1px]"
            style={{
              background:
                "linear-gradient(180deg, #E0E0E0 2.98%, rgba(224, 224, 224, 0.00) 87.42%)",
            }}
          ></div>
          <span className="text-[14px] leading-[20px] text-[#1b1b1b]">
            Or sign up with
          </span>

          <div
            className="w-[105px] h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, #E0E0E0 2.98%, rgba(224, 224, 224, 0.00) 87.42%)",
            }}
          ></div>
        </div>

        {/* Other login options */}
        <div className="flex w-full items-center justify-center flex-row gap-[32px]">
          <Button
            type="text"
            size="large"
            loading={isLoading}
            onClick={handleAppleLogin}
            className="!bg-transparent !p-0 !m-0"
            icon={<img src={AppleIcon} alt="apple-icon" />}
          />
          <Button
            type="text"
            size="large"
            loading={isLoading}
            onClick={handleGoogleLogin}
            className="!bg-transparent !p-0 !m-0"
            icon={<img src={GoogleIcon} alt="google-icon" />}
          />
        </div>
      </div>
    </AuthContainer>
  );
}

export default AuthPage;
