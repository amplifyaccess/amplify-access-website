import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════
   AMPLIFY ACCESS — Brand System
   Typography: Sora (headings) + Inter (body)
   Colours: Deep Violet → Dark Indigo → Teal → Soft Aqua
   Accent: Rose Magenta / Deep Pink
   ═══════════════════════════════════════════════ */

const C = {
  deepViolet: "#512EA8",
  darkIndigo: "#333077",
  teal: "#007EA0",
  softAqua: "#4CC9D9",
  roseMagenta: "#CC689B",
  deepPink: "#B45275",
  white: "#FFFFFF",
  offWhite: "#F6F4FB",
  lightLavender: "#EDE8F5",
  darkText: "#1E1A3A",
  bodyText: "#3D3860",
  mutedText: "#6B6590",
};

const GRAD = {
  primary: `linear-gradient(135deg, ${C.deepViolet}, ${C.teal})`,
  full: `linear-gradient(135deg, ${C.darkIndigo}, ${C.deepViolet}, ${C.teal}, ${C.softAqua})`,
  hero: `linear-gradient(160deg, ${C.darkIndigo} 0%, ${C.deepViolet} 45%, ${C.teal} 100%)`,
  dark: `linear-gradient(160deg, ${C.darkIndigo} 0%, ${C.deepViolet} 100%)`,
  accent: `linear-gradient(135deg, ${C.deepPink}, ${C.roseMagenta})`,
};

const pages = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "social-enterprise", label: "Social Enterprise" },
  { id: "advocacy", label: "Advocacy" },
  { id: "work-with-us", label: "Work With Us" },
  { id: "contact", label: "Contact" },
];

/* ─── Brand Logo wordmark ─── */
function BrandLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="lg" x1="0" y1="100" x2="100" y2="0">
            <stop offset="0%" stopColor={C.darkIndigo}/>
            <stop offset="40%" stopColor={C.deepViolet}/>
            <stop offset="80%" stopColor={C.teal}/>
            <stop offset="100%" stopColor={C.softAqua}/>
          </linearGradient>
        </defs>
        <path d="M30 75L20 45L50 30L80 20L70 55L50 65Z" fill="url(#lg)" opacity="0.9"/>
        <path d="M55 15L65 5L75 15L68 15L68 35L62 35L62 15Z" fill={C.softAqua}/>
        <path d="M72 40C78 36 82 30 84 23" stroke={C.teal} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7"/>
        <path d="M76 48C84 42 90 33 93 22" stroke={C.softAqua} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5"/>
        <path d="M80 56C90 48 97 37 99 24" stroke={C.softAqua} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3"/>
      </svg>
      <span style={{
        fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18,
        color: C.white, letterSpacing: "-0.01em",
      }}>
        AMPLIFY <span style={{ fontWeight: 400, color: C.softAqua }}>ACCESS</span>
      </span>
    </div>
  );
}

/* ─── Signal Wave decoration ─── */
function SignalWaves({ style = {} }) {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" style={{ ...style, opacity: 0.12 }}>
      <path d="M10 70C30 50 50 30 70 20" stroke={C.softAqua} strokeWidth="3" strokeLinecap="round"/>
      <path d="M20 75C45 52 65 30 90 15" stroke={C.teal} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M35 78C60 55 80 32 110 10" stroke={C.roseMagenta} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

/* ─── Dot Grid decoration ─── */
function DotGrid({ style = {} }) {
  return (
    <div style={{ position: "absolute", opacity: 0.04, ...style, display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 18 }}>
      {Array.from({ length: 48 }).map((_, i) => (
        <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: C.softAqua }} />
      ))}
    </div>
  );
}

