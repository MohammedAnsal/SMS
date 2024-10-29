import express from 'express'
import studentManagement from '../controllers/studentController';

const controller = new studentManagement()

const router = express.Router();

router.route('/')
    .get(controller.getStudents.bind(controller))
    .post(controller.createStudent.bind(controller))
    .put(controller.editStudent.bind(controller))

    router.delete('/:id', controller.deleteStudent.bind(controller));

export default router