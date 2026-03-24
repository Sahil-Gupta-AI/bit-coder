import type { ProposalData } from "@/types/proposal";

export const ServiceLayout = ({ data }: { data: ProposalData }) => {
  const sections = data.templateSections?.length ? data.templateSections : Object.keys(data.sections || {});
  
  const formatLabel = (key: string) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <div className="bg-slate-50 text-slate-800 p-12 font-sans border-t-8 border-green-600 min-h-full">
      <div className="mb-12 flex justify-between items-end border-b border-green-200 pb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{data.proposalTitle || "Proposal"}</h1>
          <p className="text-lg text-green-700 font-medium">{data.projectName}</p>
        </div>
        <div className="text-right text-sm bg-green-100 text-green-800 p-4 rounded-lg">
          <p className="font-bold text-base">{data.clientCompany || "—"}</p>
          <p>Attn: {data.clientName || "—"}</p>
          <p className="mt-2 text-xs opacity-80">{data.proposalDate}</p>
        </div>
      </div>
      
      {data.sections && sections.map((key) => (
        data.sections![key] && (
          <div key={key} className="mb-8">
            <div className="bg-slate-200 p-3 mb-4 rounded-md border-l-4 border-green-600">
              <h2 className="text-lg font-bold text-slate-800">{formatLabel(key)}</h2>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed px-2 text-slate-700">{data.sections![key]}</p>
          </div>
        )
      ))}
    </div>
  );
};
