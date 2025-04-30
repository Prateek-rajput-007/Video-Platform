import VideoUpload from "./components/VideoUpload";
import Timeline from "./components/Timeline";
import AudioWaveform from "./components/AudioWaveform";
import SubtitleControls from "./components/SubtitleControls";
import ImageOverlayControls from "./components/ImageOverlayControls";
import VideoPlayer from "./components/VideoPlayer";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Video Editor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <VideoUpload />
          <Timeline />
          <AudioWaveform />
        </div>
        <div className="space-y-6">
          <VideoPlayer />
          <SubtitleControls />
          <ImageOverlayControls />
        </div>
      </div>
    </main>
  );
}