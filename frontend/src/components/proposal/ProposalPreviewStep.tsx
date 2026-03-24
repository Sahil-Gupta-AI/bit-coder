import { Button } from "@/components/ui/button";
import { Download, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { ProposalData } from "@/types/proposal";
import { useToast } from "@/hooks/use-toast";

import { ModernLayout } from "./layouts/ModernLayout";
import { CreativeLayout } from "./layouts/CreativeLayout";
import { DarkLayout } from "./layouts/DarkLayout";
import { FormalLayout } from "./layouts/FormalLayout";
import { ServiceLayout } from "./layouts/ServiceLayout";

interface Props {
  data: ProposalData;
}

const layoutMap: Record<string, React.FC<{ data: ProposalData }>> = {
  modern: ModernLayout,
  creative: CreativeLayout,
  dark: DarkLayout,
  formal: FormalLayout,
  service: ServiceLayout,
};

const ProposalPreviewStep = ({ data }: Props) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setLoading(true);
    try {
      const el = document.getElementById("proposal-preview");
      if (!el) throw new Error("Preview not found");

      const canvas = await html2canvas(el, { scale: 1.5, useCORS: true });
      const imgData = canvas.toDataURL("image/jpeg", 0.5);
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let currentY = pageHeight;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

      while (currentY < pdfHeight) {
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, -currentY, pdfWidth, pdfHeight);
        currentY += pageHeight;
      }

      // Download IMMEDIATELY!
      pdf.save(`Proposal_${data.clientName?.replace(/\s+/g, "_") || "Client"}.pdf`);
      setDone(true);
      toast({ title: "PDF Downloaded", description: "Saved directly to your device. Cloud sync starting..." });

      // Build blob for upload
      const pdfBlob = pdf.output("blob");
      const formData = new FormData();
      formData.append("file", pdfBlob, "proposal.pdf");

      const uploadRes = await fetch("http://localhost:5000/api/upload/proposal-pdf", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.message || "Failed to upload Proposal PDF");

      // Save Proposal to MongoDB
      const token = localStorage.getItem("token");
      const saveRes = await fetch("http://localhost:5000/api/proposals/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          pdfUrl: uploadData.url
        })
      });

      if (!saveRes.ok) {
        const err = await saveRes.json().catch(() => ({}));
        throw new Error(err.message || "Failed to save proposal to cloud");
      }

      toast({ title: "Cloud Sync Successful", description: "Proposal securely backed up to the database." });
    } catch (err: any) {
      console.error("DEBUG SYNC ERROR:", err);
      toast({ 
        title: "Cloud Sync Error", 
        description: err.message || JSON.stringify(err), 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const LayoutComponent = layoutMap[data.themeId] || layoutMap.modern;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Preview & Download</h2>
        <Button
          onClick={handleDownload}
          disabled={loading}
          className="gradient-primary text-primary-foreground shadow-primary hover:opacity-90 gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : done ? <CheckCircle2 className="h-4 w-4" /> : <Download className="h-4 w-4" />}
          {loading ? "Generating..." : done ? "Download Again" : "Download PDF"}
        </Button>
      </div>

      <div className="rounded-lg shadow-card overflow-hidden bg-background border">
        <div
          id="proposal-preview"
          style={{ width: "210mm", minHeight: "297mm", margin: "0 auto", backgroundColor: "#fff" }}
        >
          <LayoutComponent data={data} />
        </div>
      </div>
    </div>
  );
};

export default ProposalPreviewStep;
