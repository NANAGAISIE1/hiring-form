"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subYears, isBefore } from "date-fns";

import validator from "validator";

const ACCEPTED_MIME_TYPES = [".jpeg", ".png", ".webp"];

const MAX_FILE_SIZE = 500000; // 5MB

const OFFER_TYPES = ["Full Time", "Part Time"];

export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(72, { message: "Name must be at most 72 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(72, { message: "Name must be at most 72 characters long" }),
  dob: z.date().refine(
    (dateOfBirth) => {
      // Calculate the date 18 years ago from the current date
      const eighteenYearsAgo = subYears(new Date(), 18);
      // Check if the date of birth is before the calculated date (i.e., 18 years and above)
      return isBefore(dateOfBirth, eighteenYearsAgo);
    },
    {
      message: "You must be 18 years or older to apply.",
    }
  ),
  phoneNumber: z.string().refine((value) => validator.isMobilePhone(value), {
    message: "Invalid phone number",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  residentialAddress: z
    .string()
    .nonempty({ message: "Residential address is required" })
    .max(200, { message: "Residential address is too long" })
    .regex(/^[a-zA-Z0-9\s,.-/#]*$/, {
      message: "Invalid characters in residential address",
    })
    .min(5, { message: "Residential address is too short" }),
  state: z.string().min(3),
  city: z.string().min(2),
  zipCode: z.string().length(5, "Enter a valid zip code"),
  typeOfWork: z.enum(OFFER_TYPES, {
    message: "Please select a type of work.",
  }),
  frontIdUpload: z.any(),
  backIdUpload: z.any(),
  // frontIdUpload: z.custom((value) => {
  //   if (!value) {
  //     return false; // File is not selected
  //   }

  //   // Validate the file properties
  //   const isValidType = ACCEPTED_MIME_TYPES.includes(value.value);
  //   const isValidSize = value?.size <= MAX_FILE_SIZE;

  //   return isValidType && isValidSize;
  // }),
  // backIdUpload: z.custom((value) => {
  //   if (!value) {
  //     return false; // File is not selected
  //   }

  //   // Validate the file properties
  //   const isValidType = ACCEPTED_MIME_TYPES.includes(value.value);
  //   const isValidSize = value?.size <= MAX_FILE_SIZE;

  //   return isValidType && isValidSize;
  // }),
  reasonForApplying: z.string().min(100).max(250),
});

export function useFormWithValidation(defaultValues = {}) {
  return useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
}
