import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { proposalThemes, type ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
  onChange: (updates: Partial<ProposalData>) => void;
}

const ThemeSelector = ({ data, onChange }: Props) => {
  const select = (t: typeof proposalThemes[0]) => {
    onChange({ themeId: t.id, themeName: t.name });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Choose a Design Theme</h2>
      <p className="mb-8 text-muted-foreground">Select a visual style for your final proposal PDF.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {proposalThemes.map((t) => {
          const selected = data.themeId === t.id;
          return (
            <Card
              key={t.id}
              className={`cursor-pointer overflow-hidden transition-all hover:shadow-card-hover ${selected ? "ring-2 ring-primary shadow-card-hover" : "shadow-card"}`}
              onClick={() => select(t)}
            >
              <div 
                className="h-24 w-full" 
                style={{ backgroundColor: t.colorHex, opacity: 0.15 }}
              />
              <CardContent className="relative p-5">
                <div 
                  className="absolute -top-6 left-5 flex h-12 w-12 items-center justify-center rounded-xl border-4 border-background shadow-sm"
                  style={{ backgroundColor: t.colorHex }}
                >
                  {selected && <Check className="h-5 w-5 text-white" />}
                </div>
                <div className="mt-4">
                  <h3 className="mb-1 text-lg font-bold text-foreground">{t.name}</h3>
                  <p className="text-sm text-muted-foreground">{t.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;
