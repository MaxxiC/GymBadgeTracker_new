import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import ExcelJS from "exceljs";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export async function POST(req: NextRequest) {
  try {
    // 1. JWT Authentication Check
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Accesso negato. Autenticazione richiesta." }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
    } catch (e) {
      return NextResponse.json({ error: "Token non valido o scaduto." }, { status: 401 });
    }

    // 2. Parse FormData and validate file
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nessun file trovato nella richiesta." }, { status: 400 });
    }

    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!validTypes.includes(file.type) && !file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      return NextResponse.json({ error: "Formato non valido. Sono supportati solo file Excel." }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File troppo grande. Il limite server è di 10MB." }, { status: 400 });
    }

    // 3. Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // 4. ExcelJS Parsing
    const workbook = new ExcelJS.Workbook();
    // @ts-ignore — ExcelJS types conflict with newer @types/node Buffer definition; works at runtime
    await workbook.xlsx.load(buffer);

    const sheets: string[] = [];
    let totalRows = 0;
    let maxCols = 0;

    workbook.eachSheet((worksheet) => {
      sheets.push(worksheet.name);

      // Count non-empty data rows (skip header row 1)
      let sheetRows = 0;
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        const hasData = row.values && (row.values as any[]).some(
          (cell) => cell !== null && cell !== undefined && cell !== ""
        );
        if (hasData) sheetRows++;
      });
      totalRows += sheetRows;

      // Track max columns from first sheet
      if (sheets.length === 1 && worksheet.columnCount > maxCols) {
        maxCols = worksheet.columnCount;
      }
    });

    return NextResponse.json({
      success: true,
      result: {
        rows: totalRows,
        cols: maxCols,
        sheets,
        sizeKB: Math.round(file.size / 1024),
      },
    });

  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: "Errore interno del server durante la ricezione." }, { status: 500 });
  }
}

