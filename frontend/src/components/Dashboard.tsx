import { useEffect, useState } from "react";
import { IStudent } from "../types/Istudents";
import axios from "axios";
import { toast } from "sonner";

const Dashboard = () => {

    const [students, setStudents] = useState<IStudent[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [studentName, setStudentName] = useState<string>("");
    const [studentAge, setStudentAge] = useState<number>(0);
    const [studentGender, setStudentGender] = useState("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editStudentName, setEditStudentName] = useState("");
    const [adedd, setAdedd] = useState<boolean>(false);

    useEffect(() => {

        (async () => {
        
            const { data: { data }, } = await axios.get("/student");
            
            setStudents([...data]);
            
        })();
 
        setAdedd(false)
            
    },[adedd])

    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setStudentName("");
        setStudentAge(0);
        setStudentGender("");
    };

    //  Add

    const addStudent = async () => {
      
        if (studentName.trim() && studentAge > 0 && studentGender.trim()) {

            const newStudent = {
                 
               name: studentName,
               age: studentAge,
               gender: studentGender,
               
            }

            const res = await axios.post('/student', { ...newStudent });

            if (res.data.message) {
                
                setStudents([...students, res.data]);
                toast.success("Add Student Successfully");
                closeModal();
                setAdedd(true)
            }
            
        }
        
    };

    //  Delete

    const deleteStudent = async (index: string) => {

        const res = await axios.delete(`/student/${index}`);

        if (res.data.message) {

            setAdedd(true)
            toast.success('Delete Student Successfully');
        };
    }

    const startEditing = (index: number) => {

        setEditIndex(index);
        setEditStudentName(students[index].name);

    };

    //  Edit

    const saveEdit = async (index : string) => {

        const res = await axios.put('/student', { editStudentName, index });

        if (res.data) {
            
            setEditIndex(null);
            setEditStudentName("");
            toast.success("Student Edit Successfully...");
            setAdedd(true)
        }

    };

        //  Search

    const filteredStudents = students.filter((student) => {
          
        const studentName = student.name || ""; 
        return studentName.toLowerCase().includes(searchTerm.toLowerCase());

    });

        return (
      
            <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-8">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        {/* Search Section (Top-Left) */}
                        <div className="w-full md:w-1/2">
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Search students"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Add Student Section (Top-Right) */}
                        <div className="w-full md:w-1/2 flex justify-end">
                            <button
                                onClick={openModal}
                                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Add Student
                            </button>
                        </div>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                                <h2 className="text-2xl font-semibold mb-6">Add New Student</h2>

                                {/* Name Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700">Student Name</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter student name"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                    />
                                </div>

                                {/* Age Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700">Age</label>
                                    <input
                                        type="number"
                                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter student age"
                                        value={studentAge}
                                        onChange={(e) => setStudentAge(Number(e.target.value))}
                                    />
                                </div>

                                {/* Gender Input */}
                                <div className="mb-4">
                                    <label className="block text-gray-700">Gender</label>
                                    <select
                                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={studentGender}
                                        onChange={(e) => setStudentGender(e.target.value)}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        onClick={closeModal}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={addStudent}
                                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none"
                                    >
                                        Add Student
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Registered Students Section (Centered) */}
                    <div className="p-6  bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                            Registered Students
                        </h2>

                        {/* Table for student data */}
                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th className="px-28 py-2 text-gray-600">Name</th>
                                    <th className="px-28 py-2 text-gray-600">Age</th>
                                    <th className="px-28 py-2 text-gray-600">Gender</th>
                                    <th className="px-28 py-2 text-gray-600">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="px-28 py-2">
                                                {editIndex === index ? (
                                                    <input
                                                        type="text"
                                                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                                        value={editStudentName}
                                                        onChange={(e) => setEditStudentName(e.target.value)}
                                                    />
                                                ) : (
                                                    student.name
                                                )}
                                            </td>
                                            <td className="px-28 py-2">{student.age}</td>
                                            <td className="px-28 py-2">{student.gender}</td>
                                            <td className="px-28 py-2 flex space-x-3">
                                                {editIndex === index ? (
                                                    <button
                                                        onClick={() => saveEdit(student._id)}
                                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
                                                    >
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => startEditing(index)}
                                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteStudent(student._id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center text-gray-500 py-4">
                                            No students found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        
        );
};

export default Dashboard
