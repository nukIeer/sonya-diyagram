"use client"

import type React from "react"
import { format } from "date-fns"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

interface ExportFunctionsProps {
  exportContainerRef: React.RefObject<HTMLDivElement>
  diagramRef: React.RefObject<HTMLDivElement>
  projectName: string
  projectVersion: string
  projectDetails: string
  date: Date
  setExportLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export function useExportFunctions({
  exportContainerRef,
  diagramRef,
  projectName,
  projectVersion,
  projectDetails,
  date,
  setExportLoading,
  setError,
}: ExportFunctionsProps) {
  // Add this helper function at the top of the useExportFunctions function
  const forceBlackBackgrounds = (container: HTMLElement) => {
    // Target all possible node shapes, but carefully exclude arrows
    const nodeShapes = container.querySelectorAll(
      ".node rect, .node circle, .node ellipse, .node polygon, .node path, .basic, .flowchart-label rect, .label-container, .flowchart-label polygon, .label, .cluster rect, rect.basic, polygon.label-container",
    )

    nodeShapes.forEach((shape) => {
      shape.setAttribute("fill", "#121212")
      shape.setAttribute("style", "fill: #121212 !important;")
    })

    // Override any inline styles that might be added by mermaid
    const whiteElements = container.querySelectorAll(
      '[style*="fill: rgb(255, 255, 255)"], [style*="fill:#fff"], [style*="fill: #fff"], [style*="fill:#ffffff"], [style*="fill: #ffffff"], [style*="fill: white"], [style*="fill:white"], [style*="fill: rgb(248, 248, 248)"], [style*="fill:#f9f9f9"], [style*="fill: #f9f9f9"]',
    )

    whiteElements.forEach((element) => {
      element.setAttribute("fill", "#121212")
      element.setAttribute("style", "fill: #121212 !important;")
    })

    // Make sure text is white
    const textElements = container.querySelectorAll("text, .nodeLabel")
    textElements.forEach((text) => {
      text.setAttribute("fill", "white")
      text.setAttribute(
        "style",
        "fill: white !important; color: white !important; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.8);",
      )
    })

    // Fix arrows
    const arrowPaths = container.querySelectorAll(".edgePath .path")
    arrowPaths.forEach((path) => {
      path.setAttribute("fill", "none")
      path.setAttribute("style", "fill: none !important;")
      path.setAttribute("stroke", "#6366f1")
      path.setAttribute("stroke-width", "2")
    })

    // Fix arrowheads
    const arrowheads = container.querySelectorAll(".arrowheadPath, .marker")
    arrowheads.forEach((arrowhead) => {
      arrowhead.setAttribute("fill", "#6366f1")
      arrowhead.setAttribute("style", "fill: #6366f1 !important;")
    })
  }

  // Update the exportToPDF function to use the forceBlackBackgrounds helper
  const exportToPDF = async () => {
    if (!exportContainerRef.current) return

    setExportLoading(true)

    try {
      // Get the exact container as rendered on the site - including logo and all elements
      const element = exportContainerRef.current

      // Force black backgrounds before export
      forceBlackBackgrounds(element)

      // Wait a moment to ensure styles are applied
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Force black backgrounds again to catch any late-rendered elements
      forceBlackBackgrounds(element)

      // Create an ultra-high quality canvas with the exact same approach as diagram-renderer
      const canvas = await html2canvas(element, {
        scale: 5, // Ultra-high resolution for maximum quality
        useCORS: true,
        logging: true,
        backgroundColor: "#0f0f1a",
        allowTaint: true,
        imageTimeout: 0,
        removeContainer: false,
        letterRendering: true,
      })

      // Get the image data at maximum quality
      const imgData = canvas.toDataURL("image/png", 1.0)

      // Determine orientation based on dimensions
      const orientation = canvas.width > canvas.height ? "landscape" : "portrait"

      // Create a PDF with the exact dimensions
      const pdf = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: [canvas.width * 0.264583, canvas.height * 0.264583], // Convert pixels to mm
        compress: false, // No compression for maximum quality
      })

      // Add the image at exact dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)

      // Save the PDF
      pdf.save(`${projectName.replace(/\s+/g, "_")}_${format(date, "yyyy-MM-dd")}.pdf`)
    } catch (error) {
      console.error("PDF export failed:", error)
      setError("PDF export failed. Please try again.")
    } finally {
      setExportLoading(false)
    }
  }

  // Update the exportToPNG function to use the forceBlackBackgrounds helper
  const exportToPNG = async () => {
    if (!exportContainerRef.current) return

    setExportLoading(true)

    try {
      // Get the exact container as rendered on the site - including logo and all elements
      const element = exportContainerRef.current

      // Force black backgrounds before export
      forceBlackBackgrounds(element)

      // Wait a moment to ensure styles are applied
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Force black backgrounds again to catch any late-rendered elements
      forceBlackBackgrounds(element)

      // Create an ultra-high quality canvas with the exact same approach as diagram-renderer
      const canvas = await html2canvas(element, {
        scale: 5, // Ultra-high resolution for maximum quality
        useCORS: true,
        logging: true,
        backgroundColor: "#0f0f1a",
        allowTaint: true,
        imageTimeout: 0,
        removeContainer: false,
        letterRendering: true,
      })

      // Get the image data at maximum quality
      const imgData = canvas.toDataURL("image/png", 1.0)

      // Create download link
      const link = document.createElement("a")
      link.download = `${projectName.replace(/\s+/g, "_")}_${format(date, "yyyy-MM-dd")}.png`
      link.href = imgData
      link.click()
    } catch (error) {
      console.error("PNG export failed:", error)
      setError("PNG export failed. Please try again.")
    } finally {
      setExportLoading(false)
    }
  }

  // Update the exportToSVG function to use the forceBlackBackgrounds helper
  const exportToSVG = async () => {
    if (!diagramRef.current) return

    setExportLoading(true)

    try {
      // Force black backgrounds on the diagram container
      if (diagramRef.current) {
        const container = diagramRef.current.querySelector(".mermaid-container")
        if (container) {
          forceBlackBackgrounds(container as HTMLElement)

          // Wait a moment to ensure styles are applied
          await new Promise((resolve) => setTimeout(resolve, 100))

          // Force black backgrounds again to catch any late-rendered elements
          forceBlackBackgrounds(container as HTMLElement)
        }
      }

      // Get the SVG content
      const svgElement = diagramRef.current.querySelector(".mermaid-container svg")
      if (!svgElement) throw new Error("SVG element not found")

      // Clone the SVG to avoid modifying the displayed one
      const svgClone = svgElement.cloneNode(true) as SVGElement

      // Force black backgrounds on the cloned SVG
      const nodeShapes = svgClone.querySelectorAll(
        ".node rect, .node circle, .node ellipse, .node polygon, .node path, .basic, .flowchart-label rect, .label-container",
      )
      nodeShapes.forEach((shape) => {
        shape.setAttribute("fill", "#121212")
        shape.setAttribute("style", "fill: #121212 !important;")
      })

      // Add project metadata to the SVG
      const metadataGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
      metadataGroup.innerHTML = `
        <text x="10" y="20" fill="white" fontSize="16" fontWeight="bold">${projectName}</text>
        <text x="10" y="40" fill="#a5b4fc" fontSize="12">Version: ${projectVersion}</text>
        <text x="150" y="40" fill="#a5b4fc" fontSize="12">Date: ${format(date, "PPP")}</text>
        <text x="10" y="60" fill="#a5b4fc" fontSize="12">${projectDetails}</text>
      `

      // Adjust the viewBox to make room for metadata
      const viewBox = svgClone.getAttribute("viewBox")?.split(" ").map(Number) || [0, 0, 800, 600]
      viewBox[1] -= 70 // Add space at the top for metadata
      viewBox[3] += 70 // Increase height
      svgClone.setAttribute("viewBox", viewBox.join(" "))

      // Insert metadata at the beginning
      svgClone.insertBefore(metadataGroup, svgClone.firstChild)

      // Convert to string with XML declaration
      const serializer = new XMLSerializer()
      let svgString = serializer.serializeToString(svgClone)
      svgString = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' + svgString

      // Create download link
      const blob = new Blob([svgString], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.download = `${projectName.replace(/\s+/g, "_")}_${format(date, "yyyy-MM-dd")}.svg`
      link.href = url
      link.click()

      // Clean up
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("SVG export failed:", error)
      setError("SVG export failed. Please try again.")
    } finally {
      setExportLoading(false)
    }
  }

  return {
    exportToPDF,
    exportToPNG,
    exportToSVG,
    handleExport: (format: "pdf" | "png" | "svg") => {
      switch (format) {
        case "pdf":
          exportToPDF()
          break
        case "png":
          exportToPNG()
          break
        case "svg":
          exportToSVG()
          break
      }
    },
  }
}
