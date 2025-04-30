"use client";
import { useState, useContext } from "react";
import { EditorContext } from "../context/EditorContext";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function SubtitleControls() {
  const { state, dispatch } = useContext(EditorContext);
  const { subtitles } = state;
  const [text, setText] = useState("");
  const [timing, setTiming] = useState({ start: 0, end: 5 });
  const [styles, setStyles] = useState({
    font: "Arial",
    size: 16,
    color: "#ffffff",
    position: "bottom",
  });

  const handleAddSubtitle = () => {
    if (text) {
      dispatch({
        type: "ADD_SUBTITLE",
        payload: {
          id: Date.now(),
          text,
          timing,
          styles,
        },
      });
      setText("");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Subtitles & Text Overlays</h3>
      <Tabs defaultValue="add" className="w-full">
        <TabsList>
          <TabsTrigger value="add">Add Subtitle</TabsTrigger>
          <TabsTrigger value="manage">Manage Subtitles</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <div className="space-y-4">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter subtitle text"
              className="w-full border rounded p-2"
            />
            <div className="flex space-x-2">
              <input
                type="number"
                value={timing.start}
                onChange={(e) => setTiming({ ...timing, start: Number(e.target.value) })}
                placeholder="Start time (s)"
                className="border rounded p-2 w-1/2"
              />
              <input
                type="number"
                value={timing.end}
                onChange={(e) => setTiming({ ...timing, end: Number(e.target.value) })}
                placeholder="End time (s)"
                className="border rounded p-2 w-1/2"
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={styles.font}
                onChange={(e) => setStyles({ ...styles, font: e.target.value })}
                className="border rounded p-2"
              >
                <option>Arial</option>
                <option>Times New Roman</option>
                <option>Helvetica</option>
              </select>
              <input
                type="number"
                value={styles.size}
                onChange={(e) => setStyles({ ...styles, size: Number(e.target.value) })}
                placeholder="Font size"
                className="border rounded p-2 w-24"
              />
              <input
                type="color"
                value={styles.color}
                onChange={(e) => setStyles({ ...styles, color: e.target.value })}
                className="border rounded"
              />
            </div>
            <select
              value={styles.position}
              onChange={(e) => setStyles({ ...styles, position: e.target.value })}
              className="border rounded p-2"
            >
              <option value="bottom">Bottom</option>
              <option value="top">Top</option>
              <option value="center">Center</option>
            </select>
            <Button onClick={handleAddSubtitle}>Add Subtitle</Button>
          </div>
        </TabsContent>
        <TabsContent value="manage">
          {subtitles.length === 0 ? (
            <p className="text-gray-500">No subtitles added yet.</p>
          ) : (
            subtitles.map((sub) => (
              <div key={sub.id} className="flex items-center space-x-2 mb-2">
                <span className="truncate max-w-xs">{sub.text}</span>
                <Button
                  variant="outline"
                  onClick={() =>
                    dispatch({
                      type: "UPDATE_SUBTITLE",
                      payload: {
                        id: sub.id,
                        styles: { ...sub.styles, size: sub.styles.size + 2 },
                      },
                    })
                  }
                >
                  Increase Size
                </Button>
                <Button
                  variant="ghost"
                  onClick={() =>
                    dispatch({ type: "REMOVE_SUBTITLE", payload: sub.id })
                  }
                >
                  ✕
                </Button>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}