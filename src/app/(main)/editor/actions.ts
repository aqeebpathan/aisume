"use server"

import prisma from "@/lib/prisma"
import { resumeSchema, ResumeValues } from "@/lib/validation"
import { auth } from "@clerk/nextjs/server"

export const saveResume = async (values: ResumeValues) => {
  const { id } = values

  const { workExperiences, educations, ...resumeValues } =
    resumeSchema.parse(values)

  const { userId } = await auth()
  if (!userId) {
    throw new Error("User not authenticated")
  }

  if (id) {
    const existingResume = await prisma.resume.findUnique({
      where: { id, userId },
    })

    if (!existingResume) {
      throw new Error("Resume not found")
    }

    return await prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        workExperiences: {
          deleteMany: {}, // Delete existing experiences
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp?.startDate
              ? new Date(exp.startDate).toISOString()
              : null,
            endDate: exp?.endDate ? new Date(exp.endDate).toISOString() : null,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu?.startDate
              ? new Date(edu.startDate).toISOString()
              : null,
            endDate: edu?.endDate ? new Date(edu.endDate).toISOString() : null,
          })),
        },
        updatedAt: new Date(),
      },
    })
  } else {
    // Creating a new resume
    return await prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp?.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp?.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu?.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu?.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    })
  }
}
