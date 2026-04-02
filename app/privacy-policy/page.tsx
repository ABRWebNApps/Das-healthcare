import Navbar from "@/components/Navigation";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy | DAS Healthcare Providers",
  description:
    "Read the DAS Healthcare Providers privacy and cookie policy to understand how we collect, use, and protect your personal data.",
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
              Privacy &amp; Cookie Policy
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              Your privacy matters to us. This policy explains what personal
              data DAS Healthcare Providers Limited collects, how we use it,
              your rights under applicable data protection law, and how we use
              cookies.
            </p>
            <p className="text-blue-200 text-sm mt-4">
              Last updated:{" "}
              <span className="font-semibold">2nd April, 2026</span>
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto space-y-8">

            {/* ── PRIVACY STATEMENT ── */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-blue-900 px-8 py-6">
                <h2 className="text-white text-2xl font-bold">
                  Privacy Statement for DAS Healthcare Providers Limited
                </h2>
                <p className="text-blue-200 text-sm mt-1">
                  Accessible from{" "}
                  <a
                    href="https://www.dascareproviders.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white transition-colors"
                  >
                    www.dascareproviders.com
                  </a>
                </p>
              </div>

              {/* Table of Contents */}
              <div className="bg-blue-50 border-b border-blue-100 p-8">
                <h3 className="text-blue-900 font-bold text-base mb-4">
                  Table of Contents
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {[
                    { label: "Who We Are", href: "#who-we-are" },
                    { label: "What Personal Data We Collect", href: "#what-data" },
                    { label: "Contact Forms & Cookies", href: "#cookies" },
                    { label: "Embedded Content", href: "#embedded" },
                    { label: "Analytics", href: "#analytics" },
                    { label: "How Long We Retain Your Data", href: "#retention" },
                    { label: "Your Rights Over Your Data", href: "#your-rights" },
                    { label: "Where We Send Your Data", href: "#data-transfer" },
                    { label: "Data Protection Rights", href: "#data-protection" },
                    { label: "Changes to Our Policy", href: "#changes" },
                    { label: "Cookie Policy", href: "#cookie-policy" },
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

              {/* Privacy Sections */}
              <div className="p-8 md:p-12 space-y-12 text-gray-700 leading-relaxed">

                {/* Who We Are */}
                <section id="who-we-are" className="scroll-mt-24">
                  <SectionHeading number="1" title="Who We Are" />
                  <p>
                    We are{" "}
                    <strong className="text-blue-900">
                      DAS Healthcare Providers Limited (&quot;DAS&quot;)
                    </strong>
                    . Our website address is:{" "}
                    <a
                      href="https://www.dascareproviders.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      https://www.dascareproviders.com
                    </a>
                  </p>
                </section>

                <Divider />

                {/* What Data */}
                <section id="what-data" className="scroll-mt-24">
                  <SectionHeading
                    number="2"
                    title="What Personal Data Do We Collect?"
                  />
                  <p>We collect the following data:</p>
                  <ul className="mt-3 space-y-2">
                    <BulletItem>
                      Personal identification information (name, email address,
                      phone number, etc.)
                    </BulletItem>
                  </ul>
                  <p className="mt-4">
                    You directly provide DAS with most of the data we collect.
                    We collect and process data when you:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <BulletItem>
                      Voluntarily complete our Contact Form
                    </BulletItem>
                    <BulletItem>
                      Register online or place an order for any of our products
                      or services
                    </BulletItem>
                    <BulletItem>
                      Add or view our website via your browser&apos;s cookies
                    </BulletItem>
                  </ul>
                  <p className="mt-4">We collect your data so that we can:</p>
                  <ul className="mt-3 space-y-2">
                    <BulletItem>
                      Process your order and manage your account
                    </BulletItem>
                    <BulletItem>
                      Email you with special products or services we think you
                      might like
                    </BulletItem>
                  </ul>
                  <InfoBox className="mt-4">
                    If you agree, DAS may share your data with our partner
                    companies so that they may offer you their products or
                    services. If you have agreed to receive marketing, you may
                    always opt out at a later date. You have the right at any
                    time to stop DAS Healthcare Providers from contacting you
                    for marketing purposes or giving your data to our partners.
                  </InfoBox>
                  <p className="mt-4 text-sm text-gray-600">
                    When DAS processes your order, it may send your data to, and
                    use the resulting information from, credit reference agencies
                    to prevent fraudulent purchases.
                  </p>
                </section>

                <Divider />

                {/* Cookies */}
                <section id="cookies" className="scroll-mt-24">
                  <SectionHeading number="3" title="Contact Forms &amp; Cookies" />
                  <p>
                    Cookies are text files placed on your computer to collect
                    standard Internet log information and visitor behaviour
                    information. When you visit our website, we may collect
                    information from you automatically through cookies or similar
                    technology.
                  </p>
                  <p className="mt-4">
                    DAS uses cookies in a range of ways to improve your
                    experience on our website, including understanding how you
                    use our website.
                  </p>
                  <p className="mt-4 font-semibold text-gray-900">
                    Our website uses:
                  </p>
                  <ul className="mt-3 space-y-3">
                    <li className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <strong className="text-blue-900">
                        Functionality Cookies
                      </strong>
                      <p className="mt-1 text-sm">
                        DAS uses these cookies so that we recognise you on our
                        website and remember your previously selected
                        preferences. This could include what language you prefer
                        and location you are in. A mix of first-party and
                        third-party cookies are used.
                      </p>
                    </li>
                    <li className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <strong className="text-blue-900">
                        Advertising Cookies
                      </strong>
                      <p className="mt-1 text-sm">
                        DAS uses these cookies to collect information about your
                        visit to our website, the content you viewed, the links
                        you followed and information about your browser, device,
                        and your IP address. DAS sometimes shares some limited
                        aspects of this data with third parties for advertising
                        purposes. We may also share online data collected
                        through cookies with our advertising partners. This
                        means that when you visit another website, you may be
                        shown advertising based on your browsing patterns on our
                        website.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-500">
                    You can set your browser to not accept cookies; however, in
                    a few cases, some of our website features may not function
                    as a result.
                  </p>
                  <p className="mt-3 text-sm">
                    For our Cookie Policy,{" "}
                    <a
                      href="#cookie-policy"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      please see below ↓
                    </a>
                    .
                  </p>
                </section>

                <Divider />

                {/* Embedded Content */}
                <section id="embedded" className="scroll-mt-24">
                  <SectionHeading
                    number="4"
                    title="Embedded Content from Other Websites"
                  />
                  <p>
                    Articles on this site may include embedded content (e.g.
                    videos, images, articles, etc.). Embedded content from other
                    websites behaves in the exact same way as if the visitor has
                    visited the other website.
                  </p>
                  <p className="mt-4">
                    These websites may collect data about you, use cookies,
                    embed additional third-party tracking, and monitor your
                    interaction with that embedded content, including tracking
                    your interaction with the embedded content if you have an
                    account and are logged in to that website.
                  </p>
                  <InfoBox className="mt-4">
                    Our Privacy Policy applies only to our website. If you click
                    on a link to another website, you should read their Privacy
                    Policy.
                  </InfoBox>
                </section>

                <Divider />

                {/* Analytics */}
                <section id="analytics" className="scroll-mt-24">
                  <SectionHeading number="5" title="Analytics" />
                  <p>
                    We may use third-party analytics tools to help us understand
                    how visitors interact with our website. This information is
                    used to improve the site and the services we offer. Analytics
                    data is collected in an anonymised form where possible and is
                    not used to personally identify you.
                  </p>
                </section>

                <Divider />

                {/* Retention */}
                <section id="retention" className="scroll-mt-24">
                  <SectionHeading
                    number="6"
                    title="How Long We Retain Your Data"
                  />
                  <p>
                    If you leave a comment, the comment and its metadata are
                    retained indefinitely. This is so we can recognise and
                    approve any follow-up comments automatically instead of
                    holding them in a moderation queue.
                  </p>
                  <p className="mt-4">
                    For users that register on our website (if any), we also
                    store the personal information they provide in their user
                    profile. All users can see, edit, or delete their personal
                    information at any time (except they cannot change their
                    username). Website administrators can also see and edit that
                    information.
                  </p>
                </section>

                <Divider />

                {/* Your Rights */}
                <section id="your-rights" className="scroll-mt-24">
                  <SectionHeading
                    number="7"
                    title="What Rights You Have Over Your Data"
                  />
                  <p>
                    If you have an account on this site, or have left comments,
                    you can request to receive an exported file of the personal
                    data we hold about you, including any data you have provided
                    to us. You can also request that we erase any personal data
                    we hold about you. This does not include any data we are
                    obliged to keep for administrative, legal, or security
                    purposes.
                  </p>
                </section>

                <Divider />

                {/* Data Transfer */}
                <section id="data-transfer" className="scroll-mt-24">
                  <SectionHeading
                    number="8"
                    title="Where We Send Your Data"
                  />
                  <p>
                    Visitor comments may be checked through an automated spam
                    detection service. We do not sell your personal data to
                    third parties.
                  </p>
                </section>

                <Divider />

                {/* Data Protection Rights */}
                <section id="data-protection" className="scroll-mt-24">
                  <SectionHeading
                    number="9"
                    title="What Are Your Data Protection Rights?"
                  />
                  <p>
                    DAS would like to make sure you are fully aware of all your
                    data protection rights. Every user is entitled to the
                    following:
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      {
                        right: "The right to access",
                        desc: "You have the right to request from DAS Healthcare Providers copies of your personal data. We may charge you a small fee for this service.",
                      },
                      {
                        right: "The right to rectification",
                        desc: "You have the right to request that DAS Healthcare Providers correct any information you believe is incorrect. You also have the right to request DAS Healthcare Limited complete information you believe is incomplete.",
                      },
                      {
                        right: "The right to erasure",
                        desc: "You have the right to request DAS Healthcare Providers erase your personal data, under certain conditions.",
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
                        desc: "You have the right to request that DAS Healthcare Providers transfer the data that we have collected to another organisation, or directly to you, under certain conditions.",
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
                    If you make a request, we have one month to respond to you.
                    To exercise any of these rights, please contact us at{" "}
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
                  <SectionHeading
                    number="10"
                    title="Changes to Our Privacy Policy"
                  />
                  <p>
                    DAS keeps its privacy policy under regular review and places
                    any updates on this page. This Privacy Policy was last
                    updated on{" "}
                    <strong className="text-blue-900">2nd April, 2026</strong>.
                  </p>
                  <p className="mt-4">
                    If you have any questions about DAS Privacy Policy, the data
                    we hold on you, or you would like to exercise one of your
                    data protection rights, please do not hesitate to contact
                    us.
                  </p>

                  {/* Contact Block */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href="mailto:admin@dascareproviders.com"
                      className="flex items-center gap-3 bg-blue-900 hover:bg-blue-800 transition-colors text-white rounded-2xl px-6 py-4"
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
                          DAS Healthcare Providers Limited, 9, Arcus Road,
                          Bromley, Kent, BR1 4NN, UK
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* ── COOKIE POLICY ── */}
            <div
              id="cookie-policy"
              className="bg-white rounded-3xl shadow-xl overflow-hidden scroll-mt-24"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-8 py-6">
                <h2 className="text-white text-2xl font-bold">
                  Cookie Policy for DAS Healthcare Providers Limited
                </h2>
                <p className="text-blue-200 text-sm mt-1">
                  Accessible from{" "}
                  <a
                    href="https://www.dascareproviders.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white transition-colors"
                  >
                    www.dascareproviders.com
                  </a>
                </p>
              </div>

              <div className="p-8 md:p-12 space-y-10 text-gray-700 leading-relaxed">

                {/* What Are Cookies */}
                <section>
                  <CookieSectionHeading title="What Are Cookies" />
                  <p>
                    As is common practice with almost all professional websites,
                    this site uses cookies — tiny files that are downloaded to
                    your computer — to improve your experience. This page
                    describes what information they gather, how we use it, and
                    why we sometimes need to store these cookies. We will also
                    share how you can prevent these cookies from being stored,
                    however this may downgrade or &apos;break&apos; certain elements of
                    the site&apos;s functionality.
                  </p>
                  <p className="mt-3">
                    For more general information on cookies, see the{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/HTTP_cookie"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Wikipedia article on HTTP Cookies
                    </a>
                    .
                  </p>
                </section>

                <Divider />

                {/* How We Use Cookies */}
                <section>
                  <CookieSectionHeading title="How We Use Cookies" />
                  <p>
                    We use cookies for a variety of reasons detailed below.
                    Unfortunately, in most cases there are no industry standard
                    options for disabling cookies without completely disabling
                    the functionality and features they add to this site. It is
                    recommended that you leave all cookies on if you are not
                    sure whether you need them or not, in case they are used to
                    provide a service that you use.
                  </p>
                </section>

                <Divider />

                {/* Disabling Cookies */}
                <section>
                  <CookieSectionHeading title="Disabling Cookies" />
                  <p>
                    You can prevent the setting of cookies by adjusting the
                    settings on your browser (see your browser Help for how to
                    do this). Be aware that disabling cookies will affect the
                    functionality of this and many other websites that you
                    visit. Disabling cookies will usually result in also
                    disabling certain functionality and features of the site.
                    Therefore it is recommended that you do not disable cookies.
                  </p>
                </section>

                <Divider />

                {/* The Cookies We Set */}
                <section>
                  <CookieSectionHeading title="The Cookies We Set" />
                  <ul className="mt-4 space-y-4">
                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <strong className="text-blue-900 block mb-2">
                        Email newsletter related cookies
                      </strong>
                      <p className="text-sm">
                        This site offers newsletter or email subscription
                        services and cookies may be used to remember if you are
                        already registered and whether to show certain
                        notifications which might only be valid to
                        subscribed / unsubscribed users.
                      </p>
                    </li>
                    <li className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <strong className="text-blue-900 block mb-2">
                        Site preferences cookies
                      </strong>
                      <p className="text-sm">
                        In order to provide you with a great experience on this
                        site we provide the functionality to set your
                        preferences for how this site runs when you use it. In
                        order to remember your preferences we need to set
                        cookies so that this information can be called whenever
                        you interact with a page that is affected by your
                        preferences.
                      </p>
                    </li>
                  </ul>
                </section>

                <Divider />

                {/* Third Party Cookies */}
                <section>
                  <CookieSectionHeading title="Third Party Cookies" />
                  <p>
                    In some special cases we also use cookies provided by
                    trusted third parties. The following section details which
                    third party cookies you might encounter through this site.
                  </p>
                  <ul className="mt-4 space-y-4">
                    <li className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                      <strong className="text-blue-900 block mb-2">
                        Google Analytics
                      </strong>
                      <p className="text-sm">
                        This site uses Google Analytics, which is one of the
                        most widespread and trusted analytics solutions on the
                        web for helping us to understand how you use the site
                        and ways that we can improve your experience. These
                        cookies may track things such as how long you spend on
                        the site and the pages that you visit so we can
                        continue to produce engaging content.
                      </p>
                      <p className="text-sm mt-2">
                        For more information on Google Analytics cookies, see
                        the{" "}
                        <a
                          href="https://analytics.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          official Google Analytics page
                        </a>
                        .
                      </p>
                    </li>
                    <li className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                      <strong className="text-blue-900 block mb-2">
                        Feature Testing Cookies
                      </strong>
                      <p className="text-sm">
                        From time to time we test new features and make subtle
                        changes to the way that the site is delivered. When we
                        are still testing new features, these cookies may be
                        used to ensure that you receive a consistent experience
                        whilst on the site, whilst ensuring we understand which
                        optimisations our users appreciate the most.
                      </p>
                    </li>
                    <li className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                      <strong className="text-blue-900 block mb-2">
                        Purchase &amp; Conversion Cookies
                      </strong>
                      <p className="text-sm">
                        As we sell products, it&apos;s important for us to
                        understand statistics about how many visitors to our
                        site actually make a purchase. This is important to you
                        as it means that we can accurately make business
                        predictions that allow us to monitor our advertising and
                        product costs to ensure the best possible price.
                      </p>
                    </li>
                    <li className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                      <strong className="text-blue-900 block mb-2">
                        Affiliate Tracking Cookies
                      </strong>
                      <p className="text-sm">
                        Several partners advertise on our behalf and affiliate
                        tracking cookies simply allow us to see if our customers
                        have come to the site through one of our partner sites
                        so that we can credit them appropriately and where
                        applicable allow our affiliate partners to provide any
                        bonus that they may provide you for making a purchase.
                      </p>
                    </li>
                  </ul>
                </section>

                <Divider />

                {/* More Information */}
                <section>
                  <CookieSectionHeading title="More Information" />
                  <p>
                    If you are still looking for more information then you can
                    contact us through one of our preferred contact methods:
                  </p>
                  <a
                    href="mailto:admin@dascareproviders.com"
                    className="inline-flex items-center gap-3 mt-4 bg-blue-900 hover:bg-blue-800 transition-colors text-white rounded-2xl px-6 py-4"
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
                </section>
              </div>
            </div>

            {/* Back Link */}
            <div className="pb-4">
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
        </section>
      </main>
    </div>
  );
}

/* ─── Reusable sub-components ─── */

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900 text-white text-sm font-bold flex-shrink-0">
        {number}
      </span>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}

function CookieSectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="w-1 h-6 rounded-full bg-blue-500 flex-shrink-0" />
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
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
