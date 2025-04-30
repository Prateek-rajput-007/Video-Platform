"use client";
import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "./ui/button";

const Scene = ({ id, index, duration }) => {
  const { dispatch } = useContext(EditorContext);

  const [{ isDragging }, drag] = useDrag({
    type: "SCENE",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "SCENE",
    hover: (item) => {
      if (item.index !== index) {
        dispatch({
          type: "MOVE_SCENE",
          payload: { fromIndex: item.index, toIndex: index },
        });
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`h-16 bg-blue-200 rounded flex items-center justify-between px-2 ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{ width: `${duration * 50}px` }}
    >
      <span>Scene {id}</span>
      <Button
        variant="ghost"
        onClick={() => dispatch({ type: "REMOVE_SCENE", payload: id })}
      >
        ✕
      </Button>
    </div>
  );
};

export default function Timeline() {
  const { state, dispatch } = useContext(EditorContext);
  const { scenes } = state;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Timeline</h3>
        <div className="flex space-x-2 overflow-x-auto">
          {scenes.map((scene, index) => (
            <Scene key={scene.id} index={index} {...scene} />
          ))}
        </div>
        <div className="mt-4 flex space-x-2">
          <Button
            onClick={() =>
              dispatch({
                type: "ADD_SCENE",
                payload: { id: Date.now(), duration: 5 },
              })
            }
          >
            Add Scene
          </Button>
          <Button
            variant="outline"
            onClick={() => alert("Mock cut scene functionality")}
          >
            Cut Scene
          </Button>
        </div>
      </div>
    </DndProvider>
  );
}