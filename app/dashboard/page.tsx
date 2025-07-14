"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Users,
  Bot,
  Copy,
  PenTool,
  BarChart3,
  Bell,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, User!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your content today.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Generated</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2 campaigns ending soon
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Brand Voices</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              +1 new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <Copy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              4 favorites
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest content creation activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    New message generated
                  </p>
                  <p className="text-sm text-muted-foreground">
                    LinkedIn post about AI trends
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge variant="secondary">2m ago</Badge>
                </div>
              </div>
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Campaign created
                  </p>
                  <p className="text-sm text-muted-foreground">
                    "Q2 Product Launch"
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge variant="secondary">1h ago</Badge>
                </div>
              </div>
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Brand voice updated
                  </p>
                  <p className="text-sm text-muted-foreground">
                    "Professional & Friendly"
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge variant="secondary">3h ago</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Generate Message
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Build DM Sequence
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <PenTool className="mr-2 h-4 w-4" />
                Start Ghostwriting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Overview</CardTitle>
          <CardDescription>
            Track your active campaigns and their progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Q2 Product Launch
                </p>
                <p className="text-sm text-muted-foreground">
                  15 posts scheduled
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={65} className="w-[100px]" />
                <span className="text-sm font-medium">65%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Brand Awareness
                </p>
                <p className="text-sm text-muted-foreground">
                  8 posts scheduled
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={30} className="w-[100px]" />
                <span className="text-sm font-medium">30%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Content */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Content</CardTitle>
          <CardDescription>
            Your scheduled posts for the next 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  LinkedIn: AI Trends Analysis
                </p>
                <p className="text-sm text-muted-foreground">
                  Tomorrow at 10:00 AM
                </p>
              </div>
              <Badge>LinkedIn</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Twitter: Product Feature Highlight
                </p>
                <p className="text-sm text-muted-foreground">
                  Wednesday at 2:00 PM
                </p>
              </div>
              <Badge>Twitter</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 