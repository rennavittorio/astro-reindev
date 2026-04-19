const links = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  // { label: "projects", href: "/projects" },
  // { label: "blog", href: "/blog" },
  { label: "contacts", href: "/contacts" },
];

interface Props {
  currentPath: string;
}

const Navbar = ({ currentPath }: Props) => {
  const isActive = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath.startsWith(href);

  return (
    <nav className="fixed px-8 py-2 bg-dark top-5 left-1/2 -translate-x-1/2 z-50 font-mono text-sm select-none flex items-center gap-5">
      {links.map(({ label, href }) => {
        const active = isActive(href);
        return (
          <a
            key={href}
            href={href}
            className={`transition-colors duration-150 ${
              active ? "text-white" : "text-white/25 hover:text-white/60"
            }`}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
};

export default Navbar;
