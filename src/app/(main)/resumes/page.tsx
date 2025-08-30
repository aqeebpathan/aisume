import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

import { resumeDataInclude } from "@/lib/types"
import ResumeItem, { CreateResumeCard } from "./ResumeItem"

export const metadata: Metadata = {
  title: "Your Resume",
}

const ResumesPage = async () => {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  const resumes = await prisma.resume.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: resumeDataInclude,
  })

  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <div className="my-8 space-y-4">
        {/* Creative heading */}
        <div className="relative">
          <h1 className="text-4xl font-black tracking-tight text-neutral-900 md:text-5xl dark:text-white">
            Your{" "}
            <span className="relative inline-block">
              resumes
              <div className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-black dark:bg-white"></div>
              <div className="absolute -bottom-1 left-2 h-0.5 w-3/4 rounded-full bg-neutral-400 dark:bg-neutral-600"></div>
            </span>
          </h1>

          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 h-3 w-3 animate-pulse rounded-full bg-black opacity-60 dark:bg-white"></div>
          <div className="absolute top-8 -left-1 h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-600"></div>
        </div>

        {/* Stats or additional info */}
        <div className="flex items-center space-x-6 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="font-medium">
              {resumes.length} resume{resumes.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span className="font-medium">AI-Enhanced</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            <span className="font-medium">ATS-Ready</span>
          </div>
        </div>
      </div>

      <div className="mb-8 flex w-full grid-cols-2 flex-col gap-4 sm:grid md:grid-cols-3 lg:grid-cols-4">
        <CreateResumeCard />
        {resumes.map((resume) => (
          <ResumeItem resume={resume} key={resume.id} />
        ))}
      </div>
    </div>
  )
}

export default ResumesPage
