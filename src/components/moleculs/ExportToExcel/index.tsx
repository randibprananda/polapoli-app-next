import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export type ExportToExcelProps = {
  element?: React.ReactNode;
  apiData: any;
  fileName: string;
  onError: () => void;
};

const ExportToExcel: React.FC<ExportToExcelProps> = ({
  element,
  apiData,
  fileName,
  onError
}) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (apiData: any, fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = {
      Sheets: { data: ws },
      SheetNames: ['data'],
      Props: { Title: fileName, Author: 'PolaPoli' }
    };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="inline-block w-min h-min bg-transparent"
      onClick={() => (apiData ? exportToCSV(apiData, fileName) : onError())}
    >
      {element}
    </button>
  );
};

export default ExportToExcel;
