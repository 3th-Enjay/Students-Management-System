const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents(req.query)
    res.status(200).json(students) 

});

const handleAddStudent = asyncHandler(async (req, res) => {
    const request = await addNewStudent(req.body)
    res.status(201).json(request)

});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedData = { ...req.body, id };
    const result = await updateStudent(updatedData);
    res.status(200).json(result)

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    res.status(200).json(student)

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { userId, reviewerId, status } = req.body;
    if (!userId || !reviewerId || !status) {
        res.status(400);
        throw new Error("User ID, Reviewer ID, and Status are required");
    }
    const result = await setStudentStatus({ userId, reviewerId, status });
    res.status(200).json(result);

});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
