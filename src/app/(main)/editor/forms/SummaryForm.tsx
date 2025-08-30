import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { EditorFormProps } from "@/lib/types"
import { Textarea } from "@/components/ui/textarea"
import GenerateSummaryButton from "./GenerateSummaryButton"
import { summarySchema, SummaryValues } from "@/lib/validation"

const SummaryForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  })

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger()
      if (!isValid) return
      setResumeData({ ...resumeData, ...values })
    })

    return unsubscribe
  }, [form, resumeData, setResumeData])

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-2xl font-medium">Professional Summary</h2>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Professional summary</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="e.g, fds" autoFocus />
                </FormControl>
                <FormMessage />
                <GenerateSummaryButton
                  resumeData={resumeData}
                  onSummaryGenerated={(summary) =>
                    form.setValue("summary", summary)
                  }
                />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default SummaryForm