/* ─── Navigation ─── */
function Nav({ current, setCurrent }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(30,26,58,0.97)" : "rgba(30,26,58,0.85)",
      backdropFilter: "blur(16px)",
      borderBottom: scrolled ? `1px solid ${C.deepViolet}44` : "1px solid transparent",
      transition: "all 0.3s",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 68,
      }}>
        <button onClick={() => setCurrent("home")} style={{ background: "none", border: "none", cursor: "pointer" }} aria-label="Home">
          <BrandLogo />
        </button>
        <div style={{ display: "flex", gap: 2, alignItems: "center" }} className="desktop-nav">
          {pages.map((p) => (
            <button key={p.id} onClick={() => setCurrent(p.id)} style={{
              background: current === p.id ? `${C.deepViolet}33` : "transparent",
              border: "none", color: current === p.id ? C.softAqua : "rgba(255,255,255,0.75)",
              padding: "8px 16px", borderRadius: 8, cursor: "pointer",
              fontFamily: "'Inter', sans-serif", fontSize: 14,
              fontWeight: current === p.id ? 500 : 400, transition: "all 0.2s",
            }}>{p.label}</button>
          ))}
        </div>
        <button className="mobile-menu-btn" onClick={() => setOpen(!open)} style={{
          background: "none", border: "none", color: C.white, cursor: "pointer",
          fontSize: 26, display: "none", lineHeight: 1,
        }} aria-label="Menu">{open ? "✕" : "☰"}</button>
      </div>
      {open && (
        <div className="mobile-dropdown" style={{
          background: "rgba(30,26,58,0.98)", padding: "8px 28px 28px",
          display: "flex", flexDirection: "column", gap: 2,
        }}>
          {pages.map((p) => (
            <button key={p.id} onClick={() => { setCurrent(p.id); setOpen(false); }} style={{
              background: current === p.id ? `${C.deepViolet}33` : "transparent",
              border: "none", color: current === p.id ? C.softAqua : "rgba(255,255,255,0.75)",
              padding: "14px 16px", borderRadius: 8, cursor: "pointer",
              fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 400, textAlign: "left",
            }}>{p.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Shared Components ─── */
function Footer({ setCurrent }) {
  return (
    <footer style={{
      background: C.darkIndigo, color: "rgba(255,255,255,0.6)",
      padding: "72px 28px 36px", fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 48,
      }}>
        <div>
          <div style={{ marginBottom: 16 }}><BrandLogo /></div>
          <p style={{ fontSize: 14, lineHeight: 1.7 }}>
            Turning Up the Volume on Disability Rights.<br />
            A disability-led social enterprise delivering consultancy, training, and independent advocacy across Australia.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, color: C.white, marginBottom: 14, fontSize: 14 }}>Navigate</div>
          {pages.map((p) => (
            <button key={p.id} onClick={() => setCurrent(p.id)} style={{
              display: "block", background: "none", border: "none",
              color: "rgba(255,255,255,0.5)", cursor: "pointer",
              fontFamily: "'Inter', sans-serif", fontSize: 14, padding: "5px 0", textAlign: "left",
            }}>{p.label}</button>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, color: C.white, marginBottom: 14, fontSize: 14 }}>Get In Touch</div>
          <p style={{ fontSize: 14, lineHeight: 1.9 }}>
            hello@amplifyaccess.com.au<br />ABN: [To be registered]<br />Australia-wide service delivery
          </p>
        </div>
      </div>
      <div style={{
        maxWidth: 1200, margin: "48px auto 0", paddingTop: 24,
        borderTop: `1px solid ${C.deepViolet}44`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12, fontSize: 13,
      }}>
        <span>© {new Date().getFullYear()} Amplify Access Pty Ltd. All rights reserved.</span>
        <span style={{ color: C.softAqua, fontWeight: 500 }}>Disability-led · Disability-owned · Independent</span>
      </div>
    </footer>
  );
}

function Section({ children, bg = C.white, style = {} }) {
  return (
    <section style={{ background: bg, padding: "88px 28px", ...style }}>
      <div style={{ maxWidth: 1020, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function SectionTitle({ children, sub, light }) {
  return (
    <div style={{ marginBottom: 44 }}>
      <h2 style={{
        fontFamily: "'Sora', sans-serif", fontSize: "clamp(28px, 4vw, 40px)",
        fontWeight: 600, color: light ? C.white : C.darkText,
        lineHeight: 1.25, marginBottom: sub ? 16 : 0, letterSpacing: "-0.005em",
      }}>{children}</h2>
      {sub && <p style={{
        fontSize: 17, lineHeight: 1.65, color: light ? "rgba(255,255,255,0.8)" : C.bodyText,
        maxWidth: 680, fontFamily: "'Inter', sans-serif",
      }}>{sub}</p>}
    </div>
  );
}

function CTAButton({ children, onClick, variant = "primary", style = {} }) {
  const s = {
    primary: { background: GRAD.primary, color: C.white, border: "none", boxShadow: `0 4px 20px ${C.deepViolet}40` },
    outline: { background: "transparent", color: C.white, border: "2px solid rgba(255,255,255,0.35)" },
    dark: { background: C.darkIndigo, color: C.white, border: "none", boxShadow: `0 4px 20px ${C.darkIndigo}30` },
  };
  return (
    <button onClick={onClick} style={{
      ...s[variant] || s.primary, padding: "15px 34px", borderRadius: 12,
      fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 15,
      cursor: "pointer", transition: "all 0.3s", ...style,
    }}>{children}</button>
  );
}

function ValueCard({ icon, title, text, accentColor }) {
  return (
    <div style={{
      background: C.white, borderRadius: 16, padding: "32px 28px",
      boxShadow: "0 1px 16px rgba(51,48,119,0.06)",
      border: `1px solid ${C.deepViolet}0A`, position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: accentColor || GRAD.primary, borderRadius: "16px 16px 0 0",
      }} />
      <div style={{
        width: 44, height: 44, borderRadius: 11, background: `${C.deepViolet}0D`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 18, fontSize: 20,
      }}>{icon}</div>
      <h3 style={{
        fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: 18,
        color: C.darkText, marginBottom: 10, lineHeight: 1.3,
      }}>{title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: C.bodyText, fontFamily: "'Inter', sans-serif" }}>{text}</p>
    </div>
  );
}

/* ─── Page Header (reused across pages) ─── */
function PageHeader({ title, subtitle }) {
  return (
    <section style={{ background: GRAD.hero, padding: "140px 28px 88px", position: "relative", overflow: "hidden" }}>
      <DotGrid style={{ bottom: 40, right: 60 }} />
      <SignalWaves style={{ position: "absolute", top: 90, right: 60 }} />
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
        <h1 style={{
          fontFamily: "'Sora', sans-serif", fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 700, color: C.white, lineHeight: 1.15,
          letterSpacing: "-0.01em", marginBottom: 22,
        }}>{title}</h1>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.82)", fontFamily: "'Inter', sans-serif" }}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}

function Prose({ children }) {
  return <p style={{ fontSize: 16, lineHeight: 1.75, color: C.bodyText, marginBottom: 20, fontFamily: "'Inter', sans-serif" }}>{children}</p>;
}

function H2({ children, mt }) {
  return <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 32, color: C.darkText, marginBottom: 22, lineHeight: 1.25, marginTop: mt ? 44 : 0 }}>{children}</h2>;
}

function BulletList({ items, colors }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%", marginTop: 7, flexShrink: 0,
            background: colors ? colors[i % colors.length] : C.deepViolet,
          }} />
          <p style={{ fontSize: 16, lineHeight: 1.7, color: C.bodyText, fontFamily: "'Inter', sans-serif" }}>{item}</p>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGES
   ═══════════════════════════════════════════════ */

function HomePage({ go }) {
  return (
    <>
      {/* HERO */}
      <section style={{
        background: GRAD.hero, padding: "150px 28px 110px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 75% 25%, ${C.teal}18 0%, transparent 55%),
                       radial-gradient(ellipse at 25% 85%, ${C.roseMagenta}0C 0%, transparent 50%)`,
        }} />
        <DotGrid style={{ top: 60, right: 40 }} />
        <SignalWaves style={{ position: "absolute", top: 100, right: 80 }} />
        <div style={{ maxWidth: 1020, margin: "0 auto", position: "relative" }}>
          <div style={{
            display: "inline-block", background: `${C.deepViolet}55`,
            border: `1px solid ${C.softAqua}30`, borderRadius: 100, padding: "7px 22px", marginBottom: 30,
          }}>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
              color: C.softAqua, letterSpacing: "0.06em",
            }}>DISABILITY-LED SOCIAL ENTERPRISE</span>
          </div>
          <h1 style={{
            fontFamily: "'Sora', sans-serif", fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 700, color: C.white, lineHeight: 1.12,
            letterSpacing: "-0.01em", marginBottom: 26, maxWidth: 780,
          }}>
            Turning Up the Volume on{" "}
            <span style={{
              background: `linear-gradient(135deg, ${C.softAqua}, ${C.teal})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Disability Rights</span>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "clamp(16px, 2vw, 19px)",
            lineHeight: 1.7, color: "rgba(255,255,255,0.82)", maxWidth: 620, marginBottom: 44,
          }}>
            Expert disability inclusion consultancy and training — designed and delivered by disabled people. Because the experience is the expertise.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <CTAButton onClick={() => go("services")}>Explore Our Services →</CTAButton>
            <CTAButton variant="outline" onClick={() => go("about")}>Learn More</CTAButton>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <Section bg={C.offWhite}>
        <SectionTitle sub="We deliver commercially viable, rights-based disability inclusion services — and channel profits into independent advocacy free from government conditions.">
          A Different Kind of Consultancy
        </SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 24 }}>
          <ValueCard icon="🎤" title="Lived Experience Led" accentColor={GRAD.primary}
            text="Every service is designed and delivered by disabled people. Not as a token — as the primary analytical and professional framework." />
          <ValueCard icon="⚖️" title="Rights-Based Approach" accentColor={C.teal}
            text="We work from the CRPD and the social model of disability. Rights are entitlements, not aspirations. We treat them as such." />
          <ValueCard icon="🔓" title="Independent Advocacy" accentColor={GRAD.accent}
            text="Our commercial income funds advocacy that is free from government conditions. Financial independence enables political independence." />
        </div>
      </Section>

      {/* SERVICES PREVIEW */}
      <Section>
        <SectionTitle sub="Six specialist service lines, each grounded in the knowledge that only comes from navigating disability every day.">What We Do</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
          {[
            { t: "Disability Awareness & Inclusion Training", d: "Tailored training for corporates, government, and NFPs — not off-the-shelf compliance modules." },
            { t: "Motivational Speaking & Keynotes", d: "Disability-led keynotes that challenge assumptions and make the case for rights, not reassurance." },
            { t: "NDIS Provider Training", d: "Rights-based training for providers grounded in participant experience, not provider risk management." },
            { t: "Business Access Consultancy", d: "We assess the real experience of disabled people navigating your spaces, products, and services." },
            { t: "Disability Inclusion Action Plans", d: "Substantive DIAPs with real actions, accountable parties, and measurable outcomes." },
            { t: "Business Toolkits", d: "Practical, affordable guides for organisations that want to improve disability inclusion independently." },
          ].map((s, i) => (
            <div key={i} onClick={() => go("services")} style={{
              padding: "28px 24px", borderRadius: 14, border: `1px solid ${C.lightLavender}`,
              cursor: "pointer", transition: "all 0.25s", background: C.white,
            }}>
              <div style={{
                width: 32, height: 3, borderRadius: 2, marginBottom: 18,
                background: [C.deepViolet, C.teal, C.roseMagenta][i % 3],
              }} />
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: 17, color: C.darkText, marginBottom: 8, lineHeight: 1.3 }}>{s.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: C.bodyText, fontFamily: "'Inter', sans-serif" }}>{s.d}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <CTAButton variant="dark" onClick={() => go("services")}>View All Services →</CTAButton>
        </div>
      </Section>

      {/* QUOTE */}
      <section style={{ background: GRAD.dark, padding: "88px 28px", position: "relative", overflow: "hidden" }}>
        <SignalWaves style={{ position: "absolute", bottom: 10, left: 40, transform: "scaleX(-1)" }} />
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", background: `${C.deepViolet}66`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px", fontSize: 28, color: C.softAqua, fontFamily: "Georgia, serif",
          }}>"</div>
          <p style={{
            fontFamily: "'Sora', sans-serif", fontSize: "clamp(19px, 3vw, 26px)",
            fontWeight: 500, color: C.white, lineHeight: 1.55, marginBottom: 28,
          }}>
            If it is about disabled people, it is delivered by disabled people. This is not a preference. It is a non-negotiable condition of the Amplify Access brand.
          </p>
          <div style={{ width: 56, height: 3, borderRadius: 2, margin: "0 auto", background: GRAD.primary }} />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <Section bg={C.offWhite}>
        <SectionTitle sub="We occupy the space no other consultancy fills — specialist, lived experience-led, rights-based disability services at a professional commercial standard.">
          Why Clients Choose Us
        </SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { l: "Specific, not generic", t: "Every engagement is scoped to your context. No standard slide decks delivered to every audience." },
            { l: "Honest, not reassuring", t: "We tell you what you're getting wrong, not just what you're doing well. Organisations that want to actually improve find our directness valuable." },
            { l: "Credible in the room", t: "When a disabled facilitator delivers training, the authority in the room is different. The experience described is first-hand." },
            { l: "Independent", t: "We don't have funding relationships with government that constrain what we say. We can name what is wrong without hedging." },
            { l: "A social enterprise", t: "Engaging us contributes directly to independent disability advocacy. Your investment creates change beyond the engagement itself." },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", gap: 20, alignItems: "flex-start",
              background: C.white, padding: "26px 28px", borderRadius: 14,
              border: `1px solid ${C.lightLavender}`,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: GRAD.primary,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                color: C.white, fontWeight: 700, fontFamily: "'Sora', sans-serif", fontSize: 15,
              }}>{i + 1}</div>
              <div>
                <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: 17, color: C.darkText, marginBottom: 6 }}>{item.l}</h4>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: C.bodyText, fontFamily: "'Inter', sans-serif" }}>{item.t}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section style={{ background: GRAD.full, padding: "88px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${C.roseMagenta}08 0%, transparent 60%)` }} />
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 600, color: C.white, marginBottom: 18 }}>Ready to work with us?</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: 36, fontFamily: "'Inter', sans-serif" }}>
            Whether you need training, a keynote, an access audit, or a full inclusion action plan — we'd love to hear from you.
          </p>
          <CTAButton onClick={() => go("contact")} style={{ background: C.white, color: C.deepViolet, boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}>Get In Touch →</CTAButton>
        </div>
      </section>
    </>
  );
}

