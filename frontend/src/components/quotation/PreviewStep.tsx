import type { QuotationData } from "@/types/quotation";

interface Props {
  data: QuotationData;
}

const PreviewStep = ({ data }: Props) => {
  const subtotal = data.items.reduce((s, i) => s + i.quantity * i.price, 0);
  const taxAmount = subtotal * (data.taxPercent / 100);
  const total = subtotal + taxAmount;

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Preview Your Quotation</h2>

      <div
        id="quotation-preview"
        className="relative mx-auto flex flex-col overflow-hidden bg-white shadow-card"
        style={{ width: "210mm", minHeight: "297mm", fontFamily: "Inter, sans-serif" }}
      >
        {/* Top Header Graphic */}
        {data.extractedHeaderUrl && (
          <img
            src={data.extractedHeaderUrl}
            alt="Header Graphic"
            className="pointer-events-none w-full object-contain"
          />
        )}

        {/* Content Region */}
        <div className="relative z-10 flex flex-1 w-full flex-col px-20 py-12">

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">QUOTATION</h1>
          <p className="text-sm text-muted-foreground">
            Date: {data.quotationDate} &nbsp;|&nbsp; Valid Until: {data.validityDate || "N/A"}
          </p>
        </div>

        {/* Client Info */}
        <div className="mb-6 grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-semibold text-muted-foreground">Bill To:</p>
            <p className="font-medium text-foreground">{data.clientName || "—"}</p>
            <p className="text-muted-foreground">{data.clientCompany || "—"}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-muted-foreground">Project:</p>
            <p className="font-medium text-foreground">{data.projectName || "—"}</p>
          </div>
        </div>

        {/* Intro */}
        {data.generatedContent?.intro && (
          <div className="mb-6 whitespace-pre-line text-sm text-foreground">{data.generatedContent.intro}</div>
        )}

        {/* Items Table */}
        <table className="mb-6 w-full text-sm">
          <thead>
            <tr className="border-b-2 border-primary/20">
              <th className="py-2 text-left font-semibold text-foreground">#</th>
              <th className="py-2 text-left font-semibold text-foreground">Item</th>
              <th className="py-2 text-center font-semibold text-foreground">Qty</th>
              <th className="py-2 text-right font-semibold text-foreground">Price</th>
              <th className="py-2 text-right font-semibold text-foreground">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 text-muted-foreground">{i + 1}</td>
                <td className="py-2 text-foreground">{item.itemName || "—"}</td>
                <td className="py-2 text-center text-foreground">{item.quantity}</td>
                <td className="py-2 text-right text-foreground">₹{item.price.toLocaleString("en-IN")}</td>
                <td className="py-2 text-right font-medium text-foreground">
                  ₹{(item.quantity * item.price).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mb-8 ml-auto max-w-xs space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax ({data.taxPercent}%)</span>
            <span className="text-foreground">₹{taxAmount.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-base font-bold">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Terms */}
        {data.generatedContent?.terms && (
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold text-foreground">Terms & Conditions</h3>
            <p className="whitespace-pre-line text-sm text-muted-foreground">{data.generatedContent.terms}</p>
          </div>
        )}

        {/* Closing */}
        {data.generatedContent?.closingNote && (
          <div className="mt-8 border-t pt-4 text-sm text-foreground">
            {data.generatedContent.closingNote}
          </div>
        )}
        </div>

      </div>
    </div>
  );
};

export default PreviewStep;
