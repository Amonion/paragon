'use client'
import { useState, useRef, useEffect, FC } from 'react'
import JsBarcode from 'jsbarcode'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface BarcodeItem {
  id: string // 13-digit EAN-13 string (with check digit)
}

/* ------------------------------------------------------------------ */
/*  EAN-13 check-digit helper (Luhn algorithm)                        */
/* ------------------------------------------------------------------ */
const calculateCheckDigit = (base12: string): string => {
  const digits = base12.split('').map(Number)
  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += i % 2 === 0 ? digits[i] : digits[i] * 3
  }
  const check = (10 - (sum % 10)) % 10
  return check.toString()
}

/* ------------------------------------------------------------------ */
/*  Single barcode component                                          */
/* ------------------------------------------------------------------ */
const Barcode: FC<{ value: string; height: number }> = ({ value, height }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (svgRef.current) {
      JsBarcode(svgRef.current, value, {
        format: 'EAN13',
        lineColor: '#000',
        width: 2, // thicker bars = better scan
        height: height * 1.2,
        displayValue: true,
        fontSize: 12,
        textAlign: 'center', // number exactly under the bars
        textMargin: 2,
        margin: 0,
        flat: true, // removes the extra left/right quiet zone that can push the number
      })
    }
  }, [value, height])

  return (
    <div
      className="flex flex-col items-center"
      style={{ height: `${height}mm`, pageBreakInside: 'avoid' }}
    >
      <svg ref={svgRef} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Dashboard                                                         */
/* ------------------------------------------------------------------ */
const BarcodeDashboard: FC = () => {
  const [codes, setCodes] = useState<BarcodeItem[]>([])
  const [count, setCount] = useState<number>(10)
  const [tagHeight, setTagHeight] = useState<number>(30)

  /* -------------------------------------------------------------- */
  /*  Generate N valid EAN-13 codes                                 */
  /* -------------------------------------------------------------- */
  const generateCodes = () => {
    const newCodes: BarcodeItem[] = []

    for (let i = 0; i < count; i++) {
      // 12-digit base (you can replace the first 7 digits with a GS1 prefix)
      const base12 = `1234567${String(i).padStart(5, '0')}` // 123456700000 … 123456700009
      const check = calculateCheckDigit(base12)
      newCodes.push({ id: base12 + check })
    }
    setCodes(newCodes)
  }

  /* -------------------------------------------------------------- */
  /*  Export to PDF (A4, printable)                                 */
  /* -------------------------------------------------------------- */
  const downloadPDF = async () => {
    const el = document.getElementById('barcode-table')
    if (!el) return

    const canvas = await html2canvas(el, { scale: 3, useCORS: true })
    const img = canvas.toDataURL('image/png')

    const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' })
    const pageW = pdf.internal.pageSize.getWidth()
    const imgW = pageW - 20
    const imgH = (canvas.height * imgW) / canvas.width

    pdf.addImage(img, 'PNG', 10, 10, imgW, imgH)
    pdf.save('barcodes.pdf')
  }

  return (
    <div className="py-3 px-2 space-y-4">
      <h1 className="text-2xl font-bold">Barcode Generator Dashboard</h1>

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1">
          <label className="text-sm">Count:</label>
          <input
            type="number"
            min={1}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded w-24 bg-transparent"
          />
        </div>

        <div className="flex items-center gap-1">
          <label className="text-sm">Tag Height (mm):</label>
          <input
            type="number"
            min={10}
            value={tagHeight}
            onChange={(e) => setTagHeight(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded w-24 bg-transparent"
          />
        </div>

        <button
          onClick={generateCodes}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Generate {count} Codes
        </button>

        <button
          onClick={downloadPDF}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>

      {codes.length > 0 && (
        <table
          id="barcode-table"
          className="border mt-4 text-sm border-gray-300"
          style={{
            width: '100%',
            maxWidth: '300px',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr className="bg-[var(--secondary)] border-b">
              <th className="p-2 text-left">Barcode</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((c, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">
                  <Barcode value={c.id} height={tagHeight} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default BarcodeDashboard
