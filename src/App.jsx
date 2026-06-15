import React, { useState, useEffect, useRef } from 'react';

const useFadeIn = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Lotus = ({ op = 0.05, size = 180 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity: op }} className="pointer-events-none select-none">
    <ellipse cx="50" cy="60" rx="12" ry="22" fill="none" stroke="#6B8F71" strokeWidth="1.2" transform="rotate(-30 50 60)" />
    <ellipse cx="50" cy="60" rx="12" ry="22" fill="none" stroke="#6B8F71" strokeWidth="1.2" transform="rotate(30 50 60)" />
    <ellipse cx="50" cy="55" rx="10" ry="26" fill="none" stroke="#6B8F71" strokeWidth="1.2" />
    <ellipse cx="50" cy="60" rx="12" ry="22" fill="none" stroke="#6B8F71" strokeWidth="1.2" transform="rotate(-60 50 60)" />
    <ellipse cx="50" cy="60" rx="12" ry="22" fill="none" stroke="#6B8F71" strokeWidth="1.2" transform="rotate(60 50 60)" />
    <circle cx="50" cy="58" r="4" fill="none" stroke="#6B8F71" strokeWidth="1" />
    <line x1="10" y1="82" x2="90" y2="82" stroke="#6B8F71" strokeWidth="0.6" />
  </svg>
);

const services = [
  { icon: "🧘", title: "Yoga lessen", desc: "Zachte vinyasa en hatha lessen voor elk niveau, in je eigen tempo." },
  { icon: "🌿", title: "Meditatie sessies", desc: "Stil worden en aanwezig zijn — een moment voor jezelf midden in de week." },
  { icon: "👥", title: "Groepslessen", desc: "Samen bewegen in een warme, laagdrempelige omgeving hier in Oostende." },
  { icon: "✨", title: "Privélessen", desc: "Persoonlijke begeleiding op maat, volledig afgestemd op jouw ritme." },
  { icon: "🌊", title: "Ontspanningstherapie", desc: "Ruimte maken voor echte rust, vanuit het lichaam én het hoofd." },
  { icon: "💨", title: "Ademhalingsoefeningen", desc: "Gewoon ademhalen — bewust, diep en herstellend." },
];

