import mongoose, { Schema } from "mongoose"

const WorksSchema = new Schema(
  {
    title: String,
    description: String,
    users: [  {
      name: String,
      email: String
    }] ,
    image : String,
    email:String,

  },
  {
    timestamps: true,
  }
)

const WorkSpace =
 mongoose.models.Works

  ||
   mongoose.model("Works", WorksSchema)


export default WorkSpace