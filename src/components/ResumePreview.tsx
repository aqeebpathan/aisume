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
        fontFamily: "Arial, sans-serif",
      }}
      ref={containerRef}
    >
      <div
        className={cn("space-y-4 p-8", !width && "invisible")}
        style={{ zoom: width ? (1 / 794) * width : 1 }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
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
    <div className="space-y-2 pb-4 text-center">
      <h1 className="text-2xl font-bold text-black">
        {firstName || ""} {lastName || ""}
      </h1>
      {jobTitle && (
        <p className="text-lg font-medium text-gray-800">{jobTitle}</p>
      )}
      <div className="space-y-1 text-sm text-gray-700">
        {(city || country) && (
          <p>
            {city && <span>{city}</span>}
            {city && country && <span>, </span>}
            {country && <span>{country}</span>}
          </p>
        )}
        <div className="flex items-center justify-center gap-4">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
        </div>
      </div>
      <hr className="mt-4 border-gray-400" />
    </div>
  )
}

const SummarySection = ({ resumeData }: ResumeSectionProps) => {
  const { summary } = resumeData

  if (!summary?.trim()) return null

  return (
    <div className="space-y-2">
      <SectionHeader title="PROFESSIONAL SUMMARY" />
      <p className="text-sm leading-relaxed text-gray-800">{summary}</p>
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
      <SectionHeader title="WORK EXPERIENCE" />
      <div className="space-y-4">
        {workExperiencesNotEmpty.map((exp, index) => (
          <div
            key={`${exp.company}-${exp.position}-${index}`}
            className="space-y-1"
          >
            <div className="flex items-start justify-between">
              <div>
                {exp.position && (
                  <h3 className="text-base font-bold text-black">
                    {exp.position}
                  </h3>
                )}
                {exp.company && (
                  <p className="text-sm font-medium text-gray-800">
                    {exp.company}
                  </p>
                )}
              </div>
              <div className="text-right text-sm text-gray-600">
                {exp.startDate && formatDate(exp.startDate, "MMM yyyy")}
                {exp.startDate && " - "}
                {exp.endDate ? formatDate(exp.endDate, "MMM yyyy") : "Present"}
              </div>
            </div>
            {exp.description && (
              <div className="mt-2 text-sm leading-relaxed whitespace-pre-line text-gray-800">
                {exp.description}
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
            <div className="flex items-start justify-between">
              <div>
                {edu.degree && (
                  <h3 className="text-base font-bold text-black">
                    {edu.degree}
                  </h3>
                )}
                {edu.school && (
                  <p className="text-sm font-medium text-gray-800">
                    {edu.school}
                  </p>
                )}
              </div>
              <div className="text-right text-sm text-gray-600">
                {edu.startDate && formatDate(edu.startDate, "MMM yyyy")}
                {edu.startDate && " - "}
                {edu.endDate ? formatDate(edu.endDate, "MMM yyyy") : "Present"}
              </div>
            </div>
            {edu.score && (
              <p className="text-sm text-gray-800">
                <span className="font-medium">GPA/Score: </span>
                {edu.score}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const SkillsSection = ({ resumeData }: ResumeSectionProps) => {
  const { skills } = resumeData

  if (!skills?.length) return null

  return (
    <div className="break-inside-avoid space-y-2">
      <SectionHeader title="SKILLS" />
      <p className="text-sm leading-relaxed text-gray-800">
        {skills.join(" • ")}
      </p>
    </div>
  )
}

// Clean, ATS-friendly section header
const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-2 border-b border-gray-400 pb-1">
    <h2 className="text-base font-bold tracking-wide text-black">{title}</h2>
  </div>
)

export default ResumePreview
