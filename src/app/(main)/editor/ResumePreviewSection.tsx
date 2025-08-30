import { ResumeValues } from "@/lib/validation"
import ResumePreview from "@/components/ResumePreview"

interface ResumePreviewSectionProps {
  resumeData: ResumeValues
  setResumeData: (data: ResumeValues) => void
  className?: string
}

const ResumePreviewSection = ({ resumeData }: ResumePreviewSectionProps) => {
  return (
    <div className="scrollbar-hide flex w-full justify-center overflow-y-auto p-3">
      <ResumePreview resumeData={resumeData} className="max-w-2xl shadow-md" />
    </div>
  )
}

export default ResumePreviewSection
