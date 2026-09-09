"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, serviceOptions, type ContactInput } from "@/lib/validation";
import { IconArrowRight } from "@/components/icons";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: undefined,
      message: "",
    },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }
      setStatus({
        state: "success",
        message: "Thank you! We've received your enquiry and will be in touch shortly.",
      });
      reset();
    } catch (err) {
      setStatus({
        state: "error",
        message:
          err instanceof Error
            ? err.message
            : "We couldn't send your message. Please try again.",
      });
    }
  };

  const fieldClass =
    "w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-muted/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";
  const labelClass = "mb-1.5 block text-sm font-medium text-navy";
  const errorClass = "mt-1 text-xs text-red-600";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-gold">*</span>
          </label>
          <input id="name" type="text" className={fieldClass} placeholder="Your full name" {...register("name")} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-gold">*</span>
          </label>
          <input id="email" type="email" className={fieldClass} placeholder="you@company.com" {...register("email")} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-gold">*</span>
          </label>
          <input id="phone" type="tel" className={fieldClass} placeholder="+91 …" {...register("phone")} />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input id="company" type="text" className={fieldClass} placeholder="Company name" {...register("company")} />
          {errors.company && <p className={errorClass}>{errors.company.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>
          Service interested in <span className="text-gold">*</span>
        </label>
        <select id="service" className={fieldClass} defaultValue="" {...register("service")}>
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.service && <p className={errorClass}>{errors.service.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={fieldClass}
          placeholder="Tell us about your goals or challenges…"
          {...register("message")}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {status.state === "success" && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {status.message}
        </div>
      )}
      {status.state === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={status.state === "submitting"}
        className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status.state === "submitting" ? "Sending…" : "Send Enquiry"}
        {status.state !== "submitting" && <IconArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
