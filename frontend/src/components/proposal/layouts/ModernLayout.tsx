import type { ProposalData } from "@/types/proposal";

export const ModernLayout = ({ data }: { data: ProposalData }) => {
  const sections = data.templateSections?.length ? data.templateSections : Object.keys(data.sections || {});
  
  const formatLabel = (key: string) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <div className="bg-white text-slate-900 p-12 font-sans min-h-full">
      <div className="border-l-4 border-blue-600 pl-8 mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{data.proposalTitle || "Business Proposal"}</h1>
        <p className="text-xl text-blue-600 font-medium mb-6">{data.projectName}</p>
        <div className="text-sm text-slate-500 space-y-1">
          <p>Prepared for: <span className="text-slate-900 font-semibold">{data.clientName || "—"}</span> ({data.clientCompany || "—"})</p>
          <p>Prepared by: <span className="text-slate-900 font-semibold">{data.preparedBy || "—"}</span></p>
          <p>Date: {data.proposalDate} &nbsp;|&nbsp; Valid Until: {data.validityDate || "N/A"}</p>
        </div>
      </div>
      
      {data.sections && sections.map((key) => (
        data.sections![key] && (
          <div key={key} className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <span className="w-8 h-1 bg-blue-600 mr-4 inline-block"></span>{formatLabel(key)}
            </h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">{data.sections![key]}</p>
          </div>
        )
      ))}

      <div className="mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-400">
        <p>Confidential • Generated for {data.clientCompany || "the recipient"}</p>
      </div>
    </div>
  );
};
