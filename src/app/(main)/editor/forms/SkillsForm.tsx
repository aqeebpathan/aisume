import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { EditorFormProps } from "@/lib/types"
import { Textarea } from "@/components/ui/textarea"
import { skillsSchema, SkillsValues } from "@/lib/validation"

const SkillsForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: { skills: resumeData.skills || [] },
  })

  useEffect(() => {
    const subscription = form.watch(async (values) => {
      const isValid = await form.trigger()
      if (!isValid) return
      setResumeData({
        ...resumeData,
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      })
    })

    return () => subscription.unsubscribe()
  }, [form, resumeData, setResumeData])
  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-2xl font-medium">Skills</h2>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g, Reactjs, Nextjs, ..."
                    autoFocus
                    onChange={(e) => {
                      const skills = e.target.value.split(",")
                      field.onChange(skills)
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Seprate each skill with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default SkillsForm
