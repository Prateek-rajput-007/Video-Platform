"use client";
import { useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { EditorContext } from "../context/EditorContext";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Toast } from "./ui/toast";
import Image from "next/image";

export default function VideoUpload() {
  const { dispatch, state } = useContext(EditorContext);
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "video/*": [".mp4", ".mov"] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        // Simulate upload progress
        let progressValue = 0;
        const interval = setInterval(() => {
          progressValue += 10;
          setProgress(progressValue);
          if (progressValue >= 100) {
            clearInterval(interval);
            const videoSrc = URL.createObjectURL(file);
            dispatch({
              type: "SET_VIDEO",
              payload: {
                src: videoSrc,
                thumbnail: videoSrc, // Use video as thumbnail source
                duration: 60, // Mock duration
              },
            });
            setShowToast(true);
          }
        }, 200);
      }
    },
  });

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Upload Video</h3>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragActive ? "border-blue-600 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive ? "Drop the video here..." : "Drag & drop a video or click to select"}
        </p>
      </div>
      {progress > 0 && progress < 100 && (
        <div className="mt-4">
          <Progress value={progress} />
        </div>
      )}
      {state.video.thumbnail && (
        <div className="mt-4">
          <h4 className="text-sm font-medium">Preview</h4>
          <video
            src={state.video.thumbnail}
            className="mt-2 w-32 h-32 object-cover rounded"
            muted
          />
        </div>
      )}
      <Toast
        message="Video uploaded successfully!"
        open={showToast}
        onOpenChange={setShowToast}
      />
    </div>
  );
}