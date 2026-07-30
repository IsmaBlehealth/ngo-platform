import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Global Approach To Development. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero — liquid glass */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/old-site/intro-images/scrolling-1.jpg"
            alt="Privacy"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        <div
          className="absolute left-0 top-0 h-full w-full md:w-[55%] z-10 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, rgba(0,30,15,0.75) 0%, rgba(0,50,25,0.55) 50%, rgba(0,30,15,0.1) 85%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 z-20">
          <h1 className="text-4xl font-bold text-white sm:text-5xl" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.7)" }}>
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.85)" }}>
            How we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl liquid-glass-surface p-8 shadow-lg">
            <p className="text-sm text-muted">Last updated: January 2025</p>

            <h2 className="mt-8 text-3xl font-bold text-primary">1. Information We Collect</h2>
            <p className="mt-3 text-muted leading-relaxed">
              When you visit our website, we may collect personal information you voluntarily provide, including:
            </p>
            <ul className="mt-2 list-disc pl-6 text-muted leading-relaxed">
              <li>Name and email address (via contact forms or donations)</li>
              <li>Phone number (optional, via contact forms)</li>
              <li>Payment information (processed securely through Stripe or PayPal)</li>
              <li>Account credentials (when you create an account)</li>
            </ul>

            <h2 className="mt-8 text-3xl font-bold text-primary">2. How We Use Your Information</h2>
            <p className="mt-3 text-muted leading-relaxed">
              We use your personal information to:
            </p>
            <ul className="mt-2 list-disc pl-6 text-muted leading-relaxed">
              <li>Process donations and send confirmation receipts</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send updates about our programs and impact (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="mt-8 text-3xl font-bold text-primary">3. Data Protection</h2>
            <p className="mt-3 text-muted leading-relaxed">
              We implement industry-standard security measures to protect your personal information. Payment data is processed through PCI-compliant providers (Stripe and PayPal) and is never stored on our servers.
            </p>

            <h2 className="mt-8 text-3xl font-bold text-primary">4. Third-Party Services</h2>
            <p className="mt-3 text-muted leading-relaxed">
              We use the following third-party services that may collect information:
            </p>
            <ul className="mt-2 list-disc pl-6 text-muted leading-relaxed">
              <li>Stripe (payment processing) - <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a></li>
              <li>PayPal (payment processing) - <a href="https://www.paypal.com/webapps/mpp/ua/privacy-full" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a></li>
            </ul>

            <h2 className="mt-8 text-3xl font-bold text-primary">5. Cookies</h2>
            <p className="mt-3 text-muted leading-relaxed">
              Our website uses essential cookies for authentication and security. We do not use tracking cookies or third-party analytics that compromise your privacy.
            </p>

            <h2 className="mt-8 text-3xl font-bold text-primary">6. Your Rights</h2>
            <p className="mt-3 text-muted leading-relaxed">
              You have the right to:
            </p>
            <ul className="mt-2 list-disc pl-6 text-muted leading-relaxed">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>

            <h2 className="mt-8 text-3xl font-bold text-primary">7. Contact Us</h2>
            <p className="mt-3 text-muted leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2 text-muted leading-relaxed">
              Global Approach To Development<br />
              3200 E. Guasti Rd., Suite 100<br />
              Ontario, CA 91761<br />
              Email: info@gapdev.org<br />
              Phone: (909) 728-8111
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
