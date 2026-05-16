// ── Field validators

export const validators = {
  required: (value: string) =>
    value.trim().length === 0 ? 'This field is required' : undefined,

  email: (value: string) => {
    if (!value.trim()) return 'Email is required';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? undefined : 'Enter a valid email address';
  },

  password: (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Include at least one uppercase letter';
    if (!/[0-9]/.test(value)) return 'Include at least one number';
    return undefined;
  },

  name: (value: string) => {
    if (!value.trim()) return 'Name is required';
    if (value.trim().length < 2) return 'Name must be at least 2 characters';
    if (value.trim().length > 60) return 'Name is too long';
    return undefined;
  },

  confirmPassword: (password: string) => (confirm: string) => {
    if (!confirm) return 'Please confirm your password';
    return confirm === password ? undefined : 'Passwords do not match';
  },
};

// ── Form-level validators

export interface LoginForm { email: string; password: string; }
export interface RegisterForm { name: string; email: string; password: string; confirmPassword: string; }
export type FormErrors<T> = Partial<Record<keyof T, string>>;

export function validateLogin(form: LoginForm): FormErrors<LoginForm> {
  return {
    email: validators.email(form.email),
    password: form.password ? undefined : 'Password is required',
  };
}

export function validateRegister(form: RegisterForm): FormErrors<RegisterForm> {
  return {
    name: validators.name(form.name),
    email: validators.email(form.email),
    password: validators.password(form.password),
    confirmPassword: validators.confirmPassword(form.password)(form.confirmPassword),
  };
}

export function hasErrors<T>(errors: FormErrors<T>): boolean {
  return Object.values(errors).some(Boolean);
}

// ── File validation

export const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export function validateResumeFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type as typeof ALLOWED_TYPES[number])) {
    return 'Only PDF and DOCX files are supported';
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File too large — max size is ${MAX_FILE_SIZE / 1024 / 1024} MB`;
  }
  return null;
}

// ── Sanitize 

export function sanitize(str: string): string {
  return str.replace(/[<>"'`]/g, '');
}