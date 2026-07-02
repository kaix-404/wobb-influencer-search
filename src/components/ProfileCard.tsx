import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useInfluencerStore } from "@/store/influencerStore";
import toast from "react-hot-toast";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
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

  const displayUsername = profile.username ?? profile.handle ?? "unknown";

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-full max-w-2xl"
      data-search={searchQuery}
    >
      <img 
        src={profile.picture} 
        alt={`${profile.fullname}'s profile picture`}
        className="w-12 h-12 rounded-full" 
      />
      <div className="text-left flex-1">
        <div className="font-bold">
          @{displayUsername}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowers(profile.followers)} followers</div>
      </div>
      {/* TODO: candidates must implement Add to List feature */}
      {/* TODO: candidates must implement Add to List feature */}
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
        className={`px-3 py-1 rounded text-sm transition ${
          isSelected
            ? "bg-green-600 text-white cursor-default"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isSelected ? "Added" : "Add to List"}
      </button>
    </div>
  );
}
