import Link from "next/link";
import { FlaskConical, Globe, Calculator, ArrowLeft, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function ClassStudyPage({ params }: { params: Promise<{ class: string }> }) {
  const { class: classParam } = await params;
  const className = classParam.replace("-", " ").toUpperCase();
  
  const subjects = [
    { name: "Science", icon: <FlaskConical className="w-6 h-6" />, count: "14 Chapters", color: "text-green-500", slug: "science" },
    { name: "Mathematics", icon: <Calculator className="w-6 h-6" />, count: "15 Chapters", color: "text-blue-500", slug: "maths" },
    { name: "Social Science", icon: <Globe className="w-6 h-6" />, count: "18 Chapters", color: "text-orange-500", slug: "social-science" },
    { name: "English", icon: <Languages className="w-6 h-6" />, count: "12 Chapters", color: "text-purple-500", slug: "english" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/">
        <Button variant="ghost" size="sm" className="mb-8 hover:bg-white/5">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
        </Button>
      </Link>

      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold font-headline">{className} Study Materials</h1>
        <p className="text-muted-foreground text-lg">Choose a subject to access notes, important questions, and PYQs.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <Link key={subject.slug} href={`/study/${classParam}/${subject.slug}`}>
            <Card className="hover:border-primary transition-all duration-300 group overflow-hidden h-full bg-card">
              <CardHeader className="p-8 space-y-4">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors ${subject.color}`}>
                  {subject.icon}
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-bold">{subject.name}</CardTitle>
                  <CardDescription>{subject.count}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
