'use client'
import { useState, useRef, useEffect, FC } from 'react'
import JsBarcode from 'jsbarcode'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
// Define the type for a barcode record
interface BarcodeItem {
  id: string
}

// Barcode component
const Barcode: FC<{ value: string }> = ({ value }) => {
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      JsBarcode(ref.current, value, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,
        height: 50,
        displayValue: false,
      })
    }
  }, [value])

  return <svg ref={ref}></svg>
}

// Main dashboard component
const BarcodeDashboard: FC = () => {
  const [codes, setCodes] = useState<BarcodeItem[]>([])
  const [count, setCount] = useState<number>(10)

  // Generate barcodes
  const generateCodes = (): void => {
    const newCodes: BarcodeItem[] = Array.from({ length: count }, (_, i) => ({
      id: `GIVEAWAY-${Math.floor(1000 + Math.random() * 9000)}-${i + 1}`,
    }))
    setCodes(newCodes)
  }

  // Save to backend
  //   const saveToServer = async (): Promise<void> => {
  //     try {
  //       const res = await fetch('/api/barcodes', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(codes),
  //       })

  //       if (!res.ok) throw new Error('Failed to save to server')
  //       alert('✅ Barcodes saved to MongoDB!')
  //     } catch (err) {
  //       console.error(err)
  //       alert('❌ Error saving to server')
  //     }
  //   }

  //   const downloadCSV = (): void => {
  //     const csv = ['id', ...codes.map((c) => c.id)].join('\n')
  //     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  //     const link = document.createElement('a')
  //     link.href = URL.createObjectURL(blob)
  //     link.download = 'barcodes.csv'
  //     link.click()
  //   }

  // ...

  const downloadPDF = async (): Promise<void> => {
    const tableElement = document.getElementById('barcode-table')
    if (!tableElement) return

    // Use html2canvas to capture the table as an image
    const canvas = await html2canvas(tableElement, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const imgWidth = pageWidth - 40 // add margin
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight)
    pdf.save('barcodes.pdf')
  }

  return (
    <div className="py-3 space-y-4">
      <h1 className="text-2xl font-bold">Barcode Generator Dashboard</h1>

      <div className="flex gap-2">
        <input
          type="number"
          min={1}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="border border-[var(--border)] p-2 rounded outline-none w-24 bg-transparent"
        />

        <button
          onClick={generateCodes}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Generate {count} Codes
        </button>
        {/*
        <button
          onClick={saveToServer}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save to Server
        </button> */}

        <button
          onClick={downloadPDF}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
        {/* <button
          onClick={downloadCSV}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Download CSV
        </button> */}
      </div>

      {codes.length > 0 && (
        <table id="barcode-table" className="min-w-full  mt-4 text-sm">
          <thead>
            <tr className="bg-[var(--primary)]">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Code</th>
              <th className="p-2 text-left">Barcode</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((item, i) => (
              <tr
                key={i}
                className={` ${i % 2 === 1 ? 'bg-[var(--primary)]' : ''}`}
              >
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{item.id}</td>
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
