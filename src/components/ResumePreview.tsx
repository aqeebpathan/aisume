// "use client"

// import { useDimensions } from "@/hooks/useDimensions"
// import { cn } from "@/lib/utils"
// import { ResumeValues } from "@/lib/validation"
// import React, { useRef } from "react"
// import { formatDate } from "date-fns"

// interface ResumePreviewProps {
//   resumeData: ResumeValues
//   contentRef?: React.Ref<HTMLDivElement>
//   className?: string
// }

// const ResumePreview = ({
//   resumeData,
//   contentRef,
//   className,
// }: ResumePreviewProps) => {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>)

//   return (
//     <div
//       className={cn(
//         "aspect-[210/297] h-fit w-full bg-white text-black",
//         className,
//       )}
//       style={{
//         fontFamily:
//           "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', sans-serif",
//       }}
//       ref={containerRef}
//     >
//       <div
//         className={cn("px-[0.6in] py-[0.5in]", !width && "invisible")}
//         style={{
//           zoom: width ? (1 / 794) * width : 1,
//           lineHeight: 1.3,
//         }}
//         ref={contentRef}
//         id="resumePreviewContent"
//       >
//         <PersonalInfoHeader resumeData={resumeData} />
//         <div className="mt-3 space-y-3">
//           <SummarySection resumeData={resumeData} />
//           <WorkExperienceSection resumeData={resumeData} />
//           <ProjectsSection resumeData={resumeData} />
//           <EducationSection resumeData={resumeData} />
//           <SkillsSection resumeData={resumeData} />
//           <CertificatesSection resumeData={resumeData} />
//           <CoursesSection resumeData={resumeData} />
//         </div>
//       </div>
//     </div>
//   )
// }

// interface ResumeSectionProps {
//   resumeData: ResumeValues
// }

// const PersonalInfoHeader = ({ resumeData }: ResumeSectionProps) => {
//   const { firstName, lastName, jobTitle, email, phone, country, city } =
//     resumeData

//   return (
//     <div className="border-b border-gray-900 pb-2">
//       <h1 className="text-[20px] font-bold text-gray-900">
//         {firstName} {lastName}
//       </h1>

//       {jobTitle && (
//         <div className="mt-0.5 text-[11px] font-medium text-gray-700">
//           {jobTitle}
//         </div>
//       )}

//       <div className="mt-1 flex items-center gap-3 text-[10px] text-gray-600">
//         {email && <span>{email}</span>}
//         {phone && (
//           <>
//             <span className="text-gray-400">•</span>
//             <span>{phone}</span>
//           </>
//         )}
//         {(city || country) && (
//           <>
//             <span className="text-gray-400">•</span>
//             <span>
//               {city && city}
//               {city && country && ", "}
//               {country && country}
//             </span>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// const SummarySection = ({ resumeData }: ResumeSectionProps) => {
//   const { summary } = resumeData

//   if (!summary?.trim()) return null

//   return (
//     <div>
//       <SectionHeader title="Summary" />
//       <p className="mt-1 text-[10px] leading-[1.4] text-gray-700">{summary}</p>
//     </div>
//   )
// }

// const WorkExperienceSection = ({ resumeData }: ResumeSectionProps) => {
//   const { workExperiences } = resumeData

//   const workExperiencesNotEmpty = workExperiences?.filter(
//     (exp) => exp.position || exp.company || exp.description,
//   )

//   if (!workExperiencesNotEmpty?.length) return null

