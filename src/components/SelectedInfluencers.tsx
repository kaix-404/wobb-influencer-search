import { useInfluencerStore } from "@/store/influencerStore";
import { formatFollowers } from "@/utils/formatters";
import { FaInstagram, FaYoutube, FaTiktok, FaTrash } from "react-icons/fa";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import type { DropResult } from "@hello-pangea/dnd";

export function SelectedInfluencers() {
  const {
    selectedProfiles,
    removeProfile,
    clearProfiles,
    reorderProfiles,
  } = useInfluencerStore();

  const icons = {
    instagram: <FaInstagram className="text-pink-500" />,
    youtube: <FaYoutube className="text-red-500" />,
    tiktok: <FaTiktok className="text-black" />,
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    reorderProfiles(result.source.index, result.destination.index);
  };

  return (
    <aside className="sticky top-24 h-fit w-80 rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Selected Influencers
          </h2>

          <p className="text-sm text-gray-500">
            {selectedProfiles.length} selected
          </p>
        </div>
      </div>

      {selectedProfiles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center text-sm text-gray-400">
          No influencers selected.
        </div>
      ) : (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="selected-list">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3"
                >
                  {selectedProfiles.map((item, index) => (
                    <Draggable
                      key={`${item.platform}-${item.profile.user_id}`}
                      draggableId={`${item.platform}-${item.profile.user_id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                          className={`flex items-center justify-between rounded-xl border border-gray-100 p-3 transition ${
                            snapshot.isDragging
                              ? "bg-blue-50 shadow-lg"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.profile.picture}
                              alt={item.profile.fullname}
                              className="h-12 w-12 rounded-full object-cover"
                            />

                            <div>
                              <div className="flex items-center gap-2">
                                {icons[item.platform]}
                                <span className="font-medium">
                                  {item.profile.fullname}
                                </span>
                              </div>

                              <p className="text-xs text-gray-500">
                                @{item.profile.username}
                              </p>

                              <p className="text-xs text-gray-400">
                                {formatFollowers(item.profile.followers)} followers
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              removeProfile(item.profile.user_id)
                            }
                            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="my-5 border-t" />

          <button
            onClick={clearProfiles}
            className="w-full rounded-xl bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
          >
            Clear All
          </button>
        </>
      )}
    </aside>
  );
}