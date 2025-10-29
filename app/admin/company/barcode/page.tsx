'use client'
import { useState, useRef, useEffect, FC } from 'react'
import JsBarcode from 'jsbarcode'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface BarcodeItem {
  id: string
}

const Barcode: FC<{ value: string; height: number }> = ({ value, height }) => {
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      JsBarcode(ref.current, value, {
        format: 'EAN13', // ✅ Use EAN13 for standard UPC scanners
        lineColor: '#000',
        width: 1.8,
        height: height * 1.2,
        displayValue: true, // ✅ Show human-readable text
        fontSize: 10,
        textMargin: 2,
        margin: 0,
      })
    }
  }, [value, height])

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        height: `${height}mm`,
        padding: '4px 0',
        pageBreakInside: 'avoid',
      }}
    >
      <svg ref={ref} />
    </div>
  )
}

const BarcodeDashboard: FC = () => {
  const [codes, setCodes] = useState<BarcodeItem[]>([])
  const [count, setCount] = useState<number>(10)
  const [tagHeight, setTagHeight] = useState<number>(30)

  const generateCodes = (): void => {
    const newCodes: BarcodeItem[] = Array.from({ length: count }, () => {
      // ✅ Generate a 13-digit numeric EAN13 code (JsBarcode will handle checksum)
      const base = Math.floor(
        100000000000 + Math.random() * 900000000000
      ).toString()
      return { id: base }
    })
    setCodes(newCodes)
  }

  const downloadPDF = async (): Promise<void> => {
    const tableElement = document.getElementById('barcode-table')
    if (!tableElement) return

    const canvas = await html2canvas(tableElement, {
      scale: 2,
      useCORS: true,
    })
    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const imgWidth = pageWidth - 20
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight)
    pdf.save('barcodes.pdf')
  }

  return (
    <div className="py-3 px-2 space-y-4">
      <h1 className="text-2xl font-bold">Barcode Generator Dashboard</h1>

      <div className="flex gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <label className="text-sm">Count:</label>
          <input
            type="number"
            min={1}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded outline-none w-24 bg-transparent"
          />
        </div>

        <div className="flex items-center gap-1">
          <label className="text-sm">Tag Height (mm):</label>
          <input
            type="number"
            min={10}
            value={tagHeight}
            onChange={(e) => setTagHeight(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded outline-none w-24 bg-transparent"
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
            {codes.map((item, i) => (
              <tr key={i} className="border-b text-[var(--text-secondary)]">
                <td className="p-2">
                  <Barcode value={item.id} height={tagHeight} />
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
