import { HTMLAttributes } from "react";

export type FormMode =
  | "form_submit:action"
  | "form_submit:ajax"
  | "dynamic:ajax";
export type ResponseStatus = 200 | 400 | 401 | 403 | 422 | 500;

export const FormModes: { label: string; value: FormMode }[] = [
  { label: "Submit [FormAction]", value: "form_submit:action" },
  { label: "Submit [Ajax]", value: "form_submit:ajax" },
  { label: "Dynamic [Ajax]", value: "dynamic:ajax" },
];

export const ResponseStatuses: { label: string; value: ResponseStatus }[] = [
  { label: "OK", value: 200 },
  { label: "Bad Request", value: 400 },
  { label: "Unauthorized", value: 401 },
  { label: "Forbidden", value: 403 },
  { label: "Unprocessable entity", value: 422 },
  { label: "Internal server error", value: 500 },
];

export type FormFieldDefinition = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  autocomplete?: string;
  required?: boolean;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
};

export type FormDefinition = {
  name: string;
  description: string;
  submitText: string;
  errorText: string;
  okText?: string;
  fields: FormFieldDefinition[];
  next?: FormDefinition;
};

const UsernameField: FormFieldDefinition = {
  id: "username",
  label: "Username",
  autocomplete: "username",
  required: true,
};

const EmailField: FormFieldDefinition = {
  id: "email",
  type: "email",
  label: "Email",
  autocomplete: "email",
  required: true,
};

const CurrentPasswordField: FormFieldDefinition = {
  id: "password",
  type: "password",
  label: "Password",
  autocomplete: "current-password",
  required: true,
};

const NewPasswordField: FormFieldDefinition = {
  id: "password",
  type: "password",
  label: "Password",
  autocomplete: "new-password",
  required: true,
};

const ConfirmPasswordField: FormFieldDefinition = {
  id: "password-2",
  type: "password",
  label: "Confirm password",
  autocomplete: "new-password",
  required: true,
};

const OTPField: FormFieldDefinition = {
  id: "totp",
  label: "OTP Code",
  type: "text",
  autocomplete: "one-time-code",
  required: true,
};

export const FormDefinitions: FormDefinition[] = [
  {
    name: "👤 Login username",
    description: "Login form with required username and password fields.",
    fields: [UsernameField, CurrentPasswordField],
    submitText: "Login",
    errorText: "Filth alert: failed to login",
    okText: "Bring the filth",
  },
  {
    name: "📧 Login email",
    description: "Login form with required email and password fields.",
    fields: [EmailField, CurrentPasswordField],
    submitText: "Login",
    errorText: "Something went filthy..",
    okText: "Looks like you got in",
  },
  {
    name: "🚦 Login steps (1/3)",
    description:
      "Login form with email, password and OTP validation in 3 steps.",
    fields: [EmailField],
    submitText: "Continue",
    errorText: "Invalid username",
    next: {
      name: "🚦 Login steps (2/3)",
      description: "Please enter your password to continue",
      fields: [CurrentPasswordField],
      submitText: "Log in",
      errorText: "Filthy password is incorrect",
      next: {
        name: "🚦 Login steps (3/3)",
        description: "Confirm with your 2FA-linked device",
        fields: [OTPField],
        submitText: "Continue",
        errorText: "Filthy OTP code",
        okText: "Welcome back old chap !",
      },
    },
  },
  {
    name: "🔑 OTP Code",
    description:
      "One time password field form to test 2FA auto-filling capabilities",
    fields: [OTPField],
    submitText: "Continue",
    errorText: "Filthy OTP code",
    okText: "Filthy OTP code validated",
  },
  {
    name: "📝 Register email",
    description: "Register form with email and password fields.",
    fields: [EmailField, NewPasswordField, ConfirmPasswordField],
    submitText: "Register",
    errorText: "Could not register your filthy account",
    okText: "You are now in the filthy club",
  },
  {
    name: "📋 Register username",
    description: "Register form with username and password fields.",
    fields: [UsernameField, NewPasswordField, ConfirmPasswordField],
    submitText: "Sign up",
    errorText: "A filthy error occured",
    okText: "Welcome to the filth",
  },
  {
    name: "🧠 Register email/user",
    description: "Register form with both username, email and password fields.",
    fields: [UsernameField, EmailField, NewPasswordField, ConfirmPasswordField],
    submitText: "Sign up",
    errorText: "A filthy error occured",
    okText: "Congratulations, I hope filthy auto-save triggered",
  },
];
