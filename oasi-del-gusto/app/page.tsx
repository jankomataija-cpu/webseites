'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const IMG = {
  heroMedia:
    'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=1600&auto=format&fit=crop',
  heroBg:
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1920&auto=format&fit=crop',
  spaghetti:
    'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1200&auto=format&fit=crop',
  affogato:
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
  mohrenkopf:
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop',
  sorbet:
    'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=1200&auto=format&fit=crop',
  galerie1:
    'https://images.unsplash.com/photo-1560008581-09826d1de69e?q=80&w=1600&auto=format&fit=crop',
  galerie2:
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop',
  galerie3:
    'https://images.unsplash.com/photo-1534445867742-43195f401b6c?q=80&w=1600&auto=format&fit=crop',
};

const spezialitaeten = [
  {
    name: 'Spaghetti-Eis',
    text: 'Der Klassiker: cremiges Vanilleeis, fruchtige Erdbeersoße und weiße Schokoraspeln.',
    img: IMG.spaghetti,
    fallback: 'images/fallback-spaghetti.svg',
  },
  {
    name: 'Affogato al Caffè',
    text: 'Hausgemachtes Vanilleeis, „ertränkt" in heißem italienischem Espresso.',
    img: IMG.affogato,
    fallback: 'images/fallback-affogato.svg',
  },
  {
    name: 'Mohrenkopfbecher',
    text: 'Unsere Hausspezialität – mit Schokokuss, Sahne und dunkler Schokoladensoße.',
    img: IMG.mohrenkopf,
    fallback: 'images/fallback-mohrenkopf.svg',
  },
  {
    name: 'Frucht & Sorbet',
    text: 'Täglich frisch aus eigener Produktion – nur natürliche Zutaten, voller Geschmack.',
    img: IMG.sorbet,
    fallback: 'images/fallback-sorbet.svg',
  },
];

const galerie = [
  {
    src: IMG.galerie1,
    fallback: 'images/fallback-galerie1.svg',
    caption: 'Unsere Eistheke – jeden Tag frisch',
  },
  {
    src: IMG.galerie2,
    fallback: 'images/fallback-galerie2.svg',
    caption: 'Caffè & Dolci wie in Italien',
  },
  {
    src: IMG.galerie3,
    fallback: 'images/fallback-galerie3.svg',
    caption: 'Dolce Vita am Marktplatz',
  },
];

