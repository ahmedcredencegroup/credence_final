import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Loader2, Mail, MapPin, Phone, Globe } from "lucide-react";
import { toast } from "sonner";

const projectTypes = ["Interior Design", "Turnkey Project", "Infrastructure", "Furniture / Modular", "Other"];
const budgets = ["Under ₹25L", "₹25L – ₹1Cr", "₹1Cr – ₹5Cr", "₹5Cr+", "Prefer not to say"];

// Google Apps Script web-app URL that emails each submission to the studio
// (see docs/contact-form-setup.md). Set VITE_CONTACT_ENDPOINT in .env locally
// and in Netlify's environment.
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    budget: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and a short message.");
      return;
    }

    setSubmitting(true);
    try {
      if (CONTACT_ENDPOINT) {
        // Apps Script accepts a CORS-safe "simple" POST (text/plain, no preflight);
        // the response is opaque under no-cors, so we treat a completed request as success.
        await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ ...form, submittedAt: new Date().toISOString() }),
        });
      } else if (import.meta.env.DEV) {
        console.warn(
          "[contact] VITE_CONTACT_ENDPOINT is not set — the inquiry was not delivered anywhere.",
        );
      }
      toast.success("Thank you, we'll be in touch within 48 hours.");
      setForm({ name: "", email: "", phone: "", type: "", budget: "", message: "" });
    } catch {
      toast.error("Sorry — we couldn't send that. Please email us at ahmed@credencegroup.co.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative bg-emerald-mid py-20 md:py-36">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-6 lg:grid-cols-[5fr_6fr] lg:gap-20 lg:px-12">
        {/* Left — copy + details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
        >
          <p className="eyebrow mb-5">Begin a Project</p>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] text-ivory">
            Tell Us About Your Project
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-ivory/65">
            We undertake a select number of projects each year to ensure exceptional attention to detail. Share your requirements and our team will respond within 24 hours.
          </p>

          <div className="mt-12 space-y-6">
            <DetailRow icon={<Mail className="h-4 w-4" />} label="Email" value="ahmed@credencegroup.co" />
            <DetailRow icon={<Phone className="h-4 w-4" />} label="Telephone" value="+91 90000 63200" />
            <DetailRow icon={<MapPin className="h-4 w-4" />} label="Studio" value={`Meenakshi Tech Park, Tower B, 8th Floor\nHyderabad 500032`} />
            <DetailRow icon={<Globe className="h-4 w-4" />} label="Web" value="credencegroup.co" />
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          onSubmit={onSubmit}
          className="border border-gold/20 bg-emerald-deep/60 p-7 backdrop-blur md:p-10"
          style={{ boxShadow: "var(--shadow-elegant)" }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" value={form.name} onChange={update("name")} required />
            <Field label="Email" type="email" value={form.email} onChange={update("email")} required />
            <Field label="Phone" type="tel" value={form.phone} onChange={update("phone")} />
            <SelectField label="Project type" value={form.type} onChange={update("type")} options={projectTypes} />
            <div className="sm:col-span-2">
              <SelectField label="Budget range" value={form.budget} onChange={update("budget")} options={budgets} />
            </div>
            <div className="sm:col-span-2">
              <TextareaField label="Tell us about the project" value={form.message} onChange={update("message")} required />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="group mt-8 inline-flex w-full items-center justify-center gap-3 border border-gold bg-gold py-4 text-[0.74rem] uppercase tracking-[0.28em] text-emerald-deep transition-all hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
          >
            {submitting ? "Sending…" : "Send Inquiry"}
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            )}
          </button>
          <p className="mt-4 text-xs text-ivory/60">By submitting, you agree to be contacted by the studio. We do not share enquiries.</p>
        </motion.form>
      </div>
    </section>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 border-t border-gold/15 pt-5">
      <span className="mt-1 flex h-8 w-8 items-center justify-center border border-gold/30 text-gold">{icon}</span>
      <div>
        <p className="eyebrow text-[0.65rem]">{label}</p>
        <p className="mt-1 whitespace-pre-line text-ivory/85">{value}</p>
      </div>
    </div>
  );
}

const fieldClasses =
  "peer w-full border-b border-gold/25 bg-transparent pb-2 pt-5 text-ivory placeholder-transparent outline-none transition-colors focus:border-gold";
const labelClasses =
  "pointer-events-none absolute left-0 top-5 text-sm text-ivory/55 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:uppercase peer-focus:tracking-[0.24em] peer-focus:text-gold peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[0.65rem] peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-[0.24em] peer-[&:not(:placeholder-shown)]:text-gold/80";

function Field(props: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="relative block">
      <input
        type={props.type ?? "text"}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        placeholder=" "
        className={fieldClasses}
      />
      <span className={labelClasses}>
        {props.label}
        {props.required && <span className="ml-1 text-gold">*</span>}
      </span>
    </label>
  );
}

function TextareaField(props: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}) {
  return (
    <label className="relative block">
      <textarea
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        rows={4}
        placeholder=" "
        className={`${fieldClasses} resize-none`}
      />
      <span className={labelClasses}>
        {props.label}
        {props.required && <span className="ml-1 text-gold">*</span>}
      </span>
    </label>
  );
}

function SelectField(props: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <label className="relative block">
      <select
        value={props.value}
        onChange={props.onChange}
        className={`${fieldClasses} appearance-none pr-6 ${props.value ? "" : "text-ivory/55"}`}
      >
        <option value="" className="bg-emerald-deep text-ivory/60">Select…</option>
        {props.options.map((o) => (
          <option key={o} value={o} className="bg-emerald-deep text-ivory">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 top-6 h-4 w-4 text-gold/60" />
      <span className={`${labelClasses} top-0 text-[0.65rem] uppercase tracking-[0.24em] text-gold/80`}>{props.label}</span>
    </label>
  );
}
