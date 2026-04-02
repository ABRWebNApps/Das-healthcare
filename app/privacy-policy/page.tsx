import Navbar from "@/components/Navigation";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | DAS Healthcare Providers",
  description:
    "Read the DAS Healthcare Providers privacy policy to understand how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#E3EFFF]">
      <main className="relative">
        <Navbar />

        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 pt-32 pb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-20 w-72 h-72 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-blue-300 blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <p className="text-blue-200 text-sm font-semibold tracking-widest uppercase mb-3">
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              Your privacy matters to us. This policy explains what personal
              data DAS Healthcare Providers collects, how we use it, and your
              rights under applicable data protection law.
            </p>
            <p className="text-blue-200 text-sm mt-4">
              Last updated: <span className="font-semibold">9th July 2019</span>
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Table of Contents */}
              <div className="bg-blue-50 border-b border-blue-100 p-8">
                <h2 className="text-blue-900 font-bold text-lg mb-4">
                  Table of Contents
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {[
                    { label: "Who We Are", href: "#who-we-are" },
                    { label: "What Personal Data We Collect", href: "#what-data" },
                    { label: "Contact Forms & Cookies", href: "#cookies" },
                    { label: "Embedded Content", href: "#embedded" },
                    { label: "How Long We Retain Your Data", href: "#retention" },
                    { label: "Your Rights Over Your Data", href: "#your-rights" },
                    { label: "Where We Send Your Data", href: "#data-transfer" },
                    { label: "Data Protection Rights", href: "#data-protection" },
                    { label: "Changes to Our Policy", href: "#changes" },
                  ].map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:underline transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Policy Sections */}
              <div className="p-8 md:p-12 space-y-12 text-gray-700 leading-relaxed">

                {/* Who We Are */}
                <section id="who-we-are" className="scroll-mt-24">
                  <SectionHeading number="1" title="Who We Are" />
                  <p>
                    We are <strong className="text-blue-900">DAS Healthcare Providers</strong>, a
                    domiciliary care company dedicated to delivering compassionate and
                    professional care services. Our registered office is located at:
                  </p>
                  <address className="mt-3 not-italic bg-blue-50 rounded-xl p-4 border border-blue-100 text-blue-900 font-medium">
                    9, Arcus Road, Bromley, Kent, BR1 4NN, UK.
                  </address>
                  <p className="mt-3">
                    You can contact us by email at{" "}
                    <a
                      href="mailto:admin@dascareproviders.com"
                      className="text-blue-600 hover:underline"
                    >
                      admin@dascareproviders.com
                    </a>{" "}
                    or by phone on{" "}
                    <a href="tel:02036216242" className="text-blue-600 hover:underline">
                      02036216242
                    </a>
                    .
                  </p>
                </section>

                <Divider />

                {/* What Data */}
                <section id="what-data" className="scroll-mt-24">
                  <SectionHeading number="2" title="What Personal Data Do We Collect?" />
                  <p>We collect the following data:</p>
                  <ul className="mt-3 space-y-2">
                    <BulletItem>
                      Personal identification information (name, email address, phone
                      number, etc.)
                    </BulletItem>
                  </ul>
                  <p className="mt-4">
                    You directly provide DAS Healthcare Providers with most of the data
                    we collect. We collect and process data when you:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <BulletItem>Voluntarily complete our Contact Form</BulletItem>
                    <BulletItem>
                      Register online or enquire about any of our care services
                    </BulletItem>
                    <BulletItem>
                      Browse our website via your browser's cookies
                    </BulletItem>
                  </ul>
                  <p className="mt-4">We collect your data so that we can:</p>
                  <ul className="mt-3 space-y-2">
                    <BulletItem>
                      Process your enquiry and manage your care arrangement
                    </BulletItem>
                    <BulletItem>
                      Email you with relevant services or updates we think you might
                      find helpful
                    </BulletItem>
                  </ul>
                  <InfoBox className="mt-4">
                    If you have agreed to receive marketing communications, you may opt
                    out at any time. You have the right to stop DAS Healthcare Providers
                    from contacting you for marketing purposes.
                  </InfoBox>
                </section>

                <Divider />

                {/* Cookies */}
                <section id="cookies" className="scroll-mt-24">
                  <SectionHeading number="3" title="Contact Forms & Cookies" />
                  <p>
                    Cookies are text files placed on your computer to collect standard
                    internet log information and visitor behaviour information. When you
                    visit our website, we may collect information from you automatically
                    through cookies or similar technology.
                  </p>
                  <p className="mt-4">
                    DAS Healthcare Providers uses cookies in a range of ways to improve
                    your experience on our website, including understanding how you use
                    our website.
                  </p>
                  <p className="mt-4 font-semibold text-gray-900">
                    Our website uses:
                  </p>
                  <ul className="mt-3 space-y-3">
                    <li className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <strong className="text-blue-900">Functionality Cookies</strong>
                      <p className="mt-1 text-sm">
                        We use these cookies so that we recognise you on our website and
                        remember your previously selected preferences. This could include
                        language preferences and location. A mix of first-party and
                        third-party cookies are used.
                      </p>
                    </li>
                    <li className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <strong className="text-blue-900">Advertising Cookies</strong>
                      <p className="mt-1 text-sm">
                        We use these cookies to collect information about your visit to
                        our website — the content you viewed, the links you followed,
                        and information about your browser, device, and IP address. We
                        may share some limited aspects of this data with third parties
                        for advertising purposes.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-500">
                    You can set your browser to not accept cookies; however, some
                    website features may not function as a result.
                  </p>
                </section>

                <Divider />

                {/* Embedded Content */}
                <section id="embedded" className="scroll-mt-24">
                  <SectionHeading number="4" title="Embedded Content from Other Websites" />
                  <p>
                    Pages on this site may include embedded content (e.g. videos,
                    images, articles, etc.). Embedded content from other websites
                    behaves in the exact same way as if the visitor has visited the
                    other website directly.
                  </p>
                  <p className="mt-4">
                    These websites may collect data about you, use cookies, embed
                    additional third-party tracking, and monitor your interaction with
                    that embedded content — including if you have an account and are
                    logged in to that website.
                  </p>
                  <InfoBox className="mt-4">
                    Our Privacy Policy applies only to our website. If you click on a
                    link to another website, you should read their privacy policy.
                  </InfoBox>
                </section>

                <Divider />

                {/* Retention */}
                <section id="retention" className="scroll-mt-24">
                  <SectionHeading number="5" title="How Long We Retain Your Data" />
                  <p>
                    If you submit a message or comment via our contact form, the
                    submission and its metadata are retained for as long as necessary to
                    respond to your enquiry and fulfil our legal obligations.
                  </p>
                  <p className="mt-4">
                    For users who have registered on our website (if applicable), we
                    also store the personal information they provide in their user
                    profile. All users can see, edit, or delete their personal
                    information at any time (except they cannot change their username).
                    Website administrators can also see and edit that information.
                  </p>
                </section>

                <Divider />

                {/* Your Rights */}
                <section id="your-rights" className="scroll-mt-24">
                  <SectionHeading number="6" title="What Rights You Have Over Your Data" />
                  <p>
                    If you have an account on this site, or have submitted contact
                    forms, you can request to receive an exported file of the personal
                    data we hold about you, including any data you have provided to us.
                  </p>
                  <p className="mt-4">
                    You can also request that we erase any personal data we hold about
                    you. This does not include any data we are obliged to keep for
                    administrative, legal, or security purposes.
                  </p>
                </section>

                <Divider />

                {/* Data Transfer */}
                <section id="data-transfer" className="scroll-mt-24">
                  <SectionHeading number="7" title="Where We Send Your Data" />
                  <p>
                    Visitor enquiries and contact form submissions may be reviewed
                    through automated spam detection services. We do not sell your data
                    to third parties.
                  </p>
                </section>

                <Divider />

                {/* Data Protection Rights */}
                <section id="data-protection" className="scroll-mt-24">
                  <SectionHeading number="8" title="What Are Your Data Protection Rights?" />
                  <p>
                    DAS Healthcare Providers would like to make sure you are fully aware
                    of all your data protection rights. Every user is entitled to the
                    following:
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      {
                        right: "The right to access",
                        desc: "You have the right to request copies of your personal data from DAS Healthcare Providers. We may charge a small fee for this service.",
                      },
                      {
                        right: "The right to rectification",
                        desc: "You have the right to request that DAS Healthcare Providers correct any information you believe is inaccurate or complete information you believe is incomplete.",
                      },
                      {
                        right: "The right to erasure",
                        desc: "You have the right to request that DAS Healthcare Providers erase your personal data, under certain conditions.",
                      },
                      {
                        right: "The right to restrict processing",
                        desc: "You have the right to request that DAS Healthcare Providers restrict the processing of your personal data, under certain conditions.",
                      },
                      {
                        right: "The right to object to processing",
                        desc: "You have the right to object to DAS Healthcare Providers processing your personal data, under certain conditions.",
                      },
                      {
                        right: "The right to data portability",
                        desc: "You have the right to request that DAS Healthcare Providers transfer your data to another organisation, or directly to you, under certain conditions.",
                      },
                    ].map((item) => (
                      <li
                        key={item.right}
                        className="bg-blue-50 border border-blue-100 rounded-xl p-4"
                      >
                        <strong className="text-blue-900 block mb-1">
                          {item.right}
                        </strong>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </li>
                    ))}
                  </ul>
                  <InfoBox className="mt-6">
                    If you make a request, we have one month to respond to you. To
                    exercise any of these rights, please contact us at{" "}
                    <a
                      href="mailto:admin@dascareproviders.com"
                      className="text-blue-700 font-semibold hover:underline"
                    >
                      admin@dascareproviders.com
                    </a>
                    .
                  </InfoBox>
                </section>

                <Divider />

                {/* Changes */}
                <section id="changes" className="scroll-mt-24">
                  <SectionHeading number="9" title="Changes to Our Privacy Policy" />
                  <p>
                    DAS Healthcare Providers keeps its privacy policy under regular
                    review and places any updates on this page. This Privacy Policy was
                    last updated on{" "}
                    <strong className="text-blue-900">9th July 2019</strong>.
                  </p>
                  <p className="mt-4">
                    If you have any questions about this Privacy Policy, the data we
                    hold on you, or you would like to exercise one of your data
                    protection rights, please do not hesitate to get in touch.
                  </p>

                  {/* Contact Block */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href="mailto:admin@dascareproviders.com"
                      className="flex items-center gap-3 bg-blue-900 hover:bg-blue-800 transition-colors text-white rounded-2xl px-6 py-4 group"
                    >
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs text-blue-200">Email us at</p>
                        <p className="font-semibold text-sm">
                          admin@dascareproviders.com
                        </p>
                      </div>
                    </a>
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4">
                      <svg
                        className="w-5 h-5 flex-shrink-0 text-blue-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-400">Write to us at</p>
                        <p className="font-medium text-sm text-gray-700">
                          9, Arcus Road, Bromley, Kent, BR1 4NN, UK
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Back Link */}
              <div className="px-8 md:px-12 pb-10">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium text-sm transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ─── Reusable sub-components ─── */

function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900 text-white text-sm font-bold flex-shrink-0">
        {number}
      </span>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function InfoBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-blue-50 border-l-4 border-blue-500 rounded-r-xl px-5 py-4 text-sm text-blue-900 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function Divider() {
  return <hr className="border-gray-100" />;
}
