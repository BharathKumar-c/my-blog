import connectMongo from '../../../config/connectMongo';
import PostModel from '../../../models/PostModel';

export const GET = async (req) => {
  const query = req.nextUrl.searchParams.get('q');
  console.log({query});
  try {
    await connectMongo();
    let postData;
    if (query) {
      postData = await PostModel.find({
        $or: [
          {title: new RegExp(query, 'i')},
          {description: new RegExp(query, 'i')},
        ],
      });
    } else {
      postData = await PostModel.find({});
    }
    return Response.json(postData);
  } catch (error) {
    console.log(error.message);
  }
};
