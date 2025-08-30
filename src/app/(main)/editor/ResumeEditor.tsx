"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

import Footer from "./Footer"
import { steps } from "./steps"
import Breadcrumbs from "./Breadcrumbs"
import { ResumeServerData } from "@/lib/types"
import { ResumeValues } from "@/lib/validation"
import { cn, mapToResumeValues } from "@/lib/utils"
import { useAutoSaveResume } from "./useAutoSaveResume"
import ResumePreviewSection from "./ResumePreviewSection"
import { useUnloadWarning } from "@/hooks/useUnloadWarning"

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null | undefined
}

const ResumeEditor = ({ resumeToEdit }: ResumeEditorProps) => {
  const searchParams = useSearchParams()
  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {},
  )

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData)

  useUnloadWarning(hasUnsavedChanges)

  const [showSmResumePreview, setShowSmResumePreview] = useState(false)

  const currentStep = searchParams.get("step") || steps[0].key

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set("step", key)
    window.history.pushState(null, "", `?${newSearchParams.toString()}`)
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component

  return (
    <div className="mx-auto flex w-full max-w-7xl grow flex-col">
      <main className="relative grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto p-4 md:block md:w-1/2",
              showSmResumePreview && "hidden",
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <div
            className={cn(
              "hidden w-full md:flex md:w-1/2",
              showSmResumePreview && "flex",
            )}
          >
            <ResumePreviewSection
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          </div>
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
      />
    </div>
  )
}

export default ResumeEditor
