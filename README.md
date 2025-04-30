
# 🎬 Video Editing Platform

A powerful, browser-based video editor built with **Next.js**. This platform allows users to upload videos, edit timelines, overlay subtitles and images, manage audio tracks, and preview edits in real-time — all with an intuitive UI and zero desktop software.

---

## 📸 Screenshot
![Screenshot 2025-04-30 213918](https://github.com/user-attachments/assets/ff314544-a066-4e51-acd6-42ff7980fa6c)

---

## ✨ Key Features

- 🎥 **Video Upload** – Drag-and-drop support for intuitive importing  
- ✂️ **Timeline Control** – Rearrange scenes & manage video flow  
- 🔊 **Audio Waveform** – Sync and visualize audio tracks  
- 📝 **Subtitles** – Add, style, and align captions  
- 🖼️ **Image Overlays** – Drag-and-position images dynamically  
- 👀 **Live Preview** – Real-time rendering of all changes  
- 💾 **Mock Render & Download** – Simulated exporting for final testing

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/), Tailwind CSS  
- **State Management**: React Context API with `useReducer`  
- **Drag & Drop**: React Dropzone, React DnD  
- **Media Player**: React Player  
- **Icons**: Lucide React

---

## 📁 Project Structure

```
/video-editor
├── /app
│   ├── /components
│   │   ├── /ui               # ShadCN-based reusable UI
│   │   │   ├── button.js
│   │   │   ├── dialog.js
│   │   │   ├── progress.js
│   │   │   ├── tabs.js
│   │   │   ├── toast.js
│   │   ├── AudioWaveform.js
│   │   ├── ImageOverlayControls.js
│   │   ├── SubtitleControls.js
│   │   ├── Timeline.js
│   │   ├── VideoPlayer.js
│   │   ├── VideoUpload.js
│   ├── /context
│   │   ├── EditorContext.js
│   ├── /lib
│   │   ├── utils.js
│   ├── /styles
│   │   ├── globals.css
│   ├── layout.js
│   ├── page.js
├── /public
│   ├── favicon.ico
│   ├── placeholder.jpg
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Node.js** (v18+)
- **npm** or **yarn**

### 📦 Installation

```bash
git clone https://github.com/yourusername/video-editor.git
cd video-editor
npm install   # or yarn
```

### 🧪 Run in Development Mode

```bash
npm run dev   # or yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Future Enhancements

- 🎞️ Export edited video using `ffmpeg.wasm`
- 🧠 AI-generated subtitles (e.g., Whisper integration)
- 🌐 User authentication and project persistence (Supabase/Firebase)
- ⬆️ Cloud storage integration (S3, Cloudinary)
