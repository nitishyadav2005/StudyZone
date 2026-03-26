import Image from "next/image";
import Link from "next/link";
import { 
  FileText, 
  HelpCircle, 
  BookOpen, 
  Zap, 
  Award, 
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const classes = [
    { name: "Class 9", icon: <BookOpen />, color: "text-blue-500", href: "/study/class-9" },
    { name: "Class 10", icon: <Award />, color: "text-green-500", href: "/study/class-10" },
    { name: "Class 11", icon: <TrendingUp />, color: "text-purple-500", href: "/study/class-11" },
    { name: "Class 12", icon: <ShieldCheck />, color: "text-orange-500", href: "/study/class-12" },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-card">
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="border-primary text-primary px-3 py-1 text-xs uppercase tracking-widest font-bold">
              Study Smarter, Not Harder
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-extrabold font-headline leading-tight tracking-tight">
              Your Ultimate <span className="text-primary neon-glow">Study Zone</span> for <span className="text-secondary">CBSE & Entrance</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Verified NCERT solutions, chapter-wise notes, and 10-year solved PYQs for Classes 9-12, JEE, and NEET. All organized for your success.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 shadow-lg shadow-primary/20" asChild>
                <Link href="#classes">Start Learning</Link>
              </Button>
              <Button size="lg" variant="outline" className="font-bold px-8 border-white/10 hover:bg-white/5" asChild>
                <Link href="/exams/jee">JEE Prep</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-8 pt-8 text-sm font-medium text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>10,000+ Study PDFs</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span>Verified Solutions</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
            <div className="relative glass-card p-4 rounded-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image 
                src="https://picsum.photos/seed/edu1/600/400" 
                alt="Study Zone" 
                width={600} 
                height={400}
                className="rounded-xl object-cover"
                data-ai-hint="education students"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Class Quick Links */}
      <section id="classes" className="container mx-auto px-4 scroll-mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-headline">Explore by Class</h2>
          <Link href="/study/class-10" className="text-primary text-sm font-bold flex items-center hover:underline">
            View All Materials <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((cls) => (
            <Card key={cls.name} className="hover:border-primary transition-all duration-300 group overflow-hidden bg-card/50 flex flex-col h-full">
              <Link href={cls.href} className="flex flex-row items-center space-x-4 p-6 hover:bg-white/5 transition-colors h-full">
                <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors ${cls.color}`}>
                  {cls.icon}
                </div>
                <CardTitle className="text-xl">{cls.name}</CardTitle>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold font-headline">Features Built for Toppers</h2>
            <p className="text-muted-foreground italic">Comprehensive resources to bridge the gap between learning and scoring.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background border-none shadow-none">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <CardTitle>NCERT Solutions</CardTitle>
                <CardDescription>Chapter-wise solutions for Class 9 to 12. Accurate, verified, and easy to understand.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background border-none shadow-none">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <CardTitle>Important Questions</CardTitle>
                <CardDescription>Exam-oriented questions curated by experts to help you focus on high-yield topics.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background border-none shadow-none">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle>Solved PYQs</CardTitle>
                <CardDescription>Previous 10 years of solved question papers for Boards, JEE Mains, and NEET UG.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Competitive Exams */}
      <section className="container mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-br from-[#1c1c1c] to-[#2d2d2d] border border-white/10 p-8 lg:p-12 overflow-hidden relative">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold font-headline">Competitive Exam Excellence</h2>
              <p className="text-muted-foreground text-lg">
                Get the edge in JEE and NEET with our specialized materials, including formula sheets, mock tests, and strategy guides.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary text-primary-foreground font-bold h-12 px-6" asChild>
                  <Link href="/exams/jee">Explore JEE</Link>
                </Button>
                <Button className="bg-secondary text-secondary-foreground font-bold h-12 px-6" asChild>
                  <Link href="/exams/neet">Explore NEET</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <Card className="bg-white/5 border-none">
                  <CardHeader className="p-4 text-center">
                    <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">Formula</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-white/5 border-none">
                  <CardHeader className="p-4 text-center">
                    <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">Mock Tests</CardTitle>
                  </CardHeader>
                </Card>
              </div>
              <div className="space-y-4">
                <Card className="bg-white/5 border-none">
                  <CardHeader className="p-4 text-center">
                    <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">Daily Practice</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-white/5 border-none">
                  <CardHeader className="p-4 text-center">
                    <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">Strategy</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
