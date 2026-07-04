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

export interface BookDemoFormValues {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  preferredDate: string;
  notes: string;
}

export const initialValues: BookDemoFormValues = {
  name: "",
  email: "",
  company: "",
  teamSize: "",
  preferredDate: "",
  notes: "",
};

// Book Demo Form
export function Bookvalidate(values: BookDemoFormValues) {
  const errors: Partial<Record<keyof BookDemoFormValues, string>> = {};

  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.company.trim()) errors.company = "Company name is required.";
  if (!values.preferredDate) errors.preferredDate = "Pick a preferred date.";

  return errors;
}


// Payment Form

export interface CardFormErrors {
  name?: string;
  email?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  zip?: string;
}

export function CardValidate(values: {
  name: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  zip: string;
}): CardFormErrors {
  const errors: CardFormErrors = {};
  if (!values.name.trim()) errors.name = "Name on card is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required for your receipt.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  const digits = values.cardNumber.replace(/\s/g, "");
  if (digits.length !== 16) errors.cardNumber = "Card number must be 16 digits.";
  if (values.expiry.length !== 5) {
    errors.expiry = "Use MM/YY format.";
  } else {
    const mm = Number(values.expiry.split("/")[0]);
    if (!mm || mm < 1 || mm > 12) errors.expiry = "Invalid month.";
  }
  if (values.cvv.length < 3) errors.cvv = "CVV must be 3–4 digits.";
  if (!values.zip.trim()) errors.zip = "Postal code is required.";
  return errors;
}