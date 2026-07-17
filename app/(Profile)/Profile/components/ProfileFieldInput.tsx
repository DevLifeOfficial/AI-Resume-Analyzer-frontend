"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ProfileFieldConfig } from "@/lib/config/profile.config";
import { TagInput } from "./TagInput";
;

interface ProfileFieldInputProps {
  field: ProfileFieldConfig;
  value: any;
  onChange: (name: string, value: any) => void;
  hidden?: boolean;
}

export function ProfileFieldInput({ field, value, onChange, hidden }: ProfileFieldInputProps) {
  if (hidden) return null;

  const id = `field-${field.name}`;

  if (field.type === "checkbox") {
    return (
      <div className="flex items-center gap-2 sm:col-span-2">
        <Checkbox
          id={id}
          checked={!!value}
          onCheckedChange={(checked) => onChange(field.name, !!checked)}
        />
        <Label htmlFor={id} className="font-normal cursor-pointer">
          {field.label}
        </Label>
      </div>
    );
  }

  if (field.type === "tags") {
    return (
      <div className="space-y-1.5 sm:col-span-2">
        <Label>{field.label}</Label>
        <TagInput
          values={value ?? []}
          onChange={(v) => onChange(field.name, v)}
          placeholder={field.placeholder}
        />
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor={id}>{field.label}</Label>
        <Textarea
          id={id}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
          rows={4}
        />
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {field.label}
        {field.required && <span className="text-destructive"> *</span>}
      </Label>
      <Input
        id={id}
        type={field.type === "date" ? "date" : field.type === "url" ? "url" : "text"}
        value={value ?? ""}
        placeholder={field.placeholder}
        onChange={(e) => onChange(field.name, e.target.value)}
      />
    </div>
  );
}