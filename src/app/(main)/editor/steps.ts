import { EditorFormProps } from "@/lib/types"

import SkillsForm from "./forms/SkillsForm"
import SummaryForm from "./forms/SummaryForm"
import EducationForm from "./forms/EducationForm"
import GeneralInfoForm from "./forms/GeneralInfoForm"
import PersonalInfoForm from "./forms/PersonalInfoForm"
import WorkExperienceForm from "./forms/WorkExperienceForm"

type Steps = {
  title: string
  component: React.ComponentType<EditorFormProps>
  key: string
}

export const steps: Steps[] = [
  { title: "General Info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal Info", component: PersonalInfoForm, key: "personal-info" },
  {
    title: "Work Experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    title: "Education",
    component: EducationForm,
    key: "education",
  },
  { title: "Skills", component: SkillsForm, key: "skills" },
  { title: "Summary", component: SummaryForm, key: "summary" },
]
