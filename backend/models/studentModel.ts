import mongoose, { Schema, Document } from "mongoose";

export interface StudentType extends Document {

   resgisterId: number;
   name: string;
   age: number;
   gender: string;
    
};

const studentSchema = new Schema({

    resgisterId : {type : Number},
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female'] },

});

const Students = mongoose.model<StudentType>('Student', studentSchema);

export default Students