const speisekarte: {
  kategorie: string;
  items: { nr: string; name: string; desc: string; preis: string }[];
}[] = [
  {
    kategorie: 'Crêpes',
    items: [
      { nr: '400', name: 'Erdbeer Crêpes', desc: 'Saisonbedingt – Vanilleeis, frische Erdbeeren, Erdbeersoße, Sahne und Puderzucker', preis: '6,50' },
      { nr: '401', name: 'Erdbeer Nutella Crêpes', desc: 'Saisonbedingt – Vanilleeis, frische Erdbeeren, Nutellasoße, Sahne und Puderzucker', preis: '7,00' },
      { nr: '402', name: 'Waldfrüchte Crêpes', desc: 'Vanilleeis, Waldfrüchte, Früchtesoße, Sahne und Puderzucker', preis: '7,00' },
      { nr: '403', name: 'Banane Crêpes', desc: 'Vanilleeis, Banane, Schokosoße, Sahne und Puderzucker', preis: '6,50' },
      { nr: '404', name: 'Banane Nutella Crêpes', desc: 'Vanilleeis, Banane, Nutellasoße, Sahne und Puderzucker', preis: '7,00' },
      { nr: '405', name: 'Nutella Crêpes', desc: 'Vanilleeis, Nutellasoße, Sahne und Puderzucker', preis: '6,50' },
      { nr: '406', name: 'Vanillesoße Crêpes', desc: 'Vanilleeis, Vanillesoße, Sahne und Puderzucker', preis: '6,70' },
      { nr: '407', name: 'Joghurt Erdbeere Crêpes', desc: 'Saisonbedingt – Joghurteis, frischer Joghurt, frische Erdbeeren, Erdbeersoße, Sahne und Puderzucker', preis: '7,00' },
      { nr: '416', name: 'Erdbeer Banane Crêpes', desc: 'Saisonbedingt – Vanilleeis, frische Erdbeeren, Banane, Nutellasoße, Sahne und Puderzucker', preis: '7,50' },
    ],
  },
  {
    kategorie: 'Panini',
    items: [
      { nr: '420', name: 'Panino Vegetariano', desc: 'Ciabattabrot mit Zucchini, Mozzarella, Tomaten, Rucola, Mayonnaise', preis: '6,50' },
      { nr: '421', name: 'Panino Oasi', desc: 'Ciabattabrot belegt mit Parmaschinken, Mayonnaise, Mozzarella, Tomaten, grüner Salat', preis: '6,50' },
      { nr: '422', name: 'Panino Josef', desc: 'Ciabattabrot belegt mit Parmaschinken, Mayonnaise, Mozzarella, Tomaten, Auberginen', preis: '6,50' },
      { nr: '423', name: 'Panino Caprese', desc: 'Ciabattabrot mit Tomaten, Mozzarella, Öl und Pfeffer', preis: '5,00' },
      { nr: '424', name: 'Panino Mariolino', desc: 'Ciabattabrot belegt mit italienischem Schinken, Mozzarella, grüner Salat, Mayonnaise', preis: '5,50' },
      { nr: '425', name: 'Panino Tonno Cipolla', desc: 'Ciabattabrot mit Mayonnaise, Thunfisch und Zwiebeln', preis: '5,50' },
      { nr: '426', name: 'Panino Salami', desc: 'Ciabattabrot, Salami, Tomatenstück, Mozzarella, Mayonnaise, grüner Salat', preis: '5,50' },
      { nr: '427', name: 'Panino Calabrese', desc: 'Ciabattabrot, scharfe Salami, Mozzarella, Mayonnaise, grüner Salat', preis: '6,50' },
    ],
  },
  {
    kategorie: 'Toast',
    items: [
      { nr: '428', name: 'Toast Caprese', desc: 'Tomaten, Mozzarella, Öl und Pfeffer', preis: '3,80' },
      { nr: '429', name: 'Toast Pollo', desc: 'Mit Mayonnaise, Speck, Hähnchen, Tomaten, Blattsalat und Mozzarella', preis: '4,80' },
      { nr: '430', name: 'Toast Tonno', desc: 'Mit Mayonnaise und Thunfisch', preis: '4,20' },
      { nr: '431', name: 'Toast Calabrese', desc: 'Scharfe Salami, Mozzarella, Tomaten, Mayonnaise', preis: '4,60' },
      { nr: '670', name: 'Toast Valentino', desc: 'Mit Lachs, Frischkäse, Rucola', preis: '4,80' },
    ],
  },
  {
    kategorie: 'Piadina',
    items: [
      { nr: '432', name: 'Piadina Classica', desc: 'Mit Rucola, Parmaschinken und Mozzarella', preis: '5,20' },
      { nr: '433', name: 'Piadina Salami', desc: 'Salami, Mozzarella, Tomatenstück, Mayonnaise, grüner Salat', preis: '5,20' },
      { nr: '434', name: 'Piadina Pazzia', desc: 'Mit Tomate, Mais, Mozzarella, Blattsalat, Putenstreifen, Olivenöl, Balsamico-Essig, Oregano', preis: '5,80' },
      { nr: '435', name: 'Piadina Tonno Cipolla', desc: 'Mit Mayonnaise und Thunfisch, Zwiebeln, Tomaten', preis: '4,80' },
    ],
  },
  {
    kategorie: 'Bruschetta',
    items: [
      { nr: '436', name: 'Bruschetta Margherita', desc: 'Tomatenstücke, Mozzarella, Oregano', preis: '5,50' },
      { nr: '437', name: 'Bruschetta Salami e Olive', desc: 'Tomatenstücke, Mozzarella, Oregano, Salami, Oliven', preis: '6,00' },
      { nr: '438', name: 'Bruschetta Primavera', desc: 'Tomatenstücke, Mozzarella, Oregano, gekochter Schinken, Pilze, Artischocken', preis: '6,00' },
      { nr: '439', name: 'Bruschetta Tonno e Cipolla', desc: 'Tomatenstück, Mozzarella, Oregano, Öl, Thunfisch, Zwiebeln', preis: '6,00' },
      { nr: '440', name: 'Bruschetta Vegetariana', desc: 'Tomatenstück, Mozzarella, Oregano, gegrillte Aubergine, gegrillte Zucchini und Rucola', preis: '6,00' },
      { nr: '460', name: 'Tagliere della Casa', desc: 'Italienische Spezialitäten: Aufschnitt, Käse und Gemüse – perfekt zum Teilen', preis: '25,00' },
    ],
  },
  {
    kategorie: 'Pizza',
    items: [
      { nr: '441', name: 'Pizza Margherita', desc: 'Tomatensauce, Mozzarella', preis: '6,50' },
      { nr: '442', name: 'Pizza Salami und Oliven', desc: 'Tomatensauce, Mozzarella, Salami, Oliven', preis: '8,00' },
      { nr: '660', name: 'Pizza Italia', desc: 'Tomatensauce, Rucola, Mozzarella, Parmesanstücke, Parmaschinken', preis: '9,00' },
      { nr: '661', name: 'Pizza Tonno e Cipolla', desc: 'Tomatensauce, Mozzarella, Thunfisch, Zwiebeln', preis: '8,00' },
      { nr: '662', name: 'Pizza Capricciosa', desc: 'Tomatensauce, Mozzarella, Schinken, Pilze, Artischocken, Oliven', preis: '9,50' },
      { nr: '663', name: 'Pizza Hawaii', desc: 'Tomatensauce, Mozzarella, Schinken und Ananas', preis: '8,00' },
    ],
  },
  {
    kategorie: 'Sandwich',
    items: [
      { nr: '443', name: 'Parma Sandwich', desc: 'Bruschetta-Brot, Mozzarella und Parmaschinken, Majo', preis: '6,50' },
      { nr: '444', name: 'Ital. Sandwich', desc: 'Bruschetta-Brot, Mozzarella, Schinken, Tomate und Salat, Majo', preis: '6,50' },
      { nr: '445', name: 'Salami Sandwich', desc: 'Bruschetta-Brot, Mozzarella, Salami und Tomate, Majo', preis: '6,50' },
      { nr: '446', name: 'Spezial Sandwich', desc: 'Bruschetta-Brot, Schinken, Mozzarella, Artischocken und Pilze, Majo', preis: '6,50' },
    ],
  },
  {
    kategorie: 'Fladenbrot',
    items: [
      { nr: '610', name: 'Fladenbrot Vegetariano', desc: 'Fladenbrot mit Zucchini, Mozzarella, Tomaten, Rucola, Mayonnaise', preis: '6,50' },
      { nr: '611', name: 'Fladenbrot Valentino', desc: 'Fladenbrot belegt mit Lachs, Frischkäse, Zucchini, Rucola', preis: '6,50' },
      { nr: '612', name: 'Fladenbrot Josef', desc: 'Fladenbrot belegt mit Parmaschinken, Mayonnaise, Mozzarella, Tomaten, Auberginen', preis: '6,50' },
      { nr: '613', name: 'Fladenbrot Caprese', desc: 'Fladenbrot mit Tomaten, Mozzarella, Öl und Pfeffer', preis: '5,00' },
    ],
  },
];

