import type { ProposalData } from "@/types/proposal";

export const DarkLayout = ({ data }: { data: ProposalData }) => {
  const sections = data.templateSections?.length ? data.templateSections : Object.keys(data.sections || {});
  
  const formatLabel = (key: string) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <div className="bg-slate-900 text-slate-300 p-12 font-sans min-h-full">
      <div className="mb-16 border-b border-emerald-500/30 pb-12">
        <h1 className="text-4xl font-light text-white mb-2">{data.proposalTitle || "Business Proposal"}</h1>
        <p className="text-xl text-emerald-400 font-mono mb-8">{data.projectName}</p>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <p className="text-slate-500 mb-1 uppercase tracking-widest text-xs">Prepared For</p>
            <p className="text-white font-medium">{data.clientName || "—"}</p>
            <p>{data.clientCompany || "—"}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 mb-1 uppercase tracking-widest text-xs">Details</p>
            <p>By: <span className="text-white">{data.preparedBy || "—"}</span></p>
            <p>Date: {data.proposalDate}</p>
          </div>
        </div>
      </div>
      
      {data.sections && sections.map((key) => (
        data.sections![key] && (
          <div key={key} className="mb-10">
            <h2 className="text-lg font-mono text-emerald-400 mb-4">{"//"} {formatLabel(key)}</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed opacity-90">{data.sections![key]}</p>
          </div>
        )
      ))}
    </div>
  );
};
