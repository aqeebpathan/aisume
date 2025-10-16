import { toast } from "sonner"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderPinwheel, WandSparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Project,
  generateProjectInput,
  generateProjectSchema,
} from "@/lib/validation"
import { generateProject } from "./actions"

interface GenerateProjectButtonProps {
  onProjectGenerated: (project: Project) => void
}

const GenerateProjectButton = ({
  onProjectGenerated,
}: GenerateProjectButtonProps) => {
  const [showInputDialog, setShowInputDialog] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => setShowInputDialog(true)}
      >
        <WandSparklesIcon className="size-4" /> Smart fill with AI
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onProjectGenerated={onProjectGenerated}
      />
    </>
  )
}

export default GenerateProjectButton

interface InputDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProjectGenerated: (project: Project) => void
}

const InputDialog = ({
  open,
  onOpenChange,
  onProjectGenerated,
}: InputDialogProps) => {
  const form = useForm<generateProjectInput>({
    resolver: zodResolver(generateProjectSchema),
    defaultValues: { description: "" },
  })

  const onSubmit = async (input: generateProjectInput) => {
    try {
      const response = await generateProject(input)
      onProjectGenerated(response!)
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
        <DialogTitle>Generate project</DialogTitle>
        <DialogDescription>
          Describe your project and AI will generate an optimized entry for you.
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
                      placeholder={`E.g. "Built an e-commerce platform using Next.js and Stripe, features include..."`}
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
