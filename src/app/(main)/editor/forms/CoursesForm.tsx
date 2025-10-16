import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { GripHorizontal, Plus, Trash2 } from "lucide-react"
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { EditorFormProps } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { courseSchema, CourseValues } from "@/lib/validation"

const CoursesForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<CourseValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: { courses: resumeData.courses || [] },
  })

  useEffect(() => {
    const subscription = form.watch(async (values) => {
      const isValid = await form.trigger()
      if (!isValid) return
      setResumeData({
        ...resumeData,
        courses: values.courses?.filter((course) => course !== undefined) || [],
      })
    })

    return () => subscription.unsubscribe()
  }, [form, resumeData, setResumeData])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "courses",
  })

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-2xl font-medium">Courses</h2>

      <Form {...form}>
        <form className="space-y-6">
          {fields.map((field, index) => (
            <CourseItem
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  name: "",
                  institution: "",
                  completionDate: "",
                  description: "",
                })
              }
            >
              <Plus /> Add Course
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

interface CourseItemProps {
  form: UseFormReturn<CourseValues>
  index: number
  remove: (index: number) => void
}

const CourseItem = ({ form, index, remove }: CourseItemProps) => {
  return (
    <div className="bg-background space-y-3 rounded-md border p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Course {index + 1}</span>
        <div className="flex items-center gap-2">
          <GripHorizontal className="text-muted-foreground size-5 cursor-grab" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => remove(index)}
            aria-label={`Remove course ${index + 1}`}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      <FormField
        control={form.control}
        name={`courses.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="E.g. Full Stack Web Development"
                autoFocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`courses.${index}.institution`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Institution/Platform</FormLabel>
            <FormControl>
              <Input {...field} placeholder="E.g. Coursera, Udemy" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`courses.${index}.completionDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Completion Date</FormLabel>
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
        name={`courses.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description (Optional)</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Key topics covered..." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default CoursesForm
