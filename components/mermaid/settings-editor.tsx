"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ImageIcon, Zap } from "lucide-react"

interface SettingsEditorProps {
  theme: string
  setTheme: (theme: string) => void
  layerColors: {
    layer1: { from: string; to: string }
    layer2: { from: string; to: string }
    layer3: { from: string; to: string }
    layer4: { from: string; to: string }
  }
  updateLayerColor: (layer: string, type: "from" | "to", color: string) => void
}

export function SettingsEditor({ theme, setTheme, layerColors, updateLayerColor }: SettingsEditorProps) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center">
        <Zap size={18} className="mr-2 text-indigo-400" />
        Diagram Settings
      </h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="theme" className="text-indigo-300">
            Theme
          </Label>
          <div className="relative mt-1">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur-sm"></div>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-2 rounded-md relative bg-black/70 border-indigo-500/30 text-indigo-100 focus:border-indigo-400 focus:ring-indigo-400/30"
            >
              <option value="layered">Layered (2030)</option>
              <option value="futuristic">Futuristic</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="neon">Neon</option>
            </select>
          </div>
        </div>

        <div>
          <Label className="text-indigo-300 mb-2 block">Layer Colors</Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="layer1-from" className="text-xs text-indigo-300">
                Layer 1 (From)
              </Label>
              <div className="relative mt-1">
                <input
                  type="color"
                  id="layer1-from"
                  value={layerColors.layer1.from}
                  onChange={(e) => updateLayerColor("layer1", "from", e.target.value)}
                  className="w-full h-8 rounded-md cursor-pointer"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="layer1-to" className="text-xs text-indigo-300">
                Layer 1 (To)
              </Label>
              <div className="relative mt-1">
                <input
                  type="color"
                  id="layer1-to"
                  value={layerColors.layer1.to}
                  onChange={(e) => updateLayerColor("layer1", "to", e.target.value)}
                  className="w-full h-8 rounded-md cursor-pointer"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="layer2-from" className="text-xs text-indigo-300">
                Layer 2 (From)
              </Label>
              <div className="relative mt-1">
                <input
                  type="color"
                  id="layer2-from"
                  value={layerColors.layer2.from}
                  onChange={(e) => updateLayerColor("layer2", "from", e.target.value)}
                  className="w-full h-8 rounded-md cursor-pointer"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="layer2-to" className="text-xs text-indigo-300">
                Layer 2 (To)
              </Label>
              <div className="relative mt-1">
                <input
                  type="color"
                  id="layer2-to"
                  value={layerColors.layer2.to}
                  onChange={(e) => updateLayerColor("layer2", "to", e.target.value)}
                  className="w-full h-8 rounded-md cursor-pointer"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="layer3-from" className="text-xs text-indigo-300">
                Layer 3 (From)
              </Label>
              <div className="relative mt-1">
                <input
                  type="color"
                  id="layer3-from"
                  value={layerColors.layer3.from}
                  onChange={(e) => updateLayerColor("layer3", "from", e.target.value)}
                  className="w-full h-8 rounded-md cursor-pointer"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="layer3-to" className="text-xs text-indigo-300">
                Layer 3 (To)
              </Label>
              <div className="relative mt-1">
                <input
                  type="color"
                  id="layer3-to"
                  value={layerColors.layer3.to}
                  onChange={(e) => updateLayerColor("layer3", "to", e.target.value)}
                  className="w-full h-8 rounded-md cursor-pointer"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="layer4-from" className="text-xs text-indigo-300">
                Layer 4 (From)
              </Label>
              <div className="relative mt-1">
                <input
                  type="color"
                  id="layer4-from"
                  value={layerColors.layer4.from}
                  onChange={(e) => updateLayerColor("layer4", "from", e.target.value)}
                  className="w-full h-8 rounded-md cursor-pointer"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="layer4-to" className="text-xs text-indigo-300">
                Layer 4 (To)
              </Label>
              <div className="relative mt-1">
                <input
                  type="color"
                  id="layer4-to"
                  value={layerColors.layer4.to}
                  onChange={(e) => updateLayerColor("layer4", "to", e.target.value)}
                  className="w-full h-8 rounded-md cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="logo" className="text-indigo-300">
            Logo
          </Label>
          <div className="mt-2">
            <Button
              variant="outline"
              className="w-full border border-indigo-500/30 bg-black/20 text-indigo-400 hover:bg-indigo-950/30"
            >
              <ImageIcon size={16} className="mr-2" />
              Upload Logo
            </Button>
          </div>
          <p className="text-xs mt-1 text-indigo-400/70">Recommended size: 64x64px, square format</p>
        </div>
      </div>
    </div>
  )
}
