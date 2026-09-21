export function Logo({ className = "w-12 h-12", dotColor = "#DCA948" }: { className?: string, dotColor?: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <svg 
        viewBox="0 0 100 100" 
        className={className} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <text 
          x="12" 
          y="75" 
          fontFamily="Georgia, serif" 
          fontSize="75" 
          fontWeight="normal" 
          fill="currentColor"
        >
          B
        </text>
        <text 
          x="35" 
          y="85" 
          fontFamily="Georgia, serif" 
          fontSize="85" 
          fontWeight="normal" 
          fill="currentColor"
        >
          S
        </text>
        <circle cx="85" cy="50" r="6" fill={dotColor} />
      </svg>
    </div>
  );
}
