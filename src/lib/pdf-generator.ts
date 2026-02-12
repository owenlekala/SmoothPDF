import { jsPDF } from "jspdf"

export interface PDFOptions {
  fontSize?: number
  lineHeight?: number
  marginLeft?: number
  marginRight?: number
  marginTop?: number
  marginBottom?: number
  fontFamily?: string
  preserveFormatting?: boolean
}

/**
 * Generate a PDF from text content with preserved formatting
 * @param text - The text content to convert to PDF
 * @param fileName - The name of the PDF file (without extension)
 * @param options - Optional formatting options
 */
export async function generatePDF(
  text: string,
  fileName: string = "document",
  options: PDFOptions = {}
): Promise<void> {
  const {
    fontSize = 12,
    lineHeight = 1.5,
    marginLeft = 20,
    marginRight = 20,
    marginTop = 20,
    marginBottom = 20,
    fontFamily = "helvetica",
    preserveFormatting = true,
  } = options

  // Create new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Set font
  doc.setFont(fontFamily)
  doc.setFontSize(fontSize)

  // Get page dimensions
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  
  // Calculate usable width and height
  const usableWidth = pageWidth - marginLeft - marginRight
  const usableHeight = pageHeight - marginTop - marginBottom

  // Calculate line height in mm
  const lineHeightMM = fontSize * 0.352778 * lineHeight // Convert points to mm

  let currentY = marginTop

  if (preserveFormatting) {
    // Split text by original line breaks first
    const originalLines = text.split('\n')
    
    originalLines.forEach((line, lineIndex) => {
      // If line is empty, add spacing (empty paragraph)
      if (line.trim() === '') {
        // Add extra space for empty lines (paragraph breaks)
        currentY += lineHeightMM * 0.7
        
        // Check if we need a new page
        if (currentY > pageHeight - marginBottom) {
          doc.addPage()
          currentY = marginTop
        }
        return
      }

      // For non-empty lines, split if they're too long
      const wrappedLines = doc.splitTextToSize(line, usableWidth)
      
      wrappedLines.forEach((wrappedLine: string, wrapIndex: number) => {
        // Check if we need a new page
        if (currentY + lineHeightMM > pageHeight - marginBottom) {
          doc.addPage()
          currentY = marginTop
        }

        // Add text to PDF
        doc.text(wrappedLine, marginLeft, currentY)
        currentY += lineHeightMM
      })
    })
  } else {
    // Original behavior - treat all text as continuous
    const textLines = doc.splitTextToSize(text, usableWidth)

    textLines.forEach((line: string) => {
      // Check if we need a new page
      if (currentY + lineHeightMM > pageHeight - marginBottom) {
        doc.addPage()
        currentY = marginTop
      }

      // Add text to PDF
      doc.text(line, marginLeft, currentY)
      currentY += lineHeightMM
    })
  }

  // Save the PDF
  const sanitizedFileName = fileName.replace(/[^a-z0-9_-]/gi, "_")
  doc.save(`${sanitizedFileName}.pdf`)
}

/**
 * Generate a PDF with custom formatting sections
 * This is useful for documents with titles, headings, and body text
 */
export async function generateFormattedPDF(
  sections: Array<{
    text: string
    type?: "title" | "heading" | "body"
    fontSize?: number
    bold?: boolean
  }>,
  fileName: string = "document"
): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const marginLeft = 20
  const marginRight = 20
  const marginTop = 20
  const marginBottom = 20

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const usableWidth = pageWidth - marginLeft - marginRight

  let currentY = marginTop

  sections.forEach((section) => {
    // Determine font size based on type
    let fontSize = section.fontSize || 12
    if (section.type === "title") fontSize = section.fontSize || 18
    if (section.type === "heading") fontSize = section.fontSize || 14

    // Set font style
    doc.setFontSize(fontSize)
    doc.setFont("helvetica", section.bold ? "bold" : "normal")

    // Calculate line height
    const lineHeight = fontSize * 0.352778 * 1.5

    // Split text to fit width
    const textLines = doc.splitTextToSize(section.text, usableWidth)

    // Check if we need a new page
    const sectionHeight = textLines.length * lineHeight
    if (currentY + sectionHeight > pageHeight - marginBottom) {
      doc.addPage()
      currentY = marginTop
    }

    // Add text
    textLines.forEach((line: string) => {
      doc.text(line, marginLeft, currentY)
      currentY += lineHeight
    })

    // Add spacing after section
    currentY += lineHeight * 0.5
  })

  // Save the PDF
  const sanitizedFileName = fileName.replace(/[^a-z0-9_-]/gi, "_")
  doc.save(`${sanitizedFileName}.pdf`)
}

/**
 * Parse simple markdown-like text and generate formatted PDF
 * Supports:
 * - # Title
 * - ## Heading
 * - Regular text
 */
export async function generatePDFFromMarkdown(
  text: string,
  fileName: string = "document"
): Promise<void> {
  const lines = text.split("\n")
  const sections: Array<{
    text: string
    type: "title" | "heading" | "body"
    bold?: boolean
  }> = []

  lines.forEach((line) => {
    const trimmedLine = line.trim()
    
    if (!trimmedLine) {
      // Skip empty lines
      return
    }

    if (trimmedLine.startsWith("# ")) {
      // Title
      sections.push({
        text: trimmedLine.substring(2),
        type: "title",
        bold: true,
      })
    } else if (trimmedLine.startsWith("## ")) {
      // Heading
      sections.push({
        text: trimmedLine.substring(3),
        type: "heading",
        bold: true,
      })
    } else {
      // Body text
      sections.push({
        text: trimmedLine,
        type: "body",
      })
    }
  })

  await generateFormattedPDF(sections, fileName)
}