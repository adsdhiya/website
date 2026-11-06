import { site } from "./site";

/** Copy for /privacy, /terms and /security. A block is a paragraph (string) or a bullet list (string[]); both may contain inline HTML. */
export type LegalBlock = string | string[];
export type LegalSection = { id: string; h: string; body: LegalBlock[] };
export type LegalDoc = { path: string; eyebrow: string; title: string; heading: string; lede: string; description: string; sections: LegalSection[] };

const { entity, address, jurisdiction } = site.legal;
const mail = `<a href="mailto:${site.mail}">${site.mail}</a>`;
const entityLine = address ? `${entity}, ${address}` : entity;

export const privacy: LegalDoc = {
  path: "/privacy",
  eyebrow: "Privacy",
  title: "Privacy policy · Dhiya Labs",
  heading: "Privacy policy",
  lede: "We collect what you send us and the basics a web host records. We use it to reply to you. No analytics, no advertising and no mailing list.",
  description: "How Dhiya Labs handles personal information collected through dhiya.ai: what we collect, why, who processes it, how long we keep it and your rights.",
  sections: [
    { id: "scope", h: "Who this covers", body: [
      `This policy explains how ${entityLine} ("Dhiya", "we") handles personal information collected through dhiya.ai and when you email us. We decide how and why this information is used, which makes us the controller of it.`,
      `It does not cover information held in DIL, Ayana, Neev, Vitana or Aire on behalf of a customer. That information is governed by the agreement with that customer.`,
    ] },
    { id: "collect", h: "What we collect", body: [
      `<strong>What you send through our forms.</strong> The information depends on the form:`,
      [
        `<strong>Design partner form:</strong> name, work email, company, type of operation, capacity range, and optionally your role and a message.`,
        `<strong>Investor form:</strong> name, email, firm, investment stage, and optionally a message.`,
        `<strong>Both:</strong> the page you submitted the form from.`,
      ],
      `<strong>What you send by email.</strong> Your address and whatever you include in the message.`,
      `<strong>Technical records.</strong> When you visit the site, our hosting provider records standard request details such as your IP address, browser type, the page requested and the time. Fonts and some logos load from third-party services, which also receive your IP address and browser details (see <a href="#providers">Who processes it</a>).`,
      `Please don't send us sensitive personal information, or operational details you would not want in an inbox.`,
    ] },
    { id: "use", h: "How we use it", body: [
      [
        `To read and reply to your enquiry, and to continue the conversation you started.`,
        `To assess a possible design partner or investment relationship, and to take the steps you ask for before any agreement.`,
        `To keep the site running and secure, including investigating abuse.`,
        `To meet legal obligations, and to establish or defend legal claims.`,
      ],
      `Where laws such as the GDPR or UK GDPR require a legal basis, we rely on our legitimate interests in responding to business enquiries and operating a secure site, on steps taken at your request before entering a contract, and on legal obligations where they apply.`,
    ] },
    { id: "not", h: "What we don't do", body: [
      [
        `We don't sell your personal information, or share it for targeted advertising.`,
        `We don't add you to a mailing list because you contacted us.`,
        `We don't use analytics or advertising trackers on this site.`,
        `We don't set cookies on this site.`,
      ],
      `The homepage keeps one small counter in your browser's local or session storage, so the launch introduction stops after ten appearances. It stays in your browser and isn't sent to us, and you can clear it at any time.`,
    ] },
    { id: "providers", h: "Who processes it", body: [
      `We use a small number of service providers to run the site and handle email:`,
      [
        `<strong>Vercel</strong> hosts the site and processes form submissions and request records.`,
        `<strong>Resend</strong> delivers form submissions to our inbox.`,
        `<strong>Our email provider</strong> stores the messages we send and receive.`,
        `<strong>Google Fonts</strong> serves the site's typefaces on every page. Your browser requests them directly from Google.`,
        `<strong>Simple Icons</strong> serves integration logos on some product pages. Your browser requests them directly from its content delivery network.`,
      ],
      `We may also disclose information to professional advisers, to a successor if the business is reorganised or sold, or where the law requires it.`,
    ] },
    { id: "transfers", h: "International transfers", body: [
      `Our providers may process information in the United States and other countries that may not offer the same protections as your own. Where the law requires it, these transfers rely on recognised safeguards such as standard contractual clauses.`,
    ] },
    { id: "retention", h: "How long we keep it", body: [
      `We keep enquiries and related correspondence for as long as we need them to handle the conversation and any relationship that follows, and for any longer period required to meet legal obligations or resolve disputes. Request records are kept for the limited periods set by our hosting provider. You can ask us to delete your information at any time.`,
    ] },
    { id: "rights", h: "Your rights", body: [
      `Depending on where you live, including under the GDPR, UK GDPR, India's Digital Personal Data Protection Act and US state privacy laws, you may have the right to:`,
      [
        `Access the personal information we hold about you and receive a copy.`,
        `Correct it, or have it deleted.`,
        `Object to or restrict how we use it, or withdraw consent where we rely on consent.`,
        `Complain to your local data protection authority.`,
      ],
      `To use any of these rights, email ${mail}. We may need to confirm your identity first, and we will respond within the time the law requires. We won't treat you differently for exercising them.`,
    ] },
    { id: "security", h: "Security", body: [
      `We use technical and organisational measures appropriate to the information we hold. No system is perfectly secure, so we can't guarantee absolute security. Our <a href="/security">security page</a> has more detail and explains how to report a vulnerability.`,
    ] },
    { id: "children", h: "Children", body: [
      `This site is for businesses and investors. It is not directed at children, and we don't knowingly collect their personal information. If you believe a child has contacted us, email us and we will delete what they sent.`,
    ] },
    { id: "changes", h: "Changes to this policy", body: [
      `We will post any changes here and update the date at the top of this page. If a change materially affects information we already hold about you and we have a way to reach you, we will tell you directly.`,
    ] },
    { id: "contact", h: "Contact", body: [
      `For questions or requests about your personal information, email ${mail} or write to ${entityLine}.`,
    ] },
  ],
};

