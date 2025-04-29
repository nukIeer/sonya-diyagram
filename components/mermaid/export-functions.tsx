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
  const exportToPDF = async () => {
    if (!exportContainerRef.current) return

    setExportLoading(true)

    try {
      const element = exportContainerRef.current

      // Create a high-quality canvas with better settings
      const canvas = await html2canvas(element, {
        scale: 4, // Increase scale for higher resolution
        useCORS: true,
        logging: false,
        backgroundColor: "#0f0f1a",
        allowTaint: true,
        imageTimeout: 0,
        removeContainer: false,
        // Improve text rendering
        letterRendering: true,
        // Ensure we capture the full height and width
        height: element.scrollHeight + 100, // Add extra padding
        windowHeight: element.scrollHeight + 100,
        width: element.scrollWidth + 100,
        windowWidth: element.scrollWidth + 100,
      })

      const imgData = canvas.toDataURL("image/png", 1.0) // Use maximum quality

      // Determine orientation based on canvas dimensions
      const orientation = canvas.width > canvas.height ? "landscape" : "portrait"

      const pdf = new jsPDF({
        orientation: orientation,
        unit: "mm",
        compress: false, // Disable compression for better quality
        hotfixes: ["px_scaling"], // Fix scaling issues
        format: [canvas.width * 0.264583, canvas.height * 0.264583], // Convert pixels to mm
      })

      // Calculate dimensions to fit the entire image
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      // Add the image to fill the entire PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST")

      pdf.save(`${projectName.replace(/\s+/g, "_")}_${format(date, "yyyy-MM-dd")}.pdf`)
    } catch (error) {
      console.error("PDF export failed:", error)
      setError("PDF export failed. Please try again.")
    } finally {
      setExportLoading(false)
    }
  }

  const exportToPNG = async () => {
    if (!exportContainerRef.current) return

    setExportLoading(true)

    try {
      const element = exportContainerRef.current

      // Create a high-quality canvas with better settings
      const canvas = await html2canvas(element, {
        scale: 4, // Higher scale for better resolution
        useCORS: true,
        logging: false,
        backgroundColor: "#0f0f1a",
        allowTaint: true,
        imageTimeout: 0,
        removeContainer: false,
        letterRendering: true,
        // Ensure we capture the full height and width
        height: element.scrollHeight + 100,
        windowHeight: element.scrollHeight + 100,
        width: element.scrollWidth + 100,
        windowWidth: element.scrollWidth + 100,
      })

      // Convert to high-quality PNG
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

  const exportToSVG = async () => {
    if (!diagramRef.current) return

    setExportLoading(true)

    try {
      // Get the SVG content
      const svgElement = diagramRef.current.querySelector("svg")
      if (!svgElement) throw new Error("SVG element not found")

      // Clone the SVG to avoid modifying the displayed one
      const svgClone = svgElement.cloneNode(true) as SVGElement

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
