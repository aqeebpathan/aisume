import { EditorFormProps } from "@/lib/types"

import SkillsForm from "./forms/SkillsForm"
import SummaryForm from "./forms/SummaryForm"
import EducationForm from "./forms/EducationForm"
import GeneralInfoForm from "./forms/GeneralInfoForm"
import PersonalInfoForm from "./forms/PersonalInfoForm"
import WorkExperienceForm from "./forms/WorkExperienceForm"
import ProjectsForm from "./forms/ProjectsForm"
import CertificatesForm from "./forms/CertificatesForm"
import CoursesForm from "./forms/CoursesForm"

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
  { title: "Projects", component: ProjectsForm, key: "projects" },
  { title: "Education", component: EducationForm, key: "education" },
  {
    title: "Certifications",
    component: CertificatesForm,
    key: "certifications",
  },
  { title: "Courses", component: CoursesForm, key: "courses" },
  { title: "Skills", component: SkillsForm, key: "skills" },
  { title: "Summary", component: SummaryForm, key: "summary" },
]
