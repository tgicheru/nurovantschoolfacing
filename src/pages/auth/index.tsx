import QuestionMark from "../../assets/questionmark.svg";
import AppleIcon from "../../assets/Apple.svg";
import GoogleIcon from "../../assets/Google.svg";
import { CustomButton } from "../../components";
import { Link } from "react-router-dom";
import { auth, provider } from "../../firebaseAuth/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useGoogleRegister } from "../../hooks/auth/authentications";
// import { useWindowSize } from "../../../hooks/useWindowSize";

function AuthPage() {
  const { mutate } = useGoogleRegister();
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
          phone_id: null,
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

  return (
    <div className="w-full flex flex-col lg:flex-row h-screen max-h-screen overflow-hidden items-center justify-center">
      {/* Left Section*/}

      <div className="w-full lg:w-[45%] bg-primary h-full bg-pattern bg-no-repeat hidden lg:flex flex-col items-center justify-center gap-[48px] text-white">
        <img src={QuestionMark} alt="questionmark" />
        <div className="flex flex-col items-center justify-center gap-[24px]">
          <h1 className="text-[44px] leading-[48px] font-bold tracking-[-0.88px] text-center">
            Engaging Quiz
          </h1>
          <p className="text-[16px] leading-[25px] font-medium tracking-[0.32px] text-center max-w-[427px]">
            Test your understanding, reinforce concepts, and stay on top of your
            game.
          </p>
        </div>
      </div>

      {/* Right Section*/}
      <div className="flex items-center justify-center w-full lg:w-[55%]">
        <div className="max-w-[420px] w-full flex items-center justify-center flex-col gap-[23px]">
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

          {/* Other login options */}
          <div className="flex w-full items-center justify-center flex-row gap-[32px]">
            <img src={AppleIcon} alt="apple-icon" className="cursor-pointer" />
            <img
              src={GoogleIcon}
              alt="google-icon"
              className="cursor-pointer"
              onClick={() => handleGoogleLogin()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
