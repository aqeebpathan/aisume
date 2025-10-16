import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { GripHorizontal, Plus, Trash2 } from "lucide-react"
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { EditorFormProps } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { projectSchema, ProjectValues } from "@/lib/validation"
import GenerateProjectButton from "./GenerateProjectButton"

const ProjectsForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { projects: resumeData.projects || [] },
  })

  useEffect(() => {
    const subscription = form.watch(async (values) => {
      const isValid = await form.trigger()
      if (!isValid) return
      setResumeData({
        ...resumeData,
        projects: values.projects?.filter((proj) => proj !== undefined) || [],
      })
    })

    return () => subscription.unsubscribe()
  }, [form, resumeData, setResumeData])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  })

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-2xl font-medium">Projects</h2>

      <Form {...form}>
        <form className="space-y-6">
          {fields.map((field, index) => (
            <ProjectItem
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}

          <div className="flex justify-center gap-3">
            <Button
              type="button"
              onClick={() =>
                append({
                  name: "",
                  role: "",
                  description: "",
                  startDate: "",
                  endDate: "",
                  link: "",
                })
              }
            >
              <Plus /> Add Project
            </Button>
            <GenerateProjectButton
              onProjectGenerated={(project) => append(project)}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}

interface ProjectItemProps {
  form: UseFormReturn<ProjectValues>
  index: number
  remove: (index: number) => void
}

const ProjectItem = ({ form, index, remove }: ProjectItemProps) => {
  return (
    <div className="bg-background space-y-3 rounded-md border p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Project {index + 1}</span>
        <div className="flex items-center gap-2">
          <GripHorizontal className="text-muted-foreground size-5 cursor-grab" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => remove(index)}
            aria-label={`Remove project ${index + 1}`}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      <FormField
        control={form.control}
        name={`projects.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="E.g. E-commerce Platform"
                autoFocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`projects.${index}.role`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Role</FormLabel>
            <FormControl>
              <Input {...field} placeholder="E.g. Full Stack Developer" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`projects.${index}.link`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link (Optional)</FormLabel>
            <FormControl>
              <Input {...field} placeholder="GitHub/Portfolio URL" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`projects.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value ? field.value.slice(0, 10) : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`projects.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value ? field.value.slice(0, 10) : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={`projects.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe your achievements and technologies used..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormDescription>
        Leave <span className="font-semibold">end date</span> empty if project
        is ongoing.
      </FormDescription>
    </div>
  )
}

export default ProjectsForm
