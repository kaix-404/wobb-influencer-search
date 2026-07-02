import { useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { SelectedInfluencers } from "@/components/SelectedInfluencers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const [clickCount, setClickCount] = useState(0);

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  const handleProfileClick = (username: string) => {
    setClickCount((prev) => prev + 1);
    console.log("Clicked profile:", username, clickCount + 1);
  };

  return (
    <Layout title="Find Influencers">
      <p className="text-gray-500 mb-4 text-sm">
        Browse top creators across social platforms
      </p>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="text-xs text-gray-400 mb-4">
        Showing {filtered.length} of {allProfiles.length} on {platform}
      </p>

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <ProfileList
            profiles={filtered}
            platform={platform}
            searchQuery={searchQuery}
            onProfileClick={handleProfileClick}
          />
        </div>

        {/* Right Section */}
        <div>
          <SelectedInfluencers />
        </div>
      </div>
      
    </Layout>
  );
}
