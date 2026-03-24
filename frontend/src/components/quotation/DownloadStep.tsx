import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, CheckCircle2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { type QuotationData } from "@/types/quotation";
import PreviewStep from "./PreviewStep";
import { useToast } from "@/hooks/use-toast";

interface DownloadStepProps {
  data: QuotationData;
}

const DownloadStep = ({ data }: DownloadStepProps) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setLoading(true);
    try {
      const el = document.getElementById("quotation-preview");
      if (!el) throw new Error("Preview not found");

      const canvas = await html2canvas(el, { scale: 1.5, useCORS: true });
      const imgData = canvas.toDataURL("image/jpeg", 0.5);
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let headerHeight = 0;
      if (data.extractedHeaderUrl) {
         headerHeight = await new Promise<number>((resolve) => {
           const img = new Image();
           img.onload = () => resolve((img.height * pdfWidth) / img.width);
           img.src = data.extractedHeaderUrl!;
         });
      }

      // Add first page
      let currentY = pageHeight;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

      // Pagination Slicing
      while (currentY < pdfHeight) {
        pdf.addPage();
        const position = headerHeight - currentY;
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
        
        // Sticky Header overlay
        if (data.extractedHeaderUrl && headerHeight > 0) {
            pdf.setFillColor(255, 255, 255);
            pdf.rect(0, 0, pdfWidth, headerHeight, "F");
            pdf.addImage(data.extractedHeaderUrl, "PNG", 0, 0, pdfWidth, headerHeight);
        }
        currentY += (pageHeight - headerHeight);
      }

      // IMMEDIATELY download to the user's hard drive!
      pdf.save(`Quotation_${data.clientName?.replace(/\s+/g, "_") || "Client"}.pdf`);
      setDone(true);
      toast({ title: "PDF Downloaded", description: "Saved directly to your device. Cloud sync starting..." });

      // Build blob for upload
      const pdfBlob = pdf.output("blob");
      const formData = new FormData();
      formData.append("file", pdfBlob, "quotation.pdf");

      const uploadRes = await fetch("http://localhost:5000/api/upload/quotation-pdf", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.message || "Failed to upload PDF");

      // Save Quotation to MongoDB
      const token = localStorage.getItem("token");
      const { letterheadUrl, letterheadFile, extractedHeaderUrl, ...dataToSave } = data;
      const saveRes = await fetch("http://localhost:5000/api/quotations/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...dataToSave,
          pdfUrl: uploadData.url
        })
      });

      if (!saveRes.ok) {
        const err = await saveRes.json().catch(() => ({}));
        throw new Error(err.message || "Failed to save quotation to cloud");
      }

      toast({ title: "Success! Quotation saved to your cloud backup." });
    } catch (err: any) {
      console.error(err);
      toast({ title: err.message || "An error occurred", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg text-center relative">
      <div style={{ position: "absolute", opacity: 0, pointerEvents: "none", zIndex: -100 }}>
        <PreviewStep data={data} />
      </div>
      <div className="mb-6 inline-flex rounded-full bg-secondary p-6">
        {done ? (
          <CheckCircle2 className="h-12 w-12 text-primary" />
        ) : (
          <Download className="h-12 w-12 text-primary" />
        )}
      </div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        {done ? "Download Complete!" : "Download Your Quotation"}
      </h2>
      <p className="mb-8 text-muted-foreground">
        {done
          ? "Your quotation PDF has been downloaded successfully."
          : "Your quotation is ready. Click below to download as a PDF."}
      </p>
      <Button
        onClick={handleDownload}
        disabled={loading}
        size="lg"
        className="gradient-primary text-primary-foreground shadow-primary hover:opacity-90 gap-2 px-10"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
        {loading ? "Generating PDF..." : done ? "Download Again" : "Download PDF"}
      </Button>
    </div>
  );
};

export default DownloadStep;
