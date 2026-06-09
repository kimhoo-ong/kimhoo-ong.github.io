import { socialLinks } from "@/data/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} aria-label={label}>
          <Icon className="size-4" aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </section>
  );
}
