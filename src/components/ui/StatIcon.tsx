export type StatIconType = "health" | "attack" | "defense" | "speed" | "escouade" | "gacha" | "book";

interface StatIconProps {
  type: StatIconType;
  className?: string;
}

export function StatIcon({ type, className }: StatIconProps) {
  switch (type) {
    case "health":
      return (
        <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#571b1b] border border-[#a84444]/40 text-[#f5c6c6] shadow-sm">
          <svg className={className || "w-4.5 h-4.5"} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      );
    case "attack":
      return (
        <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#5e1a12] border border-[#d64527]/40 text-[#ffb399] shadow-sm">
          <svg className={className || "w-4.5 h-4.5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            {/* Broadsword blade */}
            <path d="M19.5 4.5L10.3 11.3L12.7 13.7Z" fill="currentColor" fillOpacity={0.25} />
            <path d="M19.5 4.5L10.3 11.3L12.7 13.7Z" />
            {/* Center fuller */}
            <path d="M18.8 5.2L11.5 12.5" />
            {/* Crossguard */}
            <path d="M7 10L14 17" strokeWidth={2.2} />
            {/* Leather grip */}
            <path d="M10.5 13.5L5.5 18.5" strokeWidth={2.2} />
            {/* Pommel */}
            <circle cx="4.5" cy="19.5" r="1.3" fill="currentColor" stroke="none" />
          </svg>
        </div>
      );
    case "defense":
      return (
        <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#1e2a36] border border-[#527999]/40 text-[#c8deee] shadow-sm">
          <svg className={className || "w-4.5 h-4.5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25L3.75 6v6.75c0 5.25 3.75 10.125 8.25 11.25 4.5-1.125 8.25-6 8.25-11.25V6L12 2.25z" />
          </svg>
        </div>
      );
    case "speed":
      return (
        <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#102e38] border border-[#3aa8d4]/40 text-[#82e1ff] shadow-sm">
          <svg className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M12 18.5C9.5 14 6 8 2.5 5.5C4.8 9.5 6.5 13.5 7.8 16.5C6 14.5 4.5 12.5 3.5 10C5.5 12.5 7.2 15 8.5 17.5"
              fill="currentColor"
              fillOpacity={0.25}
            />
            <path d="M12 18.5C9.5 14 6 8 2.5 5.5C4.8 9.5 6.5 13.5 7.8 16.5" />
            <path d="M6 10.5C8 13 9.8 15.5 11.5 18" />

            <path
              d="M12 18.5C14.5 14 18 8 21.5 5.5C19.2 9.5 17.5 13.5 16.2 16.5C18 14.5 19.5 12.5 20.5 10C18.5 12.5 16.8 15 15.5 17.5"
              fill="currentColor"
              fillOpacity={0.25}
            />
            <path d="M12 18.5C14.5 14 18 8 21.5 5.5C19.2 9.5 17.5 13.5 16.2 16.5" />
            <path d="M18 10.5C16 13 14.2 15.5 12.5 18" />
          </svg>
        </div>
      );
    case "gacha":
      return (
        <svg className={className || "w-5 h-5 text-purple-arcane"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      );
    case "book":
      return (
        <svg className={className || "w-5 h-5 text-gold-bright"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    default:
      return null;
  }
}

