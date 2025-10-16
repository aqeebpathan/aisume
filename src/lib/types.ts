import { Prisma } from "@/generated/prisma"
import { ResumeValues } from "./validation"

export interface EditorFormProps {
  resumeData: ResumeValues
  setResumeData: (data: ResumeValues) => void
}

export const resumeDataInclude = {
  educations: true,
  workExperiences: true,
  projects: true,
  certificates: true,
  courses: true,
} satisfies Prisma.ResumeInclude

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude
}>
