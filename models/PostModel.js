import {formatDate} from '@/utils/formatDate';
import {Schema, model, models} from 'mongoose';

const postSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    created_at: String,
  },
  {toJSON: {virtuals: true}}
);

postSchema.virtual('short_description').get(function () {
  return `${this.description.substr(0, 150)}...`;
});
postSchema.virtual('format_date').get(function () {
  return formatDate(this.created_at);
});

const PostModel = models.post || model('post', postSchema);
export default PostModel;
