import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

export const formatNumber = (num: number | string | null) => {
  if (num !== undefined) {
    return parseFloat(Number(num).toFixed(2))
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  return 0
}

export const formatCurrency = (value: number, currency?: string) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency || "NGN",
  }).format(value).replace(".00","");

  export const handleDataExport = (name: string, parseData: any) => {
    const ws = XLSX.utils.json_to_sheet(parseData)
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    })
    FileSaver.saveAs(data, `zero-${name}.xlsx`)
  }

  export const isEqual = (data: any, key: any) => (data === key)
  
  export const handleDataReduce = (data: any, key: string) => {
    return data?.reduce((a: any, b: any) => Number(a) + Number(b?.[key] || b), 0)
  }

  export const handleHash = (data: string) => {
    const mailName = (data||"")?.slice(0,(data||"")?.indexOf("@"))
    const mailProvider = (data||"")?.slice((data||"")?.indexOf("@"))
    const mailNameCut = mailName.slice(0, Math.floor(mailName.length/2))
    return mailNameCut.padEnd(mailName.length, "*").concat(mailProvider) || ""
  }

  export const handleObj = (data: any) => Object.fromEntries(Object.entries(data || {})?.filter(([key, val]) => (key && val)));

  export const handleCapitalize = (data: string) => {
    return (data||"").charAt(0).toUpperCase() + (data||"").slice(1);
  }

  export function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  }

  export const extractAvatar = (name: string) => {
    const splitName = name?.split(" ");
    const firstLetter = splitName?.[0]?.charAt(0);
    const secondLetter = splitName?.[1]?.charAt(0);
    return `${firstLetter}${secondLetter}`;
  };

  export function removeSpacesFromPdfName(pdfName: string) {
    const trimmedName = pdfName?.trim();
    return trimmedName?.replace(/[^a-zA-Z0-9.]/g, "");
  }

export function getBinary(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const data=(reader?.result as any)?.split(',')?.[1];
      resolve(atob(data));
    }
    reader.onerror = (err) => reject(err)
  })
}

export const statusType = {
  success: { col: "!text-[#12B76A]", bg: "!bg-[#ECFDF3]" },
  pending: { col: "!text-[#FFBD00]", bg: "!bg-[#FFBD001F]" },
  error: { col: "!text-[#E01020]", bg: "!bg-[#E010201F]" },
  info: { col: "!text-[#495057]", bg: "!bg-[#878A991F]" },
}

export const handleTableSelect = (data: any, setData: any, key: string) => ({
    type: "checkbox",
    selectedRowKeys: data,
    onChange: (e: any, selectedRows: any) => {
      const arr: any[] = [];
      selectedRows.forEach((row: any) => arr.push(row?.[key] || row));
      setData(arr);
    },
})