export const terms: LegalDoc = {
  path: "/terms",
  eyebrow: "Terms",
  title: "Terms of use · Dhiya Labs",
  heading: "Terms of use",
  lede: "These terms cover your use of dhiya.ai. Using our products or joining the design partner programme is covered by a separate written agreement.",
  description: "The terms that apply to your use of the Dhiya Labs website, dhiya.ai, including acceptable use, intellectual property and limits on liability.",
  sections: [
    { id: "agreement", h: "Using this site", body: [
      `dhiya.ai is operated by ${entityLine} ("Dhiya", "we"). By using the site you agree to these terms. If you don't agree, please don't use it. If you use the site on behalf of a company, you confirm that you are authorised to accept these terms for it.`,
    ] },
    { id: "products", h: "Our products", body: [
      `DIL, Ayana, Neev, Vitana and Aire are under active development with a small number of design partners. Descriptions on this site show what we are building and may change.`,
      `Screens, sample names, customers and figures on this site are illustrative. They are not real customer data or promised results.`,
      `Nothing on this site is an offer to supply a product or a commitment to deliver a feature or date. Any product access is governed by a separate written agreement, which takes priority over these terms.`,
    ] },
    { id: "investors", h: "Investor information", body: [
      `The investor section and investor form exist so that investors can contact the founders. Nothing on this site is an offer to sell, or a solicitation to buy, any security, and nothing on it is investment, legal or tax advice.`,
    ] },
    { id: "acceptable", h: "Acceptable use", body: [
      `You may browse, link to and share the site for lawful purposes. You must not:`,
      [
        `Try to gain unauthorised access to the site or the systems behind it, except for good-faith research that follows our <a href="/security#report">security reporting guidance</a>.`,
        `Disrupt the site, overload it, or introduce malicious code.`,
        `Send spam, or submit false information or content that is unlawful or infringes anyone's rights.`,
        `Impersonate anyone, or misrepresent your connection with a person or company.`,
        `Suggest that Dhiya endorses you or your product without our written permission.`,
      ],
      `Automated access that follows our <a href="/robots.txt">robots.txt</a> and does not degrade the site is fine.`,
    ] },
    { id: "submissions", h: "What you send us", body: [
      `Please make sure what you send us is accurate and that you are entitled to share it. Our forms and general email are for first contact. Don't send confidential information through them, because we don't owe you a duty of confidentiality for it unless we have agreed one in writing. Our <a href="/privacy">privacy policy</a> explains how we handle personal information.`,
    ] },
    { id: "ip", h: "Intellectual property", body: [
      `We or our licensors own the site and its content, including its text, design, graphics, video and software. The Dhiya, DIL, Ayana, Neev, Vitana and Aire names and logos are ours. These terms give you permission to view and use the site as described here, and no other rights.`,
      `Third-party names and logos shown as integrations belong to their owners. They identify systems our products connect to, or plan to connect to, and don't imply any partnership or endorsement.`,
    ] },
    { id: "links", h: "Third-party sites", body: [
      `Links to other sites are provided for convenience. We don't control those sites and aren't responsible for their content or practices.`,
    ] },
    { id: "disclaimer", h: "No warranties", body: [
      `We work to keep the site accurate and available, but we provide it "as is" and "as available". To the extent the law allows, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy and non-infringement. Don't rely on this site alone when making an operational, purchasing or investment decision.`,
    ] },
    { id: "liability", h: "Limits on liability", body: [
      `To the extent the law allows, Dhiya will not be liable for indirect, incidental, special or consequential loss, or for loss of profits, revenue, data or goodwill, arising from your use of this site. Our total liability arising from your use of this site is limited to USD 100.`,
      `Nothing in these terms excludes or limits liability that cannot be excluded or limited by law, including liability for fraud, or any rights you have that cannot be waived under the law that applies to you.`,
    ] },
    { id: "suspension", h: "Changes and access", body: [
      `We may change, suspend or withdraw any part of the site, and may restrict access if these terms are broken. We may update these terms by posting a new version here and changing the date at the top of this page. Continuing to use the site after that means you accept the new version.`,
    ] },
    { id: "law", h: "Governing law", body: [
      `These terms are governed by the laws of ${jurisdiction}, and the courts of ${jurisdiction} have jurisdiction over any dispute about them, except where the law that applies to you gives you a right to bring a claim elsewhere. If part of these terms can't be enforced, the rest still applies.`,
    ] },
    { id: "contact", h: "Contact", body: [
      `Questions about these terms can go to ${mail}.`,
    ] },
  ],
};

