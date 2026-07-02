import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileListProps) {
  return (
    <div className="flex flex-col items-center">
      {profiles.length === 0 && 
        <div className="text-center py-10">
          <p className="text-lg font-medium">
            No profiles found
          </p>

          <p className="text-gray-500">
            Try another search term.
          </p>
        </div>
      }
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          searchQuery={searchQuery}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
}
