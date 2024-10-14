import connectMongo from '../../../../config/connectMongo';
import PostModel from '../../../../models/PostModel';
export async function GET(req, {params}) {
  try {
    await connectMongo();
    const postData = await PostModel.findOne({_id: params.id});
    return Response.json(postData);
  } catch (error) {
    console.log(error.message);
  }
}
