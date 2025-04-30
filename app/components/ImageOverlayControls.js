"use client";

import { useState, useContext } from "react";
import { EditorContext } from "../context/EditorContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";

export default function ImageOverlayControls() {
  const { state, dispatch } = useContext(EditorContext);
  const { overlays } = state;
  const [imageFile, setImageFile] = useState(null);
  const [styles, setStyles] = useState({
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    opacity: 1,
    border: "none",
  });

  const handleUpload = () => {
    if (imageFile) {
      dispatch({
        type: "ADD_IMAGE_OVERLAY",
        payload: {
          id: Date.now(),
          src: URL.createObjectURL(imageFile),
          styles,
        },
      });
      setImageFile(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Image Overlays</h3>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Upload Image</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Image Overlay</DialogTitle>
          </DialogHeader>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <div className="space-y-4 mt-4">
            <label className="flex items-center">
              Width:
              <input
                type="number"
                value={styles.width}
                onChange={(e) => setStyles({ ...styles, width: Number(e.target.value) })}
                className="ml-2 border rounded p-1"
              />
            </label>
            <label className="flex items-center">
              Height:
              <input
                type="number"
                value={styles.height}
                onChange={(e) => setStyles({ ...styles, height: Number(e.target.value) })}
                className="ml-2 border rounded p-1"
              />
            </label>
            <label className="flex items-center">
              X Position:
              <input
                type="number"
                value={styles.x}
                onChange={(e) => setStyles({ ...styles, x: Number(e.target.value) })}
                className="ml-2 border rounded p-1"
              />
            </label>
            <label className="flex items-center">
              Y Position:
              <input
                type="number"
                value={styles.y}
                onChange={(e) => setStyles({ ...styles, y: Number(e.target.value) })}
                className="ml-2 border rounded p-1"
              />
            </label>
            <label className="flex items-center">
              Opacity:
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={styles.opacity}
                onChange={(e) => setStyles({ ...styles, opacity: Number(e.target.value) })}
                className="ml-2"
              />
            </label>
            <label className="flex items-center">
              Border:
              <select
                value={styles.border}
                onChange={(e) => setStyles({ ...styles, border: e.target.value })}
                className="ml-2 border rounded p-1"
              >
                <option value="none">None</option>
                <option value="2px solid black">Black Border</option>
                <option value="2px solid white">White Border</option>
              </select>
            </label>
          </div>
          <Button onClick={handleUpload}>Add Overlay</Button>
        </DialogContent>
      </Dialog>
      <div className="mt-4 space-y-2">
        {overlays.map((overlay) => (
          <div key={overlay.id} className="flex items-center space-x-2">
            <Image
              src={overlay.src}
              alt="overlay"
              width={64}
              height={64}
              className="object-cover rounded"
            />
            <Button
              variant="outline"
              onClick={() =>
                dispatch({
                  type: "UPDATE_IMAGE_OVERLAY",
                  payload: {
                    id: overlay.id,
                    styles: { ...overlay.styles, x: overlay.styles.x + 10 },
                  },
                })
              }
            >
              Move Right
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                dispatch({ type: "REMOVE_IMAGE_OVERLAY", payload: overlay.id })
              }
            >
              ✕
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}