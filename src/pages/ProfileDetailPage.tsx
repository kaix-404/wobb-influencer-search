import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { ProfileDetailResponse } from "@/types";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import toast from "react-hot-toast";
import { useInfluencerStore } from "@/store/influencerStore";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaArrowLeft,
  FaUsers,
  FaEye,
  FaHeart,
  FaChartLine,
} from "react-icons/fa";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") || "instagram") as
    | "instagram"
    | "youtube"
    | "tiktok";

  const [profileData, setProfileData] =
    useState<ProfileDetailResponse | null>(null);

  const [loaded, setLoaded] = useState(false);

  const { selectedProfiles, addProfile } = useInfluencerStore();

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile.</p>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout>
        <p className="text-center py-20 text-gray-500">
          Loading profile...
        </p>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <p className="text-center text-red-500">
          Profile not found.
        </p>
      </Layout>
    );
  }

  const user = profileData.data.user_profile;

  const alreadyAdded = selectedProfiles.some(
    (p) => p.profile.user_id === user.user_id
  );

  const platformIcons = {
    instagram: <FaInstagram />,
    youtube: <FaYoutube />,
    tiktok: <FaTiktok />,
  };

  return (
    <Layout>
      <div className="mx-auto max-w-5xl">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-500 hover:text-black"
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="rounded-3xl border border-gray-200 p-8 shadow-sm">

          <div className="flex flex-col items-center">

            <img
              src={user.picture}
              alt={user.fullname}
              className="h-36 w-36 rounded-full border-4 border-white shadow-xl object-cover"
            />

            <h1 className="mt-5 flex items-center gap-2 text-3xl font-bold">

              {user.fullname}

              <VerifiedBadge verified={user.is_verified} />

            </h1>

            <p className="mt-1 text-gray-500">
              @{user.username}
            </p>

            <div className="mt-3 flex items-center gap-2 rounded-full border px-5 py-2">

              {platformIcons[platform]}

              <span className="capitalize font-medium">
                {platform}
              </span>

            </div>

          </div>

          <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4">

            <div className="rounded-xl p-5 text-center">
              <FaUsers className="mx-auto mb-2 text-blue-600" />
              <p className="text-xl font-bold">
                {formatFollowers(user.followers)}
              </p>
              <p className="text-sm text-gray-500">
                Followers
              </p>
            </div>

            <div className="rounded-xl p-5 text-center">
              <FaHeart className="mx-auto mb-2 text-red-500" />
              <p className="text-xl font-bold">
                {user.engagements
                  ? formatFollowers(user.engagements)
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                Engagements
              </p>
            </div>

            <div className="rounded-xl p-5 text-center">
              <FaChartLine className="mx-auto mb-2 text-green-600" />
              <p className="text-xl font-bold">
                {formatEngagementRate(user.engagement_rate)}
              </p>
              <p className="text-sm text-gray-500">
                Engagement Rate
              </p>
            </div>

            <div className="rounded-xl p-5 text-center">
              <FaEye className="mx-auto mb-2 text-purple-600" />
              <p className="text-xl font-bold">
                {user.avg_views
                  ? formatFollowers(user.avg_views)
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                Avg Views
              </p>
            </div>

          </div>

          {user.description && (
            <div className="mt-5 rounded-2xl border p-6">

              <h2 className="mb-3 text-xl font-semibold">
                About
              </h2>

              <p className="leading-7 text-gray-600">
                {user.description}
              </p>

            </div>
          )}

          <div className="mt-5 rounded-2xl border p-6">

            <h2 className="mb-6 text-xl font-semibold">
              Additional Information
            </h2>

            <div className="grid grid-cols-2 gap-y-5">

              {user.posts_count !== undefined && (
                <>
                  <span className="text-gray-500">Posts</span>
                  <span>{user.posts_count}</span>
                </>
              )}

              {user.avg_likes !== undefined && (
                <>
                  <span className="text-gray-500">Average Likes</span>
                  <span>{formatFollowers(user.avg_likes)}</span>
                </>
              )}

              {user.avg_comments !== undefined && (
                <>
                  <span className="text-gray-500">Average Comments</span>
                  <span>{formatFollowers(user.avg_comments)}</span>
                </>
              )}

              {user.avg_reels_plays !== undefined && (
                <>
                  <span className="text-gray-500">Average Reels</span>
                  <span>{formatFollowers(user.avg_reels_plays)}</span>
                </>
              )}

              {user.gender && (
                <>
                  <span className="text-gray-500">Gender</span>
                  <span>{user.gender}</span>
                </>
              )}

              {user.age_group && (
                <>
                  <span className="text-gray-500">Age Group</span>
                  <span>{user.age_group}</span>
                </>
              )}

              {user.type && (
                <>
                  <span className="text-gray-500">Creator Type</span>
                  <span>{user.type}</span>
                </>
              )}

            </div>

          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-blue-600 px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
              >
                Visit Profile
              </a>
            )}

            <button
              disabled={alreadyAdded}
              onClick={() => {
                if (alreadyAdded) {
                  toast("Already added!");
                  return;
                }

                addProfile(platform, user);

                toast.success("Added to List!");
              }}
              className={`rounded-xl px-8 py-3 font-semibold text-white transition ${
                alreadyAdded
                  ? "bg-green-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {alreadyAdded ? "Added ✓" : "Add to List"}
            </button>

          </div>

        </div>
      </div>
    </Layout>
  );
}