function AboutPage({ go }) {
  return (
    <>
      <PageHeader title="About Amplify Access" subtitle="A disability-led, disability-owned social enterprise founded on a simple premise: the people who live disability every day are the best people to advise on it." />
      <Section>
        <div style={{ maxWidth: 740 }}>
          <H2>What We Are</H2>
          <Prose>Amplify Access is a disability-led social enterprise operating across Australia. We deliver commercially viable consultancy and training services in disability inclusion, access, and rights — services delivered by disabled people, grounded in lived experience, and designed to generate real change rather than performative compliance.</Prose>
          <Prose>We operate on a dual mandate. The first is commercial: to build a financially sustainable business that displaces mediocre, non-disabled-led disability consultancy from the market by delivering services that are categorically better because they are informed by the people who live the experience every day.</Prose>
          <Prose>The second is political: to channel the profits of that commercial activity into advocacy, activism, peer support, and lobbying that is fully independent of government funding and government conditions — advocacy that can say what needs to be said, without the self-censorship that dependency on institutional goodwill demands.</Prose>
          <H2 mt>The Problem We Exist to Solve</H2>
          <Prose>The Australian disability sector has two interconnected problems. The consultancy market is crowded but shallow — organisations routinely hire non-disabled consultants, engage generic diversity firms with no specialist disability expertise, or commission tick-box access audits that satisfy compliance without producing genuine inclusion.</Prose>
          <Prose>Meanwhile, Australian disability advocacy is structurally compromised by its funding relationships. The organisations with the most resources depend on government funding and are, by the nature of those relationships, constrained in how forcefully they can challenge the governments that fund them. Amplify Access exists to break this pattern.</Prose>
          <H2 mt>Our Disability Rights Framework</H2>
          <Prose>We operate from a disability rights framework, not a charity or welfare framework. Disability is not a personal deficit or a medical condition to be fixed. It is a social and political status produced by the interaction between impairment and an environment that excludes and disadvantages those who do not conform.</Prose>
          <Prose>The Convention on the Rights of Persons with Disabilities (CRPD) is not background context for our work — it is the normative framework we apply. Our commercial services help organisations understand and give effect to those rights. Our advocacy work holds governments and institutions accountable when they fail to.</Prose>
        </div>
      </Section>
      <Section bg={C.offWhite}>
        <SectionTitle>Our Values</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 22 }}>
          {[
            { t: "Disability Leadership", d: "Disabled people are not the subject of our work — they are the authors of it. Leadership, decision-making, and service delivery are held by disabled people at every level.", c: C.deepViolet },
            { t: "Rights-Based Practice", d: "We operate from a human rights framework grounded in the CRPD. Rights are not aspirations or best practice guidelines. They are entitlements.", c: C.teal },
            { t: "Commercial Integrity", d: "We operate as a genuine business. We charge fair rates, deliver high-quality services, and maintain the professional standards that commercial clients expect.", c: C.darkIndigo },
            { t: "Advocacy Independence", d: "Our advocacy is not constrained by funder relationships, ministerial sensitivities, or institutional goodwill. We say what needs to be said.", c: GRAD.accent },
            { t: "Access in Practice", d: "We model the accessibility we advocate for. Our services, communications, and working practices are themselves accessible.", c: C.softAqua },
            { t: "Dignity & Fair Pay", d: "Every disabled person who delivers services through Amplify Access is paid at a rate that recognises the value of their lived experience expertise.", c: C.roseMagenta },
          ].map((v, i) => <ValueCard key={i} icon="◆" title={v.t} text={v.d} accentColor={v.c} />)}
        </div>
      </Section>
      <section style={{ background: GRAD.dark, padding: "88px 28px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(19px, 3vw, 24px)", fontWeight: 500, color: C.white, lineHeight: 1.6 }}>
            We are a business built by and for disabled people, that pays disabled people to do work they are expert at, and uses the proceeds to fund the kind of disability rights work that actually needs to happen.
          </p>
          <div style={{ marginTop: 36 }}><CTAButton onClick={() => go("services")}>Explore Our Services →</CTAButton></div>
        </div>
      </section>
    </>
  );
}