//   return (
//     <div>
//       <SectionHeader title="Experience" />
//       <div className="mt-1 space-y-2.5">
//         {workExperiencesNotEmpty.map((exp, index) => (
//           <div key={`${exp.company}-${exp.position}-${index}`}>
//             <div className="flex items-baseline justify-between">
//               <div className="flex-1">
//                 <span className="text-[11px] font-semibold text-gray-900">
//                   {exp.position}
//                 </span>
//                 {exp.company && (
//                   <span className="text-[11px] text-gray-700">
//                     {" "}
//                     at {exp.company}
//                   </span>
//                 )}
//               </div>
//               <span className="ml-2 text-[10px] text-gray-600">
//                 {exp.startDate && formatDate(exp.startDate, "MMM yyyy")}
//                 {exp.startDate && " - "}
//                 {exp.endDate
//                   ? formatDate(exp.endDate, "MMM yyyy")
//                   : exp.startDate
//                     ? "Present"
//                     : ""}
//               </span>
//             </div>
//             {exp.description && (
//               <div className="mt-0.5">
//                 {exp.description.includes("\n") ||
//                 exp.description.includes("•") ? (
//                   <ul className="space-y-0.5">
//                     {exp.description
//                       .split("\n")
//                       .filter((line) => line.trim())
//                       .map((line, idx) => (
//                         <li
//                           key={idx}
//                           className="flex text-[10px] leading-[1.4] text-gray-700"
//                         >
//                           <span className="mr-1.5">•</span>
//                           <span className="flex-1">
//                             {line.replace(/^[•\-*]\s*/, "").trim()}
//                           </span>
//                         </li>
//                       ))}
//                   </ul>
//                 ) : (
//                   <p className="pl-2 text-[10px] leading-[1.4] text-gray-700">
//                     • {exp.description}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// const ProjectsSection = ({ resumeData }: ResumeSectionProps) => {
//   const { projects } = resumeData

//   const projectsNotEmpty = projects?.filter(
//     (proj) => proj.name || proj.role || proj.description,
//   )

//   if (!projectsNotEmpty?.length) return null

//   return (
//     <div>
//       <SectionHeader title="Projects" />
//       <div className="mt-1 space-y-2">
//         {projectsNotEmpty.map((proj, index) => (
//           <div key={`${proj.name}-${index}`}>
//             <div className="flex items-baseline justify-between">
//               <div className="flex-1">
//                 <span className="text-[11px] font-semibold text-gray-900">
//                   {proj.name}
//                 </span>
//                 {proj.role && (
//                   <span className="text-[10px] text-gray-700">
//                     {" "}
//                     • {proj.role}
//                   </span>
//                 )}
//                 {proj.link && (
//                   <span className="ml-2 text-[9px] text-blue-600">
//                     [{proj.link}]
//                   </span>
//                 )}
//               </div>
//               <span className="ml-2 text-[10px] text-gray-600">
//                 {proj.startDate && formatDate(proj.startDate, "MMM yyyy")}
//                 {proj.startDate && proj.endDate && " - "}
//                 {proj.endDate && formatDate(proj.endDate, "MMM yyyy")}
//               </span>
//             </div>
//             {proj.description && (
//               <div className="mt-0.5">
//                 {proj.description.includes("\n") ||
//                 proj.description.includes("•") ? (
//                   <ul className="space-y-0.5">
//                     {proj.description
//                       .split("\n")
//                       .filter((line) => line.trim())
//                       .map((line, idx) => (
//                         <li
//                           key={idx}
//                           className="flex text-[10px] leading-[1.4] text-gray-700"
//                         >
//                           <span className="mr-1.5">•</span>
//                           <span className="flex-1">
//                             {line.replace(/^[•\-*]\s*/, "").trim()}
//                           </span>
//                         </li>
//                       ))}
//                   </ul>
//                 ) : (
//                   <p className="pl-2 text-[10px] leading-[1.4] text-gray-700">
//                     • {proj.description}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// const EducationSection = ({ resumeData }: ResumeSectionProps) => {
//   const { educations } = resumeData

//   const educationsNotEmpty = educations?.filter(
//     (edu) => edu.degree || edu.school,
//   )

//   if (!educationsNotEmpty?.length) return null

//   return (
//     <div>
//       <SectionHeader title="Education" />
//       <div className="mt-1 space-y-1.5">
//         {educationsNotEmpty.map((edu, index) => (
//           <div
//             key={`${edu.school}-${edu.degree}-${index}`}
//             className="flex items-baseline justify-between"
//           >
//             <div className="flex-1">
//               <span className="text-[11px] font-semibold text-gray-900">
//                 {edu.school}
//               </span>
//               {edu.degree && (
//                 <span className="text-[10px] text-gray-700">
//                   {" "}
//                   • {edu.degree}
//                 </span>
//               )}
//               {edu.score && (
//                 <span className="text-[10px] text-gray-600">
//                   {" "}
//                   • GPA: {edu.score}
//                 </span>
//               )}
//             </div>
//             <span className="ml-2 text-[10px] text-gray-600">
//               {edu.startDate && formatDate(edu.startDate, "MMM yyyy")}
//               {edu.startDate && edu.endDate && " - "}
//               {edu.endDate && formatDate(edu.endDate, "MMM yyyy")}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// const SkillsSection = ({ resumeData }: ResumeSectionProps) => {
//   const { skills } = resumeData