const schedule = [
  { dag: "Maandag", les: "Hatha Yoga", tijd: "09:00", duur: "75 min" },
  { dag: "Dinsdag", les: "Meditatie", tijd: "19:00", duur: "60 min", featured: true },
  { dag: "Woensdag", les: "Vinyasa Flow", tijd: "18:30", duur: "75 min" },
  { dag: "Donderdag", les: "Ademwerk", tijd: "10:00", duur: "60 min" },
  { dag: "Vrijdag", les: "Yin Yoga", tijd: "18:00", duur: "90 min", featured: true },
  { dag: "Zaterdag", les: "Groepsles", tijd: "10:30", duur: "75 min" },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [introRef, introVis] = useFadeIn();
  const [servRef, servVis] = useFadeIn();
  const [expRef, expVis] = useFadeIn();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [['#lessen', 'Lessen'], ['#rooster', 'Rooster'], ['#over', 'Over ons'], ['#contact', 'Contact']];

  return (
    <div className="font-[Inter] text-[#2C2C2A] bg-[#F5F2ED]">
      {/* NAV */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-light text-white" style={{ color: scrolled ? '#2C2C2A' : 'white', fontFamily: "'Cormorant Garamond', serif" }}>Yoga & Meditatie Oostende</a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(([href, label]) => (
              <a key={href} href={href} className={`text-sm tracking-wide transition-colors duration-300 ${scrolled ? 'text-[#2C2C2A] hover:text-[#6B8F71]' : 'text-white/90 hover:text-white'}`}>{label}</a>
            ))}
            <a href="#contact" className="inline-flex items-center gap-2 bg-[#6B8F71] text-white text-sm font-medium tracking-wide px-6 py-3 rounded-full hover:bg-[#5a7a60] transition-all duration-500 shadow-sm">Inschrijven</a>
          </div>
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {[0, 1, 2].map(i => (
              <span key={i} className={`block h-px w-6 transition-all duration-300 ${scrolled ? 'bg-[#2C2C2A]' : 'bg-white'} ${menuOpen && i === 0 ? 'rotate-45 translate-y-2' : menuOpen && i === 1 ? 'opacity-0' : menuOpen && i === 2 ? '-rotate-45 -translate-y-2' : ''}`} />
            ))}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[#F0EDE7] px-6 py-4 flex flex-col gap-4">
            {navLinks.map(([href, label]) => <a key={href} href={href} className="text-sm text-[#2C2C2A]" onClick={() => setMenuOpen(false)}>{label}</a>)}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=85" alt="Yoga" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C2C2A]/60 via-[#2C2C2A]/20 to-transparent" />
        <div className="relative z-10 px-6 max-w-3xl">
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-6xl md:text-7xl font-light text-white leading-tight mb-6">Vind rust. <em>Adem.</em> Wees.</h1>
          <p className="text-white/80 text-lg mb-10 font-light">Yoga en meditatie in het hart van Oostende — voor wie even wil stoppen.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#lessen" className="inline-flex items-center justify-center gap-2 bg-[#6B8F71] text-white text-sm font-medium tracking-wide px-8 py-4 rounded-full hover:bg-[#5a7a60] transition-all duration-500 shadow-sm hover:shadow-md">Ontdek de lessen</a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 border border-white/70 text-white text-sm font-medium tracking-wide px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-500">Neem contact op</a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section id="over" className="py-28 px-6 bg-[#F5F2ED]">
        <div ref={introRef} className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${introVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="relative">
            <div className="absolute -top-8 -left-8"><Lotus op={0.06} size={200} /></div>
            <blockquote style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-light text-[#2C2C2A] leading-snug italic relative z-10">
              "Stilte is geen leegte — het is de ruimte waar je jezelf terugvindt."
            </blockquote>
          </div>
          <div>
            <p className="text-[#2C2C2A] text-lg leading-relaxed mb-6">Midden in Oostende, op de Amsterdamstraat, hebben we een plek gecreëerd waar je even kunt stoppen. Geen haast, geen verwachtingen — gewoon aanwezig zijn zoals je bent.</p>
            <p className="text-[#8A8478] leading-relaxed">Of je nu voor het eerst een mat oprolt of al jaren beweegt: hier begin je opnieuw, vanuit het hart. Onze lessen zijn zacht, doordacht en altijd op jouw eigen tempo afgestemd.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="lessen" className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><Lotus op={0.05} size={220} /></div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-light relative z-10">Wat we aanbieden</h2>
            <p className="text-[#8A8478] mt-4">Kies wat bij jou past, vandaag.</p>
          </div>
          <div ref={servRef} className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${servVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {services.map(s => (
              <div key={s.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-500 border border-[#F0EDE7] hover:-translate-y-0.5 cursor-default">
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-medium text-[#2C2C2A] mb-2">{s.title}</h3>
                <p className="text-[#8A8478] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="py-28 px-6 bg-[#F5F2ED]">
        <div ref={expRef} className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${expVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <img src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=900&q=85" alt="Studio" className="rounded-2xl aspect-[4/5] object-cover w-full hover:scale-[1.02] transition-all duration-700" />
          <div className="space-y-8">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-light leading-tight">Hoe het <em>voelt</em> om hier te zijn</h2>
            {[
              ["Tot rust komen", "Van de eerste ademhaling aan voel je het tempo vertragen. Hier mag het langzamer."],
              ["Zachte beweging", "Geen kracht om te bewijzen. We volgen het lichaam, niet de klok."],
              ["Aanwezig zijn", "Telefoon weg, gedachten mogen neerdalen. Een uur volledig voor jezelf."],
              ["Thuiskomen in jezelf", "Na elke les ga je weg met iets wat je altijd al bij je droeg — maar even vergeten was."],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-4">
                <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-[#6B8F71]/15 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#6B8F71" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                </span>
                <div><p className="font-medium text-[#2C2C2A] text-sm">{t}</p><p className="text-[#8A8478] text-sm leading-relaxed">{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="rooster" className="py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-light text-center mb-16">Wekelijks rooster</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedule.map(s => (
              <div key={s.dag + s.les} className={`rounded-2xl p-6 border transition-all duration-500 hover:shadow-md ${s.featured ? 'bg-[#6B8F71] text-white border-[#6B8F71]' : 'bg-white border-[#F0EDE7] text-[#2C2C2A]'}`}>
                <p className={`text-xs uppercase tracking-widest mb-2 ${s.featured ? 'text-white/70' : 'text-[#8A8478]'}`}>{s.dag}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-medium mb-1">{s.les}</p>
                <p className={`text-sm ${s.featured ? 'text-white/80' : 'text-[#8A8478]'}`}>{s.tijd} · {s.duur}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#8A8478] text-sm mt-8">Vraag naar privélessen op maat — bel ons op <a href="tel:0473428565" className="text-[#6B8F71]">0473 42 85 65</a></p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-6 bg-[#F5F2ED]">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-light text-center mb-16">Wat anderen zeggen</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["Sarah V.", "Na jaren van stress heb ik hier leren ademhalen. Letterlijk. Het is een plek die ik iedereen gun."],
              ["Pieter D.", "De yin yogales op vrijdag is mijn wekelijkse reset. Rustig, diep en altijd op mijn tempo."],
              ["Nathalie M.", "Eindelijk een studio zonder druk. Je mag er gewoon zijn zoals je bent — dat is zeldzaam."],
            ].map(([name, quote]) => (
              <div key={name} className="bg-white rounded-2xl p-8 shadow-sm border border-[#F0EDE7] hover:shadow-md transition-shadow duration-500">
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <span key={i} className="text-[#C4A882] text-sm">★</span>)}</div>
                <blockquote style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-light italic text-[#2C2C2A] leading-relaxed mb-4">"{quote}"</blockquote>
                <p className="text-sm text-[#8A8478]">— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-[#F0EDE7] shadow-md">
              <img src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=400&q=85" alt="Instructeur" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <p className="text-[#6B8F71] text-sm uppercase tracking-widest mb-2">Jouw begeleider</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl font-light mb-4">Hallo, ik ben Elien</h2>
            <p className="text-[#2C2C2A] leading-relaxed mb-4">Na jaren in de zorgsector leerde ik via yoga wat echt herstellen betekent. Sindsdien begeleid ik mensen hier in Oostende met dezelfde zachte aanpak die mij hielp — eerlijk, nabij en zonder pretenties.</p>
            <div className="flex flex-wrap gap-2">
              {["200u YTT gecertificeerd", "Meditatiebegeleider", "Ademcoach"].map(c => (
                <span key={c} className="text-xs bg-[#F5F2ED] text-[#6B8F71] border border-[#6B8F71]/20 rounded-full px-3 py-1">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-28 px-6 bg-[#F5F2ED]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-sm aspect-video">
            <iframe title="Locatie" src="https://maps.google.com/maps?q=Amsterdamstraat+61,+8400+Oostende&output=embed" className="w-full h-full border-0" loading="lazy" />
          </div>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl font-light mb-6">Je vindt ons hier, in Oostende</h2>
            <div className="space-y-4 text-[#2C2C2A]">
              <div className="flex gap-3"><span className="text-[#6B8F71]">📍</span><p>Amsterdamstraat 61<br />8400 Oostende, België</p></div>
              <div className="flex gap-3"><span className="text-[#6B8F71]">📞</span><a href="tel:0473428565" className="hover:text-[#6B8F71] transition-colors">0473 42 85 65</a></div>
              <div className="flex gap-3"><span className="text-[#6B8F71]">🚌</span><p>Vlot bereikbaar met de tram en bus — halte op 3 minuten.</p></div>
              <div className="flex gap-3"><span className="text-[#6B8F71]">🚲</span><p>Fietsenrek aanwezig aan de voordeur.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl font-light mb-6">Een moment voor jezelf beginnen?</h2>
            <p className="text-[#8A8478] leading-relaxed mb-8">Stuur ons een berichtje en we plannen een kennismaking zonder verplichting. Gewoon kijken of het klikt.</p>
            <div className="space-y-3 text-sm text-[#2C2C2A]">
              {[["Ma–Vr", "08:00 – 20:00"], ["Zaterdag", "09:00 – 14:00"], ["Zondag", "Gesloten"]].map(([d, t]) => (
                <div key={d} className="flex gap-6"><span className="text-[#8A8478] w-24">{d}</span><span>{t}</span></div>
              ))}
            </div>
          </div>
          <form className="space-y-4" onSubmit={e => { e.preventDefault(); }}>
            {[['name', 'Jouw naam', 'text'], ['email', 'E-mailadres', 'email'], ['phone', 'Telefoonnummer (optioneel)', 'tel']].map(([key, ph, type]) => (
              <input key={key} type={type} placeholder={ph} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-[#F5F2ED] border border-[#DDD9D0] rounded-xl px-5 py-4 text-[#2C2C2A] placeholder-[#8A8478] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B8F71]/40 focus:border-[#6B8F71] transition-all duration-300" />
            ))}
            <textarea rows={4} placeholder="Jouw bericht..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[#F5F2ED] border border-[#DDD9D0] rounded-xl px-5 py-4 text-[#2C2C2A] placeholder-[#8A8478] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B8F71]/40 focus:border-[#6B8F71] transition-all duration-300 resize-none" />
            <button type="submit" className="inline-flex items-center gap-2 bg-[#6B8F71] text-white text-sm font-medium tracking-wide px-8 py-4 rounded-full hover:bg-[#5a7a60] transition-all duration-500 shadow-sm hover:shadow-md">Verstuur bericht →</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2C2C2A] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-white text-2xl font-light mb-2">Yoga & Meditatie Oostende</p>
              <p className="text-[#8A8478] text-sm">Adem. Beweeg. Wees aanwezig.</p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-[#8A8478]">
              <p>Amsterdamstraat 61, 8400 Oostende</p>
              <a href="tel:0473428565" className="hover:text-white transition-colors">0473 42 85 65</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Facebook</a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#8A8478] text-xs">© {new Date().getFullYear()} Yoga en Meditatie Oostende. Met zorg gemaakt.</p>
            <Lotus op={0.15} size={48} />
          </div>
        </div>
      </footer>
    </div>
  );
}