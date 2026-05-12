export function Footer() {
  return (
    <footer className="bg-ink py-20 px-4 text-center">
      <div className="max-w-site mx-auto">
        {/* Monogram */}
        <a
          href="#home"
          className="font-display italic text-heading text-bg/85 font-light leading-none inline-block mb-6"
        >
          M
          <span
            className="font-script text-bg/40"
            style={{ fontSize: "0.75em", margin: "0 -0.08em" }}
          >
            &amp;
          </span>
          A
        </a>

        <p className="text-label font-body uppercase tracking-[0.25em] text-white/35 mb-2">
          5 September 2026
        </p>
        <p className="text-label font-body uppercase tracking-[0.18em] text-white/20 mb-10">
          Agriturismo da Pippo · Cassignanica, Italy
        </p>

        <p className="text-label font-body tracking-[0.1em] text-white/15">
          #MartaAndAnurag
        </p>
      </div>
    </footer>
  );
}