function withFallback(fallback: string) {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.src.endsWith(fallback)) img.src = fallback;
  };
}

function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    ['#start', 'Start'],
    ['#ueber-uns', 'Über uns'],
    ['#ambiente', 'Ambiente'],
    ['#speisekarte', 'Speisekarte'],
    ['#kontakt', 'Kontakt'],
  ];

  return (
    <header className='fixed top-0 inset-x-0 z-50 bg-cocoa/85 backdrop-blur-md border-b border-gold/15'>
      <div className='max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between'>
        <a href='#start' className='flex items-center gap-3'>
          <Image
            src='logo.svg'
            alt='Oasi del Gusto'
            width={72}
            height={43}
            className='w-14 h-auto'
          />
          <span className='font-display font-semibold text-gold-soft text-lg tracking-wide'>
            Oasi del Gusto
          </span>
        </a>

        <nav className='hidden md:flex items-center gap-8 text-sm text-cream/80'>
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className='hover:text-gold-soft transition-colors'
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          className='md:hidden flex flex-col gap-1.5 p-2'
          aria-label='Menü öffnen'
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className='w-6 h-0.5 bg-gold-soft' />
          <span className='w-6 h-0.5 bg-gold-soft' />
          <span className='w-6 h-0.5 bg-gold-soft' />
        </button>
      </div>

      {open && (
        <nav className='md:hidden bg-cocoa/95 border-t border-gold/15 px-6 py-4 flex flex-col gap-4 text-cream/85'>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function MainContent() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          fullMotion: '(prefers-reduced-motion: no-preference)',
        },
        (ctx) => {
          if (ctx.conditions?.reduceMotion) return;

          // Sanftes Aufblenden von Text-Blöcken (reveal der Vorlage)
          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              y: 28,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            });
          });

          // Karten gestaffelt einblenden
          gsap.set('[data-card]', { opacity: 0, y: 50 });
          ScrollTrigger.batch('[data-card]', {
            start: 'top 88%',
            once: true,
            onEnter: (els) =>
              gsap.to(els, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: 'power3.out',
                overwrite: true,
              }),
          });

          // Parallax auf Ambiente-Bildern (scrubbed)
          gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
            const img = el.querySelector('img');
            if (!img) return;
            gsap.fromTo(
              img,
              { yPercent: -10, scale: 1.15 },
              {
                yPercent: 10,
                scale: 1.15,
                ease: 'none',
                scrollTrigger: {
                  trigger: el,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          });

          // Laufschrift an Scroll gekoppelt
          gsap.to('[data-marquee]', {
            xPercent: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-marquee-wrap]',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      );
    },
    { scope: mainRef }
  );

  // Tab-Wechsel: Panel sanft einblenden (läuft bei jeder Änderung von activeTab)
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        '[data-menu-panel]',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    },
    { dependencies: [activeTab], scope: mainRef }
  );

  return (
    <div ref={mainRef} className='max-w-6xl mx-auto'>
      {/* Über uns (philosophy der Vorlage) */}
      <section id='ueber-uns' className='py-10 md:py-20 text-center scroll-mt-24' data-reveal>
        <p className='eyebrow mb-5'>Unsere Philosophie</p>
        <h2 className='font-display font-semibold text-4xl md:text-5xl text-gold-soft leading-tight mb-8'>
          La dolce vita –<br />
          hausgemacht, jeden Tag.
        </h2>
        <p className='max-w-2xl mx-auto text-lg text-cream/80 leading-relaxed mb-4'>
          Oasi del Gusto entstand aus der Überzeugung, dass echtes italienisches
          Eis keine Kompromisse kennt. Familie Cantisano stellt jede Sorte
          selbst her – täglich frisch, aus natürlichen Zutaten, mitten in
          Spaichingen.
        </p>
        <p className='max-w-2xl mx-auto text-lg text-cream/80 leading-relaxed mb-10'>
          Jeder Tag beginnt, wenn die Eistheke gefüllt wird: ein stilles
          Zeichen, dass der Sommer eröffnet ist – dazu duftender Espresso,
          hausgemachte Dolci und ein Platz an der Sonne am Marktplatz.
        </p>
        <div className='flex flex-wrap justify-center gap-4'>
          <a href='#speisekarte' className='btn-pill btn-pill--solid'>
            Speisekarte entdecken
          </a>
          <a href='#kontakt' className='btn-pill'>
            Besuch uns
          </a>
        </div>
      </section>

      {/* Spezialitäten */}
      <section id='spezialitaeten' className='py-16 md:py-24 scroll-mt-24'>
        <div className='text-center mb-14' data-reveal>
          <p className='eyebrow mb-5'>Le nostre specialità</p>
          <h3 className='font-display font-semibold text-4xl md:text-5xl text-gold-soft'>
            Unsere Spezialitäten
          </h3>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {spezialitaeten.map((s) => (
            <article
              key={s.name}
              data-card
              className='group rounded-2xl overflow-hidden menu-card ring-1 ring-cream/10 hover:ring-gold/40 transition-shadow duration-500'
            >
              <div className='relative h-52 overflow-hidden'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.name}
                  onError={withFallback(s.fallback)}
                  className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
                  loading='lazy'
                />
              </div>
              <div className='p-6'>
                <h4 className='font-display font-semibold text-xl mb-2 text-gold-soft'>
                  {s.name}
                </h4>
                <p className='text-sm text-cream/70 leading-relaxed'>
                  {s.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Ambiente (mit Parallax) */}
      <section id='ambiente' className='py-16 md:py-24 space-y-10 scroll-mt-24'>
        <div className='text-center mb-4' data-reveal>
          <p className='eyebrow mb-5'>Ambiente</p>
          <h3 className='font-display font-semibold text-4xl md:text-5xl text-gold-soft'>
            Warmes Licht, offene Türen
          </h3>
        </div>

        {galerie.map((g, i) => (
          <figure
            key={g.caption}
            data-parallax
            className={`relative h-[55vh] md:h-[70vh] overflow-hidden rounded-3xl ${
              i % 2 === 0 ? 'md:mr-16' : 'md:ml-16'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={g.src}
              alt={g.caption}
              onError={withFallback(g.fallback)}
              className='absolute inset-0 w-full h-full object-cover'
              loading='lazy'
            />
            <figcaption className='absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-cocoa/70 backdrop-blur-sm px-5 py-3 rounded-full text-sm md:text-base text-cream/90'>
              {g.caption}
            </figcaption>
          </figure>
        ))}
      </section>

      {/* Speisekarte mit Tabs (wie die Vorlage) */}
      <section id='speisekarte' className='py-16 md:py-24 scroll-mt-24'>
        <div className='text-center mb-10' data-reveal>
          <p className='eyebrow mb-5'>Il nostro menù</p>
          <h3 className='font-display font-semibold text-4xl md:text-5xl text-gold-soft'>
            Unsere Speisekarte
          </h3>
        </div>

        <div
          className='flex flex-wrap justify-center gap-2.5 mb-10'
          role='tablist'
          aria-label='Speisekarten-Kategorien'
        >
          {speisekarte.map((kat, i) => (
            <button
              key={kat.kategorie}
              role='tab'
              aria-selected={i === activeTab}
              className={`tab-btn ${i === activeTab ? 'is-active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {kat.kategorie}
            </button>
          ))}
        </div>

        <div data-menu-panel className='max-w-3xl mx-auto'>
          <h4 className='font-display font-semibold text-3xl text-gold-soft mb-6 text-center'>
            {speisekarte[activeTab].kategorie}
          </h4>
          <div className='flex flex-col'>
            {speisekarte[activeTab].items.map((item) => (
              <div
                key={item.nr}
                className='py-4 border-b border-gold/10 last:border-0'
              >
                <div className='flex justify-between items-baseline gap-4'>
                  <span className='font-display text-lg text-cream'>
                    <span className='inline-block min-w-[2.4em] text-pistachio text-sm'>
                      {item.nr}
                    </span>
                    {item.name}
                  </span>
                  <span className='font-display text-lg text-gold-soft shrink-0'>
                    {item.preis} €
                  </span>
                </div>
                <p className='text-sm text-cream/60 leading-relaxed mt-1 pl-[3.2em]'>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className='text-center text-cream/40 text-sm mt-10' data-reveal>
          Alle Angaben zu Allergenen und Zusatzstoffen findest du in der Karte
          vor Ort. Saisonale Gerichte je nach Verfügbarkeit. Weitere Kategorien
          folgen in Kürze.
        </p>
      </section>

      {/* Marquee */}
      <div data-marquee-wrap className='py-16 overflow-hidden' aria-hidden>
        <div
          data-marquee
          className='whitespace-nowrap font-display italic text-5xl md:text-7xl text-cream/15 will-change-transform'
        >
          Gelato · Espresso · Dolci · Aperitivo · Gelato · Espresso · Dolci ·
          Aperitivo · Gelato · Espresso · Dolci · Aperitivo ·
        </div>
      </div>

      {/* Kontakt (visit der Vorlage) */}
      <section id='kontakt' className='py-16 md:py-24 scroll-mt-24'>
        <div className='text-center mb-14' data-reveal>
          <p className='eyebrow mb-5'>Standort &amp; Öffnungszeiten</p>
          <h3 className='font-display font-semibold text-4xl md:text-5xl text-gold-soft'>
            Wir freuen uns auf deinen Besuch
          </h3>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
          <div
            data-card
            className='rounded-2xl menu-card ring-1 ring-cream/10 p-8'
          >
            <h4 className='font-display font-semibold text-xl text-gold-soft mb-3'>
              Adresse
            </h4>
            <p className='text-cream/80 leading-relaxed'>
              Oasi del Gusto
              <br />
              Marktplatz 9<br />
              78549 Spaichingen
            </p>
            <a
              href='https://maps.google.com/?q=Oasi+del+Gusto,+Marktplatz+9,+78549+Spaichingen'
              target='_blank'
              rel='noopener noreferrer'
              className='btn-pill mt-5'
            >
              Route planen
            </a>
          </div>

          <div
            data-card
            className='rounded-2xl menu-card ring-1 ring-cream/10 p-8'
          >
            <h4 className='font-display font-semibold text-xl text-gold-soft mb-3'>
              Öffnungszeiten
            </h4>
            <p className='text-cream/80 leading-relaxed'>
              Montag – Sonntag
              <br />
              <span className='text-2xl font-display text-cream'>
                10 – 23 Uhr
              </span>
              <br />
              <span className='text-sm text-cream/60'>
                Auch an Feiertagen für euch da.
              </span>
            </p>
          </div>

          <div
            data-card
            className='rounded-2xl menu-card ring-1 ring-cream/10 p-8'
          >
            <h4 className='font-display font-semibold text-xl text-gold-soft mb-3'>
              Kontakt
            </h4>
            <p className='text-cream/80 leading-relaxed'>
              Ruf uns einfach an:
              <br />
              <a
                href='tel:+4974249568580'
                className='text-2xl font-display text-cream hover:text-gold-soft transition-colors'
              >
                07424 956 85 80
              </a>
              <br />
              <span className='text-sm text-cream/60'>
                Inh. Mario Cantisano
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-cream/10 py-10 text-center text-sm text-cream/50'>
        <Image
          src='logo.svg'
          alt='Oasi del Gusto'
          width={140}
          height={83}
          className='mx-auto mb-6 w-32 h-auto opacity-80'
        />
        <p>
          © {new Date().getFullYear()} Oasi del Gusto · Marktplatz 9, 78549
          Spaichingen
        </p>
        <p className='mt-2 text-cream/35'>
          Fotos: Unsplash (Platzhalter – gerne durch eigene Fotos ersetzen)
        </p>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <main id='start' className='min-h-screen bg-cocoa'>
      <Nav />
      <ScrollExpandMedia
        mediaType='image'
        mediaSrc={IMG.heroMedia}
        bgImageSrc={IMG.heroBg}
        mediaFallbackSrc='images/fallback-hero.svg'
        bgFallbackSrc='images/fallback-bg.svg'
        logoSrc='logo.svg'
        title='Oasi del Gusto'
        date='Gelato · Caffè · Dolce Vita'
        scrollToExpand='Scrollen zum Entdecken'
      >
        <MainContent />
      </ScrollExpandMedia>
    </main>
  );
}
