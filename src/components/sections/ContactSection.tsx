import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone, Instagram } from "lucide-react";
import { toast } from "sonner";

const projectTypes = ["Residential", "Hospitality", "Commercial", "Retail", "Other"];
const budgets = ["Under ₹25L", "₹25L – ₹1Cr", "₹1Cr – ₹5Cr", "₹5Cr+", "Prefer not to say"];

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    budget: "",
    message: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and a short message.");
      return;
    }
    toast.success("Thank you — we'll be in touch within 48 hours.");
    setForm({ name: "", email: "", phone: "", type: "", budget: "", message: "" });
  }

  return (
    <section id="contact" className="relative bg-emerald-mid py-28 md:py-36">
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
            Tell us about <span className="italic gold-gradient-text">the room</span>.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-ivory/65">
            We take on a small number of commissions each year. Share the brief and we will respond, personally, within forty-eight hours.
          </p>

          <div className="mt-12 space-y-6">
            <DetailRow icon={<Mail className="h-4 w-4" />} label="Email" value="studio@credencegroups.com" />
            <DetailRow icon={<Phone className="h-4 w-4" />} label="Telephone" value="+91 11 4000 8800" />
            <DetailRow icon={<MapPin className="h-4 w-4" />} label="Studio" value={`14, Whitfield House\nConnaught Place, New Delhi 110001`} />
            <DetailRow icon={<Instagram className="h-4 w-4" />} label="Follow" value="@credence.groups" />
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
            className="group mt-8 inline-flex w-full items-center justify-center gap-3 border border-gold bg-gold py-4 text-[0.74rem] uppercase tracking-[0.28em] text-emerald-deep transition-all hover:bg-gold-light sm:w-auto sm:px-10"
          >
            Send Inquiry
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
          <p className="mt-4 text-xs text-ivory/40">By submitting, you agree to be contacted by the studio. We do not share enquiries.</p>
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
        className={`${fieldClasses} appearance-none pr-6 ${props.value ? "" : "text-ivory/40"}`}
      >
        <option value="" className="bg-emerald-deep text-ivory/60">Select…</option>
        {props.options.map((o) => (
          <option key={o} value={o} className="bg-emerald-deep text-ivory">
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-0 top-6 text-gold/60">▾</span>
      <span className={`${labelClasses} top-0 text-[0.65rem] uppercase tracking-[0.24em] text-gold/80`}>{props.label}</span>
    </label>
  );
}
