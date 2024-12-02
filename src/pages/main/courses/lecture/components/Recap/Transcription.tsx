import React from "react";
import ChunkBox from "./ChunkBox";
import { BorderHOC } from "../../../../../../components";
import { useNavigate } from "react-router";

const Transcription = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-3">
      <ChunkBox
        header="The lecture focuses on the design and features of a travel-booking app, with comparisons made to Airbnb."
        text="PLEASE DOWNLOAD THE AIRBNB APP FOR MORE REFERENCE:1. Homepage & Category Feeds:a. Implement a clean, scrollable feed for listings categorized by type (e. g. Featured, hotels, cars, cruise …). Each listing should display essential information like the title, rating, price, and a thumbnail image. ConsiderAirbnb's minimalist approach."
        action={() => {
          navigate("/courses/lecture/recap/details");
        }}
      />
      <BorderHOC />
    </div>
  );
};

export default Transcription;
