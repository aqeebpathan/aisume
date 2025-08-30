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
import { EditorFormProps } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { educationSchema, EducationValues } from "@/lib/validation"

const EducationForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: { educations: resumeData.educations || [] },
  })

  useEffect(() => {
    const subscription = form.watch(async (values) => {
      const isValid = await form.trigger()
      if (!isValid) return
      setResumeData({
        ...resumeData,
        educations: values.educations?.filter((edu) => edu !== undefined) || [],
      })
    })

    return () => subscription.unsubscribe()
  }, [form, resumeData, setResumeData])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  })
  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-2xl font-medium">Education</h2>

      <Form {...form}>
        <form className="space-y-6">
          {fields.map((field, index) => (
            <EducationItem
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
                  degree: "",
                  school: "",
                  score: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              <Plus /> Add Education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

interface EducationItemProps {
  form: UseFormReturn<EducationValues>
  index: number
  remove: (index: number) => void
}

const EducationItem = ({ form, index, remove }: EducationItemProps) => {
  return (
    <div className="bg-background space-y-3 rounded-md border p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Education {index + 1}</span>
        <div className="flex items-center gap-2">
          <GripHorizontal className="text-muted-foreground size-5 cursor-grab" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => remove(index)}
            aria-label={`Remove education ${index + 1}`}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
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
          name={`educations.${index}.endDate`}
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
      <FormDescription>
        Leave <span className="font-semibold">end date</span> empty if you are
        currently working in this position.
      </FormDescription>
    </div>
  )
}

export default EducationForm
