"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from "@/components/ui/glass-card"
import { toast } from "@/components/shared/toast"
import { FileText, Download, Loader2 } from "lucide-react"
import { generatePDF } from "@/lib/pdf-generator"

export default function DashboardPage() {
  const [text, setText] = useState("")
  const [fileName, setFileName] = useState("document")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePDF = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text")
      return
    }

    setIsGenerating(true)
    
    try {
      await generatePDF(text, fileName)
      toast.success("PDF generated successfully!")
    } catch (error) {
      console.error("PDF generation error:", error)
      toast.error("Failed to generate PDF")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleClear = () => {
    setText("")
    setFileName("document")
    toast.info("Text cleared")
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Text to PDF Converter</h1>
        <p className="text-muted-foreground">
          Convert your text into a professionally formatted PDF document
        </p>
      </div>

      {/* Main Converter Card */}
      <GlassCard>
        <GlassCardContent className="space-y-6">
          <GlassCardHeader>
            <GlassCardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Create PDF Document
            </GlassCardTitle>
            <GlassCardDescription>
              Paste or type your text below and convert it to a PDF file
            </GlassCardDescription>
          </GlassCardHeader>

          {/* File Name Input */}
          <div className="space-y-2">
            <Label htmlFor="fileName">File Name</Label>
            <Input
              id="fileName"
              placeholder="Enter file name (without .pdf extension)"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          {/* Text Input */}
          <div className="space-y-2">
            <Label htmlFor="textInput">Your Text</Label>
            <Textarea
              id="textInput"
              placeholder="Paste or type your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
              disabled={isGenerating}
            />
            <p className="text-xs text-muted-foreground">
              Character count: {text.length}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={isGenerating || !text}
            >
              Clear
            </Button>
            <Button
              onClick={handleGeneratePDF}
              disabled={isGenerating || !text.trim()}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Generate PDF
                </>
              )}
            </Button>
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ol className="list-decimal list-inside space-y-2">
              <li>Enter a name for your PDF file</li>
              <li>Paste or type your text in the text area</li>
              <li>Click "Generate PDF" to create your document</li>
              <li>The PDF will be automatically downloaded</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc list-inside space-y-2">
              <li>Automatic text wrapping</li>
              <li>Professional formatting</li>
              <li>Custom file naming</li>
              <li>Instant download</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}