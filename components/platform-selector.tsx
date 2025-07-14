"use client"

import { useState } from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface PlatformSelectorProps {
  selectedPlatform: string
  onSelectPlatform: (platform: string) => void
}

export function PlatformSelector({ selectedPlatform, onSelectPlatform }: PlatformSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Expanded platforms array
  const platforms = [
    // Social Media
    { value: "linkedin-post", label: "LinkedIn Post", icon: "in", color: "blue", category: "social" },
    { value: "twitter", label: "Twitter/X", icon: "X", color: "sky", category: "social" },
    { value: "instagram", label: "Instagram", icon: "IG", color: "pink", category: "social" },
    { value: "facebook", label: "Facebook", icon: "f", color: "blue", category: "social" },
    { value: "reddit", label: "Reddit", icon: "r/", color: "orange", category: "social" },
    { value: "snapchat", label: "Snapchat", icon: "👻", color: "yellow", category: "social" },
    { value: "tiktok", label: "TikTok", icon: "TT", color: "black", category: "social" },
    { value: "youtube", label: "YouTube", icon: "YT", color: "red", category: "social" },

    // Messaging
    { value: "email", label: "Email", icon: "@", color: "amber", category: "messaging" },
    { value: "slack", label: "Slack", icon: "S", color: "green", category: "messaging" },
    { value: "whatsapp", label: "WhatsApp", icon: "W", color: "green", category: "messaging" },
    { value: "telegram", label: "Telegram", icon: "T", color: "blue", category: "messaging" },
    { value: "discord", label: "Discord", icon: "D", color: "indigo", category: "messaging" },

    // Professional
    { value: "blog", label: "Blog Post", icon: "B", color: "purple", category: "professional" },
    { value: "press-release", label: "Press Release", icon: "PR", color: "gray", category: "professional" },
    { value: "newsletter", label: "Newsletter", icon: "NL", color: "blue", category: "professional" },
  ]

  // Filter platforms based on search query
  const filteredPlatforms = platforms.filter(
    (platform) =>
      platform.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedPlatformData = platforms.find((platform) => platform.value === selectedPlatform)

  // Group platforms by category
  const socialPlatforms = filteredPlatforms.filter((p) => p.category === "social")
  const messagingPlatforms = filteredPlatforms.filter((p) => p.category === "messaging")
  const professionalPlatforms = filteredPlatforms.filter((p) => p.category === "professional")

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between h-10">
            {selectedPlatform ? (
              <div className="flex items-center">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-md mr-2 
                  ${
                    selectedPlatformData?.color === "blue"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                      : selectedPlatformData?.color === "sky"
                        ? "bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300"
                        : selectedPlatformData?.color === "amber"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                          : selectedPlatformData?.color === "green"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                            : selectedPlatformData?.color === "pink"
                              ? "bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300"
                              : selectedPlatformData?.color === "orange"
                                ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
                                : selectedPlatformData?.color === "yellow"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                                  : selectedPlatformData?.color === "red"
                                    ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                    : selectedPlatformData?.color === "indigo"
                                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300"
                                      : selectedPlatformData?.color === "purple"
                                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                                        : selectedPlatformData?.color === "black"
                                          ? "bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300"
                                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  <span className="text-xs font-bold">{selectedPlatformData?.icon}</span>
                </div>
                <span>{selectedPlatformData?.label}</span>
              </div>
            ) : (
              "Select platform..."
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput
                placeholder="Search platform..."
                className="h-9 border-0 focus:ring-0"
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
            </div>
            <CommandList className="max-h-[300px] overflow-auto">
              <CommandEmpty>No platform found.</CommandEmpty>

              {socialPlatforms.length > 0 && (
                <CommandGroup heading="Social Media">
                  {socialPlatforms.map((platform) => (
                    <CommandItem
                      key={platform.value}
                      value={platform.value}
                      onSelect={(currentValue) => {
                        onSelectPlatform(currentValue)
                        setOpen(false)
                      }}
                      className="flex items-center gap-2 py-2"
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-md
                        ${
                          platform.color === "blue"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                            : platform.color === "sky"
                              ? "bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300"
                              : platform.color === "pink"
                                ? "bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300"
                                : platform.color === "orange"
                                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
                                  : platform.color === "yellow"
                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                                    : platform.color === "red"
                                      ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                      : platform.color === "black"
                                        ? "bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300"
                                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        <span className="font-bold">{platform.icon}</span>
                      </div>
                      <span className="font-medium">{platform.label}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedPlatform === platform.value ? "opacity-100 text-purple-500" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {messagingPlatforms.length > 0 && (
                <CommandGroup heading="Messaging">
                  {messagingPlatforms.map((platform) => (
                    <CommandItem
                      key={platform.value}
                      value={platform.value}
                      onSelect={(currentValue) => {
                        onSelectPlatform(currentValue)
                        setOpen(false)
                      }}
                      className="flex items-center gap-2 py-2"
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-md
                        ${
                          platform.color === "amber"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                            : platform.color === "green"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                              : platform.color === "blue"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                : platform.color === "indigo"
                                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        <span className="font-bold">{platform.icon}</span>
                      </div>
                      <span className="font-medium">{platform.label}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedPlatform === platform.value ? "opacity-100 text-purple-500" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {professionalPlatforms.length > 0 && (
                <CommandGroup heading="Professional">
                  {professionalPlatforms.map((platform) => (
                    <CommandItem
                      key={platform.value}
                      value={platform.value}
                      onSelect={(currentValue) => {
                        onSelectPlatform(currentValue)
                        setOpen(false)
                      }}
                      className="flex items-center gap-2 py-2"
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-md
                        ${
                          platform.color === "purple"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                            : platform.color === "gray"
                              ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                              : platform.color === "blue"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        <span className="font-bold">{platform.icon}</span>
                      </div>
                      <span className="font-medium">{platform.label}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedPlatform === platform.value ? "opacity-100 text-purple-500" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

