import { useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaUsers,
  FaHeart,
  FaChartLine,
} from "react-icons/fa";

import toast from "react-hot-toast";

import type { Platform, UserProfileSummary } from "@/types";

import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";
import { useInfluencerStore } from "@/store/influencerStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

export function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();

  const addProfile = useInfluencerStore((state) => state.addProfile);

  const isSelected = useInfluencerStore((state) =>
    state.isSelected(profile.user_id)
  );

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);

    const profileHandle = profile.username ?? profile.handle;
    navigate(`/profile/${profileHandle}?platform=${platform}`);
  };

  const platformIcons = {
    instagram: <FaInstagram />,
    youtube: <FaYoutube />,
    tiktok: <FaTiktok />,
  };

  return (
    <div
      onClick={handleClick}
      className="
        w-full
        max-w-2xl
        cursor-pointer
        rounded-2xl
        border
        border-gray-200
        p-5
        mt-2
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <img
            src={profile.picture}
            alt={profile.fullname}
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-lg font-semibold">
                {profile.fullname}
              </h2>

              <VerifiedBadge
                verified={profile.is_verified}
              />

            </div>

            <p className="text-sm text-gray-500">
              @{profile.username}
            </p>

          </div>

        </div>

        <div className="text-xl text-gray-400">
          {platformIcons[platform]}
        </div>

      </div>

      <div className="grid grid-cols-3 gap-4 rounded-xl p-4">

        <div className="text-center">

          <FaUsers className="mx-auto mb-1 text-blue-600" />

          <p className="text-sm font-semibold">
            {formatFollowers(profile.followers)}
          </p>

          <p className="text-xs text-gray-500">
            Followers
          </p>

        </div>

        <div className="text-center">

          <FaHeart className="mx-auto mb-1 text-red-500" />

          <p className="text-sm font-semibold">
            {profile.engagements
              ? formatFollowers(profile.engagements)
              : "N/A"}
          </p>

          <p className="text-xs text-gray-500">
            Engagements
          </p>

        </div>

        <div className="text-center">

          <FaChartLine className="mx-auto mb-1 text-green-600" />

          <p className="text-sm font-semibold">
            {formatEngagementRate(
              profile.engagement_rate
            )}
          </p>

          <p className="text-xs text-gray-500">
            Rate
          </p>

        </div>

      </div>

      <div className="flex justify-end">

        <button
          onClick={(e) => {
            e.stopPropagation();

            if (isSelected) {
              toast("Already added!");
              return;
            }

            addProfile(platform, profile);

            toast.success("Added to list!");
          }}
          disabled={isSelected}
          className={`
            rounded-lg
            px-5
            py-2
            font-medium
            text-white
            transition

            ${
              isSelected
                ? "bg-green-600"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {isSelected ? "Added ✓" : "Add to List"}
        </button>

      </div>

    </div>
  );
}
