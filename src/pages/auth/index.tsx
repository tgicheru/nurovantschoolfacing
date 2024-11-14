import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { isEqual } from "../../context/utils";
import DetailsSection from "./sections/details";
import VerifySection from "./sections/verify";
import OtherSection from "./sections/other";

function AuthPage() {
  const [param, setParam] = useSearchParams()
  const keys = ["details", "verify", "other"]
  const [activeIndex, setActiveIndex] = useState(0)
  // const [payload, setPayload] = useRecoilState(onboardingAtom)
  const [active, setActive] = useState(param.get("section") || "details")

  const handleSection = (section?: string) => {
    const nextIndex = (section ? keys.findIndex(d => isEqual(d, section)) : (activeIndex + 1))
    const nextSection = keys?.find((d, idx) => isEqual(idx, nextIndex))
    setParam({section: section || nextSection || ""})
    setActive(section || nextSection || "")
    setActiveIndex(nextIndex)
  }

  const sections = [
    {key: "details", component: <DetailsSection handleSection={handleSection} />},
    {key: "verify", component: <VerifySection />},
    {key: "other", component: <OtherSection />},
  ]

  const CurrentSection = sections?.find(({key}) => isEqual(key, active))
  const CurrentSectionComponent = CurrentSection?.component
  return (
    <div className="w-full p-5">
      {CurrentSectionComponent}
    </div>
  );
}

export default AuthPage;
