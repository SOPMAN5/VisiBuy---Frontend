import { Row } from "@tanstack/react-table";

export const startsWithFilterFn = <TData>(
    row: Row<TData>,
    columnId: string,
    filterValue: string, // Change to explicitly string
  ) => {
    const cellValue = row.getValue(columnId);
    
    // Handle potential null/undefined values and convert to string
    const stringValue = cellValue !== undefined && cellValue !== null
      ? String(cellValue).toLowerCase().trim()
      : '';
    
    return stringValue.startsWith(filterValue.toLowerCase().trim());
  };