"use client";

import React from "react";
import { Handle, Position } from "@xyflow/react";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/Shadcn/avatar";
import { NodeData } from "../types";

interface EmployeeNodeProps {
  data: NodeData;
}

export default function EmployeeNode({ data }: EmployeeNodeProps) {
  return (
    <div
      className="min-w-[180px] min-h-[60px] rounded-lg bg-white border-2 border-blue-300 
                 flex items-center shadow-lg p-2 gap-3 relative"
    >
      {/* Connection handles */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-gray-600 border-2 border-white" 
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-gray-600 border-2 border-white" 
      />

      <Avatar className="w-10 h-10">
        <AvatarImage src={data.avatar} />
        <AvatarFallback className="bg-blue-600 text-white">
          <User className="w-5 h-5" />
        </AvatarFallback>
      </Avatar>
      
      <div>
        <div className="font-semibold text-base text-gray-800">{data.label}</div>
        <div className="text-sm text-gray-600">{data.position}</div>
        <div className="text-sm text-gray-600">{data.department}</div>
      </div>
    </div>
  );
}
