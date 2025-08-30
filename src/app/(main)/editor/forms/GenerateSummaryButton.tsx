import { useState } from "react"
import { LoaderPinwheelIcon, Wind } from "lucide-react"

import { generateSummary } from "./actions"
import { Button } from "@/components/ui/button"
import { ResumeValues } from "@/lib/validation"

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues
  onSummaryGenerated: (summary: string) => void
}
const GenerateSummaryButton = ({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = async () => {
    try {
      setIsLoading(true)
      const response = await generateSummary(resumeData)
      onSummaryGenerated(response!)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button
      variant={"outline"}
      type="button"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <LoaderPinwheelIcon className="size-4 animate-spin" />
          Generating
        </>
      ) : (
        <>
          <Wind className="size-4" /> Generate
        </>
      )}
    </Button>
  )
}

export default GenerateSummaryButton
