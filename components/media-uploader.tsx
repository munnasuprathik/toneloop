"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon, FileText, Film, File, AlertCircle } from "lucide-react"
import { useState, useRef } from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  progress: number
  error?: string
  url?: string
}

export function MediaUploader() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (files: File[]) => {
    // Create file objects with initial progress
    const newFiles = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      progress: 0,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])
    setIsUploading(true)

    // Simulate file upload progress
    newFiles.forEach((file) => {
      simulateFileUpload(file.id)
    })
  }

  const simulateFileUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5

      if (progress >= 100) {
        clearInterval(interval)
        progress = 100
        setIsUploading(false)

        // Simulate random error for demo purposes (10% chance)
        const hasError = Math.random() < 0.1

        setUploadedFiles((prev) =>
          prev.map((file) =>
            file.id === fileId
              ? {
                  ...file,
                  progress,
                  error: hasError ? "Upload failed. Please try again." : undefined,
                  url: !hasError ? `https://example.com/uploads/${file.name}` : undefined,
                }
              : file,
          ),
        )
      } else {
        setUploadedFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, progress } : file)))
      }
    }, 200)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
    if (uploadedFiles.length <= 1) {
      setIsUploading(false)
    }
  }

  const retryUpload = (fileId: string) => {
    setUploadedFiles((prev) =>
      prev.map((file) => (file.id === fileId ? { ...file, progress: 0, error: undefined } : file)),
    )
    simulateFileUpload(fileId)
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (fileType.startsWith("video/")) return <Film className="h-4 w-4" />
    if (fileType.startsWith("text/") || fileType.includes("document")) return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          dragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/20 hover:bg-gray-50 dark:hover:bg-gray-800",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center space-y-3 py-4">
          <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
            <Upload className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="space-y-1 text-center">
            <p className="text-sm font-medium">Drag files here or click to upload</p>
            <p className="text-xs text-muted-foreground">Support for images, videos, and documents up to 10MB</p>
          </div>
          <Button variant="outline" size="sm" className="mt-2" type="button" onClick={(e) => e.stopPropagation()}>
            Browse Files
          </Button>
          <input
            id="file-upload"
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileChange}
            accept="image/*,video/*,.pdf,.doc,.docx,.txt,.md,.rtf,.csv,.xls,.xlsx"
          />
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Uploaded Files ({uploadedFiles.length})</h4>
            {isUploading && <p className="text-xs text-blue-600 dark:text-blue-400">Uploading...</p>}
          </div>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <Card key={file.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md",
                        file.error
                          ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                          : file.progress < 100
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
                      )}
                    >
                      {file.error ? <AlertCircle className="h-5 w-5" /> : getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFile(file.id)
                          }}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                        <span>{formatFileSize(file.size)}</span>
                        <span>{file.progress < 100 ? `${file.progress}%` : "Complete"}</span>
                      </div>
                      {file.progress < 100 && <Progress value={file.progress} className="h-1 mt-2" />}
                      {file.error && (
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-red-600 dark:text-red-400">{file.error}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              retryUpload(file.id)
                            }}
                          >
                            Retry
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

