'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phone: '' })
  const [experiences, setExperiences] = useState([{ company: '', position: '', duration: '', description: '' }])
  const [education, setEducation] = useState([{ school: '', degree: '', year: '' }])
  const [skills, setSkills] = useState([''])
  const resumeRef = useRef(null)

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value })
  }

  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newExperiences = [...experiences]
    newExperiences[index] = { ...newExperiences[index], [e.target.name]: e.target.value }
    setExperiences(newExperiences)
  }

  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newEducation = [...education]
    newEducation[index] = { ...newEducation[index], [e.target.name]: e.target.value }
    setEducation(newEducation)
  }

  const handleSkillChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newSkills = [...skills]
    newSkills[index] = e.target.value
    setSkills(newSkills)
  }

  const addExperience = () => {
    setExperiences([...experiences, { company: '', position: '', duration: '', description: '' }])
  }

  const addEducation = () => {
    setEducation([...education, { school: '', degree: '', year: '' }])
  }

  const addSkill = () => {
    setSkills([...skills, ''])
  }

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const downloadPDF = async () => {
    if (resumeRef.current) {
      const canvas = await html2canvas(resumeRef.current)
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('resume.pdf')
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-8 bg-blue-600 text-white">
          <h1 className="text-3xl font-bold mb-2">Resume Builder</h1>
          <p>Create your professional resume with ease</p>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Personal Information</h2>
              <div className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={personalInfo.name}
                  onChange={handlePersonalInfoChange}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                />
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Work Experience</h2>
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-4 mb-4 p-4 border border-blue-200 rounded-lg"
                >
                  <Input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, e)}
                  />
                  <Input
                    type="text"
                    name="position"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(index, e)}
                  />
                  <Input
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => handleExperienceChange(index, e)}
                  />
                  <Textarea
                    name="description"
                    placeholder="Job Description"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, e)}
                  />
                  <Button variant="destructive" size="sm" onClick={() => removeExperience(index)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </motion.div>
              ))}
              <Button onClick={addExperience} className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Education</h2>
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-4 mb-4 p-4 border border-blue-200 rounded-lg"
                >
                  <Input
                    type="text"
                    name="school"
                    placeholder="School"
                    value={edu.school}
                    onChange={(e) => handleEducationChange(index, e)}
                  />
                  <Input
                    type="text"
                    name="degree"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, e)}
                  />
                  <Input
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => handleEducationChange(index, e)}
                  />
                  <Button variant="destructive" size="sm" onClick={() => removeEducation(index)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </motion.div>
              ))}
              <Button onClick={addEducation} className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Skills</h2>
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-2 mb-2"
                >
                  <Input
                    type="text"
                    placeholder="Skill"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                  <Button variant="destructive" size="sm" onClick={() => removeSkill(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
              <Button onClick={addSkill} className="mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </section>
          </div>
          <div className="space-y-6">
            <div ref={resumeRef} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Resume Preview</h2>
              <div className="space-y-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <h3 className="text-xl font-semibold">{personalInfo.name}</h3>
                  <p>{personalInfo.email} | {personalInfo.phone}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <h3 className="text-lg font-semibold text-blue-600">Work Experience</h3>
                  {experiences.map((exp, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-semibold">{exp.position} at {exp.company}</p>
                      <p className="text-sm">{exp.duration}</p>
                      <p className="text-sm">{exp.description}</p>
                    </div>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                  <h3 className="text-lg font-semibold text-blue-600">Education</h3>
                  {education.map((edu, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-semibold">{edu.degree}</p>
                      <p className="text-sm">{edu.school}, {edu.year}</p>
                    </div>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                  <h3 className="text-lg font-semibold text-blue-600">Skills</h3>
                  <p>{skills.join(', ')}</p>
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button onClick={downloadPDF} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Resume as PDF
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}