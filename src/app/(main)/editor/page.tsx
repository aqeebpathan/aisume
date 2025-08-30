import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

import ResumeEditor from "./ResumeEditor"
import { resumeDataInclude } from "@/lib/types"

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>
}

export const metadata: Metadata = {
  title: "Make your resume",
}

const page = async ({ searchParams }: PageProps) => {
  const { resumeId } = await searchParams

  const { userId } = await auth()

  let resumeToEdit
  if (userId) {
    resumeToEdit = resumeId
      ? await prisma.resume.findUnique({
          where: { id: resumeId, userId },
          include: resumeDataInclude,
        })
      : null
  }

  return <ResumeEditor resumeToEdit={resumeToEdit} />
}

export default page
