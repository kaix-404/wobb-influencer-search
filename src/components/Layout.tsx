import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useInfluencerStore } from "@/store/influencerStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const selectedCount = useInfluencerStore(
    (state) => state.selectedProfiles.length
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-100 hover:text-blue-600 transition"
          >
            Influencer Search
          </Link>

          <div className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
            Selected: {selectedCount}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {title && (
          <div className="mb-3">
            <p className="text-5xl font-bold text-gray-100">{title}</p>
            <p className="mt-1 text-gray-500">
              Browse and shortlist creators across multiple platforms.
            </p>
          </div>
        )}

        {children}
      </main>
    </div>
  );
}