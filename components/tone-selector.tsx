"use client"

import { useState } from "react"
import { Check, ChevronDown, Search, User, Users, Plus, Upload, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ToneSelectorProps {
  selectedTone: string
  onSelectTone: (tone: string) => void
}

export function ToneSelector({ selectedTone, onSelectTone }: ToneSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCustomToneDialog, setShowCustomToneDialog] = useState(false)
  const [showCloneMeDialog, setShowCloneMeDialog] = useState(false)
  const [customToneName, setCustomToneName] = useState("")
  const [customToneDescription, setCustomToneDescription] = useState("")
  const [cloneContent, setCloneContent] = useState("")
  const [activeTab, setActiveTab] = useState("upload")
  const { toast } = useToast()

  // Predefined tones array
  const predefinedTones = [
    // Role-based personas
    { value: "ceo", label: "CEO", category: "professional", icon: "👔" },
    { value: "developer", label: "Developer", category: "professional", icon: "💻" },
    { value: "marketer", label: "Marketer", category: "professional", icon: "📈" },
    { value: "sales", label: "Sales Rep", category: "professional", icon: "🤝" },
    { value: "customer-service", label: "Customer Service", category: "professional", icon: "🎧" },
    { value: "product-manager", label: "Product Manager", category: "professional", icon: "📱" },
    { value: "designer", label: "Designer", category: "professional", icon: "🎨" },
    { value: "teacher", label: "Teacher", category: "professional", icon: "📚" },
    { value: "student", label: "Student", category: "professional", icon: "🎓" },
    { value: "influencer", label: "Influencer", category: "professional", icon: "📸" },

    // Global personalities
    { value: "elon-musk", label: "Elon Musk", category: "global", icon: "🚀" },
    { value: "bill-gates", label: "Bill Gates", category: "global", icon: "💼" },
    { value: "sam-altman", label: "Sam Altman", category: "global", icon: "🤖" },
    { value: "steve-jobs", label: "Steve Jobs", category: "global", icon: "🍎" },
    { value: "mark-zuckerberg", label: "Mark Zuckerberg", category: "global", icon: "👤" },
    { value: "naval-ravikant", label: "Naval Ravikant", category: "global", icon: "⚓" },
    { value: "jeff-bezos", label: "Jeff Bezos", category: "global", icon: "📦" },
    { value: "warren-buffett", label: "Warren Buffett", category: "global", icon: "💰" },
    { value: "oprah-winfrey", label: "Oprah Winfrey", category: "global", icon: "🎤" },
    { value: "michelle-obama", label: "Michelle Obama", category: "global", icon: "🌟" },

    // Indian personalities
    { value: "ratan-tata", label: "Ratan Tata", category: "indian", icon: "🏢" },
    { value: "kunal-shah", label: "Kunal Shah", category: "indian", icon: "💳" },
    { value: "sundar-pichai", label: "Sundar Pichai", category: "indian", icon: "🔍" },
    { value: "narayan-murthy", label: "Narayan Murthy", category: "indian", icon: "💻" },
    { value: "indra-nooyi", label: "Indra Nooyi", category: "indian", icon: "🥤" },
    { value: "mukesh-ambani", label: "Mukesh Ambani", category: "indian", icon: "📱" },
    { value: "nithin-kamath", label: "Nithin Kamath", category: "indian", icon: "📊" },
    { value: "zerodha-nithin", label: "Zerodha Nithin", category: "indian", icon: "📈" },

    // Custom tones (would be loaded from user data in a real app)
    { value: "clone-me-personal", label: "My Personal Voice", category: "clone-me", icon: "🎭" },
    { value: "clone-me-founder", label: "My Founder Voice", category: "clone-me", icon: "👨‍💼" },
    { value: "clone-me-brand", label: "My Brand Voice", category: "clone-me", icon: "🏷️" },

    // Ghostwriter mode
    { value: "ghostwriter", label: "Ghostwriter Mode", category: "special", icon: "👻" },
  ]

  // Filter tones based on search query
  const filteredTones = predefinedTones.filter(
    (tone) =>
      tone.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tone.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "professional":
        return "Professional Roles"
      case "global":
        return "Global Personalities"
      case "indian":
        return "Indian Personalities"
      case "clone-me":
        return "My Clone Me Voices"
      case "special":
        return "Special Modes"
      case "custom":
        return "My Custom Tones"
      default:
        return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "professional":
        return <User className="h-4 w-4 text-purple-500" />
      case "global":
        return <Users className="h-4 w-4 text-blue-500" />
      case "indian":
        return <Users className="h-4 w-4 text-orange-500" />
      case "clone-me":
        return <User className="h-4 w-4 text-green-500" />
      case "special":
        return <Mic className="h-4 w-4 text-amber-500" />
      case "custom":
        return <User className="h-4 w-4 text-indigo-500" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const selectedToneData = predefinedTones.find((tone) => tone.value === selectedTone)

  const handleCreateCustomTone = () => {
    if (!customToneName) {
      toast({
        title: "Name required",
        description: "Please provide a name for your custom tone.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would save to a database
    const newToneValue = `custom-${customToneName.toLowerCase().replace(/\s+/g, "-")}`

    toast({
      title: "Custom tone created",
      description: `Your custom tone "${customToneName}" has been created.`,
    })

    // Close dialog and select the new tone
    setShowCustomToneDialog(false)
    onSelectTone(newToneValue)

    // Reset form
    setCustomToneName("")
    setCustomToneDescription("")
  }

  const handleCreateCloneMe = () => {
    if (activeTab === "upload" && !cloneContent) {
      toast({
        title: "Content required",
        description: "Please provide sample content to create your Clone Me voice.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would process the content and create a clone
    toast({
      title: "Clone Me voice created",
      description: "Your personal voice clone has been created and is ready to use.",
    })

    // Close dialog and select the new clone
    setShowCloneMeDialog(false)
    onSelectTone("clone-me-personal")

    // Reset form
    setCloneContent("")
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between h-10">
            {selectedTone ? (
              <div className="flex items-center">
                <span className="mr-2 text-base">{selectedToneData?.icon}</span>
                <span>{selectedToneData?.label}</span>
              </div>
            ) : (
              "Select tone..."
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput
                placeholder="Search tone..."
                className="h-9 border-0 focus:ring-0"
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
            </div>
            <CommandList className="max-h-[300px] overflow-auto">
              <CommandEmpty>No tone found.</CommandEmpty>
              {["professional", "global", "indian", "clone-me", "special", "custom"].map((category) => {
                const categoryTones = filteredTones.filter((tone) => tone.category === category)
                if (categoryTones.length === 0) return null

                return (
                  <CommandGroup
                    key={category}
                    heading={
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(category)}
                        <span>{getCategoryLabel(category)}</span>
                      </div>
                    }
                  >
                    {categoryTones.map((tone) => (
                      <CommandItem
                        key={tone.value}
                        value={tone.value}
                        onSelect={(currentValue) => {
                          onSelectTone(currentValue)
                          setOpen(false)
                        }}
                        className="flex items-center gap-2 py-2"
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full",
                            selectedTone === tone.value
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
                          )}
                        >
                          <span className="text-base">{tone.icon}</span>
                        </div>
                        <span className="font-medium">{tone.label}</span>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedTone === tone.value ? "opacity-100 text-purple-500" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )
              })}

              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    setShowCustomToneDialog(true)
                  }}
                  className="flex items-center gap-2 py-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300">
                    <Plus className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Create Custom Tone</span>
                </CommandItem>

                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    setShowCloneMeDialog(true)
                  }}
                  className="flex items-center gap-2 py-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Create Clone Me Voice</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Custom Tone Dialog */}
      <Dialog open={showCustomToneDialog} onOpenChange={setShowCustomToneDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Custom Tone</DialogTitle>
            <DialogDescription>Create a personalized tone for your messages</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tone-name">Tone Name</Label>
              <Input
                id="tone-name"
                placeholder="E.g., Friendly Support, Technical Expert"
                value={customToneName}
                onChange={(e) => setCustomToneName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tone-description">Description (Optional)</Label>
              <Input
                id="tone-description"
                placeholder="How would you describe this tone?"
                value={customToneDescription}
                onChange={(e) => setCustomToneDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomToneDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCustomTone}>Create Tone</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Clone Me Dialog */}
      <Dialog open={showCloneMeDialog} onOpenChange={setShowCloneMeDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Clone Me Voice</DialogTitle>
            <DialogDescription>Upload your content so we can learn your writing style and tone</DialogDescription>
          </DialogHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Content</TabsTrigger>
              <TabsTrigger value="paste">Paste Content</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="space-y-4 py-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="font-medium">Upload your content files</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Drag and drop or click to upload (PDF, DOCX, TXT)
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Select Files
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>For best results, upload at least 10 samples of your writing.</p>
                <p>This could include blog posts, social media content, emails, etc.</p>
              </div>
            </TabsContent>
            <TabsContent value="paste" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="clone-content">Paste your content samples</Label>
                <Textarea
                  id="clone-content"
                  placeholder="Paste multiple examples of your writing here..."
                  className="min-h-[200px]"
                  value={cloneContent}
                  onChange={(e) => setCloneContent(e.target.value)}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>For best results, paste at least 10 samples of your writing.</p>
                <p>Separate different samples with a line break.</p>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCloneMeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCloneMe} className="bg-green-600 hover:bg-green-700">
              Create My Voice Clone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

