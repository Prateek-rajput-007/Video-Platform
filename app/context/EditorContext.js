"use client";

import { createContext, useReducer } from "react";

export const EditorContext = createContext();

const initialState = {
  video: {
    src: null,
    thumbnail: null,
    duration: 0,
  },
  scenes: [],
  audioSegments: [],
  subtitles: [],
  overlays: [],
  renderedVideo: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VIDEO":
      return { ...state, video: action.payload };
    case "ADD_SCENE":
      return { ...state, scenes: [...state.scenes, action.payload] };
    case "REMOVE_SCENE":
      return {
        ...state,
        scenes: state.scenes.filter((scene) => scene.id !== action.payload),
      };
    case "MOVE_SCENE":
      const { fromIndex, toIndex } = action.payload;
      const scenes = [...state.scenes];
      const [movedScene] = scenes.splice(fromIndex, 1);
      scenes.splice(toIndex, 0, movedScene);
      return { ...state, scenes };
    case "ADD_AUDIO_SEGMENT":
      return {
        ...state,
        audioSegments: [...state.audioSegments, action.payload],
      };
    case "MOVE_AUDIO":
      const { fromIndex: audioFromIndex, toIndex: audioToIndex } = action.payload;
      const audioSegments = [...state.audioSegments];
      const [movedAudio] = audioSegments.splice(audioFromIndex, 1);
      audioSegments.splice(audioToIndex, 0, movedAudio);
      return { ...state, audioSegments };
    case "TOGGLE_MUTE":
      return {
        ...state,
        audioSegments: state.audioSegments.map((segment) =>
          segment.id === action.payload
            ? { ...segment, isMuted: !segment.isMuted }
            : segment
        ),
      };
    case "ADD_SUBTITLE":
      return { ...state, subtitles: [...state.subtitles, action.payload] };
    case "UPDATE_SUBTITLE":
      return {
        ...state,
        subtitles: state.subtitles.map((sub) =>
          sub.id === action.payload.id
            ? { ...sub, styles: action.payload.styles }
            : sub
        ),
      };
    case "REMOVE_SUBTITLE":
      return {
        ...state,
        subtitles: state.subtitles.filter((sub) => sub.id !== action.payload),
      };
    case "ADD_IMAGE_OVERLAY":
      return { ...state, overlays: [...state.overlays, action.payload] };
    case "UPDATE_IMAGE_OVERLAY":
      return {
        ...state,
        overlays: state.overlays.map((overlay) =>
          overlay.id === action.payload.id
            ? { ...overlay, styles: action.payload.styles }
            : overlay
        ),
      };
    case "REMOVE_IMAGE_OVERLAY":
      return {
        ...state,
        overlays: state.overlays.filter(
          (overlay) => overlay.id !== action.payload
        ),
      };
    case "SET_RENDERED_VIDEO":
      return { ...state, renderedVideo: action.payload };
    default:
      return state;
  }
};

export const EditorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
};
