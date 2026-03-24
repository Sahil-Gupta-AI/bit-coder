import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import type { ProposalData } from "@/types/proposal";
import { proposalTemplates } from "@/types/proposal";

interface Props {
  data: ProposalData;
  onChange: (updates: Partial<ProposalData>) => void;
}

const DynamicFieldsStep = ({ data, onChange }: Props) => {
  const template = proposalTemplates.find((t) => t.id === data.templateId);
  if (!template) return null;

  const updateField = (key: string, val: string) => {
    onChange({ customFields: { ...data.customFields, [key]: val } });
  };

  const formatLabel = (key: string) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">{template.name} Details</h2>
        <p className="text-muted-foreground">Please fill out the specific details for this template to generate your tailored AI proposal.</p>
      </div>
      <div className="space-y-6">
        {template.fields && template.fields.map((field) => {
          const val = data.customFields[field] || "";
          const isShort = ["budget", "timeline", "location", "dailyRequirement", "totalArea", "companySize"].includes(field);

          return (
            <div className="space-y-2" key={field}>
              <Label className="text-base">{formatLabel(field)}</Label>
              {isShort ? (
                <Input value={val} onChange={(e) => updateField(field, e.target.value)} placeholder={`Enter ${formatLabel(field).toLowerCase()}...`} />
              ) : (
                <Textarea rows={3} value={val} onChange={(e) => updateField(field, e.target.value)} placeholder={`Describe the ${formatLabel(field).toLowerCase()}...`} />
              )}
            </div>
          );
        })}
        {(!template.fields || template.fields.length === 0) && (
          <p className="text-muted-foreground italic">No unique fields required for this template.</p>
        )}
      </div>
    </div>
  );
};

export default DynamicFieldsStep;
