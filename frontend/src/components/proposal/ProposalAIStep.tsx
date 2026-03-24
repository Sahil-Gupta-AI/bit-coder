import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2, RefreshCw, Check, Pencil } from "lucide-react";
import type { ProposalData, ProposalSections } from "@/types/proposal";
import { useToast } from "@/hooks/use-toast";

interface Props {
  data: ProposalData;
  onChange: (updates: Partial<ProposalData>) => void;
}

const ProposalAIStep = ({ data, onChange }: Props) => {
  const [loading, setLoading] = useState(false);
  const [regeneratingKey, setRegeneratingKey] = useState<string | null>(null);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const { toast } = useToast();

  const sectionsList = data.templateSections?.length ? data.templateSections : Object.keys(data.sections || {});

  const formatLabel = (key: string) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/ai/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Generation failed.");
      }
      const sections = await res.json();
      onChange({ sections });
      toast({ title: "AI Generation Successful!" });
    } catch (err: any) {
      toast({ title: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async (key: string) => {
    if (!data.sections) return;
    setRegeneratingKey(key);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/ai/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Regeneration failed.");
      const fresh = await res.json();
      onChange({ sections: { ...data.sections, [key]: fresh[key] } });
      toast({ title: `Regenerated ${formatLabel(key)}` });
    } catch (err: any) {
      toast({ title: err.message, variant: "destructive" });
    } finally {
      setRegeneratingKey(null);
    }
  };

  const updateSection = (key: string, value: string) => {
    if (!data.sections) return;
    onChange({ sections: { ...data.sections, [key]: value } });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">AI-Generated Sections</h2>
        <p className="text-muted-foreground">Configure tone and style, then generate all proposal sections with AI.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Tone</Label>
          <Select value={data.tone} onValueChange={(v) => onChange({ tone: v as ProposalData["tone"] })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Formal">Formal</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Persuasive">Persuasive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Proposal Style</Label>
          <Select value={data.proposalStyle} onValueChange={(v) => onChange({ proposalStyle: v as ProposalData["proposalStyle"] })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Short">Short</SelectItem>
              <SelectItem value="Detailed">Detailed</SelectItem>
              <SelectItem value="Executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={handleGenerate} disabled={loading} className="gradient-primary text-primary-foreground shadow-primary hover:opacity-90 gap-2 w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {loading ? "Generating all sections..." : data.sections ? "Regenerate All Sections" : "Generate Content"}
      </Button>

      {data.sections && (
        <div className="space-y-4">
          {sectionsList.map((key) => (
            data.sections![key] !== undefined && (
            <div key={key} className="rounded-xl border bg-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-foreground">{formatLabel(key)}</h4>
                <div className="flex gap-1">
                  <Button
                    variant="ghost" size="sm" className="h-8 gap-1 text-xs"
                    onClick={() => setEditingKey(editingKey === key ? null : key)}
                  >
                    {editingKey === key ? <Check className="h-3.5 w-3.5" /> : <Pencil className="h-3.5 w-3.5" />}
                    {editingKey === key ? "Done" : "Edit"}
                  </Button>
                  <Button
                    variant="ghost" size="sm" className="h-8 gap-1 text-xs"
                    disabled={regeneratingKey === key}
                    onClick={() => handleRegenerate(key)}
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${regeneratingKey === key ? "animate-spin" : ""}`} />
                    Regenerate
                  </Button>
                </div>
              </div>
              {editingKey === key ? (
                <Textarea
                  rows={6}
                  value={data.sections![key]}
                  onChange={(e) => updateSection(key, e.target.value)}
                />
              ) : (
                <p className="whitespace-pre-line text-sm text-muted-foreground">{data.sections![key]}</p>
              )}
            </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default ProposalAIStep;
