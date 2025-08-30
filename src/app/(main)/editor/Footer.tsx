import Link from "next/link"
import { FileUserIcon, PenLineIcon } from "lucide-react"

import { steps } from "./steps"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FooterProps {
  currentStep: string
  isSaving?: boolean
  setCurrentStep: (step: string) => void
  showSmResumePreview: boolean
  setShowResumePreview: (show: boolean) => void
}

const Footer = ({
  currentStep,
  setCurrentStep,
  isSaving = true,
  showSmResumePreview,
  setShowResumePreview,
}: FooterProps) => {
  const currentIndex = steps.findIndex((step) => step.key === currentStep)
  const previousStep = currentIndex > 0 ? steps[currentIndex - 1].key : null
  const nextStep =
    currentIndex < steps.length - 1 ? steps[currentIndex + 1].key : null

  return (
    <footer className="w-full border-t px-4 py-5 xl:px-0">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-5">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Next step
          </Button>
        </div>

        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => setShowResumePreview(!showSmResumePreview)}
          className="md:hidden"
          title={
            showSmResumePreview ? "Show input form" : "Show Resume Preview"
          }
        >
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>

        <div className="flex items-center gap-5">
          <p
            className={cn(
              "text-muted-foreground px-4 font-medium opacity-0 transition-opacity",
              isSaving && "opacity-100",
            )}
          >
            Saving...
          </p>
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
