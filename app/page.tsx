"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  HeartPulse,
  HomeIcon,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Microscope,
  Phone,
  ShieldCheck,
  Stethoscope,
  TestTube2,
  Users,
  X,
} from "lucide-react";

const contact = {
  phone: "",
  whatsapp: "",
  address: "",
};

const navItems = [
  ["Home", "#home"],
  ["Tests", "#tests"],
  ["Health Packages", "#packages"],
  ["Home Collection", "#home-collection"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

const tests = [
  {
    name: "Complete Blood Count (CBC)",
    description: "A common screening test used to review key blood components.",
  },
  {
    name: "Thyroid Profile",
    description: "Supports thyroid health enquiries and routine monitoring needs.",
  },
  {
    name: "Liver Function Test",
    description: "A panel commonly used to understand liver-related markers.",
  },
  {
    name: "Kidney Function Test",
    description: "Checks commonly requested markers related to kidney function.",
  },
  {
    name: "Lipid Profile",
    description: "Reviews cholesterol and lipid markers for preventive screening.",
  },
  {
    name: "Blood Sugar Test",
    description: "Used for routine blood glucose enquiries and monitoring.",
  },
  {
    name: "Vitamin D Test",
    description: "Helps enquire about vitamin D level assessment options.",
  },
  {
    name: "Vitamin B12 Test",
    description: "Supports enquiries for common vitamin B12 level testing.",
  },
];

const packages = [
  {
    title: "Basic Health Checkup",
    copy: "Routine health screening essentials.",
    icon: ClipboardList,
  },
  {
    title: "Full Body Checkup",
    copy: "A broader preventive health screening package.",
    icon: HeartPulse,
  },
  {
    title: "Senior Citizen Health Checkup",
    copy: "Focused health screening for elderly patients.",
    icon: Users,
  },
  {
    title: "Women's Wellness Package",
    copy: "Common preventive health checks for women.",
    icon: Stethoscope,
  },
];

const convenience = [
  ["Easy Test Enquiries", "Quickly ask about individual tests and availability.", TestTube2],
  ["Home Sample Collection", "Request sample collection from your preferred location.", HomeIcon],
  ["Multiple Diagnostic Services", "Explore common tests and health checkup options.", Microscope],
  ["Convenient Contact Options", "Use enquiry, callback, call, or WhatsApp touchpoints.", Phone],
  ["Mobile-Friendly Access", "Patients can browse and enquire comfortably on any device.", ShieldCheck],
  ["Simple Appointment Requests", "Share service needs, date preference, and details in one form.", CalendarCheck],
];

const infoStrip = [
  "Easy Booking",
  "Home Collection Request",
  "Direct Call Support",
  "Health Package Enquiries",
];

const faqs = [
  {
    question: "How can I book a diagnostic test?",
    answer:
      "Use the enquiry form to share your contact details, preferred service, and date. The centre can then follow up with the next steps.",
  },
  {
    question: "Do you offer home sample collection?",
    answer:
      "You can request home sample collection from the form or the home collection section. The available time and details can be coordinated after your request.",
  },
  {
    question: "How can I enquire about health packages?",
    answer:
      "Choose Health Package in the enquiry form or use the package card buttons to ask about the package that fits your needs.",
  },
  {
    question: "Can I call directly for test information?",
    answer:
      "Yes. The contact area is structured for direct call and WhatsApp access once the centre's official details are added.",
  },
  {
    question: "How will I receive confirmation for my enquiry?",
    answer:
      "The page shows an on-screen acknowledgement only. The centre would confirm through its chosen contact workflow.",
  },
];

function scrollToEnquiry() {
  document.querySelector("#enquiry")?.scrollIntoView({ behavior: "smooth" });
}

function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  );
}

