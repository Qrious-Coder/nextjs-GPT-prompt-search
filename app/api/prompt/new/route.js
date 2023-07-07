import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async(req, res) => {
  const { userId, prompt, tag } = await req.json()

  try{
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt: prompt,
      tag
    })
    await newPrompt.save()
    return new Response(JSON.stringify(newPrompt), { status: 201} )
  }catch(err){
    console.error(err)
    return new Response(JSON.stringify(`server err: ${err}`), { status: 500} )
  }
}