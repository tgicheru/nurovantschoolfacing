import React from "react";

function TermsAndCondition() {
  const data = [
    {
      header: "1. Acceptance of Terms",
      text: "By accessing or using our App, you agree to these Terms and our Privacy Policy. If you do not agree to these Terms, do not access or use our App.",
    },
  ];
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center text-black px-5 sm:px-10 md:px-14 space-y-10 max-w-[1024px] mx-auto bg-white overflow-y-auto">
        <h1 className="text-[36px] leading-[48px] lg:text-[70px] lg:leading-[74px] tracking-[-0.36px] font-bold text-center">
          Terms And Conditions
        </h1>
        <div className="text-[16px] leading-[24px] lg:text-[24px] lg:leading-[36px] font-normal font-montserrat text-center">
          <p>
            Below is a revised version of the Terms and Conditions for the
            Nurovant AI web application, tailored specifically for a
            school-facing web app where teachers record their classes to create
            study aids. This version includes a clause about not selling user
            data, emphasizing privacy and data protection.
          </p>
        </div>
      </div>

      <div className="w-full h-full max-w-[1024px] mx-auto px-4 md:px-0 flex flex-col items-center gap-4">
        <h2 className="text-[28px] leading-[36px] lg:text-[40px] lg:leading-[52px] tracking-[-0.36px] font-bold text-center">
          Nurovant AI Web Application Terms of Service
        </h2>
        <div className="text-[16px] leading-[24px] lg:text-[20px] lg:leading-[28px] font-normal font-montserrat text-center">
          <p>
            Welcome to the Nurovant AI web application ("App"). Operated by
            Nurovant AI ("Nurovant," "we," "us," or "our"), this platform is
            designed for educational institutions and their representatives,
            including teachers and administrators. By accessing or using our
            App, you signify your agreement to be bound by these Terms of
            Service ("Terms"). Please read these Terms carefully as they govern
            your access to and use of our App. These Terms constitute an
            agreement between you and Nurovant.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-start gap-4">
          <h3 className="text-[20px] leading-[32px] lg:text-[28px] lg:leading-[44px] tracking-[-0.36px] font-bold text-center">
            1. Acceptance of Terms
          </h3>
          <span className="text-[16px] leading-[24px] lg:text-[20px] lg:leading-[28px] font-normal font-montserrat text-left">
            By accessing or using our App, you agree to these Terms and our
            Privacy Policy. If you do not agree to these Terms, do not access or
            use our App.
          </span>
        </div>
      </div>
    </div>
  );
}

export default TermsAndCondition;
