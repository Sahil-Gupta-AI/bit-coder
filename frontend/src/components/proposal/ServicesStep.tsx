import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { useState } from "react";
import type { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
  onChange: (updates: Partial<ProposalData>) => void;
}

const ServicesStep = ({ data, onChange }: Props) => {
  const [serviceInput, setServiceInput] = useState("");

  const addService = () => {
    const trimmed = serviceInput.trim();
    if (trimmed && !data.services.includes(trimmed)) {
      onChange({ services: [...data.services, trimmed] });
      setServiceInput("");
    }
  };

  const removeService = (s: string) => {
    onChange({ services: data.services.filter((x) => x !== s) });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">Services & Solution</h2>
        <p className="text-muted-foreground">Outline your proposed services, deliverables, and scope of work.</p>
      </div>

      {/* Services tags */}
      <div className="space-y-2">
        <Label>Services Offered</Label>
        <div className="flex gap-2">
          <Input
            value={serviceInput}
            onChange={(e) => setServiceInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
            placeholder="Type a service and press Enter"
          />
          <Button variant="outline" size="icon" onClick={addService}><Plus className="h-4 w-4" /></Button>
        </div>
        {data.services.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {data.services.map((s) => (
              <Badge key={s} variant="secondary" className="gap-1 pr-1">
                {s}
                <button onClick={() => removeService(s)} className="ml-1 rounded-full p-0.5 hover:bg-muted">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label>Deliverables</Label>
          <Textarea rows={3} value={data.deliverables} onChange={(e) => onChange({ deliverables: e.target.value })} placeholder="List the key deliverables..." />
        </div>
        <div className="space-y-2">
          <Label>Estimated Timeline</Label>
          <Input value={data.estimatedTimeline} onChange={(e) => onChange({ estimatedTimeline: e.target.value })} placeholder="e.g., 8 weeks" />
        </div>
        <div className="space-y-2">
          <Label>Budget (optional)</Label>
          <Input value={data.budget} onChange={(e) => onChange({ budget: e.target.value })} placeholder="e.g., ₹15,00,000" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Key Features</Label>
          <Textarea rows={3} value={data.keyFeatures} onChange={(e) => onChange({ keyFeatures: e.target.value })} placeholder="Highlight key features of your solution..." />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Scope of Work</Label>
          <Textarea rows={4} value={data.scopeOfWork} onChange={(e) => onChange({ scopeOfWork: e.target.value })} placeholder="Define the detailed scope of work..." />
        </div>
      </div>
    </div>
  );
};

export default ServicesStep;
