import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using the Global Approach To Development website and services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <section className="bg-gradient-to-br from-primary via-primary-dark to-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-white/80 text-lg">Last updated: January 2025</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="liquid-glass-surface rounded-2xl p-8 md:p-12 shadow-lg space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted leading-relaxed">
              By accessing and using the Global Approach To Development (GAD) website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. About GAD</h2>
            <p className="text-muted leading-relaxed">
              Global Approach To Development is a registered 501(c)(3) nonprofit organization (EIN: 47-2155496) based in Ontario, California. Our mission is to provide clean water, quality education, and accessible healthcare to communities in West Africa.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Donations</h2>
            <p className="text-muted leading-relaxed mb-3">
              All donations to GAD are tax-deductible to the extent allowed by law. By making a donation:
            </p>
            <ul className="list-disc list-inside text-muted space-y-2 ml-4">
              <li>You confirm that you are authorized to make the donation</li>
              <li>Donations are processed through secure third-party payment processors (PayPal/Stripe)</li>
              <li>Recurring donations can be cancelled at any time through your donor dashboard</li>
              <li>Refund requests must be submitted within 30 days of the donation</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Use of Website</h2>
            <p className="text-muted leading-relaxed mb-3">You agree to:</p>
            <ul className="list-disc list-inside text-muted space-y-2 ml-4">
              <li>Use the website only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to any part of the website</li>
              <li>Not use the website to transmit any harmful or malicious content</li>
              <li>Not scrape, crawl, or use automated tools to extract content</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property</h2>
            <p className="text-muted leading-relaxed">
              All content on this website, including text, images, logos, and design elements, is the property of GAD or its content suppliers and is protected by copyright law. You may share our content with proper attribution.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
            <p className="text-muted leading-relaxed">
              GAD strives to provide accurate information about our programs and impact. However, we make no warranties about the completeness or accuracy of the information on this website. GAD shall not be liable for any damages arising from the use of this website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Privacy</h2>
            <p className="text-muted leading-relaxed">
              Your use of this website is also governed by our{" "}
              <a href="/privacy" className="text-primary hover:text-primary-dark underline">Privacy Policy</a>.
              We are committed to protecting your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Changes to Terms</h2>
            <p className="text-muted leading-relaxed">
              GAD reserves the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated revision date. Continued use of the website after changes constitutes acceptance of the new terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact</h2>
            <p className="text-muted leading-relaxed">
              For questions about these Terms of Service, contact us at{" "}
              <a href="mailto:info@gapdev.org" className="text-primary hover:text-primary-dark underline">info@gapdev.org</a>{" "}
              or call <a href="tel:9097288111" className="text-primary hover:text-primary-dark underline">909-728-8111</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
