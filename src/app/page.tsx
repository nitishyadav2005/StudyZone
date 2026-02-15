
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
  ShieldCheck,
  FlaskConical,
  Calculator,
  Dna,
  Atom
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const classes = [
    { name: "Class 9", icon: <BookOpen />, color: "text-blue-500", href: "/study/class-9" },
    { 
      name: "Class 10", 
      icon: <Award />, 
      color: "text-green-500", 
      href: "/study/class-10",
      options: [
        { name: "PYQ", href: "/study/class-10/pyq" },
        { name: "NCERT Notes", href: "/study/class-10/ncert-notes" },
        { name: "Short Notes", href: "/study/class-10/short-notes" }
      ]
    },
    { name: "Class 11", icon: <TrendingUp />, color: "text-purple-500", href: "/study/class-11" },
    { 
      name: "Class 12", 
      icon: <ShieldCheck />, 
      color: "text-orange-500", 
      href: "/study/class-12",
      options: [
        { name: "PYQ", href: "/study/class-12/pyq" },
        { name: "NCERT Notes", href: "/study/class-12/ncert-notes" },
        { name: "Short Notes", href: "/study/class-12/short-notes" }
      ]
    },
  ];

  const seniorSubjects = [
    { name: "Physics", icon: <Atom className="w-4 h-4" /> },
    { name: "Chemistry", icon: <FlaskConical className="w-4 h-4" /> },
    { name: "Mathematics", icon: <Calculator className="w-4 h-4" /> },
    { name: "Biology", icon: <Dna className="w-4 h-4" /> },
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
              Your Complete <span className="text-primary neon-glow">Study Hub</span> for <span className="text-secondary">CBSE, JEE & NEET</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Access the best-curated notes, solved previous year questions, and expert study materials designed to help you ace your exams.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8">
                Explore Notes
              </Button>
              <Link href="/ai-guide">
                <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-8">
                  Try AI Guide
                </Button>
              </Link>
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
                alt="EduVault Illustration" 
                width={600} 
                height={400}
                className="rounded-xl object-cover"
                data-ai-hint="education student"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Class Subject Selection */}
      <section className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-headline mb-4">Quick Subject Access</h2>
          <p className="text-muted-foreground italic">Select your class to see available subjects</p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="class-11" className="border-none bg-card rounded-xl overflow-hidden shadow-lg">
            <AccordionTrigger className="px-6 py-6 hover:no-underline group">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold font-headline">Class 11</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                {seniorSubjects.map((sub) => (
                  <Link 
                    key={sub.name} 
                    href={`/study/class-11/${sub.name.toLowerCase()}`}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-background/50 hover:bg-primary/10 border border-white/5 hover:border-primary transition-all group/sub"
                  >
                    <div className="mb-2 p-2 rounded-full bg-white/5 group-hover/sub:scale-110 transition-transform">
                      {sub.icon}
                    </div>
                    <span className="text-sm font-bold">{sub.name}</span>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="class-12" className="border-none bg-card rounded-xl overflow-hidden shadow-lg">
            <AccordionTrigger className="px-6 py-6 hover:no-underline group">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold font-headline">Class 12</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                {seniorSubjects.map((sub) => (
                  <Link 
                    key={sub.name} 
                    href={`/study/class-12/${sub.name.toLowerCase()}`}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-background/50 hover:bg-primary/10 border border-white/5 hover:border-primary transition-all group/sub"
                  >
                    <div className="mb-2 p-2 rounded-full bg-white/5 group-hover/sub:scale-110 transition-transform">
                      {sub.icon}
                    </div>
                    <span className="text-sm font-bold">{sub.name}</span>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Class Quick Links */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-headline">All Classes</h2>
          <Link href="/study" className="text-primary text-sm font-bold flex items-center hover:underline">
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((cls) => (
            <Card key={cls.name} className="hover:border-primary transition-all duration-300 group overflow-hidden bg-card/50 flex flex-col h-full">
              <Link href={cls.href} className="flex flex-row items-center space-x-4 p-6 border-b border-white/5 hover:bg-white/5 transition-colors">
                <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors ${cls.color}`}>
                  {cls.icon}
                </div>
                <CardTitle className="text-xl">{cls.name}</CardTitle>
              </Link>
              {cls.options ? (
                <div className="p-4 bg-background/20 flex flex-col gap-1 mt-auto">
                  {cls.options.map((opt) => (
                    <Link 
                      key={opt.name} 
                      href={opt.href}
                      className="text-xs font-semibold py-2 px-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-between group/opt"
                    >
                      <span>{opt.name}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover/opt:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-6 mt-auto text-sm text-muted-foreground italic">
                  Complete resources coming soon...
                </div>
              )}
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
                <Button className="bg-primary text-primary-foreground font-bold h-12 px-6">
                  Explore JEE Materials
                </Button>
                <Button className="bg-secondary text-secondary-foreground font-bold h-12 px-6">
                  Explore NEET Materials
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
