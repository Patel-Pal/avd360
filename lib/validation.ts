import { z } from "zod";

/** Shared Zod schemas for client + server validation. */

export const serviceOptions = [
  "Consulting",
  "Business Excellence",
  "Quality Management",
  "ISO Management",
  "Digital Solution",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long")
    .optional()
    .or(z.literal("")),
  service: z.enum(serviceOptions, {
    errorMap: () => ({ message: "Please select a service" }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (min 10 characters)")
    .max(2000, "Message is too long"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
