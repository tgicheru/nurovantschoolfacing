import { useState } from "react";
import AuthContainer from "../../components/AuthContainer";
import { onboardingAtom } from "../../atoms/other/other.atom";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isEqual } from "../../context/utils";
import DetailsSection from "./sections/details";
import GradeSection from "./sections/grade";
import SubjectSection from "./sections/subject";
import InformationSection from "./sections/info";
import RecordingSection from "./sections/recording";

function AuthPage() {
  const [param, setParam] = useSearchParams()
  const [activeIndex, setActiveIndex] = useState(0)
  const [payload, setPayload] = useRecoilState(onboardingAtom)
  const keys = ["details", "grade", "subject", "info", "recording"]
  const [active, setActive] = useState(param.get("section") || "details")

  const handleSection = (data: any) => {
    const nextIndex = (activeIndex + 1)
    const nextSection = keys?.find((d, idx) => isEqual(idx, nextIndex))
    setPayload({...payload, ...(data || {})})
    setParam({section: nextSection || ""})
    setActive(nextSection || "")
    setActiveIndex(nextIndex)
  }

  const goBack = () => {
    setParam({section: "details"})
    setActive("details")
    setActiveIndex(0)
  }

  const sections = [
    {key: "details", component: <DetailsSection payload={payload} handleNext={handleSection} />},
    {key: "grade", component: <GradeSection payload={payload} handleNext={handleSection} />},
    {key: "subject", component: <SubjectSection payload={payload} handleNext={handleSection} />},
    {key: "info", component: <InformationSection payload={payload} handleNext={handleSection} />},
    {key: "recording", component: <RecordingSection payload={payload} handleBack={goBack} />, noBg: true},
  ]

  const CurrentSection = sections?.find(({key}) => isEqual(key, active))
  const CurrentSectionComponent = CurrentSection?.component
  const isNoBg = CurrentSection?.noBg
  return (
    <AuthContainer>
      <div className={`w-full md:w-[90%] rounded-lg p-5 md:p-10 ${!isNoBg && "bg-white"}`}>
        {CurrentSectionComponent}
      </div>
    </AuthContainer>
  );
}

export default AuthPage;
