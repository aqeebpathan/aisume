"use server"

import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { ResumeValues } from "@/lib/validation"

export async function saveResume(values: ResumeValues) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const {
    id,
    workExperiences,
    educations,
    projects,
    certificates,
    courses,
    ...resumeValues
  } = values

  if (id) {
    // Update existing resume
    return await prisma.resume.update({
      where: { id, userId },
      data: {
        ...resumeValues,
        workExperiences: {
          deleteMany: {},
          create:
            workExperiences?.map((exp) => ({
              ...exp,
            })) || [],
        },
        educations: {
          deleteMany: {},
          create:
            educations?.map((edu) => ({
              ...edu,
            })) || [],
        },
        projects: {
          deleteMany: {},
          create:
            projects?.map((proj) => ({
              ...proj,
            })) || [],
        },
        certificates: {
          deleteMany: {},
          create:
            certificates?.map((cert) => ({
              ...cert,
            })) || [],
        },
        courses: {
          deleteMany: {},
          create:
            courses?.map((course) => ({
              ...course,
            })) || [],
        },
      },
    })
  } else {
    // Create new resume
    return await prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        workExperiences: {
          create:
            workExperiences?.map((exp) => ({
              ...exp,
            })) || [],
        },
        educations: {
          create:
            educations?.map((edu) => ({
              ...edu,
            })) || [],
        },
        projects: {
          create:
            projects?.map((proj) => ({
              ...proj,
            })) || [],
        },
        certificates: {
          create:
            certificates?.map((cert) => ({
              ...cert,
            })) || [],
        },
        courses: {
          create:
            courses?.map((course) => ({
              ...course,
            })) || [],
        },
      },
    })
  }
}
