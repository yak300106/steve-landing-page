import { useState } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Modals } from './components/Modals.tsx';
import { useTypewriter } from './hooks/useTypewriter.ts';
import websiteBackground from './assets/website-background.jpeg';
import GlobeStudy from './components/ui/globe-study';
import steveGangBackground from './assets/background-steve.png';

const TYPEWRITER_TEXT =
  "Know the language, miss the message? Steve's gotchu.";

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600);

  const handleActionClick = (action: string) => {
    setActiveModal(action);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-neutral-950 text-white selection:bg-neutral-900 selection:text-white">
      {/* Top Navbar */}
      <Navbar onNavigate={scrollTo} />

      {/* 1. HOME SECTION (Landing Page Hero) */}
      <section
        id="home"
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-end pb-16 md:justify-center md:pb-0 px-6 sm:px-12 md:px-20 text-white"
      >
        <BackgroundVideo />

        <div className="max-w-[88rem] relative z-10 w-full mx-auto pt-16 md:pt-24">
          <div className="max-w-2xl lg:max-w-3xl">
            <div
              className="pointer-events-none select-none mb-5 text-white font-extrabold not-italic transition-all duration-1000 ease-out"
              style={{
                fontFamily: '"Raleway", sans-serif',
                fontSize: 'clamp(36px, 5.5vw, 64px)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                filter: done ? 'blur(0px)' : 'blur(4px)',
                opacity: done ? 1 : 0.6,
              }}
            >
              INTRODUCING, <span className="italic">STEVE.</span>
              <br />
              <span className="whitespace-nowrap">YOUR REALTIME INTERPRETER.</span>
            </div>

            <p
              className="text-white/90 mb-8 font-medium min-h-[50px]"
              style={{
                fontFamily: '"Nunito", sans-serif',
                fontSize: 'clamp(20px, 3vw, 26px)',
                lineHeight: 1.4,
              }}
            >
              {displayed}
              {!done && (
                <span
                  className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
                  aria-hidden="true"
                />
              )}
            </p>

            <div className="flex justify-start w-full">
              <button
                onClick={() => scrollTo('the-gap')}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-neutral-900 font-bold text-base sm:text-lg shadow-lg hover:bg-neutral-100 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                style={{ fontFamily: '"Nunito", sans-serif' }}
              >
                <span>Get to know him</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTAINER FOR ALL REMAINING SECTIONS WITH FIXED GRID BACKGROUND */}
      <div
        className="relative w-full bg-cover bg-center bg-fixed bg-no-repeat text-neutral-900"
        style={{ backgroundImage: `url(${websiteBackground})` }}
      >
        {/* 2. THE GAP SECTION (Tighter bottom padding) */}
        <section
          id="the-gap"
          className="relative w-full flex flex-col items-center justify-start pt-20 pb-8 sm:pb-12 px-6 sm:px-12 md:px-20"
        >
          <div className="max-w-[88rem] relative z-10 w-full mx-auto flex flex-col items-center">
            {/* Globe container */}
            <div className="w-full max-w-[840px] h-[520px] sm:h-[620px] lg:h-[700px] relative flex items-center justify-center pointer-events-auto mb-10 sm:mb-14">
              <GlobeStudy mode="light" scale={1.25} />
            </div>

            {/* Single-line copy */}
            <div className="w-full flex flex-col items-center text-center">
              <p
                className="italic font-extrabold text-neutral-900 mb-4 whitespace-nowrap leading-snug"
                style={{
                  fontFamily: '"Raleway", sans-serif',
                  fontSize: 'clamp(18px, 2.5vw, 36px)',
                }}
              >
                New country. Same language. Different world.
              </p>
              <p
                className="text-neutral-700 font-medium whitespace-nowrap leading-relaxed"
                style={{
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: 'clamp(14px, 1.4vw, 22px)',
                }}
              >
                Heavy accents, local slang, borrowed words. You nod, say &ldquo;ok,&rdquo; and miss the one detail that mattered.
              </p>
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS SECTION (Reduced top gap + footer title) */}
        <section
          id="how-it-works"
          className="relative min-h-screen w-full flex flex-col items-center justify-center pt-10 sm:pt-14 pb-20 px-6 sm:px-12 md:px-20 border-t border-neutral-300/40"
        >
          <div className="max-w-[88rem] relative z-10 w-full mx-auto flex flex-col items-center justify-center">
            {/* Flip Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 w-full max-w-6xl mb-12 sm:mb-16">
              {[
                {
                  title: 'Listen',
                  image: '/listen.jpeg',
                  lines: [
                    'Forward it. Speak it. Type it.',
                    'Every accent, heard.',
                  ],
                },
                {
                  title: 'Decode',
                  image: '/decode.jpeg',
                  lines: [
                    '"Barking"? Steve hears parking.',
                    'Yalla, khalas, inshallah, sorted.',
                    'No wild guesses. Ever.',
                  ],
                },
                {
                  title: 'Clarify',
                  image: '/clarify.jpeg',
                  lines: [
                    'Where. When. What. How much.',
                    'Unsure? Steve just asks.',
                    'Explains in your language, when you need him to.',
                  ],
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="group h-[440px] sm:h-[480px] w-full [perspective:1000px]"
                >
                  <div className="relative h-full w-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-md hover:shadow-2xl">
                    {/* Front of Card */}
                    <div className="absolute inset-0 h-full w-full rounded-3xl overflow-hidden bg-black border border-neutral-800 flex items-center justify-center [backface-visibility:hidden]">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-contain p-8 select-none pointer-events-none"
                      />
                    </div>

                    {/* Back of Card */}
                    <div className="absolute inset-0 h-full w-full rounded-3xl bg-white border border-neutral-200/80 p-8 sm:p-10 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-sm">
                      <h3
                        className="text-3xl sm:text-4xl font-black uppercase text-black mb-6 tracking-tight"
                        style={{ fontFamily: '"Raleway", sans-serif' }}
                      >
                        {card.title}
                      </h3>
                      <div className="space-y-2 max-w-[280px]">
                        {card.lines.map((line, lIdx) => (
                          <p
                            key={lIdx}
                            className="text-neutral-500 text-base sm:text-lg font-medium leading-relaxed"
                            style={{ fontFamily: '"Nunito", sans-serif' }}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Title in Raleway */}
            <h2
              className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-neutral-900 text-center"
              style={{ fontFamily: '"Raleway", sans-serif' }}
            >
              How It Works
            </h2>
          </div>
        </section>

        {/* 4. LIVE DEMO SECTION */}
        <section
          id="live-demo"
          className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 sm:px-12 md:px-20 border-t border-neutral-300/40"
        >
          <div className="max-w-[88rem] relative z-10 w-full mx-auto flex flex-col items-center text-center">
            {/* 1. Centered Video Player */}
            <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 bg-black aspect-video mb-10 sm:mb-12">
              <video
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster="/video-poster.jpg"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* 2. Title Below Video */}
            <h2
              className="text-4xl sm:text-6xl font-black uppercase mb-4 tracking-tight text-neutral-900"
              style={{ fontFamily: '"Raleway", sans-serif' }}
            >
              STEVE IN ACTION
            </h2>

            {/* 3. Short Descriptive Text */}
            <p
              className="text-lg sm:text-xl text-neutral-600 max-w-2xl font-medium leading-relaxed mb-8"
              style={{ fontFamily: '"Nunito", sans-serif' }}
            >
              Experience Steve in action.
            </p>

            {/* 4. Action Buttons (GitHub + Try It Yourself) */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* GitHub Repo Button */}
              <a
                href="https://github.com/Adithya-Sharath/Steve"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-900 border border-neutral-300 font-bold text-base sm:text-lg shadow-sm hover:bg-neutral-50 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                style={{ fontFamily: '"Nunito", sans-serif' }}
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>View on GitHub</span>
              </a>
              {/* Try It Yourself Link -> Replace with your Vercel URL */}
              <a
                href="https://steve-gdg7263.vercel.app/" // <-- ADD YOUR VERCEL LINK HERE
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-neutral-900 text-white font-bold text-base sm:text-lg shadow-lg hover:bg-neutral-800 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                style={{ fontFamily: '"Nunito", sans-serif' }}
              >
                <span>Try it yourself</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>

              
            </div>
          </div>
        </section>

        {/* 5. STEVE'S GANG SECTION */}
        <section
          id="steves-gang"
          className="relative min-h-screen w-full flex flex-col items-center justify-start pt-28 pb-24 px-6 sm:px-12 md:px-20 bg-cover bg-center bg-no-repeat text-white border-t border-neutral-300/40"
          style={{ backgroundImage: `url(${steveGangBackground})` }}
        >
          <div className="max-w-[88rem] relative z-10 w-full mx-auto">
            <h2
              className="text-4xl sm:text-6xl font-black uppercase mb-3 tracking-tight text-white"
              style={{ fontFamily: '"Raleway", sans-serif' }}
            >
              Steve's Gang
            </h2>
            <p
              className="text-lg sm:text-xl text-blue-100 mb-14 font-medium"
              style={{ fontFamily: '"Nunito", sans-serif' }}
            >
              The minds, designers, and engineers bringing conversational intuition to life.
            </p>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">
              {[
                {
                  name: 'Vignesh',
                  role: 'AI & Machine Learning',
                  tags: ['Model Architecture', 'Speech Pipeline', 'Latency Tuning'],
                  image: '/vignesh.jpeg',
                },
                {
                  name: 'Ananya',
                  role: 'Product & Design',
                  tags: ['UI/UX', 'Product Architecture', 'Interaction'],
                  image: '/ananya.jpeg',
                },
                {
                  name: 'Sharath',
                  role: 'Engineering & Systems',
                  tags: ['Full Stack', 'WebSockets', 'Cloud Infra'],
                  image: '/sharath.jpeg',
                },
              ].map((member, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center px-8 sm:px-12 py-10 rounded-3xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 w-full h-full text-neutral-900"
                >
                  {/* Circular Image Container */}
                  <div className="w-52 h-52 sm:w-60 sm:h-60 lg:w-64 lg:h-64 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Name */}
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1"
                    style={{ fontFamily: '"Raleway", sans-serif' }}
                  >
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p
                    className="text-base font-semibold text-neutral-500 mb-5 min-h-[1.5rem] flex items-center justify-center"
                    style={{ fontFamily: '"Nunito", sans-serif' }}
                  >
                    {member.role}
                  </p>

                  {/* Keyword Badges */}
                  <div className="flex flex-wrap justify-center content-start gap-2 mt-auto min-h-[5.5rem]">
                    {member.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-3.5 py-1.5 text-xs font-bold tracking-wide rounded-full bg-neutral-900/10 text-neutral-800"
                        style={{ fontFamily: '"Nunito", sans-serif' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Interactive drawers/modals */}
      <Modals activeModal={activeModal} onClose={handleCloseModal} />
    </div>
  );
}