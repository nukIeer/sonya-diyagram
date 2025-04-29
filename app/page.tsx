"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { Code, Download, FileText, RefreshCw, Save, Settings, Share2, ImageIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Image from "next/image"
import { CodeEditor } from "@/components/mermaid/code-editor"
import { DiagramRenderer } from "@/components/mermaid/diagram-renderer"
import { MetadataEditor } from "@/components/mermaid/metadata-editor"
import { SettingsEditor } from "@/components/mermaid/settings-editor"
import { useExportFunctions } from "@/components/mermaid/export-functions"
import { sampleDiagrams } from "@/components/mermaid/sample-diagrams"

export default function MermaidRenderer() {
  const [code, setCode] = useState<string>("")
  const [projectName, setProjectName] = useState<string>("Sonya Topluluğu - TDIS Projesi")
  const [projectVersion, setProjectVersion] = useState<string>("1.0.0")
  const [projectDetails, setProjectDetails] = useState<string>(
    "Türkiye Deprem İzleme Sistemi - Açık Kaynak Yazılım Projesi",
  )
  const [date, setDate] = useState<Date>(new Date())
  const [theme, setTheme] = useState<string>("layered")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [exportLoading, setExportLoading] = useState<boolean>(false)
  const [layerColors, setLayerColors] = useState({
    layer1: { from: "#4f46e5", to: "#6366f1" },
    layer2: { from: "#8b5cf6", to: "#a855f7" },
    layer3: { from: "#ec4899", to: "#d946ef" },
    layer4: { from: "#06b6d4", to: "#0ea5e9" },
  })

  const diagramRef = useRef<HTMLDivElement>(null)
  const exportContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMermaidFromGitHub()
  }, [])

  const fetchMermaidFromGitHub = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://raw.githubusercontent.com/nukIeer/tdis/refs/heads/main/TDISTeam.mermaid")
      if (response.ok) {
        const mermaidCode = await response.text()
        setCode(mermaidCode)
      } else {
        console.error("Failed to fetch Mermaid code from GitHub")
      }
    } catch (error) {
      console.error("Error fetching Mermaid code:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateLayerColor = (layer: string, type: "from" | "to", color: string) => {
    setLayerColors((prev) => ({
      ...prev,
      [layer]: {
        ...prev[layer as keyof typeof prev],
        [type]: color,
      },
    }))
  }

  const loadSampleDiagram = (type: string) => {
    setCode(sampleDiagrams[type as keyof typeof sampleDiagrams])
  }

  const { exportToPDF, exportToPNG, exportToSVG, handleExport } = useExportFunctions({
    exportContainerRef,
    diagramRef,
    projectName,
    projectVersion,
    projectDetails,
    date,
    setExportLoading,
    setError,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#4f46e5] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
          <div className="absolute top-[40%] right-[10%] w-72 h-72 bg-[#8b5cf6] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[10%] left-[30%] w-80 h-80 bg-[#ec4899] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-[30%] right-[20%] w-60 h-60 bg-[#06b6d4] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-6000"></div>
        </div>
      </div>

      <div className="container mx-auto relative z-10 py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-sm"></div>
              <div className="absolute inset-0.5 bg-black rounded-xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src="/sonya-logo.png" alt="Sonya Topluluğu Logo" width={48} height={48} className="rounded-md" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Layered Mermaid Renderer
              </h1>
              <p className="text-gray-400">Sonya Topluluğu - 2030 Edition</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={exportLoading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-white shadow-lg shadow-indigo-600/20"
                >
                  {exportLoading ? (
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                  ) : (
                    <Download size={16} className="mr-2" />
                  )}
                  Export
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-0 bg-black/90 border border-indigo-500/30 backdrop-blur-md">
                <div className="flex flex-col">
                  <Button
                    variant="ghost"
                    onClick={() => handleExport("pdf")}
                    className="justify-start rounded-none hover:bg-indigo-950/50 text-indigo-100"
                  >
                    <FileText size={16} className="mr-2" />
                    Export to PDF
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleExport("png")}
                    className="justify-start rounded-none hover:bg-indigo-950/50 text-indigo-100"
                  >
                    <ImageIcon size={16} className="mr-2" />
                    Export to PNG
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleExport("svg")}
                    className="justify-start rounded-none hover:bg-indigo-950/50 text-indigo-100"
                  >
                    <Code size={16} className="mr-2" />
                    Export to SVG
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              className="border border-indigo-500/30 bg-black/20 text-indigo-400 hover:bg-indigo-950/30 backdrop-blur-sm"
            >
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Tabs defaultValue="editor" className="border-none">
              <TabsList className="grid w-full grid-cols-3 bg-black/30 backdrop-blur-md border border-indigo-500/20 rounded-xl p-1">
                <TabsTrigger
                  value="editor"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white rounded-lg"
                >
                  <Code size={16} />
                  Editor
                </TabsTrigger>
                <TabsTrigger
                  value="metadata"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white rounded-lg"
                >
                  <FileText size={16} />
                  Metadata
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600/80 data-[state=active]:to-purple-600/80 data-[state=active]:text-white rounded-lg"
                >
                  <Settings size={16} />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-4 mt-4">
                <Card className="border-0 bg-black/30 backdrop-blur-md border-gradient rounded-xl overflow-hidden">
                  <CodeEditor
                    code={code}
                    onChange={setCode}
                    onRender={() => {
                      if (diagramRef.current) {
                        const diagramRenderer = diagramRef.current.querySelector("[data-render-button]")
                        if (diagramRenderer instanceof HTMLButtonElement) {
                          diagramRenderer.click()
                        }
                      }
                    }}
                    onFetchFromGitHub={fetchMermaidFromGitHub}
                    loading={loading}
                    onLoadSample={loadSampleDiagram}
                  />
                </Card>
              </TabsContent>

              <TabsContent value="metadata" className="space-y-4 mt-4">
                <Card className="border-0 bg-black/30 backdrop-blur-md border-gradient rounded-xl overflow-hidden">
                  <MetadataEditor
                    projectName={projectName}
                    setProjectName={setProjectName}
                    projectVersion={projectVersion}
                    setProjectVersion={setProjectVersion}
                    projectDetails={projectDetails}
                    setProjectDetails={setProjectDetails}
                    date={date}
                    setDate={setDate}
                  />
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4 mt-4">
                <Card className="border-0 bg-black/30 backdrop-blur-md border-gradient rounded-xl overflow-hidden">
                  <SettingsEditor
                    theme={theme}
                    setTheme={setTheme}
                    layerColors={layerColors}
                    updateLayerColor={updateLayerColor}
                  />
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-0 bg-black/30 backdrop-blur-md border-gradient rounded-xl overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between mb-4">
                  <h2 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    Diagram Preview
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border border-indigo-500/30 bg-black/20 text-indigo-400 hover:bg-indigo-950/30"
                    >
                      <Save size={16} className="mr-2" />
                      Save
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          disabled={exportLoading}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-white shadow-lg shadow-indigo-600/20"
                        >
                          {exportLoading ? (
                            <RefreshCw size={16} className="mr-2 animate-spin" />
                          ) : (
                            <Download size={16} className="mr-2" />
                          )}
                          Export
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-0 bg-black/90 border border-indigo-500/30 backdrop-blur-md">
                        <div className="flex flex-col">
                          <Button
                            variant="ghost"
                            onClick={() => handleExport("pdf")}
                            className="justify-start rounded-none hover:bg-indigo-950/50 text-indigo-100"
                          >
                            <FileText size={16} className="mr-2" />
                            Export to PDF
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleExport("png")}
                            className="justify-start rounded-none hover:bg-indigo-950/50 text-indigo-100"
                          >
                            <ImageIcon size={16} className="mr-2" />
                            Export to PNG
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleExport("svg")}
                            className="justify-start rounded-none hover:bg-indigo-950/50 text-indigo-100"
                          >
                            <Code size={16} className="mr-2" />
                            Export to SVG
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div ref={exportContainerRef} className="relative rounded-xl overflow-hidden">
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-[2px]">
                    <div className="absolute inset-0 bg-[#0f0f1a] rounded-[9px]"></div>
                  </div>

                  <div className="relative p-6 z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                          {projectName}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-indigo-300">
                          <span className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>
                            Version: {projectVersion}
                          </span>
                          <span className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                            Date: {format(date, "PPP")}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-indigo-200">{projectDetails}</p>
                      </div>
                      <div className="hidden md:block">
                        <div className="w-16 h-16 relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-sm"></div>
                          <div className="absolute inset-0.5 bg-black rounded-xl"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                              src="/sonya-logo.png"
                              alt="Sonya Topluluğu Logo"
                              width={48}
                              height={48}
                              className="rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div ref={diagramRef}>
                      <DiagramRenderer code={code} layerColors={layerColors} />
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-2">
                      <div className="col-span-1 p-2 bg-black/50 border border-indigo-500/30 rounded-md backdrop-blur-sm">
                        <div className="text-xs text-indigo-400 font-mono">PROJECT ID</div>
                        <div className="text-sm text-indigo-200 font-mono">TDIS-2023</div>
                      </div>
                      <div className="col-span-1 p-2 bg-black/50 border border-indigo-500/30 rounded-md backdrop-blur-sm">
                        <div className="text-xs text-indigo-400 font-mono">STATUS</div>
                        <div className="text-sm text-green-400 font-mono">ACTIVE</div>
                      </div>
                      <div className="col-span-1 p-2 bg-black/50 border border-indigo-500/30 rounded-md backdrop-blur-sm">
                        <div className="text-xs text-indigo-400 font-mono">TEAM SIZE</div>
                        <div className="text-sm text-indigo-200 font-mono">15+</div>
                      </div>
                      <div className="col-span-1 p-2 bg-black/50 border border-indigo-500/30 rounded-md backdrop-blur-sm">
                        <div className="text-xs text-indigo-400 font-mono">LAST UPDATE</div>
                        <div className="text-sm text-indigo-200 font-mono">{format(new Date(), "yyyy-MM-dd")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
