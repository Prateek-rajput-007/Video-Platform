
"use client";
import { useContext, useState } from "react";
import { EditorContext } from "@/context/EditorContext";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Toast } from "./ui/toast";

const AudioSegment = ({ id, index, start, duration, isMuted, src, name }) => {
  const { dispatch } = useContext(EditorContext);

  const [{ isDragging }, drag] = useDrag({
    type: "AUDIO_SEGMENT",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "AUDIO_SEGMENT",
    hover: (item) => {
      if (item.index !== index) {
        dispatch({
          type: "MOVE_AUDIO",
          payload: { fromIndex: item.index, toIndex: index },
        });
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`h-12 bg-blue-200 rounded flex items-center justify-center relative overflow-hidden ${
        isMuted ? "opacity-50" : ""
      } ${isDragging ? "opacity-75" : ""}`}
      style={{ width: `${duration * 50}px` }}
      onClick={() => dispatch({ type: "TOGGLE_MUTE", payload: id })}
    >
      <div className="waveform absolute inset-0 flex items-center justify-center gap-1">
        <div className="w-1 bg-blue-600 animate-waveform" />
        <div className="w-1 bg-blue-600 animate-waveform" style={{ animationDelay: "0.2s" }} />
        <div className="w-1 bg-blue-600 animate-waveform" style={{ animationDelay: "0.4s" }} />
      </div>
      <span className="text-sm relative z-10">{name || `Segment ${id}`}</span>
    </div>
  );
};

export default function AudioWaveform() {
  const { state, dispatch } = useContext(EditorContext);
  const { audioSegments } = state;
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "audio/mpeg": [".mp3"] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        let progressValue = 0;
        const interval = setInterval(() => {
          progressValue += 10;
          setProgress(progressValue);
          if (progressValue >= 100) {
            clearInterval(interval);
            const audioSrc = URL.createObjectURL(file);
            dispatch({
              type: "ADD_AUDIO_SEGMENT",
              payload: {
                id: Date.now(),
                src: audioSrc,
                name: file.name,
                start: 0,
                duration: 60, // Mock duration
                isMuted: false,
              },
            });
            setShowToast(true);
            setProgress(0);
          }
        }, 200);
      }
    },
  });

  const handleRender = () => {
    // Dispatch audio segments to be included in the rendering process
    dispatch({ type: "RENDER_VIDEO_WITH_AUDIO", payload: audioSegments });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Audio Management</h3>
        <div className="flex space-x-2 overflow-x-auto">
          {audioSegments.map((segment, index) => (
            <AudioSegment key={segment.id} index={index} {...segment} />
          ))}
        </div>
        <div className="mt-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-4 text-center ${
              isDragActive ? "border-blue-600 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            <p className="text-gray-600">
              {isDragActive
                ? "Drop the .mp3 file here..."
                : "Drag & drop a .mp3 file or click to select"}
            </p>
          </div>
          {progress > 0 && progress < 100 && (
            <Progress value={progress} className="mt-4" />
          )}
          <Toast
            message="Background music uploaded successfully!"
            open={showToast}
            onOpenChange={setShowToast}
          />
        </div>
        <Button className="mt-4" onClick={handleRender}>
          Render Video with Audio
        </Button>
      </div>
    </DndProvider>
  );
}


