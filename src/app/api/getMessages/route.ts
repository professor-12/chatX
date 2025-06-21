import { getMessages } from "@/lib/_server/api";
import { NextRequest, NextResponse } from "next/server";

async function getMessage(req: NextRequest) {
    try {
        const { id, isGroup } = await req.json();
        const data = await getMessages(id, isGroup);
        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { message: "An error occured" + err.message },
            { status: 400 }
        );
    }
}

export { getMessage as POST };
