import { useState } from "react";
import signupImage from "../assets/signup-hero-image.png";
import { SignUpForm } from "../components/SignUpForm";

const SignUp = () => {
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <div className="flex h-screen max-h-screen bg-white">
      <img
        src={signupImage}
        alt="hero image"
        className="object-contain bg-[#0D267D] overflow-hidden object-center max-h-screen  h-screen w-1/2"
      />

      {/* {!success && ( */}
      <div className="py-[10vh] bg-white w-1/2 px-[5vw] min-h-screen overflow-auto">
        <SignUpForm setSuccess={setSuccess} />
      </div>
      {/* )} */}
      {/* {success && <SignupVerification setSuccess={setSuccess} />} */}
      {/* {success && <SuccessSignup />} */}
    </div>
  );
};

export default SignUp;
