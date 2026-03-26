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
              Success Starts Here
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-extrabold font-headline leading-tight tracking-tight">
              Your Complete <span className="text-primary neon-glow">Study Zone</span> for <span className="text-secondary">CBSE, JEE & NEET</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Access the best-curated notes, solved previous year questions, and expert study materials designed to help you ace your exams.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8" asChild>
                <a href="#classes">Explore Notes</a>
              </Button>
            </div>
            <div className="flex items-center space-x-8 pt-8 text-sm font-medium text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>10k+ Study PDFs</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span>Verified PYQs</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
            <div className="relative glass-card p-4 rounded-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image 
                src="https://picsum.photos/seed/edu1/600/400" 
                alt="Study Zone Illustration" 
                width={600} 
                height={400}
                className="rounded-xl object-cover"
                data-ai-hint="education student"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Class Quick Links */}
      <section id="classes" className="container mx-auto px-4 scroll-mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-headline">All Classes</h2>
          <Link href="/study/class-10" className="text-primary text-sm font-bold flex items-center hover:underline">
            View All <ArrowRight className="ml-2 w-4 h-4" />
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
            <h2 className="text-4xl font-bold font-headline">Features Built for Students</h2>
            <p className="text-muted-foreground italic">Everything you need to move from "stressed" to "topped".</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background border-none shadow-none">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <CardTitle>Curated NCERT Notes</CardTitle>
                <CardDescription>Topic-wise concise notes designed for quick revisions and deep understanding.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background border-none shadow-none">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <CardTitle>Important Questions</CardTitle>
                <CardDescription>Most repeated board questions and expert-curated chapter-wise banks.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background border-none shadow-none">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle>10-Year Solved PYQs</CardTitle>
                <CardDescription>Completely solved previous year questions for Class 10, 12, JEE and NEET.</CardDescription>
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
              <h2 className="text-4xl font-bold font-headline">Ace Competitive Exams</h2>
              <p className="text-muted-foreground text-lg">
                Dedicated sections for JEE and NEET with high-yield notes, formula sheets, and full-length mock tests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary text-primary-foreground font-bold h-12 px-6" asChild>
                  <Link href="/exams/jee">Explore JEE Materials</Link>
                </Button>
                <Button className="bg-secondary text-secondary-foreground font-bold h-12 px-6" asChild>
                  <Link href="/exams/neet">Explore NEET Materials</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <Card className="bg-white/5 border-none">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Formula Sheets</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-white/5 border-none">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Mock Tests</CardTitle>
                  </CardHeader>
                </Card>
              </div>
              <div className="space-y-4">
                <Card className="bg-white/5 border-none">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Daily Practice</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-white/5 border-none">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Strategy Tips</CardTitle>
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
