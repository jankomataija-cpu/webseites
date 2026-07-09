'use client';

import { useRef } from 'react';
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

function withFallback(fallback: string) {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.src.endsWith(fallback)) img.src = fallback;
  };
}

function MainContent() {
  const mainRef = useRef<HTMLDivElement | null>(null);

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

          // Sanftes Aufblenden von Text-Blöcken
          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              y: 60,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            });
          });

          // Spezialitäten-Karten gestaffelt einblenden
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

          // Parallax auf Galerie-Bildern (scrubbed)
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

  return (
    <div ref={mainRef} className='max-w-6xl mx-auto'>
      {/* Intro */}
      <section className='py-10 md:py-20 text-center' data-reveal>
        <p className='text-gold tracking-[0.35em] text-sm mb-6 uppercase'>
          Benvenuti a Spaichingen
        </p>
        <h2 className='font-display text-4xl md:text-6xl leading-tight mb-8 text-cream'>
          La dolce vita –<br />
          <em className='text-sand'>hausgemacht, jeden Tag.</em>
        </h2>
        <p className='max-w-2xl mx-auto text-lg md:text-xl text-cream/80 leading-relaxed'>
          Im Herzen von Spaichingen, direkt am Marktplatz, verwöhnt euch die
          Familie Cantisano mit italienischem Eis aus{' '}
          <strong className='text-cream'>eigener Produktion</strong> – täglich
          frisch, aus natürlichen Zutaten. Dazu duftender Espresso, hausgemachte
          Dolci und echtes italienisches Lebensgefühl.
        </p>
      </section>

      {/* Spezialitäten */}
      <section id='spezialitaeten' className='py-16 md:py-24'>
        <div className='text-center mb-14' data-reveal>
          <p className='text-terracotta tracking-[0.35em] text-sm mb-4 uppercase'>
            Le nostre specialità
          </p>
          <h3 className='font-display text-3xl md:text-5xl text-cream'>
            Unsere Spezialitäten
          </h3>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {spezialitaeten.map((s) => (
            <article
              key={s.name}
              data-card
              className='group rounded-2xl overflow-hidden bg-cocoa-light ring-1 ring-cream/10 hover:ring-gold/40 transition-shadow duration-500'
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
                <h4 className='font-display text-xl mb-2 text-sand'>
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

      {/* Galerie mit Parallax */}
      <section id='galerie' className='py-16 md:py-24 space-y-10'>
        <div className='text-center mb-4' data-reveal>
          <p className='text-pistachio tracking-[0.35em] text-sm mb-4 uppercase'>
            Impressioni
          </p>
          <h3 className='font-display text-3xl md:text-5xl text-cream'>
            Ein Vorgeschmack
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

      {/* Kontakt & Öffnungszeiten */}
      <section id='kontakt' className='py-16 md:py-24'>
        <div className='text-center mb-14' data-reveal>
          <p className='text-gold tracking-[0.35em] text-sm mb-4 uppercase'>
            Vieni a trovarci
          </p>
          <h3 className='font-display text-3xl md:text-5xl text-cream'>
            Besuch uns am Marktplatz
          </h3>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
          <div
            data-card
            className='rounded-2xl bg-cocoa-light ring-1 ring-cream/10 p-8'
          >
            <h4 className='font-display text-xl text-sand mb-3'>Adresse</h4>
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
              className='inline-block mt-4 text-gold hover:text-sand underline underline-offset-4 transition-colors'
            >
              Route planen →
            </a>
          </div>

          <div
            data-card
            className='rounded-2xl bg-cocoa-light ring-1 ring-cream/10 p-8'
          >
            <h4 className='font-display text-xl text-sand mb-3'>
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
            className='rounded-2xl bg-cocoa-light ring-1 ring-cream/10 p-8'
          >
            <h4 className='font-display text-xl text-sand mb-3'>Kontakt</h4>
            <p className='text-cream/80 leading-relaxed'>
              Ruf uns einfach an:
              <br />
              <a
                href='tel:+4974249568580'
                className='text-2xl font-display text-cream hover:text-gold transition-colors'
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
    <main className='min-h-screen bg-cocoa'>
      <ScrollExpandMedia
        mediaType='image'
        mediaSrc={IMG.heroMedia}
        bgImageSrc={IMG.heroBg}
        mediaFallbackSrc='images/fallback-hero.svg'
        bgFallbackSrc='images/fallback-bg.svg'
        logoSrc='logo.svg'
        title='Oasi del Gusto'
        date='Gelateria · Caffè · Spaichingen'
        scrollToExpand='Scrollen zum Entdecken'
      >
        <MainContent />
      </ScrollExpandMedia>
    </main>
  );
}
