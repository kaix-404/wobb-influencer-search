import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, UserProfileSummary } from "@/types";

export interface SavedInfluencer {
  platform: Platform;
  profile: UserProfileSummary;
}

interface InfluencerStore {
  selectedProfiles: SavedInfluencer[];

  addProfile: (platform: Platform, profile: UserProfileSummary) => void;

  removeProfile: (userId: string) => void;

  isSelected: (userId: string) => boolean;

  clearProfiles: () => void;
}

export const useInfluencerStore = create<InfluencerStore>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],

      addProfile: (platform, profile) => {
        const exists = get().selectedProfiles.some(
          (item) => item.profile.user_id === profile.user_id
        );

        if (exists) return;

        set((state) => ({
          selectedProfiles: [
            ...state.selectedProfiles,
            { platform, profile },
          ],
        }));
      },

      removeProfile: (userId) =>
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter(
            (item) => item.profile.user_id !== userId
          ),
        })),

      isSelected: (userId) =>
        get().selectedProfiles.some(
          (item) => item.profile.user_id === userId
        ),

      clearProfiles: () =>
        set({
          selectedProfiles: [],
        }),
    }),
    {
      name: "influencer-list",
    }
  )
);