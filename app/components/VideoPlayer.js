
"use client";
import { useContext, useState } from "react";
import { EditorContext } from "@/context/EditorContext";
import ReactPlayer from "react-player";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Toast } from "./ui/toast";
import Image from "next/image";

export default function VideoPlayer() {
  const { state, dispatch } = useContext(EditorContext);
  const { video, subtitles, overlays, audioSegments } = state;
  const [rendering, setRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleRender = () => {
    setRendering(true);
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 10;
      setProgress(progressValue);
      if (progressValue >= 100) {
        clearInterval(interval);
        // Simulate merging audio with video
        const activeAudio = audioSegments.filter((segment) => !segment.isMuted);
        dispatch({
          type: "SET_RENDERED_VIDEO",
          payload: {
            src: video.src || "#",
            audioSegments: activeAudio,
            subtitles,
            overlays,
          },
        });
        setRendering(false);
        setShowToast(true);
      }
    }, 500);
  };

  const handleDownload = () => {
    // Simulate downloading the rendered video with audio
    const link = document.createElement("a");
    link.href = video.src || "#";
    link.download = "edited-video-with-audio.mp4";
    link.click();
    // In a real implementation, the backend would merge audioSegments with video
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg relative">
      <h3 className="text-lg font-semibold mb-4">Preview</h3>
      <div className="relative aspect-video bg-black">
        {video.src ? (
          <ReactPlayer
            url={video.src}
            width="100%"
            height="100%"
            controls
            config={{
              file: {
                attributes: {
                  style: { width: "100%", height: "100%" },
                },
                // Include audio tracks in preview
                tracks: audioSegments
                  .filter((segment) => !segment.isMuted)
                  .map((segment, index) => ({
                    kind: "audio",
                    src: segment.src,
                    label: segment.name || `Audio Segment ${segment.id}`,
                    default: index === 0,
                  })),
              },
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No video uploaded
          </div>
        )}
        {subtitles.map((sub) => (
          <div
            key={sub.id}
            className="absolute text-center"
            style={{
              bottom:
                sub.styles.position === "bottom"
                  ? "10%"
                  : sub.styles.position === "center"
                  ? "50%"
                  : "auto",
              top:
                sub.styles.position === "top"
                  ? "10%"
                  : sub.styles.position === "center"
                  ? "50%"
                  : "auto",
              transform:
                sub.styles.position === "center" ? "translateY(-50%)" : "none",
              fontFamily: sub.styles.font,
              fontSize: `${sub.styles.size}px`,
              color: sub.styles.color,
              width: "100%",
              textShadow: "0 0 4px rgba(0,0,0,0.5)",
            }}
          >
            {sub.text}
          </div>
        ))}
        {overlays.map((overlay) => (
          <Image
            key={overlay.id}
            src={overlay.src}
            alt="overlay"
            width={overlay.styles.width}
            height={overlay.styles.height}
            className="absolute"
            style={{
              left: `${overlay.styles.x}px`,
              top: `${overlay.styles.y}px`,
              opacity: overlay.styles.opacity,
              border: overlay.styles.border,
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <Button onClick={handleRender} disabled={rendering || !video.src}>
          {rendering ? "Rendering..." : "Render Video"}
        </Button>
        <Button onClick={handleDownload} disabled={!video.src || rendering}>
          Download
        </Button>
      </div>
      {rendering && <Progress value={progress} className="mt-4" />}
      <Toast
        message="Video rendered successfully!"
        open={showToast}
        onOpenChange={setShowToast}
      />
    </div>
  );
}
