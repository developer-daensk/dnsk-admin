"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { NodeData } from "../types";

interface LocationNodeProps {
  data: NodeData;
}

export default function LocationNode({ data }: LocationNodeProps) {
  const isHead = data.type === "head";

  return (
    <div
      className={`
        w-30 h-30 rounded-full flex flex-col items-center justify-center
        border-2 shadow-lg relative
        ${
          isHead ? "bg-blue-50 border-blue-300" : "bg-green-50 border-green-300"
        }
      `}
      style={{ width: "120px", height: "120px" }}
    >
      <MapPin
        className={`w-8 h-8 ${isHead ? "text-blue-600" : "text-green-600"}`}
      />
      <div className="font-semibold text-lg mt-2 text-center text-gray-800">
        {data.label}
      </div>
    </div>
  );
}