//   if (!skills?.length) return null

//   // Categorize skills for better organization
//   const categorizeSkills = (skills: string[]) => {
//     const categories: { [key: string]: string[] } = {
//       Languages: [],
//       Technologies: [],
//       Tools: [],
//       Other: [],
//     }

//     const languageKeywords = [
//       "JavaScript",
//       "TypeScript",
//       "Python",
//       "Java",
//       "C++",
//       "C#",
//       "Go",
//       "Rust",
//       "Ruby",
//       "PHP",
//       "Swift",
//       "Kotlin",
//       "SQL",
//       "HTML",
//       "CSS",
//       "R",
//       "MATLAB",
//       "Scala",
//     ]
//     const techKeywords = [
//       "React",
//       "Angular",
//       "Vue",
//       "Next.js",
//       "Node.js",
//       "Express",
//       "Django",
//       "Flask",
//       "Spring",
//       "Laravel",
//       ".NET",
//       "Rails",
//       "FastAPI",
//       "GraphQL",
//       "REST",
//       "MongoDB",
//       "PostgreSQL",
//       "MySQL",
//       "Redis",
//     ]
//     const toolKeywords = [
//       "Git",
//       "Docker",
//       "Kubernetes",
//       "Jenkins",
//       "AWS",
//       "Azure",
//       "GCP",
//       "Terraform",
//       "Linux",
//       "Jira",
//       "Figma",
//       "CI/CD",
//       "Webpack",
//       "Babel",
//     ]

//     skills.forEach((skill) => {
//       const skillLower = skill.toLowerCase()
//       if (
//         languageKeywords.some((lang) => skillLower.includes(lang.toLowerCase()))
//       ) {
//         categories["Languages"].push(skill)
//       } else if (
//         techKeywords.some((tech) => skillLower.includes(tech.toLowerCase()))
//       ) {
//         categories["Technologies"].push(skill)
//       } else if (
//         toolKeywords.some((tool) => skillLower.includes(tool.toLowerCase()))
//       ) {
//         categories["Tools"].push(skill)
//       } else {
//         categories["Other"].push(skill)
//       }
//     })

//     return Object.entries(categories).filter(([_, skills]) => skills.length > 0)
//   }

//   const categorizedSkills = categorizeSkills(skills)
//   const useCategories = skills.length > 8

//   return (
//     <div>
//       <SectionHeader title="Technical Skills" />
//       <div className="mt-1">
//         {useCategories && categorizedSkills.length > 1 ? (
//           <div className="space-y-0.5">
//             {categorizedSkills.map(([category, categorySkills]) => (
//               <div key={category} className="flex text-[10px]">
//                 <span className="min-w-[80px] font-semibold text-gray-700">
//                   {category}:
//                 </span>
//                 <span className="text-gray-700">
//                   {categorySkills.join(", ")}
//                 </span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-[10px] text-gray-700">{skills.join(" • ")}</p>
//         )}
//       </div>
//     </div>
//   )
// }

// const CertificatesSection = ({ resumeData }: ResumeSectionProps) => {
//   const { certificates } = resumeData

//   const certificatesNotEmpty = certificates?.filter(
//     (cert) => cert.name || cert.issuer,
//   )

//   if (!certificatesNotEmpty?.length) return null

//   return (
//     <div>
//       <SectionHeader title="Certifications" />
//       <div className="mt-1 space-y-0.5">
//         {certificatesNotEmpty.map((cert, index) => (
//           <div
//             key={`${cert.name}-${index}`}
//             className="flex items-baseline justify-between text-[10px]"
//           >
//             <div>
//               <span className="font-medium text-gray-900">{cert.name}</span>
//               {cert.issuer && (
//                 <span className="text-gray-600"> • {cert.issuer}</span>
//               )}
//             </div>
//             {cert.issueDate && (
//               <span className="text-gray-600">
//                 {formatDate(cert.issueDate, "MMM yyyy")}
//               </span>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// const CoursesSection = ({ resumeData }: ResumeSectionProps) => {
//   const { courses } = resumeData

