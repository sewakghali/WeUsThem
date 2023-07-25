import { NextResponse } from 'next/server';
import client from '../../../../lib/prismadb';

export async function GET(req: Request) {
   try {
      const url = new URL(req.url);
      const searchParams = new URLSearchParams(url.search);
      const params = searchParams.get("params");

      const searchContacts = await client.contact.findMany({
         where:
         {
            OR: [
               {
                  fName: {
                     contains: params,
                     mode: 'insensitive'
                  }
               },
               {
                  lName: {
                     contains: params,
                     mode: 'insensitive'
                  }
               },
               {
                  email: {
                     contains: params,
                     mode: 'insensitive'
                  }
               },
               {
                  phone: {
                     contains: params,
                     mode: 'insensitive'
                  }
               },

            ]
         }
      });
      return NextResponse.json(searchContacts);
   } catch (error) {
      return NextResponse.json({ status: 400 });
   }
}