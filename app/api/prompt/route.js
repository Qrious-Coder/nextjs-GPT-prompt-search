import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async(req ) => {
  try{
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator')
    return new Response(JSON.stringify(prompts), { status: 200} )
  }catch(err){
    console.error(err)
    return new Response(JSON.stringify(`server err: ${err}`), { status: 500} )
  }
}