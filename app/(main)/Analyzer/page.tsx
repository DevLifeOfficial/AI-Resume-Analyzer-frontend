import React from 'react'
import ResumeAnalyzer from './Components/ResumeAnalyzer'

export default function ResumeAnalyzerPage() {
  return (
    <div>
      <h1 className='text-3xl font-bold text-white'>Resume Analyzer</h1>
      <p className='text-white/70 mt-4'>Upload your resume to get instant feedback and suggestions for improvement.</p>
      <ResumeAnalyzer />
    </div>
  )
}
