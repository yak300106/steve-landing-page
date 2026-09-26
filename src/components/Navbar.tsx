interface NavbarProps {
  onNavigate?: (id: string) => void;
}

export const Navbar = ({ onNavigate }: NavbarProps) => {
  const scrollTo = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'The Gap', id: 'the-gap' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Live Demo', id: 'live-demo' },
    { label: "Steve's Gang", id: 'steves-gang' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-6 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-[2px]">
      {/* Brand logo / title */}
      <button
        onClick={() => scrollTo('home')}
        className="text-white text-2xl sm:text-3xl font-black tracking-tight uppercase hover:opacity-80 transition-opacity cursor-pointer"
        style={{ fontFamily: '"Raleway", sans-serif' }}
      >
        STEVE.
      </button>

      {/* Tabs list */}
      <nav className="flex items-center gap-4 sm:gap-7 text-xs sm:text-sm font-semibold tracking-wide text-white/90">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="hover:text-white transition-colors duration-200 cursor-pointer whitespace-nowrap hover:underline underline-offset-8"
            style={{ fontFamily: '"Nunito", sans-serif' }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
};