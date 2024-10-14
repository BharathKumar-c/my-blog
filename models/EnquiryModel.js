import {Schema, models, model} from 'mongoose';

const enquirySechma = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const EnquiryModel = models.enquiry || model('enquiry', enquirySechma);
export default EnquiryModel;
