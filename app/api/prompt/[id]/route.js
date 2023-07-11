import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET
export const GET = async(req, { params }) => {
  try{
    await connectToDB();
    const prompt =  await Prompt.findById(params.id).populate('creator')
    if(!prompt) return new Response("Prompt not found", { status: 404 })
    return new Response(JSON.stringify(prompt), { status: 201} )
  }catch(err){
    console.error(err)
    return new Response(JSON.stringify(`server err: ${err}`), { status: 500} )
  }
}
// PATCH (update)
export const PATCH = async(req, { params }) => {
  const { prompt, tag } = await request.json()
  try{
    await connectToDB()
    const existingPrompt = await Prompt.findById(params.id)
    if(!existingPrompt) return new Response(JSON.stringify("Prompt not found"), { status: 404})

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save()
    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  }catch(err){
    return new Response("Failed to update prompt",{ status: 500})
  }
}
// DELETE (delete)
export const DELETE = async(req, { params }) => {
  try{
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id)
    return new Response(JSON.stringify("Prompt deleted successfully!"), { status: 200 })
  }catch(err){
    console.error(err)
    return new Response(JSON.stringify(`server err: ${err}`), { status: 500} )
  }
}