function ActionButton({
  children,
  variant = "primary",
  icon: Icon,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  icon?: typeof CalendarCheck;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick ?? scrollToEnquiry}
      className={`button ${variant}`}
    >
      {Icon ? <Icon aria-hidden="true" size={18} /> : null}
      <span>{children}</span>
    </button>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main id="home" className="min-h-screen bg-[#f8fbfb] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-teal-900/10 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3 focus-ring">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-700 text-white shadow-sm">
              <Microscope aria-hidden="true" size={23} />
            </span>
            <span className="max-w-[210px] text-sm font-bold leading-tight text-slate-950 sm:max-w-none sm:text-base">
              Delhi NCR Lab & Diagnostic Centre
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="nav-link">
                {label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ActionButton variant="quiet" icon={Phone}>
              Call Now
            </ActionButton>
            <ActionButton icon={CalendarCheck}>Book a Test</ActionButton>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="focus-ring grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {menuOpen ? (
          <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-800"
                >
                  {label}
                </a>
              ))}
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <ActionButton icon={CalendarCheck}>Book a Test</ActionButton>
                <ActionButton variant="secondary" icon={HomeIcon}>
                  Request Home Collection
                </ActionButton>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <section className="hero-section">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="eyebrow text-left">Reliable diagnostics + easy booking</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              Reliable Diagnostic Testing, Made Simple
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-650">
              Explore tests, health packages and home sample collection services
              with quick and convenient enquiry options.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ActionButton icon={CalendarCheck}>Book a Test</ActionButton>
              <ActionButton variant="secondary" icon={HomeIcon}>
                Request Home Collection
              </ActionButton>
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {[
                ["Convenient Booking", CalendarCheck],
                ["Home Sample Collection", HomeIcon],
                ["Quick Enquiry Support", MessageCircle],
              ].map(([label, Icon]) => (
                <div key={label as string} className="trust-pill">
                  <Icon aria-hidden="true" size={18} />
                  <span>{label as string}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[28px] border border-white bg-white shadow-2xl shadow-teal-950/10">
              <Image
                src="/lab-hero.png"
                alt="Clean diagnostic laboratory workspace with blood sample tubes and microscope"
                width={1536}
                height={1024}
                priority
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-teal-100 bg-white/95 p-4 shadow-xl shadow-teal-950/10 backdrop-blur sm:left-auto sm:w-80">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                  <CheckCircle2 size={22} />
                </span>
                <div>
                  <p className="font-semibold text-slate-950">Simple patient enquiries</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Help patients discover tests, packages, and collection options
                    from one clear page.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-teal-900/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {infoStrip.map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <CheckCircle2 aria-hidden="true" className="text-teal-700" size={19} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="tests" className="section">
        <SectionHeader
          eyebrow="Tests"
          title="Popular Diagnostic Tests"
          copy="Clear test discovery helps patients quickly find commonly requested diagnostic services and start an enquiry."
        />
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {tests.map((test) => (
            <article key={test.name} className="service-card">
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-cyan-50 text-cyan-700">
                <TestTube2 aria-hidden="true" size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-950">{test.name}</h3>
              <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">{test.description}</p>
              <button type="button" onClick={scrollToEnquiry} className="card-link">
                Enquire Now
              </button>
            </article>
          ))}
        </div>
        <div className="mt-9 text-center">
          <ActionButton variant="secondary" icon={ClipboardList}>
            View All Tests
          </ActionButton>
        </div>
      </section>

      <section id="packages" className="section bg-white">
        <SectionHeader
          eyebrow="Packages"
          title="Health Checkup Packages"
          copy="Package cards make preventive health enquiries easier to compare without showing unverified prices or claims."
        />
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {packages.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="package-card">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-teal-700 text-white shadow-sm">
                  <Icon aria-hidden="true" size={23} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">{item.copy}</p>
                <button type="button" onClick={scrollToEnquiry} className="card-link">
                  Enquire About Package
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section id="home-collection" className="section">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="rounded-[28px] bg-teal-800 p-7 text-white shadow-2xl shadow-teal-950/15 sm:p-10">
            <p className="text-sm font-semibold uppercase text-teal-100">Home Collection</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Get Your Samples Collected From Home
            </h2>
            <p className="mt-5 text-base leading-8 text-teal-50">
              Request home sample collection and our team can coordinate the
              available time and details with you.
            </p>
            <div className="mt-8">
              <ActionButton variant="secondary" icon={HomeIcon}>
                Request Home Collection
              </ActionButton>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["1", "Submit your request", "Share your service need and contact details."],
              ["2", "Confirm your preferred time", "The team can coordinate availability with you."],
              ["3", "Sample collection at your location", "A convenient collection request workflow for patients."],
            ].map(([step, title, copy]) => (
              <div key={step} className="step-card">
                <span className="step-number">{step}</span>
                <h3 className="mt-6 text-lg font-bold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <SectionHeader
          eyebrow="Convenience"
          title="Designed Around Your Convenience"
          copy="A focused website can turn test discovery, package enquiries, and contact requests into simple patient actions."
        />
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {convenience.map(([title, copy, Icon]) => (
            <article key={title as string} className="feature-card">
              <Icon aria-hidden="true" className="text-teal-700" size={24} />
              <div>
                <h3 className="font-bold text-slate-950">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy as string}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="eyebrow text-left">About</p>
            <h2 className="section-title text-left">
              About Delhi NCR Lab & Diagnostic Centre
            </h2>
          </div>
          <div className="rounded-[24px] border border-teal-900/10 bg-white p-7 shadow-sm sm:p-8">
            <p className="text-lg leading-8 text-slate-700">
              Delhi NCR Lab & Diagnostic Centre provides diagnostic testing and
              health checkup services with a focus on convenient access and easy
              patient enquiries.
            </p>
            <div className="mt-7">
              <ActionButton variant="secondary" icon={Mail}>
                Contact the Centre
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      <section id="enquiry" className="section bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="eyebrow text-left">Enquiry</p>
            <h2 className="section-title text-left">Book a Test or Request a Callback</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Share the service you need and your preferred date. This page
              confirms your request on screen only and does not send details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="form-panel">
            {submitted ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0" size={22} />
                  <div>
                    <p className="font-bold">Your enquiry details are ready for review.</p>
                    <p className="mt-2 text-sm leading-6">
                      In the live website, this step can connect to the centre&apos;s
                      preferred callback or enquiry workflow.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="field">
                <span>Full Name</span>
                <input name="name" type="text" required />
              </label>
              <label className="field">
                <span>Phone Number</span>
                <input name="phone" type="tel" required />
              </label>
              <label className="field">
                <span>Email</span>
                <input name="email" type="email" />
              </label>
              <label className="field">
                <span>Select Service</span>
                <select name="service" required defaultValue="">
                  <option value="" disabled>
                    Choose a service
                  </option>
                  <option>Diagnostic Test</option>
                  <option>Health Package</option>
                  <option>Home Sample Collection</option>
                  <option>General Enquiry</option>
                </select>
              </label>
              <label className="field">
                <span>Preferred Date</span>
                <input name="date" type="date" required />
              </label>
              <label className="field sm:col-span-2">
                <span>Message</span>
                <textarea name="message" rows={4} />
              </label>
            </div>
            <button type="submit" className="button primary mt-6 w-full justify-center sm:w-auto">
              <Mail aria-hidden="true" size={18} />
              <span>Submit Enquiry</span>
            </button>
          </form>
        </div>
      </section>

      <section id="contact" className="section">
        <SectionHeader
          eyebrow="Quick Contact"
          title="Reach the Centre"
          copy="Prominent contact actions are ready for official phone, WhatsApp, and direction details."
        />
        <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            ["Call", Phone, contact.phone || "Use enquiry for callback"],
            ["WhatsApp", MessageCircle, contact.whatsapp || "Use enquiry for WhatsApp follow-up"],
            ["Get Directions", MapPin, contact.address || "Location details to be confirmed"],
          ].map(([label, Icon, value]) => (
            <button
              type="button"
              key={label as string}
              onClick={scrollToEnquiry}
              className="contact-action"
            >
              <Icon aria-hidden="true" size={24} />
              <span className="font-bold">{label as string}</span>
              <span className="text-sm font-medium text-slate-500">{value as string}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <SectionHeader eyebrow="Visit" title="Location & Timings" />
        <div className="mx-auto grid max-w-5xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="info-panel">
            <MapPin className="text-teal-700" size={27} />
            <h3>Centre Location</h3>
            <p>Official address details can be displayed here for easy patient visits and directions.</p>
          </div>
          <div className="info-panel">
            <Clock3 className="text-teal-700" size={27} />
            <h3>Opening Hours</h3>
            <p>Current visit hours can be added here so patients know when to call or come in.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow="FAQ" title="Common Questions" />
        <div className="mx-auto max-w-3xl space-y-3 px-4 sm:px-6 lg:px-8">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>
                <span>{faq.question}</span>
                <ChevronDown aria-hidden="true" size={20} />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[28px] bg-slate-950 px-6 py-12 text-center text-white shadow-2xl shadow-slate-950/20 sm:px-10">
          <h2 className="text-3xl font-bold sm:text-4xl">Need a Test or Health Checkup?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Send an enquiry and get the information you need about available
            diagnostic services.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ActionButton icon={CalendarCheck}>Book a Test</ActionButton>
            <ActionButton variant="secondary" icon={HomeIcon}>
              Request Home Collection
            </ActionButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-700 text-white">
                <Microscope aria-hidden="true" size={21} />
              </span>
              <p className="font-bold text-slate-950">Delhi NCR Lab & Diagnostic Centre</p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Diagnostic testing, health checkup enquiries, and home sample
              collection requests from one simple page.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-950">Links</h3>
            <div className="mt-4 grid gap-2 text-sm text-slate-600">
              {navItems.slice(1).map(([label, href]) => (
                <a key={label} href={href} className="hover:text-teal-800">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-950">Contact</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <span>Phone: Use the enquiry form for callback requests</span>
              <span>WhatsApp: Use the enquiry form for message requests</span>
              <span>Address: Official location details can be added</span>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 px-4 py-5 text-center text-sm text-slate-500">
          &copy; 2026 Delhi NCR Lab & Diagnostic Centre. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
