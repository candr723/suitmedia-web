export default function Header({ pages, active, showHeader }) {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } bg-orange-500 text-white px-6 py-4 flex items-center justify-between shadow`}
    >
      <div className="font-bold text-xl">Suitmedia</div>
      <ul className="flex space-x-6">
        {pages.map((page) => (
          <li key={page.id}>
            <a
              href={`#${page.id}`}
              className={`hover:text-orange-200 transition ${
                active === page.id
                  ? "border-b-2 border-white font-semibold"
                  : ""
              }`}
            >
              {page.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
