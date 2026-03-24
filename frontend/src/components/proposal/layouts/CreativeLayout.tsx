import type { ProposalData } from "@/types/proposal";

export const CreativeLayout = ({ data }: { data: ProposalData }) => {
  const sections = data.templateSections?.length ? data.templateSections : Object.keys(data.sections || {});
  
  const formatLabel = (key: string) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <div className="bg-rose-50/50 text-slate-800 p-12 font-sans min-h-full">
      <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-10 rounded-3xl text-white mb-12 shadow-lg">
        <h1 className="text-5xl font-black tracking-tight mb-4">{data.proposalTitle || "Proposal"}</h1>
        <p className="text-2xl font-medium opacity-90 mb-8">{data.projectName}</p>
        <div className="flex justify-between text-sm opacity-80 font-medium">
          <div>
            <p className="uppercase tracking-wider text-xs opacity-70 mb-1">Prepared For</p>
            <p>{data.clientName || "—"} • {data.clientCompany || "—"}</p>
          </div>
          <div className="text-right">
            <p className="uppercase tracking-wider text-xs opacity-70 mb-1">Date</p>
            <p>{data.proposalDate}</p>
          </div>
        </div>
      </div>
      
      {data.sections && sections.map((key) => (
        data.sections![key] && (
          <div key={key} className="mb-12 bg-white rounded-2xl p-8 shadow-sm border border-rose-100">
            <h2 className="text-xl font-bold text-pink-600 mb-4 uppercase tracking-wider">{formatLabel(key)}</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">{data.sections![key]}</p>
          </div>
        )
      ))}

      <div className="mt-8 text-center text-xs text-slate-400 font-medium">
        <p>Prepared for {data.clientCompany || "the recipient"}</p>
      </div>
    </div>
  );
};
