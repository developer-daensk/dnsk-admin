"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/Shadcn/card";
import { Badge } from "@/Components/Shadcn/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/Components/Shadcn/avatar";
import { OrganisationalChartProps } from "./types";
import { getDictionary } from "./i18n";
import { MapPin, User, Building2 } from "lucide-react";

export default function OrganisationalChart({
  locale,
  locations,
}: OrganisationalChartProps) {
  const dictionary = getDictionary(locale);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (!locations || locations.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <div className="text-2xl font-semibold text-muted-foreground mb-2">
              📊
            </div>
            <p className="text-muted-foreground">{dictionary.noData}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const headLocation = locations.find((loc) => loc.isHeadLocation);
  const branchLocations = locations.filter((loc) => !loc.isHeadLocation);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{dictionary.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{dictionary.subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Head Location */}
          {headLocation && (
            <div className="text-center">
              <div className="inline-flex flex-col items-center">
                {/* Head Location Circle */}
                <div className="w-32 h-32 rounded-full bg-blue-50 border-4 border-blue-300 flex flex-col items-center justify-center mb-4 shadow-lg">
                  <Building2 className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="font-bold text-lg text-gray-800">
                    {headLocation.name}
                  </span>
                  <Badge variant="default" className="mt-2">
                    Head Office
                  </Badge>
                </div>

                {/* Connection Line */}
                <div className="w-1 h-8 bg-blue-300 mb-4"></div>

                {/* Head Employees */}
                <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
                  {headLocation.employees.map((emp, idx) => (
                    <div
                      key={idx}
                      className="bg-white border-2 border-blue-300 rounded-lg p-4 shadow-md min-w-[200px]"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={emp.avatar} />
                          <AvatarFallback className="bg-blue-600 text-white">
                            <User className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {emp.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {emp.position}
                          </div>
                          <div className="text-sm text-gray-600">
                            {emp.department}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Branch Locations */}
          {branchLocations.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-1 h-8 bg-green-300 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-700 mb-6">
                  Branch Locations
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {branchLocations.map((branch, idx) => (
                  <div key={idx} className="space-y-4">
                    {/* Branch Location Circle */}
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-green-50 border-4 border-green-300 flex flex-col items-center justify-center mx-auto shadow-lg">
                        <MapPin className="w-6 h-6 text-green-600 mb-1" />
                        <span className="font-bold text-sm text-gray-800">
                          {branch.name}
                        </span>
                      </div>

                      {/* Connection Line */}
                      <div className="w-1 h-6 bg-green-300 mx-auto my-2"></div>
                    </div>

                    {/* Branch Employees */}
                    <div className="space-y-3">
                      {branch.employees.map((emp, empIdx) => (
                        <div
                          key={empIdx}
                          className="bg-white border-2 border-green-300 rounded-lg p-3 shadow-md"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={emp.avatar} />
                              <AvatarFallback className="bg-green-600 text-white text-xs">
                                <User className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold text-sm text-gray-800">
                                {emp.name}
                              </div>
                              <div className="text-xs text-gray-600">
                                {emp.position}
                              </div>
                              <div className="text-xs text-gray-600">
                                {emp.department}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
