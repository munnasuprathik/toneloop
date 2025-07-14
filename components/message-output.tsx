"use client"

import { Button } from "@/components/ui/button"
import { Copy, Loader2, Check, Download, Share2, ExternalLink } from "lucide-react"
import { useState } from "react"
import { getPlatformIcon } from "@/lib/platform-utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MessageOutputProps {
  message: string
  isLoading: boolean
  platform: string
}

export function MessageOutput({ message, isLoading, platform }: MessageOutputProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("preview")

  const handleCopy = () => {
    if (!message) return

    navigator.clipboard.writeText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const PlatformIcon = platform ? getPlatformIcon(platform) : null

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          <p className="text-sm text-muted-foreground">Generating your message...</p>
        </div>
      </div>
    )
  }

  if (!message) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
        <div className="flex flex-col items-center text-center px-4">
          <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800 mb-4">
            {PlatformIcon ? (
              <PlatformIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            ) : (
              <ExternalLink className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          <p className="font-medium">Your message will appear here</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            Select a tone, platform, and enter your message content, then click "Generate Message"
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="raw">Raw Text</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex ml-2">
          <Button variant="ghost" size="icon" onClick={handleCopy} title="Copy to clipboard" className="h-8 w-8">
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy</span>
          </Button>
        </div>
      </div>

      <TabsContent value="preview" className="mt-0">
        <div
          className={`rounded-lg border p-4 min-h-[350px] ${
            platform === "linkedin-post"
              ? "bg-[#f3f2ef] dark:bg-gray-800"
              : platform === "twitter"
                ? "bg-[#ffffff] dark:bg-gray-800"
                : "bg-gray-50 dark:bg-gray-900"
          }`}
        >
          <div
            className={`${
              platform === "linkedin-post" || platform === "twitter"
                ? "p-4 rounded-lg border bg-white dark:bg-gray-900 shadow-sm"
                : ""
            }`}
          >
            {platform === "email" ? (
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="font-medium">Subject: {message.split("\n")[0].replace("Subject: ", "")}</div>
                </div>
                <div className="whitespace-pre-wrap break-words text-sm">{message.split("\n").slice(1).join("\n")}</div>
              </div>
            ) : (
              <div className="whitespace-pre-wrap break-words text-sm">{message}</div>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="raw" className="mt-0">
        <div className="rounded-lg border bg-gray-50 dark:bg-gray-900 p-4 min-h-[350px]">
          <pre className="whitespace-pre-wrap break-words text-sm font-mono">{message}</pre>
        </div>
      </TabsContent>

      <div className="flex justify-between">
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Save
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button size="sm" className="gap-2 bg-purple-600 hover:bg-purple-700">
            <ExternalLink className="h-4 w-4" />
            Post to{" "}
            {platform ? platform.split("-")[0].charAt(0).toUpperCase() + platform.split("-")[0].slice(1) : "Platform"}
          </Button>
        </div>
      </div>
    </div>
  )
}

