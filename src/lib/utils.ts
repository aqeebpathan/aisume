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
      score: edu.score || undefined,
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
    projects: data.projects.map((proj) => ({
      name: proj.name || undefined,
      role: proj.role || undefined,
      description: proj.description || undefined,
      startDate: proj.startDate
        ? typeof proj.startDate === "string"
          ? proj.startDate
          : new Date(proj.startDate).toISOString().split("T")[0]
        : undefined,
      endDate: proj.endDate
        ? typeof proj.endDate === "string"
          ? proj.endDate
          : new Date(proj.endDate).toISOString().split("T")[0]
        : undefined,
      link: proj.link || undefined,
    })),
    certificates: data.certificates.map((cert) => ({
      name: cert.name || undefined,
      issuer: cert.issuer || undefined,
      issueDate: cert.issueDate
        ? typeof cert.issueDate === "string"
          ? cert.issueDate
          : new Date(cert.issueDate).toISOString().split("T")[0]
        : undefined,
      expiryDate: cert.expiryDate
        ? typeof cert.expiryDate === "string"
          ? cert.expiryDate
          : new Date(cert.expiryDate).toISOString().split("T")[0]
        : undefined,
    })),
    courses: data.courses.map((course) => ({
      name: course.name || undefined,
      institution: course.institution || undefined,
      completionDate: course.completionDate
        ? typeof course.completionDate === "string"
          ? course.completionDate
          : new Date(course.completionDate).toISOString().split("T")[0]
        : undefined,
      description: course.description || undefined,
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

// import { twMerge } from "tailwind-merge"
// import { clsx, type ClassValue } from "clsx"

// import { ResumeServerData } from "./types"
// import { ResumeValues } from "./validation"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// export function mapToResumeValues(data: ResumeServerData): ResumeValues {
//   return {
//     id: data.id,
//     title: data.title || undefined,
//     description: data.description || undefined,
//     firstName: data.firstName || undefined,
//     lastName: data.lastName || undefined,
//     jobTitle: data.jobTitle || undefined,
//     city: data.city || undefined,
//     country: data.country || undefined,
//     phone: data.phone || undefined,
//     email: data.email || undefined,
//     workExperiences: data.workExperiences.map((exp) => ({
//       position: exp.position || undefined,
//       company: exp.company || undefined,
//       startDate: exp.startDate
//         ? typeof exp.startDate === "string"
//           ? exp.startDate
//           : new Date(exp.startDate).toISOString().split("T")[0]
//         : undefined,
//       endDate: exp.endDate
//         ? typeof exp.endDate === "string"
//           ? exp.endDate
//           : new Date(exp.endDate).toISOString().split("T")[0]
//         : undefined,
//       description: exp.description || undefined,
//     })),
//     educations: data.educations.map((edu) => ({
//       degree: edu.degree || undefined,
//       school: edu.school || undefined,
//       startDate: edu.startDate
//         ? typeof edu.startDate === "string"
//           ? edu.startDate
//           : new Date(edu.startDate).toISOString().split("T")[0]
//         : undefined,
//       endDate: edu.endDate
//         ? typeof edu.endDate === "string"
//           ? edu.endDate
//           : new Date(edu.endDate).toISOString().split("T")[0]
//         : undefined,
//     })),
//     skills: data.skills,
//     summary: data.summary || undefined,
//   }
// }

// interface DateItem {
//   startDate?: string | Date | null
//   endDate?: string | Date | null
//   [key: string]: string | Date | null | undefined
// }

// export function sanitizeDatesForPrisma(items: DateItem[]) {
//   return items.map((item) => ({
//     ...item,
//     startDate: item.startDate
//       ? typeof item.startDate === "string"
//         ? item.startDate
//         : new Date(item.startDate).toISOString().split("T")[0]
//       : null,
//     endDate: item.endDate
//       ? typeof item.endDate === "string"
//         ? item.endDate
//         : new Date(item.endDate).toISOString().split("T")[0]
//       : null,
//   }))
// }
