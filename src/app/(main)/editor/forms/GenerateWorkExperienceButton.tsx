import { toast } from "sonner"
import { useState } from "react"
import { LoaderPinwheel, WindIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  generateWorkExperienceInput,
  generateWorkExperienceSchema,
} from "@/lib/validation"
import { Button } from "@/components/ui/button"
import { generateWorkExperience } from "./actions"
import { Textarea } from "@/components/ui/textarea"

interface GenerateWorkExperienceButtonProps {
  onWorkExperienceGenerated: (workExperience: string) => void
}

const GenerateWorkExperienceButton = ({
  onWorkExperienceGenerated,
}: GenerateWorkExperienceButtonProps) => {
  const [showInputDialog, setShowInputDialog] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => setShowInputDialog(true)}
      >
        <WindIcon className="size-4" /> Smart fill with AI
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onWorkExperienceGenerated={onWorkExperienceGenerated}
      />
    </>
  )
}

export default GenerateWorkExperienceButton

interface InputDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWorkExperienceGenerated: (workExperience: string) => void
}

const InputDialog = ({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}: InputDialogProps) => {
  const form = useForm<generateWorkExperienceInput>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: { description: "" },
  })

  const onSubmit = async (input: generateWorkExperienceInput) => {
    try {
      const response = await generateWorkExperience(input)
      onWorkExperienceGenerated(
        `${response.position} at ${response.company} (${response.startDate} - ${response.endDate ?? "Present"})\n${response.description}`,
      )
      onOpenChange(false)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Generate work experience</DialogTitle>
        <DialogDescription>
          Describe this work experience and AI will generate an optimized entry
          for you.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`E.g. "from Nov 2019 to Dec 2020 I worked at Google as a software engineer, tasks were: ..."`}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderPinwheel className="animate-spin" /> Generating...
                </span>
              ) : (
                "Generate"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
