import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { LuDownloadCloud } from "react-icons/lu";
import { useNavigate } from "react-router";
import BackButton from "../components/BackButton";

const RecapDetailsPage = () => {
  return (
    <div className="w-full flex flex-col gap-[50px]">
      <div className="w-full flex flex-row items-center justify-between">
        <BackButton text="Back to Recap" />
        <div className="flex flex-row items-center gap-4">
          <button className="w-[40px] h-[40px] flex items-center justify-center">
            <IoCopyOutline className="text-[14px] text-neutral-900" />
          </button>
          <button className="w-[40px] h-[40px] flex items-center justify-center">
            <LuDownloadCloud className="text-[14px] text-neutral-900" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-[830px] mx-auto">
        <div className="w-full flex flex-col gap-[24px] mb-[34px]">
          <h3 className="text-[30px] leading-[38px] font-bold text-neutral-900">
            The lecture focuses on the design and features of a travel-booking
            app, with comparisons made to Airbnb.
          </h3>
          <p className="text-sm font-semibold text-neutral-900">
            Today's lecture covered the creation of a travel-booking app,
            designed with simplicity and intuitiveness in mind, similar to
            Airbnb. The homepage of the app features a scrollable feed with
            listings categorized by type, displaying essential information such
            as title, rating, price, and thumbnail image. The bottom menu
            includes Home, Search, Bookings, Messages, and Profile icons.Listing
            Details provides in-depth information about properties or
            experiences, including images, descriptions, amenities, reviews, and
            a map view. Merchant Information is also highlighted, allowing users
            to learn more about the host through a popup modal that displays
            their full profile, including bio, ratings, and other listings.For
            non-logged-in users, the app still offers an enriched browsing
            experience, showcasing previews of listings and merchant
            information. However, logging in or registering is necessary for
            actions like booking or accessing detailed merchant profiles. The
            app simplifies the login process using an OTP system for both email
            and phone number verifications.The design excludes banners and
            advertisements, focusing solely on listings. The app navigation is
            intuitive with clear distinctions between different sections, and
            easy access to the user's cart, bookings, and messages. A cart
            system is integrated into the app, allowing users to add multiple
            listings before proceeding to checkout, making trip planning more
            manageable.
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <h4 className="text-[20px] leading-[30px] font-bold text-neutral-900">
            Key Points
          </h4>

          <ul className="list-disc pl-4 flex flex-col gap-2">
            {[
              "The homepage of the app should have a clean, scrollable feed displaying listings categorized by type (e.g., featured, hotels, cars, cruise) with essential information such as title, rating, price, and thumbnail image.",
              "The bottom menu should include icons for Home, Search, Bookings, Messages, and Profile similar to Airbnb's layout.",
              "Upon selecting a listing from the feed, users should be directed to a detailed page containing comprehensive information about the property or experience, including images, descriptions, amenities, reviews, and map view.",
              "The detailed page should also have a section briefly introducing the merchant (e.g., name, profile picture, rating) to encourage users to learn more about them.",
              "Merchant profile information should be accessible through a popup concept providing users with seamless navigation when tapping on the merchant's name or image; this popup should include full profile, bio, ratings, and other listings.",
              "Nonloggedin users can still enjoy a rich browsing experience with previews of listings and merchant information; however, they will be prompted to log in or register for actions such as booking or accessing detailed merchant profiles.",
              "The app should have Login and Registration features for users to create an account or log into their existing account for full access to all features.",
            ].map((item, index) => (
              <li
                key={index}
                className="text-sm text-neutral-900 font-semibold"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecapDetailsPage;
