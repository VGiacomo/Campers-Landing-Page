// // app/api/add-contact/route.ts
// import { sql } from "@vercel/postgres";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   // Parse the JSON body
//   const body = await req.json();
//   const { contactName, contactEmail } = body;

//   try {
//     if (!contactName || !contactEmail) {
//       throw new Error("Name and Email required");
//     }

//     // Execute SQL query to insert the new contact
//     await sql`INSERT INTO Contacts (Name, Email) VALUES (${contactName}, ${contactEmail});`;
//     // Retrieve all contacts (consider optimizing this if the contacts list is large)
//     const contacts = await sql`SELECT * FROM Contacts;`;

//     // Return the contacts in the response
//     return new NextResponse(JSON.stringify({ contacts }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error: unknown) {
//     // Handle errors, such as invalid input or database errors
//     console.error(error);
//     return new NextResponse(
//       JSON.stringify({ error: (error as Error).message }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// }

// app/api/add-contact/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name, email } = await request.json();

  try {
    // Create a new contact
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
      },
    });

    // Optionally, retrieve all contacts
    // const contacts = await prisma.contact.findMany();

    return new NextResponse(JSON.stringify({ contact }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Request error", error);
    return new NextResponse(
      JSON.stringify({ error: "Error creating contact" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function POST(request: Request) {
//   const { name, email } = await request.json();

//   try {
//     // Create a new contact
//     const contact = await prisma.contact.create({
//       data: {
//         name,
//         email,
//       },
//     });

//     // Optionally, retrieve all contacts
//     // const contacts = await prisma.contact.findMany();

//     return new NextResponse(JSON.stringify({ contact }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Request error", error);
//     return new NextResponse(
//       JSON.stringify({ error: "Error creating contact" }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// }

// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const contactName = searchParams.get("contactName");
//   const contactEmail = searchParams.get("contactEmail");

//   try {
//     if (!contactName || !contactEmail)
//       throw new Error("Name and Email required");
//     await sql`INSERT INTO Contacts (Name, Email) VALUES (${contactName}, ${contactEmail});`;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }

//   const contacts = await sql`SELECT * FROM Contacts;`;
//   return NextResponse.json({ pets: contacts }, { status: 200 });
// }
