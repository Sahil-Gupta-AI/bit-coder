import { useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { QuotationData } from "@/types/quotation";

interface Props {
  data: QuotationData;
  onChange: (updates: Partial<QuotationData>) => void;
}

const CropStep = ({ data, onChange }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const extractCrop = (ratio: number) => {
    if (!data.letterheadUrl || !imageRef.current) return;
    
    onChange({ headerCropRatio: ratio });

    const img = imageRef.current;
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    
    if (width === 0 || height === 0) return;
    
    const cropHeight = Math.max(1, height * ratio);
    
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = cropHeight;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.drawImage(img, 0, 0, width, cropHeight, 0, 0, width, cropHeight);
    
    const extractedHeaderUrl = canvas.toDataURL("image/png");
    onChange({ extractedHeaderUrl });
  };

  useEffect(() => {
    // If the browser hasn't loaded the image completely yet, wait for the onLoad event instead.
    if (data.letterheadUrl && !data.extractedHeaderUrl && imageRef.current?.complete) {
      extractCrop(data.headerCropRatio || 0.15);
    }
  }, [data.letterheadUrl]);

  if (!data.letterheadUrl) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <p className="text-muted-foreground">Please upload a letterhead in the previous step first.</p>
      </div>
    );
  }

  const ratio = data.headerCropRatio || 0.15;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">Crop Your Header</h2>
        <p className="text-muted-foreground">
          Drag the slider to define the bottom boundary of your Header. This top section will be extracted and placed at the top and bottom of your generated quotation.
        </p>
      </div>

      <div className="space-y-4">
        <Label>Header Cutoff Position: {Math.round(ratio * 100)}%</Label>
        <Slider 
          value={[ratio * 100]} 
          min={1} 
          max={50} 
          step={1} 
          onValueChange={(vals) => extractCrop(vals[0] / 100)} 
        />
      </div>

      <div 
        ref={containerRef}
        className="relative mx-auto border shadow-sm rounded overflow-hidden"
        style={{ width: "100%", maxWidth: "450px", aspectRatio: "1 / 1.414" }}
      >
        <img 
          ref={imageRef}
          src={data.letterheadUrl} 
          alt="Letterhead"
          className="w-full h-full object-contain pointer-events-none"
          onLoad={() => extractCrop(ratio)}
        />
        
        {/* Visual Overlay for cropped area */}
        <div 
          className="absolute top-0 left-0 w-full bg-primary/20 border-b-2 border-primary border-dashed"
          style={{ height: `${ratio * 100}%` }}
        />
        <div 
          className="absolute left-0 w-full bg-background/60 backdrop-blur-[2px]"
          style={{ top: `${ratio * 100}%`, height: `${100 - ratio * 100}%` }}
        >
          <div className="flex w-full h-full items-center justify-center">
            <span className="text-muted-foreground text-sm font-medium bg-background/80 px-4 py-2 rounded-full">Discarded Region</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropStep;
