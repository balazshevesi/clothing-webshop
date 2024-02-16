import { string, minLength, email, number } from "valibot";

export const EmailSchema = string("Your email must be a string", [
  minLength(1, "Please enter your email"),
  email("The email address is badly formatted"),
]);

export const PhoneSchema = string("Your email must be a string", [
  minLength(1, "Please enter your phone number"),
]);

export const PasswordSchema = string("Your password must be a string", [
  minLength(1, "Please enter your password"),
  minLength(8, "Your password must have 8 characters or more"),
]);

export const FirstNameSchema = string("Your password must be a string", [
  minLength(2, "Please enter your first name"),
]);

export const LastNameSchema = string("Your password must be a string", [
  minLength(2, "Please enter your last name"),
]);

export const GenericInputSchema = string("Your input must be an string", [
  minLength(2, "Input needs to be at least two characters"),
]);

export const SizeInputSchema = string("Your input must be an string", [
  minLength(1, "Input needs to be at least two characters"),
]);

export const GenericNumberInputSchema = number("Your input must be an number");
