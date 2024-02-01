import React from "react";

function TermsAndCondition() {
  const data = [
    {
      header: "1. Acceptance of Terms",
      text: "By accessing or using our App, you agree to these Terms and our Privacy Policy. If you do not agree to these Terms, do not access or use our App.",
    },
    {
      header: "2. Changes to Terms",
      text: "We may revise these Terms from time to time. We will notify you of any material changes via the App or other means. By continuing to use our App after any changes become effective, you agree to be bound by the revised Terms.",
    },
    {
      header: "3. Eligibility",
      text: "The App is intended for use by educational institutions and their authorized representatives. By using our App, you represent that you have the authority to agree to these Terms on behalf of your institution.    ",
    },
    {
      header: "4. Account Creation ",
      text: "To use certain features of our App, you must create an account on behalf of your institution. You agree to provide accurate and complete information and are responsible for all activity on your account. Keep your account password secure and do not share it with others.        ",
    },
    {
      header: "5. Use of App",
      text: "Subject to your compliance with these Terms, Nurovant grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the App for educational purposes on behalf of your institution. You agree to use the App only in accordance with these Terms and for lawful educational purposes.",
    },
    {
      header: "6. Your Content ",
      text: "You retain ownership of content submitted, uploaded, or made available in the App ('Your Content'). You grant Nurovant a license to use Your Content as necessary to provide the App services. You represent that you have the right to submit Your Content and that it complies with these Terms.",
    },
    {
      header: "7. Data Privacy Assurance",
      text: "We are committed to protecting the privacy of all users. Nurovant will not sell, rent, or lease user data to third parties. All data will be kept private and secure, in compliance with applicable data protection laws and our Privacy Policy.",
    },
    {
      header: "8. Intellectual Property Rights ",
      text: "Recordings and related content remain the intellectual property of the respective educators and/or institutions. Users acknowledge they do not own the content of these recordings.",
    },
    {
      header: "9. Right to Delete Content  ",
      text: "Educators and institutions have the right to request the deletion of their content from our platform.",
    },
    {
      header: "10. Legal Disclaimer ",
      text: "Nurovant is not liable for unauthorized use of the App that infringes intellectual property rights or violates policies. Users are responsible for complying with applicable laws and regulations.",
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
          
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1024px] mx-auto px-4 md:px-0 flex flex-col items-center gap-4 mb-11">
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

        {data.map((item, index) => (
          <div className="mt-6 flex flex-col items-start gap-4" key={index}>
            <h3 className="text-[20px] leading-[32px] lg:text-[28px] lg:leading-[44px] tracking-[-0.36px] font-bold text-center">
              {item.header}
            </h3>
            <span className="text-[16px] leading-[24px] lg:text-[20px] lg:leading-[28px] font-normal font-montserrat text-left">
              {item.text}
            </span>
          </div>
        ))}

        <div className="mt-6 flex flex-col items-start gap-4 w-full">
          <h3 className="text-[20px] leading-[32px] lg:text-[28px] lg:leading-[44px] tracking-[-0.36px] font-bold text-center">
            11. Contact Us
          </h3>
          <span className="text-[16px] leading-[24px] lg:text-[20px] lg:leading-[28px] font-normal font-montserrat text-left">
            For questions about these Terms, please contact us at{" "}
            <a
              href="mailto:support@nurovant.com"
              className="no-underline text-primary font-medium"
            >
              support@nurovant.com.
            </a>
          </span>
        </div>

        <div className="mt-6 flex flex-col items-start gap-4">
          <h3 className="text-[20px] leading-[32px] lg:text-[28px] lg:leading-[44px] tracking-[-0.36px] font-bold text-center">
            Disclaimers and Limitation of Liability
          </h3>
          <span className="text-[16px] leading-[24px] lg:text-[20px] lg:leading-[28px] font-normal font-montserrat text-left">
            The App and its content are provided "as is." To the maximum extent
            permitted by law, Nurovant disclaims all warranties. We will not be
            liable for any damages related to the use of the App.
          </span>
        </div>

        <div className="mt-6 flex flex-col items-start gap-4">
          <h3 className="text-[20px] leading-[32px] lg:text-[28px] lg:leading-[44px] tracking-[-0.36px] font-bold text-center">
            Governing Law
          </h3>
          <span className="text-[16px] leading-[24px] lg:text-[20px] lg:leading-[28px] font-normal font-montserrat text-left">
            These Terms are governed by the laws of the State of Texas. Any
            dispute will be subject to the exclusive jurisdiction of state and
            federal courts in Dallas, Texas.
          </span>
        </div>

        <div className="mt-6 flex flex-col items-start gap-4 mb-7">
          <span className="text-[16px] leading-[24px] lg:text-[20px] lg:leading-[28px] font-normal font-montserrat text-left">
            This specifically addresses the school-facing aspect of the web app,
            the commitment to not selling user data, and tailors other sections
            to better fit the web-based educational context.
          </span>
        </div>
      </div>
    </div>
  );
}

export default TermsAndCondition;
