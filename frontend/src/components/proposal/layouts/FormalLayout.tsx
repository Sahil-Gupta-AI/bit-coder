import type { ProposalData } from "@/types/proposal";

export const FormalLayout = ({ data }: { data: ProposalData }) => {
  const sections = data.templateSections?.length ? data.templateSections : Object.keys(data.sections || {});
  
  const formatLabel = (key: string) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <div className="bg-white text-black p-16 font-serif max-w-3xl mx-auto border-x shadow-sm min-h-full">
      <div className="text-center mb-16 border-y-2 border-black py-10">
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-4">{data.proposalTitle || "Proposal Document"}</h1>
        <p className="text-xl italic mb-8">{data.projectName}</p>
        <div className="text-sm">
          <p className="mb-2">Submitted to: <span className="font-bold">{data.clientName || "—"}</span>, {data.clientCompany || "—"}</p>
          <p className="mb-2">Prepared by: <span className="font-bold">{data.preparedBy || "—"}</span></p>
          <p>Date: {data.proposalDate}</p>
        </div>
      </div>
      
      {data.sections && sections.map((key) => (
        data.sections![key] && (
          <div key={key} className="mb-10 text-justify">
            <h2 className="text-lg font-bold border-b border-black pb-1 mb-3 uppercase tracking-wider">{formatLabel(key)}</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed">{data.sections![key]}</p>
          </div>
        )
      ))}

      <div className="mt-16 text-center text-xs opacity-50">
        <p>CONFIDENTIAL</p>
      </div>
    </div>
  );
};
