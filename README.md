# 🎬 Video Editing Platform

A modern, web-based **video editing tool** built with **Next.js**, enabling users to upload videos, add subtitles, manage audio, and apply image/text overlays — all from the browser.

![Video Editor Screenshot](/public/screenshot.png)

---

## ✨ Features

- 🎥 **Video Upload** – Drag-and-drop functionality for easy import
- ✂️ **Timeline Editor** – Rearrange scenes and control timing
- 🔊 **Audio Management** – Add tracks with waveform visualization
- 📝 **Subtitle Editor** – Insert, style, and position text overlays
- 🖼️ **Image Overlays** – Drag and position images on video
- 👀 **Live Preview** – Real-time feedback on all edits
- 💾 **Mock Rendering & Download** – Simulated video export for testing

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **UI & Styling:** Tailwind CSS, ShadCN UI
- **State Management:** React Context API + `useReducer`
- **File Handling:** React Dropzone + React DnD
- **Media Playback:** React Player
- **Icons:** Lucide React

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v18 or later)
- npm or yarn

### 📦 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/yourusername/video-editor.git
cd video-editor
npm install     # or yarn install
```

### 🔧 Run the Development Server

```bash
npm run dev     # or yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## 📂 Project Structure

```
video-editor/
├── public/                  # Static assets (images, videos)
├── components/              # Reusable UI components
├── context/                 # Global state (React Context)
├── pages/ or app/           # Next.js pages or App Router
├── styles/                  # Tailwind + custom styles
├── utils/                   # Helper functions
├── package.json             # Project metadata and scripts
```

---

## 🧪 Future Improvements

- Export edited videos with ffmpeg.wasm
- User accounts and persistent projects
- AI-powered subtitle generation
