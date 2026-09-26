import { useState, useEffect } from 'react';

interface ModalsProps {
  activeModal: string | null;
  onClose: () => void;
}

export function Modals({ activeModal, onClose }: ModalsProps) {
  const [pitchForm, setPitchForm] = useState({
    name: '',
    email: '',
    scope: '',
    budget: '$50k - $100k',
    details: '',
  });
  const [pitchSubmitted, setPitchSubmitted] = useState(false);

  const [helloForm, setHelloForm] = useState({
    name: '',
    email: '',
    note: '',
  });
  const [helloSubmitted, setHelloSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (activeModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModal, onClose]);

  if (!activeModal || activeModal === 'home') return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white text-black rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span
              className="text-lg font-semibold tracking-tight text-neutral-900"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Mainframe®
            </span>
            <span className="text-neutral-400 select-none">/</span>
            <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
              {activeModal === 'pitch' && 'Pitch An Idea'}
              {activeModal === 'careers' && 'Careers & Openings'}
              {activeModal === 'openings' && 'Active Openings'}
              {activeModal === 'hello' && 'Quick Hello'}
              {activeModal === 'operate' && 'Operating Principles'}
              {activeModal === 'labs' && 'Mainframe Labs'}
              {activeModal === 'studio' && 'Studio Practice'}
              {activeModal === 'shop' && 'Artifacts & Editions'}
              {activeModal === 'contact' && 'Get In Touch'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M1 1L13 13M1 13L13 1" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 py-6 overflow-y-auto space-y-6">
          {/* 1. Pitch us an idea */}
          {activeModal === 'pitch' && (
            <div>
              {pitchSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">
                    Brief Received
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-sm mx-auto">
                    Thanks for sharing your vision. A partner from our studio
                    will review your brief and reply within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 px-5 py-2 text-xs font-semibold bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
                  >
                    Back to Mainframe
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPitchSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <p className="text-sm text-neutral-600">
                    We partner with select founders and category-defining brands
                    to build groundbreaking interactive products and brand
                    identities.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        value={pitchForm.name}
                        onChange={(e) =>
                          setPitchForm({ ...pitchForm, name: e.target.value })
                        }
                        placeholder="Elena Vance"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Work Email
                      </label>
                      <input
                        required
                        type="email"
                        value={pitchForm.email}
                        onChange={(e) =>
                          setPitchForm({ ...pitchForm, email: e.target.value })
                        }
                        placeholder="elena@company.com"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Project Scope
                    </label>
                    <input
                      required
                      type="text"
                      value={pitchForm.scope}
                      onChange={(e) =>
                        setPitchForm({ ...pitchForm, scope: e.target.value })
                      }
                      placeholder="e.g. Next-gen brand identity & interactive web experience"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Tell us what you are building
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={pitchForm.details}
                      onChange={(e) =>
                        setPitchForm({ ...pitchForm, details: e.target.value })
                      }
                      placeholder="Brief context, goals, and target timeline..."
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-black resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-black text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Transmit Project Brief
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 2. Careers & Openings */}
          {(activeModal === 'careers' || activeModal === 'openings') && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">
                Mainframe operates as an autonomous, high-craft collective. We
                keep headcount lean and work with engineers and designers who obsess over micro-details.
              </p>
              <div className="divide-y divide-neutral-100 border border-neutral-100 rounded-xl overflow-hidden">
                {[
                  {
                    title: 'Design Engineer (WebGL / Motion)',
                    location: 'San Francisco, CA or Remote',
                    type: 'Full-Time',
                  },
                  {
                    title: 'Senior Systems Architect',
                    location: 'New York, NY or Remote',
                    type: 'Full-Time',
                  },
                  {
                    title: 'Creative Technologist',
                    location: 'London, UK or Remote',
                    type: 'Contract / Project',
                  },
                  {
                    title: 'Art Director & Brand Typographer',
                    location: 'Remote',
                    type: 'Full-Time',
                  },
                ].map((job, idx) => (
                  <div
                    key={idx}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-neutral-50 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900">
                        {job.title}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {job.location} · {job.type}
                      </p>
                    </div>
                    <a
                      href="mailto:careers@mainframe.co?subject=Application:%20"
                      className="inline-flex items-center text-xs font-medium text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
                    >
                      Apply Now →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Send a brief hello */}
          {activeModal === 'hello' && (
            <div>
              {helloSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">
                    Hello Dispatched!
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-sm mx-auto">
                    Your note has reached our studio inbox. We read every word and will say hello back shortly.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 px-5 py-2 text-xs font-semibold bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setHelloSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <p className="text-sm text-neutral-600">
                    Drop a quick wave, share a thought, or suggest a collaboration. No formal pitch needed.
                  </p>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={helloForm.name}
                      onChange={(e) =>
                        setHelloForm({ ...helloForm, name: e.target.value })
                      }
                      placeholder="Alex"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={helloForm.email}
                      onChange={(e) =>
                        setHelloForm({ ...helloForm, email: e.target.value })
                      }
                      placeholder="alex@domain.com"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Note
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={helloForm.note}
                      onChange={(e) =>
                        setHelloForm({ ...helloForm, note: e.target.value })
                      }
                      placeholder="Just saying hello and admired your recent studio drop..."
                      className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-black resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-black text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Send Quick Hello
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. See how we operate */}
          {activeModal === 'operate' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">
                Mainframe cuts away layers of agency hierarchy to preserve speed, conviction, and pure execution quality.
              </p>
              <div className="space-y-3">
                {[
                  {
                    num: '01',
                    title: 'Direct Principle Access',
                    desc: 'You work directly with the creative and engineering leads making the work. Zero account executives or game-of-telephone handoffs.',
                  },
                  {
                    num: '02',
                    title: 'Tactile Interactive Craft',
                    desc: 'We prototype in live code on day one. Interaction, physics, and typography are refined through kinetic friction, not static mockups.',
                  },
                  {
                    num: '03',
                    title: 'High-Density Sprints',
                    desc: 'We operate in tightly scoped 4-to-8 week sprints. We launch complete, hardened products rather than drawn-out phase roadmaps.',
                  },
                  {
                    num: '04',
                    title: 'Uncompromising Taste',
                    desc: 'Technology is an instrument for aesthetic expression. We honor typography, negative space, and sensory subtlety in every viewport.',
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-neutral-400">
                        {item.num}.
                      </span>
                      <h4 className="text-sm font-semibold text-neutral-900">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Labs */}
          {activeModal === 'labs' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">
                Mainframe Labs is our internal R&D laboratory exploring experimental interface dynamics, generative shaders, and adaptive sensory agents.
              </p>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-neutral-200">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-semibold text-neutral-900">
                      A.R.I.A Engine v2.4
                    </h4>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      Active Deployment
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    Adaptive Response Interface Agent powering real-time kinetic scrub mechanics, cursor spatial depth, and generative typography rhythm.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-neutral-200">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-semibold text-neutral-900">
                      Kinetic Scrubber Protocol
                    </h4>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      Open Experiment
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    Frame-exact, non-blocking media scrub loop mapped to lateral mouse velocity and touch gestures.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 6. Studio */}
          {activeModal === 'studio' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">
                A boutique creative engineering studio based in San Francisco with satellite collaborators in Tokyo and London.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs text-neutral-700">
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100">
                  <span className="text-neutral-400 block mb-1">Practice</span>
                  <span className="font-medium text-neutral-900">
                    Interactive Architecture, Identity Systems, Creative Engineering
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100">
                  <span className="text-neutral-400 block mb-1">Select Clients</span>
                  <span className="font-medium text-neutral-900">
                    Polestar, Teenage Engineering, Monolith AI, Koto
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 7. Shop */}
          {activeModal === 'shop' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">
                Limited edition physical goods, printed annuals, and bespoke digital artifacts created by Mainframe.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">
                      Edition 01: Typographic Monograph
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Case-bound 144pp duotone catalog on Munken Lynx
                    </p>
                  </div>
                  <span className="text-xs font-mono font-medium text-neutral-800">
                    $68 · Edition of 300
                  </span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">
                      Mainframe Anodized Aluminum Keycap
                    </h4>
                    <p className="text-xs text-neutral-500">
                      CNC-milled 6063 alloy with laser-etched asterisk
                    </p>
                  </div>
                  <span className="text-xs font-mono font-medium text-neutral-800">
                    $42 · Sold Out
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 8. Contact */}
          {activeModal === 'contact' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">
                Reach out for new projects, press inquiries, or studio visits.
              </p>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex justify-between items-center">
                  <span className="text-neutral-500 text-xs">Direct Email</span>
                  <a
                    href="mailto:hello@mainframe.co"
                    className="font-medium text-neutral-900 underline underline-offset-2 hover:opacity-70 transition-opacity"
                  >
                    hello@mainframe.co
                  </a>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex justify-between items-center">
                  <span className="text-neutral-500 text-xs">Studio Location</span>
                  <span className="font-medium text-neutral-900 text-right text-xs">
                    420 Pier St, San Francisco, CA
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
