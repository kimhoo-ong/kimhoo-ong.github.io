import type { ReactNode } from "react";
import { Download } from "lucide-react";
import { profile, socialLinks } from "@/data/portfolio";

type HeroSectionProps = {
  skillsPanel: ReactNode;
};

export function HeroSection({ skillsPanel }: HeroSectionProps) {
  return (
    <section id="about" className="portfolio-band hero-section">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:py-3">
        <a href="#about" className="flex items-center gap-3 font-black">
          <span className="pixel-heart" aria-hidden="true" />
          <span className="text-xl text-slate-950">{profile.name}</span>
        </a>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => {
            const external = href.startsWith("http");
            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="grid size-10 place-items-center rounded-md text-[#172747] transition hover:bg-white hover:shadow-sm"
              >
                <Icon className="size-5" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </nav>

      <div className="hero-fit-grid mx-auto grid w-full max-w-7xl items-start gap-10 px-5 pb-9 pt-4 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:pb-4 lg:pt-3">
        <div className="hero-copy">
          <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-normal text-slate-950 sm:text-6xl lg:whitespace-nowrap lg:text-[2.1rem] xl:text-5xl">
            Hi, I&apos;m {profile.shortName}
          </h1>
          <p className="mt-3 text-2xl font-extrabold text-[#31466f] sm:text-3xl lg:mt-1.5 lg:text-lg xl:text-2xl">
            {profile.positioning}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#172747] sm:text-xl lg:mt-2 lg:max-w-xl lg:text-[0.8rem] lg:leading-[1.35] xl:text-base xl:leading-7">
            {profile.heroDescription}
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#41577d] lg:mt-1.5 lg:max-w-xl lg:text-[0.78rem] lg:leading-[1.3] xl:text-sm xl:leading-6">
            {profile.heroSupport}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-5">
            <a href="/hrdf-certificate.pdf" download className="primary-button">
              Download HRDF Certificate
              <Download className="size-4" aria-hidden="true" />
            </a>
            <a href="/resume.pdf" download className="secondary-button">
              Download Resume
              <Download className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="skills-fit-panel pt-1 lg:pt-2" id="contact">
          {skillsPanel}
        </div>
      </div>
    </section>
  );
}
