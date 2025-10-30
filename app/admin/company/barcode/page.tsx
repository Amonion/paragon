'use client'
import { useState, useRef, useEffect, FC } from 'react'
import JsBarcode from 'jsbarcode'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface BarcodeItem {
  id: string // 13-digit EAN-13 (including check digit)
}

/* --------------------------------------------------------------- */
/*  EAN-13 check-digit (Luhn)                                      */
/* --------------------------------------------------------------- */
const calcCheck = (base12: string): string => {
  const d = base12.split('').map(Number)
  let sum = 0
  for (let i = 0; i < 12; i++) sum += i % 2 === 0 ? d[i] : d[i] * 3
  return ((10 - (sum % 10)) % 10).toString()
}

/* --------------------------------------------------------------- */
/*  Single barcode (SVG)                                           */
/* --------------------------------------------------------------- */
const Barcode: FC<{ value: string; heightMm: number }> = ({
  value,
  heightMm,
}) => {
  const svg = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svg.current) return
    JsBarcode(svg.current, value, {
      format: 'EAN13',
      lineColor: '#000',
      width: 2.2, // 0.33 mm at 300 dpi → perfect for cheap scanners
      height: heightMm * 1.4, // a little taller than the label you showed
      displayValue: true,
      fontSize: 13,
      textAlign: 'center', // number exactly under the bars
      textMargin: 4,
      margin: 0,
      marginLeft: 10, // 9-module quiet zone (required)
      marginRight: 10,
      flat: false, // keep the guard-pattern extension
    })
  }, [value, heightMm])

  return (
    <div
      style={{
        height: `${heightMm}mm`,
        pageBreakInside: 'avoid',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <svg ref={svg} />
    </div>
  )
}

/* --------------------------------------------------------------- */
/*  Dashboard                                                      */
/* --------------------------------------------------------------- */
const BarcodeDashboard: FC = () => {
  const [codes, setCodes] = useState<BarcodeItem[]>([])
  const [count, setCount] = useState(10)
  const [height, setHeight] = useState(30)
  const [prefix, setPrefix] = useState('6934422') // <-- change to your GS1 prefix

  const generate = () => {
    const list: BarcodeItem[] = []
    for (let i = 0; i < count; i++) {
      const seq = String(i).padStart(5, '0') // 00000 … 99999
      const base12 = prefix + seq // 12 digits
      const check = calcCheck(base12)
      list.push({ id: base12 + check })
    }
    setCodes(list)
  }

  const downloadPDF = async () => {
    const el = document.getElementById('barcode-table')
    if (!el) return

    const canvas = await html2canvas(el, { scale: 4, useCORS: true })
    const img = canvas.toDataURL('image/png')

    const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' })
    const pageW = pdf.internal.pageSize.getWidth()
    const imgW = pageW - 20
    const imgH = (canvas.height * imgW) / canvas.width

    // 300 dpi → crisp print
    pdf.addImage(img, 'PNG', 10, 10, imgW, imgH, undefined, 'FAST')
    pdf.save('EAN13-barcodes.pdf')
  }

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">EAN-13 Barcode Generator</h1>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-1">
          <label className="text-sm">Prefix (7 digits):</label>
          <input
            type="text"
            maxLength={7}
            value={prefix}
            onChange={(e) =>
              setPrefix(e.target.value.replace(/\D/g, '').slice(0, 7))
            }
            className="border p-2 rounded w-28"
          />
        </div>

        <div className="flex items-center gap-1">
          <label className="text-sm">Count:</label>
          <input
            type="number"
            min={1}
            value={count}
            onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
            className="border p-2 rounded w-20"
          />
        </div>

        <div className="flex items-center gap-1">
          <label className="text-sm">Height (mm):</label>
          <input
            type="number"
            min={15}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="border p-2 rounded w-20"
          />
        </div>

        <button
          onClick={generate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Generate {count}
        </button>

        <button
          onClick={downloadPDF}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          PDF
        </button>
      </div>

      {codes.length > 0 && (
        <table
          id="barcode-table"
          className="w-full max-w-md border border-gray-300"
          style={{ borderCollapse: 'collapse' }}
        >
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">EAN-13</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((c, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">
                  <Barcode value={c.id} heightMm={height} />
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
