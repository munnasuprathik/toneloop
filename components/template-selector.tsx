"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Plus, Save, Star, Clock, Filter, SortAsc, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToneSelector } from "@/components/tone-selector"
import { PlatformSelector } from "@/components/platform-selector"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { getPlatformIcon } from "@/lib/platform-utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Template {
  id: string
  name: string
  description: string
  tone: string
  platform: string
  prompt: string
  isCustom?: boolean
  isFavorite?: boolean
  createdAt: Date
}

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void
}

export function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"recent" | "name" | "platform">("recent")
  const [newTemplate, setNewTemplate] = useState<Omit<Template, "id" | "createdAt">>({
    name: "",
    description: "",
    tone: "",
    platform: "",
    prompt: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Mock templates data
  const defaultTemplates: Template[] = [
    {
      id: "1",
      name: "Product Launch",
      description: "Announce a new product or feature",
      tone: "ceo",
      platform: "linkedin-post",
      prompt: "We're excited to announce our new product that helps users create content faster and more efficiently.",
      createdAt: new Date(2025, 3, 1),
      isFavorite: true,
    },
    {
      id: "2",
      name: "Team Update",
      description: "Share team news and achievements",
      tone: "developer",
      platform: "slack",
      prompt:
        "Our team has successfully completed the migration to the new infrastructure, resulting in a 30% performance improvement.",
      createdAt: new Date(2025, 3, 2),
    },
    {
      id: "3",
      name: "Customer Outreach",
      description: "Reach out to potential customers",
      tone: "bill-gates",
      platform: "email",
      prompt:
        "I noticed you're in the tech industry and thought our solutions might help address some of the challenges you're facing.",
      createdAt: new Date(2025, 3, 3),
    },
    {
      id: "4",
      name: "Industry Insight",
      description: "Share thoughts on industry trends",
      tone: "sam-altman",
      platform: "linkedin-post",
      prompt:
        "The recent developments in AI are transforming how we approach problem-solving. Here are three key trends I'm seeing and what they mean for the future.",
      createdAt: new Date(2025, 3, 4),
    },
    {
      id: "5",
      name: "Job Opening",
      description: "Announce a new position at your company",
      tone: "ceo",
      platform: "linkedin-post",
      prompt:
        "We're looking for a talented professional to join our growing team. This role offers an opportunity to work on cutting-edge projects with a passionate team.",
      createdAt: new Date(2025, 3, 5),
    },
    {
      id: "6",
      name: "Event Invitation",
      description: "Invite people to an upcoming event",
      tone: "teacher",
      platform: "email",
      prompt:
        "I'd like to invite you to our upcoming workshop on [topic]. This event will provide valuable insights and networking opportunities.",
      createdAt: new Date(2025, 3, 6),
    },
    {
      id: "7",
      name: "Weekly Update",
      description: "Share weekly progress with the team",
      tone: "developer",
      platform: "slack",
      prompt:
        "Here's a summary of what we accomplished this week, what we're focusing on next week, and any blockers we need to address.",
      createdAt: new Date(2025, 3, 7),
    },
    {
      id: "custom-1",
      name: "Marketing Campaign",
      description: "Promote a special offer or campaign",
      tone: "ceo",
      platform: "twitter",
      prompt:
        "Don't miss our limited-time offer! We're giving our customers exclusive access to premium features at a special price.",
      isCustom: true,
      createdAt: new Date(2025, 3, 8),
      isFavorite: true,
    },
    {
      id: "custom-2",
      name: "Thought Leadership",
      description: "Share insights on industry trends",
      tone: "bill-gates",
      platform: "linkedin-post",
      prompt:
        "After analyzing recent market developments, I've identified three key trends that will shape our industry in the coming year.",
      isCustom: true,
      createdAt: new Date(2025, 3, 9),
    },
  ]

  const [templates, setTemplates] = useState<Template[]>(defaultTemplates)

  // Filter templates based on search query and active filter
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (!activeFilter) return matchesSearch

    if (activeFilter === "favorites") return matchesSearch && template.isFavorite
    if (activeFilter === "custom") return matchesSearch && template.isCustom
    if (activeFilter === "preset") return matchesSearch && !template.isCustom

    // Filter by platform
    return matchesSearch && template.platform === activeFilter
  })

  // Sort templates
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === "recent") {
      return b.createdAt.getTime() - a.createdAt.getTime()
    }
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }
    if (sortBy === "platform") {
      return a.platform.localeCompare(b.platform)
    }
    return 0
  })

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.tone || !newTemplate.platform || !newTemplate.prompt) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newId = `custom-${templates.length + 1}`
    const templateToAdd = {
      ...newTemplate,
      id: newId,
      isCustom: true,
      createdAt: new Date(),
    }

    setTemplates([templateToAdd, ...templates])
    setIsDialogOpen(false)
    setNewTemplate({
      name: "",
      description: "",
      tone: "",
      platform: "",
      prompt: "",
    })

    toast({
      title: "Template created",
      description: `Your "${newTemplate.name}" template has been created.`,
    })
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((template) => template.id !== id))
    toast({
      title: "Template deleted",
      description: "The template has been removed.",
    })
  }

  const toggleFavorite = (id: string) => {
    setTemplates(
      templates.map((template) => (template.id === id ? { ...template, isFavorite: !template.isFavorite } : template)),
    )
  }

  const filterOptions = [
    { value: null, label: "All Templates" },
    { value: "favorites", label: "Favorites" },
    { value: "custom", label: "Custom" },
    { value: "preset", label: "Preset" },
    { value: "linkedin-post", label: "LinkedIn Posts" },
    { value: "email", label: "Emails" },
    { value: "slack", label: "Slack" },
    { value: "twitter", label: "Twitter" },
  ]

  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "name", label: "Name (A-Z)" },
    { value: "platform", label: "Platform" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                {activeFilter ? filterOptions.find((f) => f.value === activeFilter)?.label : "Filter"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {filterOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value || "all"}
                  onClick={() => setActiveFilter(option.value)}
                  className={activeFilter === option.value ? "bg-muted" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortBy(option.value as any)}
                  className={sortBy === option.value ? "bg-muted" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Template</DialogTitle>
                <DialogDescription>Create a reusable template for your messages</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    placeholder="E.g., Weekly Update, Product Launch"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template-description">Description (Optional)</Label>
                  <Input
                    id="template-description"
                    placeholder="What this template is used for"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <ToneSelector
                      selectedTone={newTemplate.tone}
                      onSelectTone={(tone) => setNewTemplate({ ...newTemplate, tone })}
                    />
                  </div>

                  <div>
                    <PlatformSelector
                      selectedPlatform={newTemplate.platform}
                      onSelectPlatform={(platform) => setNewTemplate({ ...newTemplate, platform })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template-content">Template Content</Label>
                  <Textarea
                    id="template-content"
                    placeholder="Enter the message content or structure"
                    className="min-h-[150px]"
                    value={newTemplate.prompt}
                    onChange={(e) => setNewTemplate({ ...newTemplate, prompt: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate} className="bg-purple-600 hover:bg-purple-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        {sortedTemplates.length > 0 ? (
          <div className="grid gap-3">
            {sortedTemplates.map((template) => {
              const PlatformIcon = getPlatformIcon(template.platform)

              return (
                <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className={`h-1 ${template.isCustom ? "bg-purple-500" : "bg-blue-500"}`}></div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-md ${
                            template.platform === "linkedin-post" || template.platform === "linkedin-dm"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                              : template.platform === "twitter"
                                ? "bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300"
                                : template.platform === "email"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                                  : "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                          }`}
                        >
                          {PlatformIcon && <PlatformIcon className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{template.name}</h3>
                            {template.isFavorite && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">{template.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {template.tone
                                .split("-")
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" ")}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {template.platform
                                .split("-")
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" ")}
                            </Badge>
                            {template.isCustom && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                              >
                                Custom
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleFavorite(template.id)}
                          title={template.isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Star className={`h-4 w-4 ${template.isFavorite ? "fill-amber-400 text-amber-400" : ""}`} />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onSelectTemplate(template)}>Use Template</DropdownMenuItem>
                            {template.isCustom && (
                              <DropdownMenuItem onClick={() => handleDeleteTemplate(template.id)}>
                                Delete Template
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground line-clamp-2">{template.prompt}</div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {template.createdAt.toLocaleDateString()}
                      </div>
                      <Button variant="outline" size="sm" className="h-8" onClick={() => onSelectTemplate(template)}>
                        Use Template
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <div className="flex flex-col items-center">
              <Search className="h-8 w-8 text-muted-foreground mb-3" />
              <h3 className="font-medium">No templates found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchQuery
                  ? `No templates matching "${searchQuery}"`
                  : "Try creating a new template or changing your filters"}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setActiveFilter(null)
                }}
              >
                Clear filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

