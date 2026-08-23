"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  FileText,
  HomeIcon,
  Mail,
  Menu,
  MessageCircle,
  Microscope,
  Phone,
  Search,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  centreInfo,
  contactSlots,
  navItems,
  packages,
  popularTests,
  quickSearches,
  trustStrip,
  whyChoose,
} from "./site-data";

type IconType = LucideIcon;

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
  icon?: IconType;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick ?? (() => scrollToEnquiry())}
      className={`button ${variant}`}
    >
      {Icon ? <Icon aria-hidden="true" size={18} /> : null}
      <span>{children}</span>
    </button>
  );
}

function ContactButton({
  children,
  icon: Icon,
  href,
}: {
  children: React.ReactNode;
  icon: IconType;
  href: string;
}) {
  return (
    <a href={href} className="button quiet">
      <Icon aria-hidden="true" size={18} />
      <span>{children}</span>
    </a>
  );
}

function IconBadge({ icon: Icon }: { icon: IconType }) {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
      <Icon aria-hidden="true" size={22} />
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [reportNotice, setReportNotice] = useState(false);
  const [formError, setFormError] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const availableContacts = contactSlots.filter(([, value]) => Boolean(value));
  const canCall = Boolean(centreInfo.phone);
  const canWhatsApp = Boolean(centreInfo.whatsapp);
  const whatsappHref = centreInfo.whatsapp
    ? `https://wa.me/${centreInfo.whatsapp.replace(/\D/g, "")}`
    : "";

  const filteredTests = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return popularTests;
    return popularTests.filter((test) =>
      `${test.name} ${test.description}`.toLowerCase().includes(query),
    );
  }, [searchTerm]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleEnquiry(service?: string) {
    if (service) {
      setSelectedService(service);
      setSubmitted(false);
      setFormError("");
    }
    scrollToEnquiry();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const date = String(formData.get("date") || "").trim();

    if (!name || !phone || !service || !date) {
      setFormError("Please fill in your name, phone number, test or service, and preferred date.");
      setSubmitted(false);
      return;
    }

    setFormError("");
    setSubmitted(true);
  }

  return (
    <main id="home" className="min-h-screen bg-[#f8fbfb] text-slate-950">
      <header
        className={`sticky top-0 z-50 border-b bg-white/92 backdrop-blur-xl transition-shadow ${
          scrolled ? "border-teal-900/10 shadow-sm" : "border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3 focus-ring">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-700 text-white shadow-sm">
              <Microscope aria-hidden="true" size={23} />
            </span>
            <span className="max-w-[220px] text-sm font-bold leading-tight text-slate-950 sm:max-w-none sm:text-base">
              {centreInfo.businessName}
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
            {canWhatsApp ? (
              <ContactButton href={whatsappHref} icon={MessageCircle}>
                WhatsApp
              </ContactButton>
            ) : null}
            {canCall ? (
              <ContactButton href={`tel:${centreInfo.phone}`} icon={Phone}>
                Call
              </ContactButton>
            ) : null}
            <ActionButton icon={CalendarCheck} onClick={() => handleEnquiry()}>
              Book a Test
            </ActionButton>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="focus-ring grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm lg:hidden"
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
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-800"
                >
                  {label}
                </a>
              ))}
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <ActionButton icon={CalendarCheck} onClick={() => handleEnquiry()}>
                  Book a Test
                </ActionButton>
                <ActionButton
                  variant="secondary"
                  icon={HomeIcon}
                  onClick={() => handleEnquiry("Home Sample Collection")}
                >
                  Request Home Collection
                </ActionButton>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <section className="hero-section">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-18">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="eyebrow text-left">Reliable diagnostics. Convenient care.</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              Accurate Diagnostic Testing, Made Simple.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Book diagnostic tests, explore preventive health packages and
              request home sample collection with quick assistance from our team.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ActionButton icon={CalendarCheck} onClick={() => handleEnquiry()}>
                Book a Test
              </ActionButton>
              <ActionButton
                variant="secondary"
                icon={HomeIcon}
                onClick={() => handleEnquiry("Home Sample Collection")}
              >
                Request Home Collection
              </ActionButton>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Easy Booking", CalendarCheck],
                ["Home Sample Collection", HomeIcon],
                ["Quick Assistance", MessageCircle],
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
            <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full bg-cyan-100/80 blur-2xl" aria-hidden="true" />
            <div className="overflow-hidden rounded-[28px] border border-white bg-white shadow-2xl shadow-teal-950/10">
              <Image
                src="/lab-hero.png"
                alt="Diagnostic laboratory workspace with sample tubes and microscope"
                width={1536}
                height={1024}
                priority
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-teal-100 bg-white/95 p-4 shadow-xl shadow-teal-950/10 backdrop-blur sm:left-auto sm:w-80">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <CheckCircle2 size={22} />
                </span>
                <div>
                  <p className="font-semibold text-slate-950">Easy & Convenient Testing</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Explore diagnostic tests, health checkups and home sample
                    collection options with ease.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-teal-900/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trustStrip.map(([item, Icon]) => (
            <div key={item as string} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <Icon aria-hidden="true" className="text-teal-700" size={19} />
              <span>{item as string}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-[#f3fbfb]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Test Search"
            title="Find the Test You Need"
            copy="Search by test name or choose a popular option below."
          />
          <div className="search-panel">
            <Search aria-hidden="true" className="text-teal-700" size={23} />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search CBC, Thyroid, Vitamin D, Diabetes..."
              aria-label="Search diagnostic tests"
            />
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {quickSearches.map((search) => (
              <button
                key={search}
                type="button"
                onClick={() => setSearchTerm(search)}
                className="quick-chip"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="tests" className="section">
        <SectionHeader
          eyebrow="Tests"
          title="Popular Diagnostic Tests"
          copy="Commonly requested tests with simple booking assistance."
        />
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {filteredTests.map((test) => {
            const Icon = test.icon;
            return (
              <article key={test.name} className="service-card flex h-full flex-col">
                <IconBadge icon={Icon} />
                <h3 className="mt-5 text-lg font-bold text-slate-950">{test.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{test.description}</p>
                <button
                  type="button"
                  onClick={() => handleEnquiry(test.name)}
                  className="card-link"
                >
                  Book Test
                </button>
              </article>
            );
          })}
        </div>
        {filteredTests.length === 0 ? (
          <p className="mt-8 text-center text-sm font-medium text-slate-600">
            No matching test found. Send an enquiry and the centre can assist you.
          </p>
        ) : null}
        <div className="mt-9 text-center">
          <ActionButton variant="secondary" icon={Search} onClick={() => handleEnquiry("General Enquiry")}>
            View All Tests
          </ActionButton>
        </div>
      </section>

      <section id="packages" className="section bg-white">
        <SectionHeader
          eyebrow="Packages"
          title="Health Checkup Packages"
          copy="Preventive screening options for different routine needs."
        />
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {packages.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={`package-card flex h-full flex-col ${item.featured ? "featured-package" : ""}`}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-700 text-white shadow-sm">
                  <Icon aria-hidden="true" size={23} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{item.copy}</p>
                <p className="mt-5 text-sm font-semibold text-teal-800">{item.note}</p>
                <button
                  type="button"
                  onClick={() => handleEnquiry(item.title)}
                  className="card-link"
                >
                  Enquire About Package
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section id="home-collection" className="section">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] border border-white bg-white shadow-2xl shadow-teal-950/10">
            <Image
              src="/lab-hero.png"
              alt="Healthcare sample collection and laboratory testing environment"
              width={1536}
              height={1024}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/92 p-4 shadow-lg backdrop-blur">
              <p className="text-sm font-bold text-slate-950">Home collection assistance</p>
              <p className="mt-1 text-sm text-slate-600">Share your preferred date and test details.</p>
            </div>
          </div>

          <div>
            <p className="eyebrow text-left">Home Collection</p>
            <h2 className="section-title text-left">
              Diagnostic Testing From the Comfort of Home
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Request home sample collection and let the centre coordinate a
              convenient collection time with you.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Convenient scheduling",
                "Trained collection assistance",
                "Easy test enquiry",
                "Digital coordination",
              ].map((item) => (
                <div key={item} className="mini-benefit">
                  <CheckCircle2 aria-hidden="true" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <ActionButton
                variant="primary"
                icon={HomeIcon}
                onClick={() => handleEnquiry("Home Sample Collection")}
              >
                Request Home Collection
              </ActionButton>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-4">
              {[
                ["1", "Choose Your Test"],
                ["2", "Select Preferred Time"],
                ["3", "Sample Collection"],
                ["4", "Report Assistance"],
              ].map(([step, label]) => (
                <div key={step} className="process-step">
                  <span>{step}</span>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <SectionHeader eyebrow="How It Works" title="Simple Steps to Get Started" />
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ["01", "Choose a Test"],
            ["02", "Book / Send Enquiry"],
            ["03", "Visit Centre or Request Collection"],
            ["04", "Receive Your Report"],
          ].map(([step, title]) => (
            <article key={step} className="timeline-card">
              <span>{step}</span>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Reliable Support for Routine Testing"
          copy="A simple way to ask about tests, packages and home collection."
        />
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {whyChoose.map(([title, copy, Icon]) => (
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

      <section className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-5 rounded-[24px] border border-teal-900/10 bg-slate-950 px-6 py-8 text-white shadow-xl shadow-slate-950/15 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-semibold uppercase text-cyan-200">Report Assistance</p>
            <h2 className="mt-2 text-2xl font-bold">Already Completed Your Test?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Access your diagnostic report or contact the centre for report assistance.
            </p>
            {reportNotice ? (
              <p className="mt-3 rounded-xl bg-white/10 px-4 py-3 text-sm text-cyan-50">
                Report portal access can be connected when the centre provides its report system.
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ActionButton
              variant="secondary"
              icon={FileText}
              onClick={() => setReportNotice(true)}
            >
              View Reports
            </ActionButton>
            <ActionButton icon={MessageCircle} onClick={() => handleEnquiry("Report Assistance")}>
              Get Assistance
            </ActionButton>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="mx-auto grid max-w-7xl items-center gap-9 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="overflow-hidden rounded-[24px] border border-white bg-white shadow-xl shadow-teal-950/8">
            <Image
              src="/lab-hero.png"
              alt="Diagnostic laboratory testing setup"
              width={1536}
              height={1024}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="rounded-[24px] border border-teal-900/10 bg-white p-7 shadow-sm sm:p-8">
            <p className="eyebrow text-left">About</p>
            <h2 className="section-title text-left">
              About Delhi NCR Lab & Diagnostic Centre
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Delhi NCR Lab & Diagnostic Centre provides convenient diagnostic
              testing, preventive health checkup options and home sample
              collection enquiries for patients across Delhi NCR.
            </p>
            <div className="mt-7">
              <ActionButton variant="secondary" icon={Mail} onClick={() => handleEnquiry("General Enquiry")}>
                Contact the Centre
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      <section id="enquiry" className="section bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="eyebrow text-left">Booking Enquiry</p>
            <h2 className="section-title text-left">Book a Test</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Share your details and the test or service you need. The centre can
              contact you regarding availability and next steps.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="form-panel" noValidate>
            {submitted ? (
              <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0" size={22} />
                  <p className="font-bold">Thank you. Your request has been noted.</p>
                </div>
              </div>
            ) : null}
            {formError ? (
              <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {formError}
              </p>
            ) : null}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="field">
                <span>Full Name</span>
                <input name="name" type="text" required autoComplete="name" />
              </label>
              <label className="field">
                <span>Phone Number</span>
                <input name="phone" type="tel" required autoComplete="tel" />
              </label>
              <label className="field">
                <span>Email (Optional)</span>
                <input name="email" type="email" autoComplete="email" />
              </label>
              <label className="field">
                <span>Test / Service</span>
                <select
                  name="service"
                  required
                  value={selectedService}
                  onChange={(event) => setSelectedService(event.target.value)}
                >
                  <option value="" disabled>
                    Choose a test or service
                  </option>
                  {popularTests.map((test) => (
                    <option key={test.name}>{test.name}</option>
                  ))}
                  {packages.map((item) => (
                    <option key={item.title}>{item.title}</option>
                  ))}
                  <option>Home Sample Collection</option>
                  <option>Report Assistance</option>
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
              <span>Request a Callback</span>
            </button>
          </form>
        </div>
      </section>

      <section id="contact" className="section">
        <SectionHeader
          eyebrow="Contact"
          title="Need Help Choosing a Test?"
          copy="For test information, packages or home collection, send a request and the centre can assist you."
        />
        <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:px-6 lg:px-8">
          {availableContacts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {availableContacts.map(([label, value, Icon]) => (
                <article key={label} className="contact-action">
                  <Icon aria-hidden="true" size={24} />
                  <span className="font-bold">{label}</span>
                  <span className="text-sm font-medium text-slate-500">{value}</span>
                </article>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-[24px] border border-teal-900/10 bg-white p-7 text-center shadow-sm">
              <MessageCircle aria-hidden="true" className="mx-auto text-teal-700" size={28} />
              <h3 className="mt-4 text-xl font-bold text-slate-950">Send an enquiry</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Share your details and the centre can contact you for booking and service information.
              </p>
              <div className="mt-5">
                <ActionButton icon={CalendarCheck} onClick={() => handleEnquiry()}>
                  Book a Test
                </ActionButton>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section bg-white">
        <SectionHeader eyebrow="FAQ" title="Common Questions" />
        <div className="mx-auto max-w-3xl space-y-3 px-4 sm:px-6 lg:px-8">
          {[
            [
              "How can I book a diagnostic test?",
              "Choose the test you need and submit the enquiry form with your contact details.",
            ],
            [
              "Do you offer home sample collection?",
              "Home sample collection can be requested through the enquiry form. Availability can be confirmed by the centre.",
            ],
            [
              "How can I enquire about health packages?",
              "Choose a health package and submit an enquiry to get more information.",
            ],
            [
              "Can I request a callback?",
              "Yes. Submit the enquiry form with your phone number and preferred service.",
            ],
            [
              "How will I receive my report?",
              "The centre can guide you on report access or report assistance after your test.",
            ],
          ].map(([question, answer]) => (
            <details key={question} className="faq-item">
              <summary>
                <span>{question}</span>
                <ChevronDown aria-hidden="true" size={20} />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[28px] bg-slate-950 px-6 py-12 text-center text-white shadow-2xl shadow-slate-950/20 sm:px-10">
          <h2 className="text-3xl font-bold sm:text-4xl">Need a Test or Health Checkup?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Get assistance for tests, packages or home sample collection.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ActionButton icon={CalendarCheck} onClick={() => handleEnquiry()}>
              Book a Test
            </ActionButton>
            <ActionButton
              variant="secondary"
              icon={HomeIcon}
              onClick={() => handleEnquiry("Home Sample Collection")}
            >
              Request Home Collection
            </ActionButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white pb-20 md:pb-0">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-teal-700 text-white">
                <Microscope aria-hidden="true" size={21} />
              </span>
              <p className="font-bold text-slate-950">{centreInfo.businessName}</p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Diagnostic tests, health checkups and convenient home sample
              collection enquiries.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-950">Quick Links</h3>
            <div className="mt-4 grid gap-2 text-sm text-slate-600">
              {navItems.slice(1).map(([label, href]) => (
                <a key={label} href={href} className="hover:text-teal-800">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-950">Services</h3>
            <div className="mt-4 grid gap-2 text-sm text-slate-600">
              <a href="#tests" className="hover:text-teal-800">Diagnostic Tests</a>
              <a href="#packages" className="hover:text-teal-800">Health Packages</a>
              <a href="#home-collection" className="hover:text-teal-800">Home Collection</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-950">Contact</h3>
            {availableContacts.length > 0 ? (
              <div className="mt-4 grid gap-2 text-sm text-slate-600">
                {availableContacts.map(([label, value]) => (
                  <span key={label}>{label}: {value}</span>
                ))}
              </div>
            ) : (
              <button type="button" onClick={() => handleEnquiry()} className="card-link">
                Request a Callback
              </button>
            )}
          </div>
        </div>
        <div className="border-t border-slate-200 px-4 py-5 text-center text-sm text-slate-500">
          &copy; 2026 {centreInfo.businessName}. All rights reserved.
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgb(15_23_42/10%)] backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md gap-2" style={{ gridTemplateColumns: canCall || canWhatsApp ? "1fr 1fr" : "1fr" }}>
          {canCall ? (
            <ContactButton href={`tel:${centreInfo.phone}`} icon={Phone}>
              Call
            </ContactButton>
          ) : null}
          {canWhatsApp ? (
            <ContactButton href={whatsappHref} icon={MessageCircle}>
              WhatsApp
            </ContactButton>
          ) : null}
          <ActionButton icon={CalendarCheck} onClick={() => handleEnquiry()}>
            Book Test
          </ActionButton>
        </div>
      </div>
    </main>
  );
}
