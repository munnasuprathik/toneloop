import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Clock, Check, ExternalLink, Edit } from "lucide-react"
import { getPlatformIcon } from "@/lib/platform-utils"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CampaignPreviewProps {
  campaignName: string
  platform: string
  tone: string
  topicsCount: number
  duration: number
  startDate?: Date
  postTime: string
  autoPost: boolean
}

// Helper functions for date formatting
function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
  return date.toLocaleDateString("en-US", options)
}

function formatDayDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  }
  return date.toLocaleDateString("en-US", options)
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function CampaignPreview({
  campaignName,
  platform,
  tone,
  topicsCount,
  duration,
  startDate = new Date(),
  postTime,
  autoPost,
}: CampaignPreviewProps) {
  const PlatformIcon = getPlatformIcon(platform)

  // Generate dates for the campaign
  const dates = Array.from({ length: Math.min(topicsCount, duration) }, (_, i) => {
    const date = addDays(startDate, i)
    return {
      date: formatDayDate(date),
      time: postTime,
      topic: `Topic ${i + 1}`,
      status: i === 0 ? "scheduled" : "pending",
    }
  })

  return (
    <div className="space-y-6">
      <Card className="shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2"></div>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">{campaignName}</CardTitle>
              <CardDescription className="mt-1">
                {topicsCount} posts over {Math.min(topicsCount, duration)} days
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
              >
                <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                {tone
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                {platform
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Badge>
              {autoPost && (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                >
                  <Check className="h-3 w-3 mr-1 text-green-500" />
                  Auto-posting
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4 bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center text-center">
                  <Calendar className="h-8 w-8 text-blue-500 mb-2" />
                  <div className="font-medium">Start Date</div>
                  <div className="text-sm text-muted-foreground mt-1">{formatDate(startDate)}</div>
                </div>
              </div>
              <div className="rounded-lg border p-4 bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center text-center">
                  <Clock className="h-8 w-8 text-amber-500 mb-2" />
                  <div className="font-medium">Post Time</div>
                  <div className="text-sm text-muted-foreground mt-1">{postTime}</div>
                </div>
              </div>
              <div className="rounded-lg border p-4 bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center text-center">
                  <PlatformIcon className="h-8 w-8 text-purple-500 mb-2" />
                  <div className="font-medium">Platform</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {platform
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="calendar" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              <TabsContent value="calendar" className="mt-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-1 divide-y">
                    {dates.map((date, index) => (
                      <div
                        key={index}
                        className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium">
                          {index + 1}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <p className="font-medium">{date.topic}</p>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                {date.date} at {date.time}
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={`${
                                date.status === "scheduled"
                                  ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                                  : "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                              }`}
                            >
                              {date.status === "scheduled" ? "Scheduled" : "Pending"}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-2">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="list" className="mt-4">
                <div className="space-y-4">
                  {dates.map((date, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div
                        className={`h-1 ${index % 3 === 0 ? "bg-blue-500" : index % 3 === 1 ? "bg-purple-500" : "bg-amber-500"}`}
                      ></div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                index % 3 === 0
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                  : index % 3 === 1
                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{date.topic}</p>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                {date.date} at {date.time}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 dark:bg-gray-900 px-6 py-4 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Campaign
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            {autoPost ? (
              <>
                <ExternalLink className="mr-2 h-4 w-4" />
                Schedule Auto-Posting
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Campaign
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

