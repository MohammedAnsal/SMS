import { Model } from "mongoose";
import Students, { StudentType } from "../models/studentModel";
import { Request, Response } from "express";

export default class studentManagement {

    private studentModel: Model<StudentType>
    
    constructor() {
        
        this.studentModel = Students

    }

    async getStudents(req : Request , res : Response) {
        
        try {

            const allData = await Students.find();

            if (allData) {

                res
                    .status(201)
                    .json({ message: "Get All Data", data: allData });

            } else {

                res.status(500).json({ message: 'There is no students' });
            }

        } catch (error: unknown) {
            
            res.status(500).json({message : 'Get Error'})
        }

    };

    async createStudent(req:Request , res : Response) {
        
        try {

            const { name, age, gender } = req.body;

            const exist = await Students.findOne({ name });

            if (!exist) {

                const stdId: number = await Students.find().countDocuments() + 100;

                const newStudent = new this.studentModel({

                    name,
                    age,
                    gender,
                    resgisterId: stdId
                    
                });

                const saveStudent = await newStudent.save();

                if (saveStudent) {

                    res.status(201).json({ message: "Student Added Success..." });
                    
                }
            }

        } catch (error : unknown) {
            
            res.status(400).json()
            
        }

    };

    async editStudent(req : Request , res : Response) {
        
        try { 
            
            const { editStudentName, index } = req.body
                
            const getStudent = await Students.findByIdAndUpdate({ _id: index }, { $set: { name : editStudentName } }, { new: true });

            if (getStudent) res.status(201).json({ message: 'Profile Edited Successfully...', student: getStudent });
            
        } catch (error: unknown) {

            res.status(500)
            
        }

    }

    async deleteStudent(req: Request, res: Response) {
        
        try {

            const id = req.params.id;

            const getDeleteStudent = await Students.findByIdAndDelete(id);

            if (getDeleteStudent) res.status(201).json({ message: 'Delete Student Success' });

        } catch (error: unknown) {
            
            res.status(500).json({ message: 'Somthing Went Wrong...' });
            
        }

    }

};