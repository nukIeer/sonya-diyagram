"use client"

import { useRef, useState, useEffect } from "react"
import mermaid from "mermaid"
import { cn } from "@/lib/utils"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

interface DiagramRendererProps {
  code: string
  layerColors: {
    layer1: { from: string; to: string }
    layer2: { from: string; to: string }
    layer3: { from: string; to: string }
    layer4: { from: string; to: string }
  }
  projectName: string
  projectVersion: string
  projectDetails: string
  date: Date
}

export function DiagramRenderer({
  code,
  layerColors,
  projectName,
  projectVersion,
  projectDetails,
  date,
}: DiagramRendererProps) {
  const diagramRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Force black backgrounds after rendering
  useEffect(() => {
    if (diagramRef.current) {
      const forceBlackBackgrounds = () => {
        // Target only node shapes, not arrows or markers
        const nodeShapes = diagramRef.current?.querySelectorAll(
          ".node rect, .node circle, .node ellipse, .node polygon, .node path, .basic, .label-container",
        )
        nodeShapes?.forEach((shape) => {
          shape.setAttribute("fill", "#121212")
          shape.setAttribute("style", "fill: #121212 !important;")
        })
      }

      // Run multiple times to catch any late-rendered elements
      forceBlackBackgrounds()
      setTimeout(forceBlackBackgrounds, 100)
      setTimeout(forceBlackBackgrounds, 500)
    }
  }, [loading])

  const renderDiagram = async () => {
    if (!diagramRef.current) return

    setLoading(true)
    setError(null)

    try {
      diagramRef.current.innerHTML = ""

      // Add metadata to the diagram container
      const metadataDiv = document.createElement("div")
      metadataDiv.className = "mb-4 p-3 bg-black/30 rounded-lg border border-indigo-500/30"
      metadataDiv.innerHTML = `
        <h3 class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          ${projectName}
        </h3>
        <div class="flex flex-wrap gap-4 text-sm text-indigo-300 mt-1">
          <span class="flex items-center">
            <span class="w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>
            Version: ${projectVersion}
          </span>
          <span class="flex items-center">
            <span class="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
            Date: ${format(date, "PPP")}
          </span>
        </div>
        <p class="mt-1 text-sm text-indigo-200">${projectDetails}</p>
      `
      diagramRef.current.appendChild(metadataDiv)

      // Create diagram container
      const diagramContainer = document.createElement("div")
      diagramContainer.className = "mermaid-container"
      diagramRef.current.appendChild(diagramContainer)

      // Override mermaid's internal styles - CAREFULLY EXCLUDING ARROWS
      const style = document.createElement("style")
      style.textContent = `
        .mermaid .node rect, 
        .mermaid .node circle, 
        .mermaid .node ellipse, 
        .mermaid .node polygon, 
        .mermaid .node path,
        .mermaid .basic,
        .mermaid .flowchart-label rect,
        .mermaid .label-container {
          fill: #121212 !important;
          stroke: url(#border-gradient) !important;
          stroke-width: 3px !important;
        }
        
        .mermaid text {
          fill: white !important;
          color: white !important;
        }
      `
      diagramContainer.appendChild(style)

      // Initialize mermaid with proper settings
      mermaid.initialize({
        startOnLoad: true,
        theme: "dark",
        securityLevel: "loose",
        fontFamily: "'Inter', sans-serif",
        themeVariables: {
          primaryColor: "#121212", // Dark background
          primaryTextColor: "#ffffff", // White text
          primaryBorderColor: "#6366f1",
          lineColor: "#8b5cf6",
          secondaryColor: "#121212", // Force secondary color to be black too
          tertiaryColor: "#121212", // Force tertiary color to be black too
          noteBackgroundColor: "#121212", // Force note backgrounds to be black
          noteBorderColor: "#6366f1",
        },
      })

      const { svg } = await mermaid.render("mermaid-diagram", code)

      // Add gradient definitions to SVG
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(svg, "image/svg+xml")

      // Create defs element if it doesn't exist
      let defsElement = svgDoc.querySelector("defs")
      if (!defsElement) {
        defsElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "defs")
        svgDoc.documentElement.prepend(defsElement)
      }

      // Add gradients
      defsElement.innerHTML = `
      <linearGradient id="gradient-title" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="${layerColors.layer1.from}" />
        <stop offset="100%" stopColor="${layerColors.layer1.to}" />
      </linearGradient>
      <linearGradient id="gradient-leader" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="${layerColors.layer2.from}" />
        <stop offset="100%" stopColor="${layerColors.layer2.to}" />
      </linearGradient>
      <linearGradient id="gradient-coordinator" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="${layerColors.layer3.from}" />
        <stop offset="100%" stopColor="${layerColors.layer3.to}" />
      </linearGradient>
      <linearGradient id="gradient-teamlead" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="${layerColors.layer4.from}" />
        <stop offset="100%" stopColor="${layerColors.layer4.to}" />
      </linearGradient>
      <linearGradient id="gradient-advisor" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
      <linearGradient id="border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="33%" stopColor="#8b5cf6" />
        <stop offset="66%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feFlood floodColor="#4f46e5" floodOpacity="0.5" result="color"/>
        <feComposite in="color" in2="blur" operator="in" result="glow"/>
        <feComposite in="SourceGraphic" in2="glow" operator="over"/>
      </filter>
    `

      diagramContainer.innerHTML = svgDoc.documentElement.outerHTML

      // Apply styles to all nodes and text elements
      if (diagramContainer) {
        // Make links open in new tab
        const links = diagramContainer.querySelectorAll("a")
        links.forEach((link) => {
          link.setAttribute("target", "_blank")
          link.setAttribute("rel", "noopener noreferrer")
        })

        // FORCE NODE SHAPES TO BE BLACK - carefully excluding arrows
        const nodeShapes = diagramContainer.querySelectorAll(
          ".node rect, .node circle, .node ellipse, .node polygon, .node path, .basic, .label-container",
        )
        nodeShapes.forEach((shape) => {
          shape.setAttribute("fill", "#121212")
          shape.setAttribute("style", "fill: #121212 !important;")

          // Add gradient borders to most shapes
          if (!shape.getAttribute("class")?.includes("label-container")) {
            shape.setAttribute("stroke", "url(#border-gradient)")
            shape.setAttribute("stroke-width", "3")
          }
        })

        // Specifically target label containers
        const labelContainers = diagramContainer.querySelectorAll(".label-container")
        labelContainers.forEach((container) => {
          container.setAttribute("fill", "#121212")
          container.setAttribute("style", "fill: #121212 !important;")
        })

        // Target basic shapes which are often used in flowcharts
        const basicShapes = diagramContainer.querySelectorAll(".basic")
        basicShapes.forEach((shape) => {
          shape.setAttribute("fill", "#121212")
          shape.setAttribute("style", "fill: #121212 !important;")
          shape.setAttribute("stroke", "url(#border-gradient)")
          shape.setAttribute("stroke-width", "3")
        })

        // Make all text WHITE for visibility on dark backgrounds
        const allTexts = diagramContainer.querySelectorAll("text, .nodeLabel")
        allTexts.forEach((text) => {
          text.setAttribute("fill", "white")
          text.setAttribute(
            "style",
            "fill: white !important; color: white !important; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.8);",
          )
        })

        // Fix all foreignObject divs to have white text
        const allForeignObjects = diagramContainer.querySelectorAll("foreignObject div")
        allForeignObjects.forEach((div) => {
          div.setAttribute(
            "style",
            "color: white !important; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.8);",
          )
        })

        // FIX ARROWS - Make sure they're properly styled
        const arrowPaths = diagramContainer.querySelectorAll(".edgePath .path")
        arrowPaths.forEach((path, index) => {
          path.setAttribute("class", "path animated-path")
          path.setAttribute("stroke", "#6366f1")
          path.setAttribute("stroke-width", "2")
          path.setAttribute("stroke-dasharray", "5,5")
          path.setAttribute("style", `animation-delay: ${index * 0.2}s; fill: none !important;`)
          path.setAttribute("fill", "none")
        })

        // Fix arrow markers
        const arrowMarkers = diagramContainer.querySelectorAll(".marker")
        arrowMarkers.forEach((marker) => {
          marker.setAttribute("fill", "#6366f1")
          marker.setAttribute("style", "fill: #6366f1 !important;")
        })

        // Fix arrowheads
        const arrowheads = diagramContainer.querySelectorAll(".arrowheadPath")
        arrowheads.forEach((arrowhead) => {
          arrowhead.setAttribute("fill", "#6366f1")
          arrowhead.setAttribute("style", "fill: #6366f1 !important;")
        })

        // Style the subgraphs (layers)
        const clusters = diagramContainer.querySelectorAll(".cluster")
        clusters.forEach((cluster) => {
          // Add a subtle glow to the cluster backgrounds
          const rect = cluster.querySelector("rect")
          if (rect) {
            rect.setAttribute("rx", "15")
            rect.setAttribute("ry", "15")

            // Add a subtle animation to the layers
            const id = cluster.id
            if (id.includes("layer-1")) {
              rect.setAttribute("class", "layer-animation layer-1-bg")
            } else if (id.includes("layer-2")) {
              rect.setAttribute("class", "layer-animation layer-2-bg")
            } else if (id.includes("layer-3")) {
              rect.setAttribute("class", "layer-animation layer-3-bg")
            } else if (id.includes("layer-4")) {
              rect.setAttribute("class", "layer-animation layer-4-bg")
            }
          }
        })
      }
    } catch (err) {
      console.error("Failed to render diagram:", err)
      setError(`Failed to render diagram: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div
        ref={diagramRef}
        className="mermaid-diagram overflow-auto p-4 rounded-lg bg-black/50 border border-indigo-500/20 shadow-[0_0_25px_rgba(79,70,229,0.2)]"
      >
        {/* Mermaid diagram will be rendered here */}
      </div>

      {error && <p className="text-red-400 mt-2">{error}</p>}

      <div className="flex justify-end">
        <Button
          onClick={renderDiagram}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-white shadow-lg shadow-indigo-600/20"
          data-render-button
        >
          <RefreshCw size={16} className={cn("mr-2", loading && "animate-spin")} />
          Render Diagram
        </Button>
      </div>
    </div>
  )
}
