"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@radix-ui/react-dialog"
import Link from "next/link"
import { toast } from "sonner"
import { formatDate } from "date-fns"
import { useReactToPrint } from "react-to-print"
import { useRef, useState, useTransition } from "react"
import { Printer, Trash2, Plus, Sparkles, FileText } from "lucide-react"

import { deleteResume } from "./action"
import { ResumeServerData } from "@/lib/types"
import { mapToResumeValues } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ResumePreview from "@/components/ResumePreview"
import { DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export const CreateResumeCard = () => {
  return (
    <Link href="/editor">
      <div className="group flex min-h-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-950 dark:hover:border-white">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 transition-colors duration-300 group-hover:bg-black dark:bg-neutral-800 dark:group-hover:bg-white">
              <Plus className="h-8 w-8 text-neutral-400 transition-colors duration-300 group-hover:text-white dark:group-hover:text-black" />
            </div>
            <div className="absolute -top-2 -right-2 flex h-6 w-6 scale-0 transform items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-100 dark:bg-white">
              <Sparkles className="h-3 w-3 text-white dark:text-black" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-neutral-900 group-hover:text-black dark:text-white dark:group-hover:text-white">
              Create New Resume
            </h3>
            <p className="max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
              Start building your professional resume with AI-powered assistance
            </p>
          </div>

          <div className="mt-4 rounded-full bg-neutral-50 px-4 py-2 text-xs font-medium text-neutral-600 transition-all duration-300 group-hover:bg-black group-hover:text-white dark:bg-neutral-800 dark:text-neutral-300 dark:group-hover:bg-white dark:group-hover:text-black">
            ✨ AI-Powered
          </div>
        </div>

        <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="h-3 w-3 animate-pulse rounded-full bg-black dark:bg-white"></div>
        </div>
        <div className="absolute bottom-4 left-4 opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
          <div className="h-2 w-2 rounded-full bg-neutral-400"></div>
        </div>
      </div>
    </Link>
  )
}

interface ResumeItemProps {
  resume: ResumeServerData
}

const ResumeItem = ({ resume }: ResumeItemProps) => {
  const wasUpdated = resume.updatedAt !== resume.createdAt
  const contentRef = useRef<HTMLDivElement>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  })

  return (
    <div className="group relative rounded-2xl border-2 border-neutral-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-white">
      <div className="space-y-3">
        {/* Header */}
        <Link href={`/editor?resumeId=${resume.id}`} className="block">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black dark:bg-white">
              <FileText className="h-4 w-4 text-white dark:text-black" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 font-bold text-neutral-900 group-hover:text-black dark:text-white dark:group-hover:text-white">
                {resume.title || "Untitled Resume"}
              </p>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {wasUpdated ? "Updated" : "Created"} on{" "}
                {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
              </p>
            </div>
          </div>
        </Link>

        {/* Preview */}
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <div className="relative overflow-hidden rounded-xl border border-neutral-200 transition-all group-hover:ring-2 group-hover:ring-black dark:border-neutral-700 dark:group-hover:ring-white">
            <ResumePreview
              resumeData={mapToResumeValues(resume)}
              contentRef={contentRef}
              className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-neutral-950" />
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={reactToPrintFn}
            >
              <Printer className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
              onClick={() => setShowDeleteConfirmation(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <DeleteConfirmationDialog
        resumeId={resume.id}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </div>
  )
}

interface DeleteConfirmationDialogProps {
  resumeId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DeleteConfirmationDialog({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) {
  const [isPending, startTransition] = useTransition()

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId)
        onOpenChange(false)
        toast.success("Resume deleted successfully")
      } catch (error) {
        console.error(error)
        toast.error("Something went wrong. Please try again.")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <DialogTitle className="text-xl font-bold">
            Delete Resume?
          </DialogTitle>
          <DialogDescription className="text-neutral-600 dark:text-neutral-400">
            This will permanently delete this resume. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 sm:gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1"
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ResumeItem
