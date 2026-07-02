import { useInfluencerStore } from "@/store/influencerStore";
import { formatFollowers } from "@/utils/formatters";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export function SelectedInfluencers() {
  const selectedProfiles = useInfluencerStore(
    (state) => state.selectedProfiles
  );

  const removeProfile = useInfluencerStore(
    (state) => state.removeProfile
  );

  const clearProfiles = useInfluencerStore(
    (state) => state.clearProfiles
  );

  if (selectedProfiles.length === 0) {
    return (
      <div className="border p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Selected Influencers
        </h2>

        <p className="text-sm text-gray-500">
          No influencers selected yet.
        </p>
      </div>
    );
  }

  return (
    <div className="border p-5 shadow-sm sticky top-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Selected ({selectedProfiles.length})
        </h2>

        <button
          onClick={() => {
            clearProfiles();
            toast.success("List cleared");
          }}
          className="text-sm text-red-600 hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3">
        {selectedProfiles.map(({ profile, platform }) => (
          <div
            key={profile.user_id}
            className="flex items-center gap-3 rounded-lg border p-2"
          >
            <img
              src={profile.picture}
              alt={profile.fullname ?? "Profile"}
              className="h-10 w-10 rounded-full"
            />

            <div className="flex-1">
              <p className="font-medium">
                {profile.fullname}
              </p>

              <p className="text-xs text-gray-500">
                {platform}
              </p>

              <p className="text-xs">
                {formatFollowers(profile.followers)} followers
              </p>
            </div>

            <button
              onClick={() => {
                removeProfile(profile.user_id);
                toast.success("Removed");
              }}
            >
              <FaTrash className="text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}