//   const coursesNotEmpty = courses?.filter(
//     (course) => course.name || course.institution,
//   )

//   if (!coursesNotEmpty?.length) return null

//   return (
//     <div>
//       <SectionHeader title="Relevant Coursework" />
//       <div className="mt-1">
//         <p className="text-[10px] text-gray-700">
//           {coursesNotEmpty.map((course) => course.name).join(" • ")}
//         </p>
//       </div>
//     </div>
//   )
// }

// const SectionHeader = ({ title }: { title: string }) => (
//   <h2 className="border-b border-gray-300 pb-0.5 text-[11px] font-bold tracking-wider text-gray-900 uppercase">
//     {title}
//   </h2>
// )

// export default ResumePreview

"use client"

import { useDimensions } from "@/hooks/useDimensions"
import { cn } from "@/lib/utils"
import { ResumeValues } from "@/lib/validation"
import React, { useRef } from "react"
import { formatDate } from "date-fns"

interface ResumePreviewProps {
  resumeData: ResumeValues
  contentRef?: React.Ref<HTMLDivElement>
  className?: string
}

const ResumePreview = ({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>)

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full border border-gray-200 bg-white text-black shadow-lg",
        className,
      )}
      style={{
        fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
      }}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 px-12 py-10", !width && "invisible")}
        style={{ zoom: width ? (1 / 794) * width : 1 }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <ProjectsSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
        <CertificatesSection resumeData={resumeData} />
        <CoursesSection resumeData={resumeData} />
      </div>
    </div>
  )
}

interface ResumeSectionProps {
  resumeData: ResumeValues
}

const PersonalInfoHeader = ({ resumeData }: ResumeSectionProps) => {
  const { firstName, lastName, jobTitle, email, phone, country, city } =
    resumeData

  return (
    <div className="space-y-2 pb-2 text-center">
      <h1 className="text-[32px] font-normal tracking-[0.2em] text-gray-900">
        {(firstName || "").toUpperCase()} {(lastName || "").toUpperCase()}
      </h1>

      <div className="flex items-center justify-center gap-4 text-[13px] text-gray-700">
        {email && <span>{email}</span>}
        {email && phone && <span className="text-gray-400">|</span>}
        {phone && <span>{phone}</span>}
        {(email || phone) && (city || country) && (
          <span className="text-gray-400">|</span>
        )}
        {(city || country) && (
          <span>
            {city && <span>{city}</span>}
            {city && country && <span>, </span>}
            {country && <span>{country}</span>}
          </span>
        )}
      </div>

      {jobTitle && (
        <p className="pt-1 text-[14px] font-light tracking-wide text-gray-700">
          {jobTitle}
        </p>
      )}
    </div>
  )
}

const SummarySection = ({ resumeData }: ResumeSectionProps) => {
  const { summary } = resumeData

  if (!summary?.trim()) return null

  return (
    <div className="space-y-3">
      <SectionHeader title="SUMMARY" />
      <p className="text-justify text-[13px] leading-relaxed text-gray-700">
        {summary}
      </p>
    </div>
  )
}

