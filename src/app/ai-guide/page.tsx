
"use client";

import { useState } from "react";
import { Sparkles, BookOpen, ExternalLink, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { aiAssistedConceptExplanation, type AIConceptExplanationOutput } from "@/ai/flows/ai-assisted-concept-explanation-flow";

export default function AIGuidePage() {
  const [concept, setConcept] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIConceptExplanationOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept.trim()) return;

    setIsLoading(true);
    try {
      const response = await aiAssistedConceptExplanation({ conceptDescription: concept });
      setResult(response);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-secondary/10 text-secondary mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold font-headline leading-tight">AI Study Guide</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Struggling with a concept? Tell EduVault AI, and get an instant explanation along with curated study materials.
        </p>
      </div>

      <Card className="bg-card border-white/10 mb-12 shadow-2xl overflow-hidden">
        <CardContent className="p-6 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1">Describe what you're struggling with:</label>
              <Textarea 
                placeholder="e.g. Explain photosynthesis in simple terms, or I don't understand Newton's third law of motion..." 
                className="min-h-[120px] bg-background border-white/5 focus:border-primary transition-all text-lg"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || !concept.trim()}
              className="w-full bg-primary text-primary-foreground font-bold h-14 text-lg shadow-lg shadow-primary/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Concept...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Get Expert Explanation
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="bg-card border-primary/20 shadow-xl overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-primary flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Explanation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 lg:p-8">
              <div className="prose prose-invert max-w-none text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {result.explanation}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-bold font-headline flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span>Suggested Materials</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {result.suggestedMaterials.map((material, idx) => (
                <Card key={idx} className="bg-card/50 hover:bg-card border-white/5 hover:border-secondary transition-all group">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-[10px] uppercase font-bold text-secondary border-secondary/20">
                        {material.type}
                      </Badge>
                      <h4 className="font-bold text-sm group-hover:text-secondary transition-colors">
                        {material.title}
                      </h4>
                    </div>
                    <a 
                      href={material.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Default Prompt Suggestions */}
      {!result && !isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 opacity-60">
          <button 
            onClick={() => setConcept("Explain the difference between plant and animal cells")}
            className="p-4 rounded-xl border border-white/10 hover:border-primary text-left text-sm transition-all bg-card/20"
          >
            "Explain the difference between plant and animal cells"
          </button>
          <button 
            onClick={() => setConcept("How to solve quadratic equations using the formula?")}
            className="p-4 rounded-xl border border-white/10 hover:border-primary text-left text-sm transition-all bg-card/20"
          >
            "How to solve quadratic equations using the formula?"
          </button>
        </div>
      )}
    </div>
  );
}
