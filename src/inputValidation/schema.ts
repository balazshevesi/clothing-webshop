import { string, minLength, email } from "valibot";

const EmailSchema = string("Your email must be a string", [
  minLength(1, "Please enter your email"),
  email("The email address is badly formatted"),
]);
export { EmailSchema };

const PhoneSchema = string("Your email must be a string", [
  minLength(1, "Please enter your phone number"),
]);
export { PhoneSchema };

const PasswordSchema = string("Your password must be a string", [
  minLength(1, "Please enter your password"),
  minLength(8, "Your password must have 8 characters or more"),
]);
export { PasswordSchema };

const FirstNameSchema = string("Your password must be a string", [
  minLength(2, "Please enter your first name"),
]);
export { FirstNameSchema };

const LastNameSchema = string("Your password must be a string", [
  minLength(2, "Please enter your last name"),
]);
export { LastNameSchema };
