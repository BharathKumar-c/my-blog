import connectMongo from '@/config/connectMongo';
import EnquiryModel from '@/models/EnquiryModel';
export async function POST(req) {
  const {name, email, message} = await req.json();
  const newEnquiry = {name, email, message};
  try {
    await connectMongo();
    await EnquiryModel.create(newEnquiry);
    return Response.json({message: 'Enquiry has been sent'});
  } catch (error) {
    return Response.json({message: error._message});
  }
}
