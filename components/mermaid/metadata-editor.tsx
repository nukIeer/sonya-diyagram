"use client"

import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Layers } from "lucide-react"

interface MetadataEditorProps {
  projectName: string
  setProjectName: (name: string) => void
  projectVersion: string
  setProjectVersion: (version: string) => void
  projectDetails: string
  setProjectDetails: (details: string) => void
  date: Date
  setDate: (date: Date) => void
}

export function MetadataEditor({
  projectName,
  setProjectName,
  projectVersion,
  setProjectVersion,
  projectDetails,
  setProjectDetails,
  date,
  setDate,
}: MetadataEditorProps) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center">
        <Layers size={18} className="mr-2 text-indigo-400" />
        Project Metadata
      </h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="project-name" className="text-indigo-300">
            Project Name
          </Label>
          <div className="relative mt-1">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur-sm"></div>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="relative bg-black/70 border-indigo-500/30 text-indigo-100 focus:border-indigo-400 focus:ring-indigo-400/30"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="project-version" className="text-indigo-300">
            Version
          </Label>
          <div className="relative mt-1">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur-sm"></div>
            <Input
              id="project-version"
              value={projectVersion}
              onChange={(e) => setProjectVersion(e.target.value)}
              className="relative bg-black/70 border-indigo-500/30 text-indigo-100 focus:border-indigo-400 focus:ring-indigo-400/30"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="project-date" className="text-indigo-300">
            Date
          </Label>
          <div className="relative mt-1">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur-sm"></div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal relative bg-black/70 border-indigo-500/30 text-indigo-100 hover:bg-indigo-950/30"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-black/90 border border-indigo-500/30 backdrop-blur-md">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                  className="bg-transparent text-indigo-100"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Label htmlFor="project-details" className="text-indigo-300">
            Project Details
          </Label>
          <div className="relative mt-1">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur-sm"></div>
            <Textarea
              id="project-details"
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              className="h-[100px] relative bg-black/70 border-indigo-500/30 text-indigo-100 focus:border-indigo-400 focus:ring-indigo-400/30"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
