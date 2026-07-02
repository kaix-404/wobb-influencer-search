import { FaCheckCircle } from "react-icons/fa";

interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({
  verified,
}: VerifiedBadgeProps) {
  if (!verified) return null;

  return (
    <FaCheckCircle
      className="text-blue-500"
      size={16}
    />
  );
}