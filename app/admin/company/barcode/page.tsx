'use client'
import { useState, useRef, useEffect, FC } from 'react'
import JsBarcode from 'jsbarcode'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface BarcodeItem {
  id: string
}

const Barcode: FC<{ value: string }> = ({ value }) => {
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      JsBarcode(ref.current, value, {
        format: 'CODE128',
        lineColor: '#000',
        width: 1.5,
        height: 40,
        displayValue: false,
        margin: 0,
      })
    }
  }, [value])

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <svg ref={ref} />
      <p
        style={{
          fontSize: '9pt',
          marginTop: '3px',
          textAlign: 'center',
          fontFamily: 'monospace',
          letterSpacing: '0.5px',
        }}
      >
        {value}
      </p>
    </div>
  )
}

const BarcodeDashboard: FC = () => {
  const [codes, setCodes] = useState<BarcodeItem[]>([])
  const [count, setCount] = useState<number>(10)

  const generateCodes = (): void => {
    const newCodes: BarcodeItem[] = Array.from({ length: count }, () => ({
      id: `PGF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    }))
    setCodes(newCodes)
  }

  const downloadPDF = async (): Promise<void> => {
    const tableElement = document.getElementById('barcode-table')
    if (!tableElement) return

    const canvas = await html2canvas(tableElement, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const imgWidth = pageWidth - 40
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight)
    pdf.save('barcodes.pdf')
  }

  return (
    <div className="py-3 space-y-4">
      <h1 className="text-2xl font-bold">Barcode Generator Dashboard</h1>

      <div className="flex gap-2 flex-wrap">
        <input
          type="number"
          min={1}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="border border-gray-300 p-2 rounded outline-none w-24 bg-transparent"
        />

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
          className="w-full max-w-[300px] border mt-4 text-sm border-gray-300"
        >
          <thead>
            <tr className="bg-[var(--primary)] border-b">
              <th className="p-2 text-left">Barcode</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">
                  <Barcode value={item.id} />
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
