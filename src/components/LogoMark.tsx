export function LogoMark() {
  return (
    <span
      className="relative grid size-[42px] shrink-0 place-items-center overflow-hidden rounded-[16px] border border-white/10 bg-[linear-gradient(145deg,#b30a3c,#69051f)] shadow-[0_13px_30px_rgba(125,5,38,0.32)] before:absolute before:-right-3 before:-top-3 before:size-9 before:rounded-full before:bg-white/10 before:content-[''] after:absolute after:inset-[5px] after:rounded-[12px] after:border after:border-white/[0.07] after:content-['']"
      aria-hidden="true"
    >
      <svg className="relative z-[1] size-[25px] fill-none stroke-[#f1c96f] [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="20" strokeWidth="2.2" />
        <path d="M32 12v40M19 23l26 18M45 23 19 41" strokeWidth="2.2" opacity=".9" />
        <circle cx="32" cy="32" r="5.5" fill="#f1c96f" stroke="none" />
        <path d="m32 12 4 8-4 4-4-4 4-8Z" fill="#f1c96f" stroke="none" />
      </svg>
    </span>
  );
}
