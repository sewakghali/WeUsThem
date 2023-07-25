import { NextRequest, NextResponse } from "next/server";
import client from "../../../../lib/prismadb";

export async function GET(req: Request) {
	try {
		const allContacts = await client.contact.findMany();
		return NextResponse.json(allContacts);
	} catch (error) {
		return NextResponse.json({ status: 400 });
	}
}

export async function POST(req: Request) {
	let data = await req.json();
	try {
		const contact = await client.contact.create({
			data: {
				fName: data.fName,
				lName: data.lName,
				email: data.email,
				phone: data.phone,
				imageUrl: data.imageUrl
			}
		});

		return NextResponse.json(contact);
	} catch (error) {
		return NextResponse.json({ status: 400 });
	}
}

export async function PUT(req: Request) {
	let data = await req.json();

	try {
		const contact = await client.contact.update({
			where: {
				id: data.id
			},
			data: {
				fName: data.fName,
				lName: data.lName,
				email: data.email,
				phone: data.phone,
				imageUrl: data.imageUrl
			}
		});

		return NextResponse.json(contact);
	} catch (error) {
		return NextResponse.json({ status: 400 });
	}
}

export async function DELETE(req: Request) {
	let { id } = await req.json();
	try {
		const existingContact = await client.contact.delete({
			where: {
				id: id,
			}
		});
		return NextResponse.json('deleted contact successfully.');
	} catch (error) {
		return NextResponse.json({ status: 400 });
	}
}