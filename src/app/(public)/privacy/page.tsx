export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Global Approach To Development.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            How we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-3xl prose prose-sm">
          <p className="text-sm text-muted">Last updated: January 2025</p>

          <h2 className="mt-8 text-2xl font-bold">1. Information We Collect</h2>
          <p className="mt-3 text-muted">
            When you visit our website, we may collect personal information you voluntarily provide, including:
          </p>
          <ul className="mt-2 list-disc pl-6 text-muted">
            <li>Name and email address (via contact forms or donations)</li>
            <li>Phone number (optional, via contact forms)</li>
            <li>Payment information (processed securely through Stripe or PayPal)</li>
            <li>Account credentials (when you create an account)</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold">2. How We Use Your Information</h2>
          <p className="mt-3 text-muted">
            We use your personal information to:
          </p>
          <ul className="mt-2 list-disc pl-6 text-muted">
            <li>Process donations and send confirmation receipts</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send updates about our programs and impact (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold">3. Data Protection</h2>
          <p className="mt-3 text-muted">
            We implement industry-standard security measures to protect your personal information. Payment data is processed through PCI-compliant providers (Stripe and PayPal) and is never stored on our servers.
          </p>

          <h2 className="mt-8 text-2xl font-bold">4. Third-Party Services</h2>
          <p className="mt-3 text-muted">
            We use the following third-party services that may collect information:
          </p>
          <ul className="mt-2 list-disc pl-6 text-muted">
            <li>Stripe (payment processing) - <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a></li>
            <li>PayPal (payment processing) - <a href="https://www.paypal.com/webapps/mpp/ua/privacy-full" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a></li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold">5. Cookies</h2>
          <p className="mt-3 text-muted">
            Our website uses essential cookies for authentication and security. We do not use tracking cookies or third-party analytics that compromise your privacy.
          </p>

          <h2 className="mt-8 text-2xl font-bold">6. Your Rights</h2>
          <p className="mt-3 text-muted">
            You have the right to:
          </p>
          <ul className="mt-2 list-disc pl-6 text-muted">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of marketing communications at any time</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold">7. Contact Us</h2>
          <p className="mt-3 text-muted">
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2 text-muted">
            Global Approach To Development<br />
            3200 E. Guasti Rd., Suite 100<br />
            Ontario, CA 91761<br />
            Email: info@gapdev.org<br />
            Phone: (909) 728-8111
          </p>
        </div>
      </section>
    </>
  );
}