const WorkExperienceSection = ({ resumeData }: ResumeSectionProps) => {
  const { workExperiences } = resumeData

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => exp.position || exp.company || exp.description,
  )

  if (!workExperiencesNotEmpty?.length) return null

  return (
    <div className="space-y-3">
      <SectionHeader title="EXPERIENCE" />
      <div className="space-y-4">
        {workExperiencesNotEmpty.map((exp, index) => (
          <div
            key={`${exp.company}-${exp.position}-${index}`}
            className="space-y-2"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[14px] font-semibold text-gray-900">
                  {exp.position}
                </h3>
                {exp.company && (
                  <p className="text-[13px] text-gray-700">{exp.company}</p>
                )}
              </div>
              <div className="text-[12px] whitespace-nowrap text-gray-600">
                {exp.startDate && formatDate(exp.startDate, "MMM yyyy")}
                {exp.startDate && " – "}
                {exp.endDate
                  ? formatDate(exp.endDate, "MMM yyyy")
                  : exp.startDate
                    ? "Present"
                    : ""}
              </div>
            </div>
            {exp.description && (
              <div className="pl-0">
                {exp.description.includes("\n") ||
                exp.description.includes("•") ? (
                  <ul className="space-y-1">
                    {exp.description
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line, idx) => (
                        <li
                          key={idx}
                          className="flex text-[12px] leading-relaxed text-gray-700"
                        >
                          <span className="mr-2 text-gray-500">•</span>
                          <span className="flex-1">
                            {line.replace(/^[•\-*]\s*/, "").trim()}
                          </span>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-[12px] leading-relaxed text-gray-700">
                    {exp.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const ProjectsSection = ({ resumeData }: ResumeSectionProps) => {
  const { projects } = resumeData

  const projectsNotEmpty = projects?.filter(
    (proj) => proj.name || proj.role || proj.description,
  )

  if (!projectsNotEmpty?.length) return null

  return (
    <div className="space-y-3">
      <SectionHeader title="PROJECTS" />
      <div className="space-y-4">
        {projectsNotEmpty.map((proj, index) => (
          <div key={`${proj.name}-${index}`} className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-gray-900">
                  {proj.name}
                </h3>
                {proj.role && (
                  <p className="text-[13px] text-gray-700">{proj.role}</p>
                )}
                {proj.link && (
                  <p className="mt-0.5 text-[11px] text-blue-600">
                    {proj.link}
                  </p>
                )}
              </div>
              <div className="text-[12px] whitespace-nowrap text-gray-600">
                {proj.startDate && formatDate(proj.startDate, "MMM yyyy")}
                {proj.startDate && " – "}
                {proj.endDate
                  ? formatDate(proj.endDate, "MMM yyyy")
                  : proj.startDate
                    ? "Present"
                    : ""}
              </div>
            </div>
            {proj.description && (
              <div className="pl-0">
                {proj.description.includes("\n") ||
                proj.description.includes("•") ? (
                  <ul className="space-y-1">
                    {proj.description
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line, idx) => (
                        <li
                          key={idx}
                          className="flex text-[12px] leading-relaxed text-gray-700"
                        >
                          <span className="mr-2 text-gray-500">•</span>
                          <span className="flex-1">
                            {line.replace(/^[•\-*]\s*/, "").trim()}
                          </span>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-[12px] leading-relaxed text-gray-700">
                    {proj.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const EducationSection = ({ resumeData }: ResumeSectionProps) => {
  const { educations } = resumeData

  const educationsNotEmpty = educations?.filter(
    (edu) => edu.degree || edu.school || edu.score,
  )

  if (!educationsNotEmpty?.length) return null

  return (
    <div className="space-y-3">
      <SectionHeader title="EDUCATION" />
      <div className="space-y-3">
        {educationsNotEmpty.map((edu, index) => (
          <div
            key={`${edu.school}-${edu.degree}-${index}`}
            className="space-y-1"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[14px] font-semibold text-gray-900">
                  {edu.school}
                </h3>
                <p className="text-[13px] text-gray-700">{edu.degree}</p>
                {edu.score && (
                  <p className="mt-0.5 text-[12px] text-gray-600">
                    GPA: {edu.score}
                  </p>
                )}
              </div>
              <div className="text-[12px] whitespace-nowrap text-gray-600">
                {edu.startDate && formatDate(edu.startDate, "MMM yyyy")}
                {edu.startDate && " – "}
                {edu.endDate
                  ? formatDate(edu.endDate, "MMM yyyy")
                  : edu.startDate
                    ? "Present"
                    : ""}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const SkillsSection = ({ resumeData }: ResumeSectionProps) => {
  const { skills } = resumeData

  if (!skills?.length) return null

  // Group skills into categories
  const groupSkills = (skills: string[]) => {
    const programmingLangs = [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C++",
      "C#",
      "Go",
      "Rust",
      "Ruby",
      "PHP",
      "Swift",
      "Kotlin",
      "Scala",
      "R",
      "MATLAB",
      "SQL",
    ]
    const frameworks = [
      "React",
      "Angular",
      "Vue",
      "Next.js",
      "Node.js",
      "Express",
      "Django",
      "Flask",
      "Spring",
      "Laravel",
      ".NET",
      "Rails",
      "FastAPI",
    ]
    const tools = [
      "Git",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "AWS",
      "Azure",
      "GCP",
      "Terraform",
      "Ansible",
      "Linux",
      "Jira",
      "Figma",
    ]

    const categorized: { [key: string]: string[] } = {
      Technical: [],
      "Tools & Technologies": [],
      Other: [],
    }

    skills.forEach((skill) => {
      const skillLower = skill.toLowerCase()
      if (
        programmingLangs.some((lang) => skillLower.includes(lang.toLowerCase()))
      ) {
        categorized["Technical"].push(skill)
      } else if (
        frameworks.some((fw) => skillLower.includes(fw.toLowerCase())) ||
        tools.some((tool) => skillLower.includes(tool.toLowerCase()))
      ) {
        categorized["Tools & Technologies"].push(skill)
      } else {
        categorized["Other"].push(skill)
      }
    })

    return Object.entries(categorized).filter(
      ([_, skills]) => skills.length > 0,
    )
  }

  const groupedSkills = groupSkills(skills)
  const useGrouping = skills.length > 6

  return (
    <div className="space-y-3">
      <SectionHeader title="SKILLS" />
      {useGrouping && groupedSkills.length > 1 ? (
        <div className="space-y-2">
          {groupedSkills.map(([category, categorySkills]) => (
            <div key={category} className="text-[12px]">
              <span className="font-semibold text-gray-800">{category}: </span>
              <span className="text-gray-700">{categorySkills.join(", ")}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[12px] text-gray-700">{skills.join(" • ")}</p>
      )}
    </div>
  )
}

const CertificatesSection = ({ resumeData }: ResumeSectionProps) => {
  const { certificates } = resumeData

  const certificatesNotEmpty = certificates?.filter(
    (cert) => cert.name || cert.issuer,
  )

  if (!certificatesNotEmpty?.length) return null

  return (
    <div className="space-y-3">
      <SectionHeader title="CERTIFICATIONS" />
      <div className="space-y-2">
        {certificatesNotEmpty.map((cert, index) => (
          <div
            key={`${cert.name}-${index}`}
            className="flex items-start justify-between gap-4"
          >
            <div>
              <span className="text-[13px] font-semibold text-gray-900">
                {cert.name}
              </span>
              {cert.issuer && (
                <span className="ml-2 text-[12px] text-gray-700">
                  — {cert.issuer}
                </span>
              )}
            </div>
            <div className="text-[12px] whitespace-nowrap text-gray-600">
              {cert.issueDate && formatDate(cert.issueDate, "MMM yyyy")}
              {cert.expiryDate && (
                <>
                  {" – "}
                  {formatDate(cert.expiryDate, "MMM yyyy")}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CoursesSection = ({ resumeData }: ResumeSectionProps) => {
  const { courses } = resumeData

  const coursesNotEmpty = courses?.filter(
    (course) => course.name || course.institution,
  )

  if (!coursesNotEmpty?.length) return null

  return (
    <div className="space-y-3">
      <SectionHeader title="COURSES" />
      <div className="space-y-2">
        {coursesNotEmpty.map((course, index) => (
          <div
            key={`${course.name}-${index}`}
            className="flex items-start justify-between gap-4"
          >
            <div className="flex-1">
              <span className="text-[13px] font-semibold text-gray-900">
                {course.name}
              </span>
              {course.institution && (
                <span className="ml-2 text-[12px] text-gray-700">
                  — {course.institution}
                </span>
              )}
              {course.description && (
                <p className="mt-1 text-[12px] text-gray-600">
                  {course.description}
                </p>
              )}
            </div>
            <div className="text-[12px] whitespace-nowrap text-gray-600">
              {course.completionDate &&
                formatDate(course.completionDate, "MMM yyyy")}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Elegant section header without heavy lines
const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase">
    {title}
  </h2>
)

export default ResumePreview
