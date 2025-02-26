import { generateScript } from "@/configs/AiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT = `write a two different script for for 30 Seconds video on topic:{topic}
Do not add Scene description
Do not add anything in Braces, just return the plain story in text
Give me response in JSON format and follow the schema
-{
scripts:[
{
content:''
},
],
}`

export async function POST(req) {
    const {topic} = await req.json();

    const PROMPT = SCRIPT_PROMPT.replace('{topic}', topic);
    const result = await generateScript.sendMessage(PROMPT);
    const resp = result?.response?.text();

    return NextResponse.json(JSON.parse(resp));
}