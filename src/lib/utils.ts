import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"

import { ResumeServerData } from "./types"
import { ResumeValues } from "./validation"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    workExperiences: data.workExperiences.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      startDate: exp.startDate
        ? typeof exp.startDate === "string"
          ? exp.startDate
          : new Date(exp.startDate).toISOString().split("T")[0]
        : undefined,
      endDate: exp.endDate
        ? typeof exp.endDate === "string"
          ? exp.endDate
          : new Date(exp.endDate).toISOString().split("T")[0]
        : undefined,
      description: exp.description || undefined,
    })),
    educations: data.educations.map((edu) => ({
      degree: edu.degree || undefined,
      school: edu.school || undefined,
      startDate: edu.startDate
        ? typeof edu.startDate === "string"
          ? edu.startDate
          : new Date(edu.startDate).toISOString().split("T")[0]
        : undefined,
      endDate: edu.endDate
        ? typeof edu.endDate === "string"
          ? edu.endDate
          : new Date(edu.endDate).toISOString().split("T")[0]
        : undefined,
    })),
    skills: data.skills,
    summary: data.summary || undefined,
  }
}

interface DateItem {
  startDate?: string | Date | null
  endDate?: string | Date | null
  [key: string]: string | Date | null | undefined
}

export function sanitizeDatesForPrisma(items: DateItem[]) {
  return items.map((item) => ({
    ...item,
    startDate: item.startDate
      ? typeof item.startDate === "string"
        ? item.startDate
        : new Date(item.startDate).toISOString().split("T")[0]
      : null,
    endDate: item.endDate
      ? typeof item.endDate === "string"
        ? item.endDate
        : new Date(item.endDate).toISOString().split("T")[0]
      : null,
  }))
}
