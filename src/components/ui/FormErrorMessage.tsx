export interface ValidationDetail {
  field?: string;
  message: string;
}

interface FormErrorMessageProps {
  message: string | null;
  details?: ValidationDetail[] | null;
  className?: string;
}

export function FormErrorMessage({ message, details, className = "" }: FormErrorMessageProps) {
  if (!message) return null;

  return (
    <div className={`bg-[#5c1d1d]/40 border border-[#5c1d1d] p-3 text-xs text-[#ff9999] rounded-sm ${className}`}>
      <strong className="block font-semibold">{message}</strong>
      {details && details.length > 0 && (
        <ul className="mt-1 list-disc list-inside space-y-0.5 text-[11px]">
          {details.map((detail, idx) => (
            <li key={idx}>{detail.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
