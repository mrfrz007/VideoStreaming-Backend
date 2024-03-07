import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    id:{
        type:String
    },
    videoFile:{
        type: String ,
        required: [true , "required"],
    },
    thumbnail:{
        type: String ,
        required: true ,
    },
    title:{
        type: String ,
        required: true,
    },
    description:{
        type: String ,
        required: true,
    },
    duration:{
        type: Number ,
        required: true,
    },
    views:{
        type: Number ,
        required: true,
        default: 0
    },
    isPublished:{
        type: Boolean ,
        default: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
} ,{timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model('Video' , videoSchema)