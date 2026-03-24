import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2 } from "lucide-react";
import type { QuotationData } from "@/types/quotation";
import { useToast } from "@/hooks/use-toast";

interface Props {
  data: QuotationData;
  onChange: (updates: Partial<QuotationData>) => void;
}

const AIContentStep = ({ data, onChange }: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { letterheadUrl, letterheadFile, extractedHeaderUrl, ...dataToSend } = data;

      const res = await fetch("http://localhost:5000/api/ai/generate-quotation", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(dataToSend)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Generation failed.");
      }
      const content = await res.json();
      onChange({ generatedContent: content });
      toast({ title: "AI Generation Successful!" });
    } catch (err: any) {
      toast({ title: err.message || "An error occurred", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const updateContent = (field: string, value: string) => {
    if (!data.generatedContent) return;
    onChange({
      generatedContent: { ...data.generatedContent, [field]: value },
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">AI Content Generation</h2>
        <p className="text-muted-foreground">Choose a tone and style, then let AI craft your quotation content.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Tone</Label>
          <Select value={data.tone} onValueChange={(v) => onChange({ tone: v as QuotationData["tone"] })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Formal">Formal</SelectItem>
              <SelectItem value="Friendly">Friendly</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Description Style</Label>
          <Select value={data.descriptionStyle} onValueChange={(v) => onChange({ descriptionStyle: v as QuotationData["descriptionStyle"] })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Short">Short</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Detailed">Detailed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={handleGenerate} disabled={loading} className="gradient-primary text-primary-foreground shadow-primary hover:opacity-90 gap-2 w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {loading ? "Generating..." : "Generate Content"}
      </Button>

      {data.generatedContent && (
        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Introduction</Label>
            <Textarea rows={5} value={data.generatedContent.intro} onChange={(e) => updateContent("intro", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Terms & Conditions</Label>
            <Textarea rows={5} value={data.generatedContent.terms} onChange={(e) => updateContent("terms", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Closing Note</Label>
            <Textarea rows={3} value={data.generatedContent.closingNote} onChange={(e) => updateContent("closingNote", e.target.value)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIContentStep;
