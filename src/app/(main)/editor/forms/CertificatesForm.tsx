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
import { certificateSchema, CertificateValues } from "@/lib/validation"

const CertificatesForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<CertificateValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: { certificates: resumeData.certificates || [] },
  })

  useEffect(() => {
    const subscription = form.watch(async (values) => {
      const isValid = await form.trigger()
      if (!isValid) return
      setResumeData({
        ...resumeData,
        certificates:
          values.certificates?.filter((cert) => cert !== undefined) || [],
      })
    })

    return () => subscription.unsubscribe()
  }, [form, resumeData, setResumeData])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "certificates",
  })

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-2xl font-medium">Certifications</h2>

      <Form {...form}>
        <form className="space-y-6">
          {fields.map((field, index) => (
            <CertificateItem
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
                  issuer: "",
                  issueDate: "",
                  expiryDate: "",
                })
              }
            >
              <Plus /> Add Certification
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

interface CertificateItemProps {
  form: UseFormReturn<CertificateValues>
  index: number
  remove: (index: number) => void
}

const CertificateItem = ({ form, index, remove }: CertificateItemProps) => {
  return (
    <div className="bg-background space-y-3 rounded-md border p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Certification {index + 1}</span>
        <div className="flex items-center gap-2">
          <GripHorizontal className="text-muted-foreground size-5 cursor-grab" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => remove(index)}
            aria-label={`Remove certification ${index + 1}`}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      <FormField
        control={form.control}
        name={`certificates.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Certificate Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="E.g. AWS Certified Solutions Architect"
                autoFocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`certificates.${index}.issuer`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Issuing Organization</FormLabel>
            <FormControl>
              <Input {...field} placeholder="E.g. Amazon Web Services" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`certificates.${index}.issueDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Date</FormLabel>
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
          name={`certificates.${index}.expiryDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date (Optional)</FormLabel>
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
        Leave <span className="font-semibold">expiry date</span> empty if
        certification doesn&apos;t expire.
      </FormDescription>
    </div>
  )
}

export default CertificatesForm
