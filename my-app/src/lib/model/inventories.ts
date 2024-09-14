import mongoose,{model, models, Schema} from "mongoose";

const invertoriesSchema = new Schema({
    sku:{
      type:String,
      required:true,
      unique:true,
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    inventory:{
      type:Number,
      required:true,
    }
},{timestamps:true})

const Inventory = models.Inventory || model("Inventory",invertoriesSchema)
export default Inventory