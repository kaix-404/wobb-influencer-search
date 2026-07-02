import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { FaInstagram, FaYoutube, FaTiktok, FaSearch } from "react-icons/fa";
import clsx from "clsx";
import type { ReactNode } from "react";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const icons: Record<Platform, ReactNode> = {
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  tiktok: <FaTiktok />,
};

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-8 mx-auto space-y-5 max-w-2xl">

      {/* Search */}

      <div className="relative w-full">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by username or creator name..."
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-gray-700
            py-3
            pl-11 
            pr-4
            shadow-sm
            transition
            focus:border-blue-500
            focus:outline-none
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </div>

      {/* Platform Pills */}

      <div className="flex flex-wrap gap-3 justify-center">

        {PLATFORMS.map((platform) => (

          <button
            key={platform}
            onClick={() => onChange(platform)}
            className={clsx(
              "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200",

              selected === platform
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "border border-gray-300 bg-white hover:bg-gray-100"
            )}
          >
            {icons[platform]}

            {getPlatformLabel(platform)}
          </button>

        ))}

      </div>

    </div>
  );
}