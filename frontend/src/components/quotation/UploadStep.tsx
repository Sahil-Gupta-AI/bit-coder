import { useCallback, useState } from "react";
import { Upload, FileCheck, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuotationData } from "@/types/quotation";
import { useToast } from "@/hooks/use-toast";
import * as pdfjsLib from "pdfjs-dist";

// Use CDN for the worker to avoid bundler configuration headaches
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface Props {
  data: QuotationData;
  onChange: (updates: Partial<QuotationData>) => void;
}

const UploadStep = ({ data, onChange }: Props) => {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const processFile = async (file: File) => {
    if (file.type === "application/pdf") {
      setLoading(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1); // Extract first page
        
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        
        if (!context) throw new Error("Canvas context failed");
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({ canvasContext: context, viewport }).promise;
        
        const imgDataUrl = canvas.toDataURL("image/jpeg", 0.9);
        // We pass the real file for uploading, but the jpeg representation for `letterheadUrl` so it's croppable
        onChange({ letterheadUrl: imgDataUrl, letterheadFile: file });
      } catch (err: any) {
        toast({ title: "Failed to convert PDF", description: err.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    } else {
      const url = URL.createObjectURL(file);
      onChange({ letterheadUrl: url, letterheadFile: file });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const clearFile = () => onChange({ letterheadUrl: null, letterheadFile: null });

  return (
    <div className="mx-auto max-w-lg">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Upload Letterhead</h2>
      <p className="mb-6 text-muted-foreground">Upload your company letterhead to personalize your quotation.</p>

      {!data.letterheadUrl ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-primary/30 bg-secondary/50 p-12 transition-colors hover:border-primary/60 ${loading ? "opacity-50 pointer-events-none" : ""}`}
          onClick={() => { if(!loading) document.getElementById("file-input")?.click() }}
        >
          <div className="gradient-primary rounded-full p-4">
            {loading ? <Loader2 className="h-8 w-8 text-primary-foreground animate-spin" /> : <Upload className="h-8 w-8 text-primary-foreground" />}
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">
              {loading ? "Converting PDF to Image..." : "Drop your file here or click to browse"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">PDF, PNG, JPEG — Max 5MB</p>
          </div>
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileInput}
          />
        </div>
      ) : (
        <div className="rounded-2xl border bg-secondary/30 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="gradient-primary rounded-lg p-2">
                <FileCheck className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{data.letterheadFile?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {((data.letterheadFile?.size || 0) / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={clearFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          {data.letterheadFile?.type.startsWith("image/") && (
            <img src={data.letterheadUrl!} alt="Letterhead preview" className="mt-4 max-h-48 rounded-lg border object-contain" />
          )}
        </div>
      )}
    </div>
  );
};

export default UploadStep;
