export interface QuotationItem {
  id: string;
  itemName: string;
  quantity: number;
  price: number;
}

export interface QuotationData {
  letterheadUrl: string | null;
  letterheadFile: File | null;
  clientName: string;
  clientCompany: string;
  projectName: string;
  quotationDate: string;
  validityDate: string;
  items: QuotationItem[];
  taxPercent: number;
  tone: "Formal" | "Friendly" | "Professional";
  descriptionStyle: "Short" | "Medium" | "Detailed";
  generatedContent: {
    intro: string;
    terms: string;
    closingNote: string;
  } | null;
  extractedHeaderUrl: string | null;
  headerCropRatio: number;
}

export const defaultQuotationData: QuotationData = {
  letterheadUrl: null,
  letterheadFile: null,
  clientName: "",
  clientCompany: "",
  projectName: "",
  quotationDate: new Date().toISOString().split("T")[0],
  validityDate: "",
  items: [{ id: "1", itemName: "", quantity: 1, price: 0 }],
  taxPercent: 18,
  tone: "Professional",
  descriptionStyle: "Medium",
  generatedContent: null,
  extractedHeaderUrl: null,
  headerCropRatio: 0.15,
};
