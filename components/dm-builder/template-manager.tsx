import { useState } from "react"
import { DMMessage } from "@/types/dm-builder"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Linkedin, 
  Instagram, 
  Twitter, 
  Mail, 
  MessageSquare,
  Tag,
  Clock,
  Trash2,
  Copy,
  Edit
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DMTemplateManagerProps {
  templates: DMMessage[]
  onTemplateSelect: (template: DMMessage) => void
  onTemplateDelete: (templateId: string) => void
}

export function DMTemplateManager({
  templates,
  onTemplateSelect,
  onTemplateDelete,
}: DMTemplateManagerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<string>("all")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = 
      template.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.useCase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (template.tags && template.tags.some(tag => 
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ))

    if (activeTab === "all") return matchesSearch
    return matchesSearch && template.platform === activeTab
  })

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "whatsapp":
        return <MessageSquare className="h-4 w-4" />
      default:
        return null
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start border-b rounded-none px-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="p-0">
          {filteredTemplates.length > 0 ? (
            <div className="divide-y">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {getPlatformIcon(template.platform)}
                        <span className="font-medium capitalize">
                          {template.useCase.replace(/-/g, " ")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.content}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(template.timestamp)}
                        </div>
                        {template.tags && template.tags.length > 0 && (
                          <div className="flex items-center">
                            <Tag className="h-3 w-3 mr-1" />
                            {template.tags.join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onTemplateSelect(template)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onTemplateDelete(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              {searchQuery
                ? "No templates match your search"
                : "No templates saved yet"}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  )
} 