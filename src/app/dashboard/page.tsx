
import { 
  Bookmark, 
  Clock, 
  BarChart2, 
  Settings, 
  CheckCircle2, 
  FileText, 
  ArrowUpRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const recentActivities = [
    { title: "Photosynthesis Notes", status: "Read 2h ago", icon: <FileText className="text-blue-500" /> },
    { title: "Math Quiz: Algebra", status: "Score: 85%", icon: <CheckCircle2 className="text-green-500" /> },
    { title: "JEE Physics PYQ 2022", status: "Saved", icon: <Bookmark className="text-orange-500" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-2 border-primary">
            <AvatarImage src="https://picsum.photos/seed/user/100/100" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold font-headline">Welcome back, Student!</h1>
            <p className="text-muted-foreground">Keep up the great progress in your Class 10 preparation.</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-card">
            <Settings className="mr-2 w-4 h-4" /> Settings
          </Button>
          <Button className="bg-primary text-primary-foreground font-bold">
            Resume Learning
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Progress Summary */}
        <div className="md:col-span-2 space-y-8">
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="bg-card border-none">
              <CardHeader className="p-4 pb-0">
                <CardDescription className="text-xs font-bold uppercase">Learning Hours</CardDescription>
                <CardTitle className="text-2xl font-bold">42.5 h</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> +12% this week
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-none">
              <CardHeader className="p-4 pb-0">
                <CardDescription className="text-xs font-bold uppercase">Notes Saved</CardTitle>
                <CardTitle className="text-2xl font-bold">18</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2 text-xs text-muted-foreground">
                3 added recently
              </CardContent>
            </Card>
            <Card className="bg-card border-none">
              <CardHeader className="p-4 pb-0">
                <CardDescription className="text-xs font-bold uppercase">Quizzes Taken</CardDescription>
                <CardTitle className="text-2xl font-bold">12</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2 text-xs text-muted-foreground">
                Avg. Score: 78%
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-none">
            <CardHeader>
              <CardTitle>Subject Progress</CardTitle>
              <CardDescription>Overall completion of the Class 10 syllabus.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Science</span>
                  <span className="font-bold">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mathematics</span>
                  <span className="font-bold">42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Social Science</span>
                  <span className="font-bold">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <Card className="bg-card border-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 w-4 h-4 text-primary" /> Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {recentActivities.map((activity, i) => (
                  <div key={i} className="p-4 flex items-center space-x-4 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-white/5">
                      {activity.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{activity.title}</h4>
                      <p className="text-xs text-muted-foreground">{activity.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground border-none">
            <CardHeader>
              <CardTitle className="text-lg">Pro Feature: AI Mock Tests</CardTitle>
              <CardDescription className="text-primary-foreground/80">Generate personalized mock tests based on your weak areas.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full font-bold">
                Try Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
