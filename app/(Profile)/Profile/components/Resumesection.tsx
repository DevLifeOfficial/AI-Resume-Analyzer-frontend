"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileText, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResumeSection() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    setFile(f);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-display font-semibold text-lg">Resume</h2>
        <p className="text-white/40 text-sm mt-1">
          Upload your resume so we can tailor your profile and match it against job descriptions.
        </p>
      </div>

      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          className={`flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-14 text-center cursor-pointer transition-colors ${
            dragOver ? "border-[var(--teal)] bg-[rgba(5,200,200,0.06)]" : "border-white/10 hover:border-white/20"
          }`}
        >
          <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[rgba(5,200,200,0.1)] text-[var(--teal)]">
            <UploadCloud className="w-5 h-5" />
          </span>
          <div>
            <p className="text-sm text-white/70 font-medium">Drop your resume here, or click to browse</p>
            <p className="text-xs text-white/30 mt-1">PDF or DOCX, up to 10MB</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      ) : (
        <div className="rounded-3xl border border-white/5 bg-[var(--navy-light)] p-5 flex items-center gap-4">
          <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[rgba(5,200,200,0.1)] text-[var(--teal)] shrink-0">
            <FileText className="w-4 h-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-white font-medium truncate">{file.name}</p>
            <p className="text-xs text-white/40 mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[var(--teal)]" /> Ready to analyze &middot;{" "}
              {(file.size / 1024).toFixed(0)} KB
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-white/40 hover:text-white"
            aria-label="Remove resume"
            onClick={() => setFile(null)}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {file && (
        <div className="flex justify-end">
          <Button className="gap-1.5">Save resume</Button>
        </div>
      )}
    </div>
  );
}