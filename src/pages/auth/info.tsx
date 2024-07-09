/* eslint-disable react-hooks/exhaustive-deps */
import AuthContainer from "../../components/AuthContainer";
import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { isEqual } from "../../context/utils";
import { useGetProfileInfo } from "../../hooks/profile/profile";
import Loading from "../../components/loading";
import { onboardingAtom } from "../../atoms/other/other.atom";
import GradeSection from "./sections/grade";
import SubjectSection from "./sections/subject";
import InformationSection from "./sections/info";
import RecordingSection from "./sections/recording";
import { useNavigate, useSearchParams } from "react-router-dom";

function AuthPage() {
  const navigate = useNavigate()
  const [param, setParam] = useSearchParams()
  const [activeIndex, setActiveIndex] = useState(0)
  const keys = ["grade", "subject", "info", "recording"]
  const resetPayload = useResetRecoilState(onboardingAtom)
  const [payload, setPayload] = useRecoilState(onboardingAtom)
  const [active, setActive] = useState(param.get("section") || "grade")

  const handleSection = (data: any) => {
    const nextIndex = (activeIndex + 1)
    const nextSection = keys?.find((d, idx) => isEqual(idx, nextIndex))
    setPayload({...payload, ...(data || {})})
    setParam({section: nextSection || ""})
    setActive(nextSection || "")
    setActiveIndex(nextIndex)
  }

  const { data, isLoading } = useGetProfileInfo(
    (res: any) => setPayload({...payload, ...(res?.data || {})}),
    () => resetPayload(),
  )

  const sections = [
    {key: "grade", component: <GradeSection payload={payload} handleNext={handleSection} />},
    {key: "subject", component: <SubjectSection payload={payload} handleNext={handleSection} />},
    {key: "info", component: <InformationSection payload={payload} handleNext={handleSection} />},
    {key: "recording", component: <RecordingSection />, noBg: true},
  ]

  const isUpdated = (data?.data?.teaching_grade?.length && data?.data?.teaching_subject?.length && (data?.data?.voice_url || data?.data?.teacher_voice))
  const CurrentSection = sections?.find(({key}) => isEqual(key, active))
  const CurrentSectionComponent = CurrentSection?.component
  const isNoBg = CurrentSection?.noBg
  
  if (isLoading) return <Loading />
  if (isUpdated) navigate("/")
  return (
    <AuthContainer>
      <div className={`w-full md:w-[90%] rounded-lg p-5 md:p-10 ${!isNoBg && "bg-white"}`}>
        {CurrentSectionComponent}
      </div>
    </AuthContainer>
  )
}

export default AuthPage;
