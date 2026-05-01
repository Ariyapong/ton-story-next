interface CoffeeCupProps {
  size?: number;
  className?: string;
}

export function CoffeeCup({ size = 12, className }: CoffeeCupProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      style={{ display: "inline-block", verticalAlign: "-2px" }}
    >
      <path
        d="M2.5 5h8v4.5a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 9.5V5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M10.5 6.5h1.5a1.5 1.5 0 0 1 0 3h-1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M4.5 2.5c0 .8-.5 1-.5 1.8m2-1.8c0 .8-.5 1-.5 1.8m2-1.8c0 .8-.5 1-.5 1.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
