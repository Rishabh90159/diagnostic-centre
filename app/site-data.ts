import {
  Activity,
  CalendarCheck,
  ClipboardList,
  FileText,
  HeartPulse,
  HomeIcon,
  Mail,
  MapPin,
  MessageCircle,
  Microscope,
  Phone,
  TestTube2,
  Users,
} from "lucide-react";

export const centreInfo = {
  businessName: "Delhi NCR Lab & Diagnostic Centre",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  openingHours: "",
};

export const navItems = [
  ["Home", "#home"],
  ["Tests", "#tests"],
  ["Health Packages", "#packages"],
  ["Home Collection", "#home-collection"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export const popularTests = [
  {
    name: "Complete Blood Count (CBC)",
    description: "A routine blood test that measures different components of your blood.",
    icon: TestTube2,
  },
  {
    name: "Thyroid Profile",
    description: "A group of blood tests used to check thyroid hormone levels.",
    icon: Activity,
  },
  {
    name: "Liver Function Test",
    description: "A blood test that measures different markers related to liver function.",
    icon: TestTube2,
  },
  {
    name: "Kidney Function Test",
    description: "A test used to check important markers related to kidney function.",
    icon: Microscope,
  },
  {
    name: "Lipid Profile",
    description: "A blood test that measures cholesterol and other blood fats.",
    icon: HeartPulse,
  },
  {
    name: "Blood Sugar Test",
    description: "A commonly used test for measuring blood glucose levels.",
    icon: Activity,
  },
];

export const quickSearches = [
  "CBC",
  "Thyroid Profile",
  "Liver Function",
  "Kidney Function",
  "Lipid Profile",
  "Blood Sugar",
];

export const packages = [
  {
    title: "Basic Health Checkup",
    copy: "Essential tests for routine health screening.",
    note: "Contact for package details",
    icon: ClipboardList,
  },
  {
    title: "Full Body Checkup",
    copy: "A broader selection of tests for preventive health screening.",
    note: "Contact for package details",
    icon: HeartPulse,
    featured: true,
  },
  {
    title: "Senior Citizen Health Checkup",
    copy: "Health screening options designed around common testing needs for older adults.",
    note: "Contact for package details",
    icon: Users,
  },
];

export const trustStrip = [
  ["Home Sample Collection", HomeIcon],
  ["Easy Test Booking", CalendarCheck],
  ["Health Checkup Packages", HeartPulse],
  ["Digital Report Assistance", FileText],
];

export const whyChoose = [
  ["Easy Test Enquiries", "Quickly find the test or package you're looking for.", TestTube2],
  ["Home Sample Collection", "Request sample collection from the convenience of your home.", HomeIcon],
  ["Preventive Health Packages", "Explore routine health screening options.", HeartPulse],
  ["Direct Assistance", "Get help with tests, packages or booking questions.", MessageCircle],
];

export const contactSlots = [
  ["Phone", centreInfo.phone, Phone],
  ["WhatsApp", centreInfo.whatsapp, MessageCircle],
  ["Email", centreInfo.email, Mail],
  ["Address", centreInfo.address, MapPin],
  ["Opening Hours", centreInfo.openingHours, CalendarCheck],
] as const;
