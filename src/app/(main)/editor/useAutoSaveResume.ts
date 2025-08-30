import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { saveResume } from "./actions"
import { ResumeValues } from "@/lib/validation"
import { useDebounce } from "@/hooks/useDebounce"

export function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams()
  const [resumeId, setResumeId] = useState(resumeData.id)
  const debounceResumeData = useDebounce(resumeData, 1500)

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  )
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [debounceResumeData])

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true)
        setError(true)

        const newData = structuredClone(debounceResumeData)
        const updatedResume = await saveResume({ ...newData, id: resumeId })

        setResumeId(updatedResume.id)
        setLastSavedData(newData)

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParam = new URLSearchParams(searchParams)
          newSearchParam.set("resumeId", updatedResume.id)

          window.history.replaceState(null, "", `?${newSearchParam.toString()}`)
        }
      } catch (error) {
        setError(true)
        console.log(error)
      } finally {
        setIsSaving(false)
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(debounceResumeData) !== JSON.stringify(lastSavedData)

    if (hasUnsavedChanges && debounceResumeData && !isSaving && !error) {
      save()
    }
  }, [
    debounceResumeData,
    isSaving,
    lastSavedData,
    error,
    resumeId,
    searchParams,
  ])

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  }
}
