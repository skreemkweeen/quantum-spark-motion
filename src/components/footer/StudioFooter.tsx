import React from "react";
import { Mail, MapPin, Dribbble, Instagram, Linkedin, Twitter } from "lucide-react";
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/hover-footer";

export function StudioFooter() {
  const footerLinks = [
    {
      title: "SERVICES",
      links: [
        { label: "UX / UI Design", href: "#" },
        { label: "Brand Identity", href: "#" },
        { label: "Web Design", href: "#" },
        { label: "Motion Design", href: "#" },
        { label: "Art Direction", href: "#" },
      ],
    },
    {
      title: "STUDIO",
      links: [
        { label: "About", href: "#" },
        { label: "Work", href: "#" },
        { label: "Process", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  ];

  const dim = "rgba(255,255,255,0.40)";
  const dimmer = "rgba(255,255,255,0.35)";

  const contactInfo = [
    {
      icon: <Mail size={14} style={{ color: dimmer }} />,
      text: "hello@elementux.studio",
      href: "mailto:hello@elementux.studio",
    },
    {
      icon: <MapPin size={14} style={{ color: dimmer }} />,
      text: "Remote — Worldwide",
    },
  ];

  const socialLinks = [
    { icon: <Dribbble size={16} />, label: "Dribbble", href: "#" },
    { icon: <Instagram size={16} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={16} />, label: "X / Twitter", href: "#" },
    { icon: <Linkedin size={16} />, label: "LinkedIn", href: "#" },
  ];

  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden text-white"
      style={{ background: "#050508" }}
    >
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, #000 30%, transparent 80%)",
        }}
      />

      <FooterBackgroundGradient />

      {/* Top separator */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pt-24 md:px-12 md:pt-32">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand column */}
          <div className="md:col-span-5">
            <p
              className="text-[10px] uppercase tracking-[0.32em]"
              style={{ color: dimmer }}
            >
              EST. 2024
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
              ELEMENT UX
            </h3>
            <p
              className="mt-5 max-w-md text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Design and engineering studio building brands, interfaces, and
              motion systems for the next era.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-2">
              <p
                className="text-[10px] uppercase tracking-[0.32em]"
                style={{ color: dimmer }}
              >
                {section.title}
              </p>
              <ul className="mt-5 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-300"
                      style={{ color: dim }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.88)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = dim)
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="md:col-span-3">
            <p
              className="text-[10px] uppercase tracking-[0.32em]"
              style={{ color: dimmer }}
            >
              CONTACT
            </p>
            <ul className="mt-5 space-y-3">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm transition-colors duration-300"
                      style={{ color: dim }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.88)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = dim)
                      }
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-sm" style={{ color: dim }}>
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Thin rule */}
        <div
          aria-hidden
          className="mt-16 h-px w-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-6 py-8 md:flex-row md:items-center">
          {/* Social icons */}
          <div className="flex items-center gap-5">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="transition-colors duration-300"
                style={{ color: "rgba(255,255,255,0.28)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.28)")
                }
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p
            className="text-[10px] uppercase tracking-[0.32em]"
            style={{ color: dimmer }}
          >
            © {new Date().getFullYear()} ELEMENT UX. All rights reserved.
          </p>
        </div>
      </div>

      {/* Large hover text */}
      <div className="relative z-10 h-[18rem] md:h-[26rem] w-full">
        <TextHoverEffect text="ELEMENT UX" duration={0} />
      </div>
    </footer>
  );
}

export default StudioFooter;