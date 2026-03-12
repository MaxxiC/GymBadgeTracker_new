import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout effettuato con successo" },
    { status: 200 }
  );

  // Cancella il cookie sovrascrivendolo con scadenza immediata
  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
