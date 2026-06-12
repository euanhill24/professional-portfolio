"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="text-label text-copper border border-copper-muted px-5 py-2.5 rounded-full hover:text-brown hover:border-copper transition-colors duration-300 print:hidden"
    >
      Download PDF
    </button>
  );
}
