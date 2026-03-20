import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ExcelJS from "exceljs";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Accesso negato." }, { status: 401 });
    try { jwt.verify(token, JWT_SECRET); } catch {
      return NextResponse.json({ error: "Token non valido o scaduto." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const sheetName = formData.get("sheetName") as string | null;

    if (!file) return NextResponse.json({ error: "Nessun file fornito." }, { status: 400 });
    if (!sheetName) return NextResponse.json({ error: "Nessun foglio specificato." }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const workbook = new ExcelJS.Workbook();
    // @ts-ignore
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) {
      return NextResponse.json({ error: `Foglio "${sheetName}" non trovato.` }, { status: 404 });
    }

    // Find the header row (row 1) and detect the filter column:
    // Strategy: find the last non-empty header cell
    const headerRow = worksheet.getRow(1);
    let filterColIndex = 0;
    headerRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
      if (cell.value !== null && cell.value !== undefined && String(cell.value).trim() !== "") {
        filterColIndex = colNumber;
      }
    });

    if (filterColIndex === 0) {
      return NextResponse.json({ error: "Impossibile rilevare la colonna filtri." }, { status: 400 });
    }

    // Collect unique non-empty values from the filter column
    const uniqueFilters = new Set<string>();
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // skip header
      const cellValue = row.getCell(filterColIndex).value;
      if (cellValue !== null && cellValue !== undefined) {
        const strVal = String(cellValue).trim();
        if (strVal !== "") uniqueFilters.add(strVal);
      }
    });

    const filterColumnName = String(headerRow.getCell(filterColIndex).value ?? "Attività");

    return NextResponse.json({
      success: true,
      filterColumnName,
      filters: [...uniqueFilters].sort(),
    });

  } catch (error: any) {
    console.error("Filters API Error:", error);
    return NextResponse.json({ error: "Errore interno del server." }, { status: 500 });
  }
}