function ServicesPage({ go }) {
  const svcs = [
    { title: "Disability Awareness & Inclusion Training", who: "Corporate organisations, government agencies, NFPs, educational institutions, healthcare providers, local governments", how: "In-person, online, or hybrid. Half-day to multi-session programs.", detail: "Substantively different from the generic equalities and diversity training that saturates the corporate market, because it is designed and delivered by people who live disability every day. Training is tailored to your sector, size, and specific inclusion challenges — never off-the-shelf. Content covers the social model, disability etiquette, invisible disabilities, legal obligations, access conversations, and moving from compliance culture to inclusion culture.", color: C.deepViolet },
    { title: "Motivational Speaking & Keynote Presentations", who: "Conference organisers, corporate events, government agencies, universities, sector peak bodies, community events", how: "In-person or online. 30 minutes to full-day facilitation.", detail: "Our speakers don't deliver comfortable reassurance. They deliver keynote addresses that make the case for disability rights, challenge assumptions, and draw on lived experience to make abstract principles viscerally concrete. Topics span disability rights and the CRPD, NDIS systemic failures, workplace inclusion, accessible design, guardianship reform, and activism.", color: C.teal },
    { title: "NDIS Provider Training", who: "NDIS registered and unregistered providers, support coordinators, plan managers, disability support workers, team leaders and managers", how: "In-person, online, or hybrid. Standalone workshops or multi-session programs.", detail: "Training grounded in participant rights, not provider risk management. We train on participant rights and the CRPD, supported decision-making versus substituted decision-making, dignity of risk, abuse prevention from a rights framework, trauma-informed practice, and building genuine choice and control into daily support delivery.", color: C.roseMagenta },
    { title: "Business Access Consultancy", who: "Corporates, government, local government, retail, hospitality, property developers, education, healthcare", how: "Site visits, digital reviews, written reports, follow-up advisory sessions.", detail: "We assess the actual experience of disabled people navigating your physical spaces, digital products, communications, and services — and we tell you what you're actually getting wrong. Engagements produce a written report with prioritised, actionable recommendations that distinguish between quick wins and longer-term structural changes.", color: C.deepViolet },
    { title: "Disability Inclusion Action Plans (DIAPs)", who: "NSW local councils (mandated), state government agencies, universities, large corporates, NFPs, healthcare organisations", how: "Consultative engagement including workshops, stakeholder interviews, and document production.", detail: "DIAPs that are substantive rather than performative. We develop plans with real actions, responsible parties, timeframes, and measurable outcomes, informed by meaningful engagement with disabled people. Our process includes baseline assessment, stakeholder consultation, gap analysis against the CRPD, drafting, and implementation support.", color: C.teal },
    { title: "Business Toolkits", who: "SMEs, NFPs, community organisations, government agencies — any organisation wanting self-directed practical resources", how: "Downloadable digital products in accessible formats. Facilitated orientation sessions available.", detail: "Practical, usable resources for organisations that want to improve disability inclusion independently. Topics include reasonable adjustments, accessible recruitment, accessible communications, disability-inclusive events, supporting disabled clients, and navigating the NDIS as a provider. Written in plain English, designed for practical use.", color: C.roseMagenta },
  ];
  return (
    <>
      <PageHeader title="Our Services" subtitle="Six specialist service lines, each designed and delivered by disabled people. Every engagement comes with our lived experience guarantee." />
      <Section>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {svcs.map((s, i) => (
            <div key={i} style={{
              background: C.white, borderRadius: 18, padding: "36px 32px",
              border: `1px solid ${C.lightLavender}`, boxShadow: "0 1px 12px rgba(51,48,119,0.04)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: s.color, borderRadius: "18px 0 0 18px" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, background: `${s.color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: s.color, fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, flexShrink: 0,
                }}>{i + 1}</div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: "clamp(18px, 2.5vw, 24px)", color: C.darkText, lineHeight: 1.3 }}>{s.title}</h3>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: C.bodyText, marginBottom: 22, fontFamily: "'Inter', sans-serif" }}>{s.detail}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
                {[{ label: "Who It's For", val: s.who }, { label: "Delivery Format", val: s.how }].map((meta, j) => (
                  <div key={j} style={{ background: C.offWhite, borderRadius: 10, padding: "14px 18px" }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, color: C.teal, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>{meta.label}</div>
                    <p style={{ fontSize: 14, color: C.bodyText, lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{meta.val}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <section style={{ background: GRAD.dark, padding: "88px 28px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 600, color: C.white, marginBottom: 18, lineHeight: 1.3 }}>The Lived Experience Guarantee</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.82)", fontFamily: "'Inter', sans-serif", marginBottom: 36 }}>
            Every Amplify Access service is designed and delivered by disabled people. This applies to every client engagement, every training delivery, every speaking engagement, and every toolkit we produce. No exceptions.
          </p>
          <CTAButton onClick={() => go("contact")}>Enquire About a Service →</CTAButton>
        </div>
      </section>
    </>
  );
}

function SocialEnterprisePage({ go }) {
  return (
    <>
      <PageHeader title="Our Social Enterprise Model" subtitle="Commercial independence enables political independence. We earn our money from the market — that is what makes our advocacy genuinely free." />
      <Section>
        <div style={{ maxWidth: 740 }}>
          <H2>How It Works</H2>
          <Prose>Amplify Access is structured as a social enterprise: a commercially operated business whose purpose extends beyond profit to the achievement of a defined social mission. We earn income from the market through high-quality, lived experience-led services. That revenue covers operating costs, pays disabled service deliverers at fair rates, and generates a surplus. A defined proportion of that surplus is directed to our advocacy mission.</Prose>
          <Prose>This model is unusual in the Australian disability context. Most disability advocacy organisations depend on government grants precisely because commercial income is hard to generate. Amplify Access is built from the start to develop commercial capabilities, because the alternative — permanent dependency on a government that disability advocates must also hold accountable — is a structural contradiction the sector has tolerated for too long.</Prose>
          <H2 mt>The Profit-to-Advocacy Commitment</H2>
          <Prose>A documented percentage of annual net profits is directed to advocacy activities. This commitment is embedded in our Social Enterprise Charter and publicly reported every year. The more commercially successful Amplify Access becomes, the more independent advocacy it can sustain.</Prose>
          <H2 mt>Governance & Accountability</H2>
          <Prose>We are incorporated as a proprietary limited company with all director and shareholder roles held by disabled people. We publish a Social Enterprise Charter, maintain a Conflicts of Interest Policy, and produce an annual public report covering revenue, advocacy distributions, and Advisory Circle input.</Prose>
          <Prose>We are honest about our governance structure. We are not a charity in the conventional sense, not a traditional DPO with a volunteer board, and not dependent on government goodwill. We are a commercial enterprise with a social mission at its core, and we are transparent about what that means.</Prose>
        </div>
      </Section>
      <Section bg={C.offWhite}>
        <SectionTitle>What Makes Us Different</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 22 }}>
          <ValueCard icon="◈" title="Not a Traditional DPO" accentColor={C.deepViolet} text="We are not a member-elected organisation with a representative board. We are a disability-led enterprise with an advisory mechanism that informs but does not govern." />
          <ValueCard icon="◈" title="Not a Mainstream D&I Firm" accentColor={C.teal} text="We do not offer generic D&I consulting with a disability module added. We offer specialist, lived experience-led disability inclusion services. This is our entire focus." />
          <ValueCard icon="◈" title="Not a Charity" accentColor={C.roseMagenta} text="We do not accept government grants and do not operate from a needs-based or welfare framework. We are commercially funded, socially purposed, and rights-oriented." />
          <ValueCard icon="◈" title="Not Government Dependent" accentColor={C.darkIndigo} text="Our commercial income means we can take positions, run campaigns, and produce advocacy that a grant-dependent organisation cannot. This is intentional and irreversible." />
        </div>
      </Section>
    </>
  );
}

function AdvocacyPage({ go }) {
  return (
    <>
      <PageHeader title="The Advocacy Mission" subtitle="You cannot hold accountable the people who pay you. Independent income is the precondition for independent advocacy." />
      <Section>
        <div style={{ maxWidth: 740 }}>
          <H2>Why Independent Advocacy Matters</H2>
          <Prose>Australia's disability advocacy landscape is structurally compromised. The organisations with the most resources depend on government funding, creating a structural disincentive to advocate forcefully against the governments they are supposed to hold accountable.</Prose>
          <Prose>The result is that the most consequential advocacy — the campaigns that name systemic abuse, challenge unlawful policy, and demand legislative reform — falls to underfunded grassroots activists doing it unpaid and unsupported. Amplify Access exists, in part, to change this.</Prose>
        </div>
      </Section>
      <Section bg={C.offWhite} style={{ paddingTop: 0 }}>
        <SectionTitle>What the Advocacy Fund Supports</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 22 }}>
          <ValueCard icon="📋" title="Advocacy Resources & Toolkits" accentColor={C.deepViolet} text="Free resources that equip disabled people to navigate complex systems — NDIS planning, guardianship, Centrelink, self-advocacy guides — developed by disabled people and distributed without paywalls." />
          <ValueCard icon="🤝" title="Peer Support & Community" accentColor={C.teal} text="Funding for peer support networks, community-led mutual aid, grassroots disability collectives, and peer-led workshops. We fund what already exists rather than building new structures." />
          <ValueCard icon="📢" title="Lobbying & Policy Advocacy" accentColor={C.roseMagenta} text="Funding disabled advocates to prepare submissions, commissioning policy analysis, and supporting direct participation in formal consultation processes." />
          <ValueCard icon="✊" title="Activism & Campaigns" accentColor={C.darkIndigo} text="Support for campaigns that expose systemic abuse, challenge unlawful NDIS decisions, resist erosion of legal capacity rights, and hold governments accountable." />
        </div>
      </Section>
      <Section>
        <div style={{ maxWidth: 740 }}>
          <H2>The Advisory Circle</H2>
          <Prose>Advocacy priorities are informed by disabled people through a structured Advisory Circle — 5 to 8 disabled people with diverse disability experience who are paid for their time, meet quarterly, and whose input shapes advocacy decisions. This is a genuine accountability mechanism, not a tokenistic consultation process.</Prose>
          <H2 mt>What Independence Means in Practice</H2>
          <BulletList colors={[C.deepViolet, C.teal, C.roseMagenta, C.softAqua]} items={[
            "No government funding for advocacy activities. The advocacy fund receives its income from commercial profits only.",
            "No self-censorship in exchange for access to government officials, consultation processes, or sector networks.",
            "No institutional capture. Advocacy positions are not determined by what peak bodies or government agencies consider appropriate.",
            "Full transparency. Our funding model is public. Our values are public. Our positions are public.",
          ]} />
        </div>
      </Section>
    </>
  );
}

function WorkWithUsPage({ go }) {
  return (
    <>
      <PageHeader title="Work With Us" subtitle="Amplify Access is built by disabled people. If you're a disabled person with lived experience expertise, we want to hear from you." />
      <Section>
        <div style={{ maxWidth: 740 }}>
          <H2>Join Our Service Delivery Roster</H2>
          <Prose>Every person who delivers a service for Amplify Access is a disabled person. Lived experience of disability is the primary credential — it is valued, credited, and compensated accordingly.</Prose>
          <Prose>Service deliverers are engaged as independent contractors on a per-engagement basis, with clear service agreements, transparent rates, and prompt payment. As the enterprise grows, employment arrangements will be offered where appropriate.</Prose>
          <H2 mt>What We Look For</H2>
          <BulletList items={[
            "Lived experience of disability as the primary credential — direct personal experience of the systems, barriers, and contexts relevant to the services being delivered",
            "Ability to communicate that experience clearly and compellingly to a range of audiences, including those unfamiliar with or resistant to disability rights frameworks",
            "Alignment with Amplify Access values: rights-based practice, dignity, honesty, and a commitment to advocacy independence",
            "Willingness to engage in briefing, preparation, and post-engagement review processes",
            "Reliability and professional conduct in client-facing contexts",
            "Formal qualifications are welcomed but not required",
          ]} />
        </div>
      </Section>
      <Section bg={C.offWhite} style={{ paddingTop: 0 }}>
        <SectionTitle>Our Commitments to You</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 22 }}>
          <ValueCard icon="💰" title="Fair & Dignified Pay" accentColor={C.deepViolet} text="Rates at or above market rate for equivalent specialist consultancy. No below-market rates because 'it's for a good cause'. Preparation time is compensated." />
          <ValueCard icon="♿" title="Access Needs Accommodated" accentColor={C.teal} text="Your access requirements are treated as legitimate operational considerations from the outset — flexible scheduling, format adjustments, communication preferences, and on-the-day support." />
          <ValueCard icon="🎙️" title="Autonomy & Authentic Voice" accentColor={C.roseMagenta} text="You bring your own perspective and expertise. We don't script or sanitise your content. Quality is assured through briefing and dialogue, not homogenisation." />
          <ValueCard icon="📈" title="Professional Growth" accentColor={C.darkIndigo} text="Opportunities to lead programs, mentor newer deliverers, contribute to service design and toolkit development, and present at sector events." />
        </div>
      </Section>
      <section style={{ background: GRAD.full, padding: "88px 28px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 500, color: C.white, lineHeight: 1.6, marginBottom: 36 }}>
            Interested in joining our roster? We'd love to hear from you.
          </p>
          <CTAButton onClick={() => go("contact")} style={{ background: C.white, color: C.deepViolet, boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}>Get In Touch →</CTAButton>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHeader title="Get In Touch" subtitle="Whether you're a potential client, a disabled person interested in joining our roster, or someone who wants to know more — we'd love to hear from you." />
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 28, maxWidth: 820 }}>
          {[
            { title: "Client Enquiries", desc: "Interested in disability awareness training, a keynote speaker, an access audit, a DIAP, or NDIS provider training? Tell us what you need and we'll respond with a clear proposal within 24 hours.", email: "hello@amplifyaccess.com.au", accent: GRAD.primary },
            { title: "Join Our Roster", desc: "If you're a disabled person interested in delivering training, speaking, or consultancy through Amplify Access, we welcome your expression of interest. No formal qualifications required — lived experience is the credential.", email: "join@amplifyaccess.com.au", accent: GRAD.accent },
          ].map((card, i) => (
            <div key={i} style={{ background: C.offWhite, borderRadius: 18, padding: 36, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: card.accent }} />
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: 22, color: C.darkText, marginBottom: 20, lineHeight: 1.3 }}>{card.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: C.bodyText, marginBottom: 20, fontFamily: "'Inter', sans-serif" }}>{card.desc}</p>
              <div style={{ background: C.white, borderRadius: 12, padding: "16px 20px" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, color: C.teal, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>Email</div>
                <p style={{ fontSize: 16, color: C.darkText, fontFamily: "'Sora', sans-serif", fontWeight: 500 }}>{card.email}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, background: GRAD.dark, borderRadius: 18, padding: 40, maxWidth: 820, position: "relative", overflow: "hidden" }}>
          <SignalWaves style={{ position: "absolute", bottom: 5, right: 20, transform: "scaleX(-1)" }} />
          <div style={{ position: "relative" }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: 22, color: C.white, marginBottom: 18, lineHeight: 1.3 }}>Our Accessibility Commitment</h3>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.82)", fontFamily: "'Inter', sans-serif" }}>
              We are committed to making all our communications accessible. If you need information in a different format, require an alternative way to make contact, or have any access requirements for an engagement, please let us know and we will accommodate them. This website meets WCAG 2.1 AA as a minimum standard.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ═══════════════════════════════════════════════
   APP ROOT
   ═══════════════════════════════════════════════ */
export default function App() {
  const [current, setCurrent] = useState("home");
  const go = (page) => { setCurrent(page); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const renderPage = () => {
    const p = { go };
    switch (current) {
      case "home": return <HomePage {...p} />;
      case "about": return <AboutPage {...p} />;
      case "services": return <ServicesPage {...p} />;
      case "social-enterprise": return <SocialEnterprisePage {...p} />;
      case "advocacy": return <AdvocacyPage {...p} />;
      case "work-with-us": return <WorkWithUsPage {...p} />;
      case "contact": return <ContactPage />;
      default: return <HomePage {...p} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: C.bodyText, lineHeight: 1.6, minHeight: "100vh", background: C.white }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        button { transition: transform 0.15s ease, opacity 0.2s ease; }
        button:hover { opacity: 0.92; }
        button:active { transform: scale(0.98); }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-dropdown { display: none !important; }
        }
        ::selection { background: ${C.deepViolet}30; color: ${C.darkText}; }
      `}</style>
      <Nav current={current} setCurrent={go} />
      <main>{renderPage()}</main>
      <Footer setCurrent={go} />
    </div>
  );
}
