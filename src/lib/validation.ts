import { z } from "zod"

export const optionalString = z.string().trim().optional().or(z.literal(""))

////// GENERAL INFO SCHEMA
export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
})
export type GeneralInfoValues = z.infer<typeof generalInfoSchema>

////// PERSONAL INFO SCHEMA
export const personalInfoSchema = z.object({
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
})
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>

////// WORK EXPERIENCE SCHEMA
export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
})

export type WorkExperience = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number]

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>

////// PROJECT SCHEMA
export const projectSchema = z.object({
  projects: z
    .array(
      z.object({
        name: optionalString,
        role: optionalString,
        description: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        link: optionalString,
      }),
    )
    .optional(),
})

export type Project = NonNullable<
  z.infer<typeof projectSchema>["projects"]
>[number]

export type ProjectValues = z.infer<typeof projectSchema>

////// EDUCATION SCHEMA
export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        score: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
})

export type Education = NonNullable<
  z.infer<typeof educationSchema>["educations"]
>[number]

export type EducationValues = z.infer<typeof educationSchema>

////// CERTIFICATE SCHEMA
export const certificateSchema = z.object({
  certificates: z
    .array(
      z.object({
        name: optionalString,
        issuer: optionalString,
        issueDate: optionalString,
        expiryDate: optionalString,
      }),
    )
    .optional(),
})

export type Certificate = NonNullable<
  z.infer<typeof certificateSchema>["certificates"]
>[number]

export type CertificateValues = z.infer<typeof certificateSchema>

////// COURSE SCHEMA
export const courseSchema = z.object({
  courses: z
    .array(
      z.object({
        name: optionalString,
        institution: optionalString,
        completionDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
})

export type Course = NonNullable<
  z.infer<typeof courseSchema>["courses"]
>[number]

export type CourseValues = z.infer<typeof courseSchema>

////// SKILLS SCHEMA
export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
})
export type SkillsValues = z.infer<typeof skillsSchema>

////// SUMMARY SCHEMA
export const summarySchema = z.object({
  summary: optionalString,
})
export type SummaryValues = z.infer<typeof summarySchema>

////// RESUME SCHEMA
export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...projectSchema.shape,
  ...educationSchema.shape,
  ...certificateSchema.shape,
  ...courseSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
})

export type ResumeValues = z.infer<typeof resumeSchema> & {
  id?: string
}

////// AI GENERATION SCHEMAS

// Generate Work Experience
export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
})
export type generateWorkExperienceInput = z.infer<
  typeof generateWorkExperienceSchema
>

// Generate Project
export const generateProjectSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
})
export type generateProjectInput = z.infer<typeof generateProjectSchema>

// Generate Summary
export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...projectSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
})
export type generateSummaryInput = z.infer<typeof generateSummarySchema>

// import { z } from "zod"

// export const optionalString = z.string().trim().optional().or(z.literal(""))

// ////// GENERAL INFO SCHEMA
// export const generalInfoSchema = z.object({
//   title: optionalString,
//   description: optionalString,
// })
// export type GeneralInfoValues = z.infer<typeof generalInfoSchema>

// ////// PERSONAL INFO SCHEMA
// export const personalInfoSchema = z.object({
//   firstName: optionalString,
//   lastName: optionalString,
//   jobTitle: optionalString,
//   city: optionalString,
//   country: optionalString,
//   phone: optionalString,
//   email: optionalString,
// })
// export type PersonalInfoValues = z.infer<typeof personalInfoSchema>

// ////// WORK EXPERIENCE SCHEMA
// export const workExperienceSchema = z.object({
//   workExperiences: z
//     .array(
//       z.object({
//         position: optionalString,
//         company: optionalString,
//         startDate: optionalString,
//         endDate: optionalString,
//         description: optionalString,
//       }),
//     )
//     .optional(),
// })

// export type WorkExperience = NonNullable<
//   z.infer<typeof workExperienceSchema>["workExperiences"]
// >[number]

// export type WorkExperienceValues = z.infer<typeof workExperienceSchema>

// ////// EDUCATION SCHEMA
// export const educationSchema = z.object({
//   educations: z
//     .array(
//       z.object({
//         degree: optionalString,
//         school: optionalString,
//         score: optionalString,
//         startDate: optionalString,
//         endDate: optionalString,
//       }),
//     )
//     .optional(),
// })
// export type EducationValues = z.infer<typeof educationSchema>

// ////// SKILLS SCHEMA
// export const skillsSchema = z.object({
//   skills: z.array(z.string().trim()).optional(),
// })
// export type SkillsValues = z.infer<typeof skillsSchema>

// ////// SUMMARY SCHEMA
// export const summarySchema = z.object({
//   summary: optionalString,
// })
// export type SummaryValues = z.infer<typeof summarySchema>

// ////// RESUME SCHEMA
// export const resumeSchema = z.object({
//   ...generalInfoSchema.shape,
//   ...personalInfoSchema.shape,
//   ...workExperienceSchema.shape,
//   ...educationSchema.shape,
//   ...skillsSchema.shape,
//   ...summarySchema.shape,
// })

// export type ResumeValues = z.infer<typeof resumeSchema> & {
//   id?: string
// }

// export const generateWorkExperienceSchema = z.object({
//   description: z
//     .string()
//     .trim()
//     .min(1, "Required")
//     .min(20, "Must be at least 20 characters"),
// })
// export type generateWorkExperienceInput = z.infer<
//   typeof generateWorkExperienceSchema
// >

// export const generateSummarySchema = z.object({
//   jobTitle: optionalString,
//   ...workExperienceSchema.shape,
//   ...educationSchema.shape,
//   ...skillsSchema.shape,
// })

// export type generateSummaryInput = z.infer<typeof generateSummarySchema>