export const security: LegalDoc = {
  path: "/security",
  eyebrow: "Security",
  title: "Security · Dhiya Labs",
  heading: "Security",
  lede: "A data centre's record covers its power paths, its customers and its contracts. Here is how we approach protecting it, and how to report a problem.",
  description: "How Dhiya Labs approaches security across the DIL platform and this website, including deployment options, encryption, access control, audit and vulnerability reporting.",
  sections: [
    { id: "stage", h: "Where we are", body: [
      `DIL and its products are in development with a small number of design partners, so this page describes our approach, not a certification. The controls for a deployment are confirmed with each design partner in writing, and that agreement takes priority over this page.`,
    ] },
    { id: "platform", h: "How the platform is built", body: [
      [
        `<strong>Deployment.</strong> Hosted by us, in your own cloud account, or on the floor for air-gapped sites, so the deployment can follow the site's requirements.`,
        `<strong>Encryption.</strong> Data is encrypted at rest and in transit, with keys you can hold.`,
        `<strong>Tenant isolation.</strong> DIL is multi-tenant by design, with isolation per tenant. Customer views show a customer only their own floor.`,
        `<strong>Access.</strong> Single sign-on and roles connect to your identity provider and directories.`,
        `<strong>Audit.</strong> Every write is attributed. Approvals, overrides and edits are kept, with who and when.`,
        `<strong>Connectors.</strong> Each connection to a BMS, EPMS, DCIM, ITSM, finance or identity system has an owner, a mapping and a mismatch report.`,
        `<strong>Your data.</strong> You can take full exports on demand.`,
      ],
    ] },
    { id: "assurance", h: "Security reviews", body: [
      `We expect operators, especially sovereign and regulated sites, to review us closely. We don't list certifications on this page. If your review needs specific attestations, questionnaires or architecture detail, email ${mail} and we will tell you where we stand.`,
    ] },
    { id: "website", h: "This website", body: [
      [
        `The site is mostly static pages, with one server route for the contact forms.`,
        `It has no user accounts or payments, and takes no product or customer data.`,
        `Traffic is served over HTTPS.`,
        `Form submissions are passed on by email. The site doesn't keep them in a database of its own.`,
      ],
      `Our <a href="/privacy">privacy policy</a> explains what the site collects and which providers process it.`,
    ] },
    { id: "report", h: "Report a vulnerability", body: [
      `If you think you have found a security issue in dhiya.ai or a Dhiya product, email ${mail} with "Security" in the subject line. Include the affected address or component, the steps to reproduce it and the impact you expect. We aim to acknowledge reports within two working days and will keep you informed as we investigate.`,
      `When you research an issue, please:`,
      [
        `Test only as far as you need to demonstrate the issue.`,
        `Don't access, change or keep data that isn't yours. If you reach any by accident, stop and tell us.`,
        `Don't run denial-of-service tests or social engineering, and don't touch any customer's site or systems.`,
        `Give us reasonable time to fix the issue before you share it publicly.`,
      ],
      `We won't pursue legal action against anyone who researches and reports in good faith within these guidelines. We don't currently run a paid bug bounty.`,
    ] },
  ],
};
