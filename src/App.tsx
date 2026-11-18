import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { siteImages, galleryImages } from "./assets.generated";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flower2,
  Heart,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";

const PHONE = "+18187643088";
const PHONE_LABEL = "(818) 764-3088";
const MAPS_URL = "https://maps.app.goo.gl/VNqh8QbVGU9fU5ZG7";
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=12650+Sherman+Way+Ste+2%2C+North+Hollywood%2C+CA+91605";

const portfolio = [siteImages.hero, ...galleryImages, siteImages.studio];

const services = [
  {
    number: "01",
    title: "Manicure",
    subtitle: "A fresh start for your nails",
    description:
      "From a clean, natural look to a glossy color finish, find the manicure style that feels like you.",
    tags: ["Natural nails", "Gel polish"],
    icon: "✳",
  },
  {
    number: "02",
    title: "Pedicure",
    subtitle: "A little time to unwind",
    description:
      "Take a pause and enjoy a refreshed look with a polished finish. Tell your technician what feels comfortable.",
    tags: ["Nail care", "Polish"],
    icon: "✧",
  },
  {
    number: "03",
    title: "Dip powder & nail art",
    subtitle: "Your style, your details",
    description:
      "Explore dipping powder, enhancements and creative designs. Bring a reference and ask the team about your idea.",
    tags: ["Dip powder", "Nail designs"],
    icon: "✦",
  },
  {
    number: "04",
    title: "Waxing",
    subtitle: "More ways to feel refreshed",
    description:
      "Waxing services are also listed among the salon offerings. Call ahead to confirm the current service menu.",
    tags: ["Waxing services", "Call to ask"],
    icon: "✿",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SectionHeading({
  eyebrow,
  title,
  accent,
  copy,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</span>
      <h2>{title} {accent && <em>{accent}</em>}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.88,
      anchors: { offset: -82 },
    });

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeImage !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
        setMenuOpen(false);
      }
      if (activeImage !== null && event.key === "ArrowRight") {
        setActiveImage((activeImage + 1) % portfolio.length);
      }
      if (activeImage !== null && event.key === "ArrowLeft") {
        setActiveImage((activeImage - 1 + portfolio.length) % portfolio.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeImage]);

  const closeMenu = () => setMenuOpen(false);
  const previousImage = () =>
    setActiveImage((current) => current === null ? null : (current - 1 + portfolio.length) % portfolio.length);
  const nextImage = () =>
    setActiveImage((current) => current === null ? null : (current + 1) % portfolio.length);

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: scrollProgress }} aria-hidden="true" />

      <div className="announcement">
        <Sparkles size={13} />
        <span>A LITTLE BEAUTY BREAK IN NORTH HOLLYWOOD</span>
        <Sparkles size={13} />
      </div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="K Nails home" onClick={closeMenu}>
          <span className="brand-mark"><span>K</span><i>✦</i></span>
          <span className="brand-copy">
            <strong>K NAILS</strong>
            <small>NAIL CARE · NORTH HOLLYWOOD</small>
          </span>
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#gallery" onClick={closeMenu}>Inspiration</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#visit" onClick={closeMenu}>Find us</a>
          <a className="nav-cta" href={"tel:" + PHONE} onClick={closeMenu}>
            Call the salon <Phone size={14} />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="hero-copy">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="eyebrow"><span className="eyebrow-mark" />WELCOME TO K NAILS</span>
              <h1>A little luxury.<br />A lot of <em>you.</em></h1>
              <p className="hero-lede">
                Your neighborhood spot for manicures, pedicures, nail designs and a well-deserved beauty break.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href={"tel:" + PHONE}>
                  <Phone size={16} /> Call to check availability
                </a>
                <a className="text-link" href="#services">
                  Explore services <ArrowDown size={15} />
                </a>
              </div>
              <div className="hero-trust">
                <span className="trust-icon"><Heart size={18} /></span>
                <span><strong>A little time just for you</strong><small>Manicure · Pedicure · Nail art · Waxing</small></span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-photo-frame">
              <div className="hero-photo-inner">
                <img
                  src={siteImages.hero.src}
                  srcSet={siteImages.hero.srcSet}
                  sizes="(max-width: 760px) 88vw, 43vw"
                  width={siteImages.hero.width}
                  height={siteImages.hero.height}
                  alt="A glossy soft-pink manicure with delicate nail details"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <span className="photo-stamp"><Sparkles size={13} /> YOUR BEAUTY MOMENT</span>
            </div>
            <motion.div
              className="floating-note"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="floating-note-icon"><Flower2 size={22} /></span>
              <span><strong>Polished to perfection</strong><small>Made to feel like you</small></span>
            </motion.div>
            <span className="hero-side-note">BEAUTY · DETAIL · YOU</span>
          </motion.div>
          <a className="hero-scroll" href="#services"><span />SCROLL TO DISCOVER</a>
        </section>

        <section className="info-ribbon" aria-label="K Nails services and location">
          <div><Sparkles size={17} /><span><strong>Manicure & pedicure</strong><small>Everyday nail care</small></span></div>
          <i />
          <div><Flower2 size={17} /><span><strong>Nail art & dip powder</strong><small>Details to make it yours</small></span></div>
          <i />
          <div><MapPin size={17} /><span><strong>North Hollywood</strong><small>12650 Sherman Way</small></span></div>
          <i />
          <div><Phone size={17} /><span><strong>{PHONE_LABEL}</strong><small>Call for availability</small></span></div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index}>A LITTLE SELF-CARE <i>✦</i> YOUR STYLE, YOUR WAY <i>✦</i> BEAUTY IN THE DETAILS <i>✦</i></span>
            ))}
          </div>
        </div>

        <section className="services-section section-pad" id="services">
          <div className="section-topline">
            <SectionHeading
              eyebrow="THE K NAILS MENU"
              title="Your next favorite"
              accent="look starts here."
              copy="A few ways to refresh your look. Contact the salon for the current service menu, availability and pricing."
            />
            <a className="round-link" href={"tel:" + PHONE} aria-label="Call K Nails">
              <ArrowUpRight size={22} />
            </a>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.article
                className="service-card"
                key={service.number}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.58, delay: index * 0.07 }}
              >
                <div className="service-card-top">
                  <span className="service-number">{service.number}</span>
                  <span className="service-symbol" aria-hidden="true">{service.icon}</span>
                </div>
                <span className="service-subtitle">{service.subtitle}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-tags">
                  {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <a href={"tel:" + PHONE} className="service-link">
                  Ask about this service <ArrowUpRight size={15} />
                </a>
              </motion.article>
            ))}
          </div>
          <div className="service-footnote">
            <Sparkles size={14} />
            <span>Prices and exact service options can change. Please call K Nails for the latest details before your visit.</span>
          </div>
        </section>

        <section className="statement-band">
          <div className="statement-ornament" aria-hidden="true"><Flower2 size={38} /></div>
          <span className="eyebrow">A MOMENT TO FEEL GOOD</span>
          <p>Good nails.<br /><em>Good mood. Just you.</em></p>
          <span className="statement-bottom">YOUR STYLE IS ALWAYS THE RIGHT STYLE</span>
        </section>

        <section className="gallery-section section-pad" id="gallery">
          <div className="gallery-heading">
            <SectionHeading
              eyebrow="A LITTLE NAIL INSPIRATION"
              title="Details make"
              accent="the difference."
              copy="Soft finishes, clean shapes and playful details to help you find your next look."
            />
            <a className="gallery-call-link" href={"tel:" + PHONE}>Have a design in mind? <ArrowUpRight size={15} /></a>
          </div>

          <div className="gallery-grid">
            {portfolio.map((photo, index) => (
              <motion.button
                className={"gallery-item gallery-item-" + (index + 1)}
                type="button"
                key={photo.id}
                onClick={() => setActiveImage(index)}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                aria-label={"View nail inspiration image " + (index + 1)}
              >
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes="(max-width: 760px) 88vw, 31vw"
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="gallery-overlay">
                  <span>{photo.label}</span>
                  <i><ArrowUpRight size={17} /></i>
                </span>
              </motion.button>
            ))}
          </div>
          <p className="gallery-note">Use these looks as inspiration. Ask the K Nails team which designs and finishes are currently available.</p>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="about-visual">
            <div className="about-image-wrap">
              <img
                src={siteImages.studio.src}
                srcSet={siteImages.studio.srcSet}
                sizes="(max-width: 760px) 88vw, 42vw"
                width={siteImages.studio.width}
                height={siteImages.studio.height}
                alt="A close-up of a polished milky-white manicure"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="about-sticker"><span>LOVE</span><Heart size={18} fill="currentColor" /></span>
          </div>
          <div className="about-copy">
            <SectionHeading
              eyebrow="A NEIGHBORHOOD FAVORITE"
              title="Come as you are."
              accent="Leave feeling lovely."
            />
            <p>
              K Nails is a local nail salon in North Hollywood offering manicure, pedicure, nail enhancement and waxing services.
              Whether you have a go-to look or a new idea saved on your phone, let the team know what you have in mind.
            </p>
            <div className="about-points">
              <div><span><Check size={15} /></span><strong>Friendly, welcoming atmosphere</strong></div>
              <div><span><Check size={15} /></span><strong>Manicure, pedicure and nail design options</strong></div>
              <div><span><Check size={15} /></span><strong>Call ahead with questions or special requests</strong></div>
            </div>
            <a className="button button-dark" href={MAPS_URL} target="_blank" rel="noreferrer">
              Visit K Nails <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section className="review-section">
          <div className="review-inner">
            <div className="review-heading">
              <span className="eyebrow"><span className="eyebrow-mark" />THE LOCAL LOVE</span>
              <h2>Little things make<br /><em>a lovely experience.</em></h2>
            </div>
            <div className="review-content">
              <div className="review-topics">
                <span>Friendly team</span><span>Nail designs</span><span>Long-time clients</span>
              </div>
              <p>
                Customers mention the friendly team, creative nail designs, and the familiar neighborhood atmosphere.
                Experiences can vary, so feel free to ask for the service and technician that suit you best.
              </p>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="review-link">
                Read customer reviews <ArrowUpRight size={15} />
              </a>
              <span className="review-caption">REAL CUSTOMER FEEDBACK ON GOOGLE</span>
            </div>
          </div>
        </section>

        <section className="visit-section section-pad" id="visit">
          <div className="visit-heading">
            <SectionHeading
              eyebrow="COME SAY HELLO"
              title="Your next nail"
              accent="day is here."
              copy="Find K Nails on Sherman Way in North Hollywood. Call ahead for current availability and service details."
            />
          </div>
          <div className="visit-layout">
            <div className="visit-card">
              <div className="visit-card-head">
                <span className="visit-icon"><MapPin size={20} /></span>
                <span className="eyebrow">FIND THE SALON</span>
              </div>
              <h3>K Nails</h3>
              <p>12650 Sherman Way, Suite 2<br />North Hollywood, CA 91605</p>
              <a className="visit-detail" href={"tel:" + PHONE}><Phone size={16} /> {PHONE_LABEL}</a>
              <a className="visit-detail" href={MAPS_URL} target="_blank" rel="noreferrer"><MapPin size={16} /> Open Google Maps</a>
              <div className="visit-actions">
                <a className="button button-primary" href={DIRECTIONS_URL} target="_blank" rel="noreferrer">
                  Get directions <ArrowUpRight size={16} />
                </a>
                <a className="visit-call" href={"tel:" + PHONE}>Call now <ArrowRight size={15} /></a>
              </div>
              <span className="visit-small-note"><Clock3 size={13} /> Call to confirm today's hours and availability.</span>
            </div>
            <a className="map-panel" href={DIRECTIONS_URL} target="_blank" rel="noreferrer" aria-label="Open directions to K Nails in Google Maps">
              <div className="map-grid" aria-hidden="true" />
              <span className="map-orbit map-orbit-one" aria-hidden="true" />
              <span className="map-orbit map-orbit-two" aria-hidden="true" />
              <span className="map-pin"><MapPin size={26} fill="currentColor" /></span>
              <span className="map-label"><strong>K NAILS</strong><small>12650 Sherman Way</small></span>
              <span className="map-open">OPEN MAP <ArrowUpRight size={15} /></span>
            </a>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta-sparkle" aria-hidden="true">✦</div>
          <span className="eyebrow">YOUR BEAUTY BREAK IS WAITING</span>
          <h2>Ready for a little<br /><em>glow-up?</em></h2>
          <p>Give the salon a call and plan your next visit.</p>
          <a href={"tel:" + PHONE} className="button button-light"><Phone size={16} /> {PHONE_LABEL}</a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="brand brand-footer" href="#home">
            <span className="brand-mark"><span>K</span><i>✦</i></span>
            <span className="brand-copy"><strong>K NAILS</strong><small>NAIL CARE · NORTH HOLLYWOOD</small></span>
          </a>
          <p>A little luxury.<br /><em>A lot of you.</em></p>
          <div className="footer-actions">
            <a href={"tel:" + PHONE}><Phone size={15} /> Call the salon</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer"><MapPin size={15} /> Find us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} K Nails. All rights reserved.</span>
          <span>North Hollywood, California</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>

      <div className="mobile-action-bar">
        <a href={"tel:" + PHONE}><Phone size={15} /> Call K Nails</a>
        <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer"><MapPin size={15} /> Directions</a>
      </div>

      <AnimatePresence>
        {activeImage !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Nail inspiration image viewer"
          >
            <button className="lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="Close image viewer">
              <X size={22} />
            </button>
            <button
              className="lightbox-arrow lightbox-prev"
              type="button"
              onClick={(event) => { event.stopPropagation(); previousImage(); }}
              aria-label="Previous image"
            ><ChevronLeft size={25} /></button>
            <motion.img
              key={portfolio[activeImage].id}
              src={portfolio[activeImage].largeSrc}
              alt={portfolio[activeImage].alt}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            />
            <button
              className="lightbox-arrow lightbox-next"
              type="button"
              onClick={(event) => { event.stopPropagation(); nextImage(); }}
              aria-label="Next image"
            ><ChevronRight size={25} /></button>
            <span className="lightbox-count">{String(activeImage + 1).padStart(2, "0")} / {String(portfolio.length).padStart(2, "0")}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
