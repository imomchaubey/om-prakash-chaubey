"use client";

import React, { useRef, useState } from "react";
import { Send, AlertCircle, CheckCircle2, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaKaggle } from "react-icons/fa6";
import { profileData, type SocialPlatform } from "@/data/profile";
import { EmailDisplay } from "@/components/ui/EmailDisplay";
import { isTodo } from "@/utils/todo";

function renderSocialIcon(platform: SocialPlatform): React.JSX.Element {
  switch (platform) {
    case "GitHub":
      return <FaGithub className="h-4 w-4" aria-hidden="true" />;
    case "LinkedIn":
      return <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />;
    case "Kaggle":
      return <FaKaggle className="h-4 w-4" aria-hidden="true" />;
  }
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactProps {
  readonly formspreeIdOverride?: string;
}

export function Contact({
  formspreeIdOverride,
}: ContactProps = {}): React.JSX.Element {
  const configuredFormspreeId = (
    formspreeIdOverride ??
    process.env.NEXT_PUBLIC_FORMSPREE_ID ??
    ""
  ).trim();
  const isFormEnabled =
    Boolean(configuredFormspreeId) && !isTodo(configuredFormspreeId);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = "Please enter your name.";
    }
    if (!email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!message.trim()) {
      nextErrors.message = "Please enter a message.";
    } else if (message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters long.";
    }
    return nextErrors;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!isFormEnabled) {
      return;
    }

    // Honeypot spam guard
    if (honeypot.trim() !== "") {
      setStatus("success");
      setStatusMessage("Thank you! Your message has been sent.");
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      setStatusMessage("Please fix the highlighted errors in the form.");
      if (validationErrors.name) {
        nameInputRef.current?.focus();
      } else if (validationErrors.email) {
        emailInputRef.current?.focus();
      } else if (validationErrors.message) {
        messageInputRef.current?.focus();
      }
      return;
    }

    setStatus("sending");
    setStatusMessage("Sending your message…");

    try {
      const response = await fetch(
        `https://formspree.io/f/${configuredFormspreeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
          }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setStatusMessage(
          "Thank you! Your message has been sent directly to Om Prakash Chaubey."
        );
        setName("");
        setEmail("");
        setMessage("");
        setErrors({});
      } else {
        setStatus("error");
        setStatusMessage(
          "Something went wrong while sending your message. Please try again or reach out directly via the email link."
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Unable to reach the form service right now. Please use the direct email link instead."
      );
    }
  };

  const isDisabled = !isFormEnabled || status === "sending";

  return (
    <section
      id="contact"
      aria-labelledby="heading-contact"
      className="section-spacing bg-bg"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Direct Contact Details & Social Profiles */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <h2 id="heading-contact" className="heading-h2 text-text-primary">
                Contact
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-muted">
                Open to Full-Stack and AI Engineering internships and
                entry-level roles. Reach out directly by email or through the
                contact form.
              </p>

              <div className="mt-8 space-y-5 rounded-[12px] border border-border-subtle bg-surface p-6">
                <div>
                  <h3 className="text-sm font-semibold tracking-wider text-text-muted uppercase">
                    Direct Email
                  </h3>
                  <div className="mt-2.5">
                    <EmailDisplay showCopyButton />
                  </div>
                </div>

                <div className="border-t border-border-subtle pt-4">
                  <h3 className="text-sm font-semibold tracking-wider text-text-muted uppercase">
                    Location
                  </h3>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-text-primary">
                    <MapPin
                      className="h-4 w-4 text-accent"
                      aria-hidden="true"
                    />
                    <span>{profileData.location}</span>
                  </p>
                </div>

                <div className="border-t border-border-subtle pt-4">
                  <h3 className="text-sm font-semibold tracking-wider text-text-muted uppercase">
                    Profiles
                  </h3>
                  <ul
                    aria-label="Social profiles"
                    className="mt-3 flex items-center gap-3"
                  >
                    {profileData.socials.map((social) => (
                      <li key={social.platform}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.ariaLabel}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface-2 text-text-muted transition-colors hover:border-accent hover:text-text-primary"
                        >
                          {renderSocialIcon(social.platform)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accessible Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[12px] border border-border-subtle bg-surface p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-text-primary">
                Send a Message
              </h3>

              {!isFormEnabled && (
                <div
                  role="note"
                  className="mt-4 flex items-start gap-3 rounded-[10px] border border-accent/40 bg-surface-2 p-4 text-sm text-text-primary"
                >
                  <AlertCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold">
                      Direct email is currently the fastest way to reach me.
                    </p>
                    <p className="mt-1 text-text-muted">
                      The web form is currently disabled while the form
                      endpoint is unconfigured. Please use the{" "}
                      <span className="font-medium text-text-primary">
                        Direct Email
                      </span>{" "}
                      link or{" "}
                      <span className="font-medium text-text-primary">
                        Copy email
                      </span>{" "}
                      button alongside this form.
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  void handleSubmit(e);
                }}
                noValidate
                className="mt-6 space-y-5"
              >
                {/* Honeypot Spam Trap (hidden from visual and screen-reader users) */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-company-website">
                    Company Website (leave blank)
                  </label>
                  <input
                    id="contact-company-website"
                    name="company_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    ref={nameInputRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    disabled={isDisabled}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) {
                        setErrors((prev) => ({ ...prev, name: undefined }));
                      }
                    }}
                    placeholder="Your name"
                    className="mt-1.5 w-full rounded-[10px] border border-border-subtle bg-surface-2 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 focus:border-accent disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-accent"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    ref={emailInputRef}
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={isDisabled}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }
                    }}
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-[10px] border border-border-subtle bg-surface-2 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 focus:border-accent disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-accent"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    ref={messageInputRef}
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    disabled={isDisabled}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) {
                        setErrors((prev) => ({ ...prev, message: undefined }));
                      }
                    }}
                    placeholder="Tell me about your role or project…"
                    className="mt-1.5 w-full rounded-[10px] border border-border-subtle bg-surface-2 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/60 focus:border-accent disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-1.5 text-xs font-medium text-accent"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button (Text #0D0D0D on #FF6B00 for WCAG AA contrast) */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isDisabled}
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-accent px-7 py-3.5 text-sm font-bold text-bg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {status === "sending" ? "Sending…" : "Send Message"}
                    </span>
                  </button>
                </div>

                {/* Accessible Status Region (aria-live) */}
                <div
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="min-h-[24px]"
                >
                  {status === "success" && (
                    <div className="flex items-start gap-2.5 rounded-[10px] border border-emerald-500/40 bg-emerald-950/30 p-3.5 text-sm text-emerald-200">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="flex items-start gap-2.5 rounded-[10px] border border-accent/60 bg-surface-2 p-3.5 text-sm text-text-primary">
                      <AlertCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  {status === "idle" && statusMessage && (
                    <p className="text-xs font-medium text-accent">
                      {statusMessage}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
