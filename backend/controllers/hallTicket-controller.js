const HallTicket = require('../models/hallTicketSchema');
const Student = require('../models/studentSchema');
const PDFDocument = require('pdfkit');

const createHallTicket = async (req, res) => {
    try {
        const { examName, schoolId, classId } = req.body;

        if (!examName || !schoolId || !classId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const hallTicket = new HallTicket({
            examName,
            school: schoolId,
            class: classId
        });
        const result = await hallTicket.save();
        res.status(201).json(result);
    } catch (error) {
        console.error('Error in createHallTicket:', error);
        res.status(500).json({ error: error.message });
    }
};

const getHallTickets = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const tickets = await HallTicket.find({ school: schoolId })
            .populate('class', 'sclassName')
            .sort({ releaseDate: -1 });
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error in getHallTickets:', error);
        res.status(500).json({ error: error.message });
    }
};

const getStudentHallTickets = async (req, res) => {
    try {
        const { studentId } = req.params;
        console.log('Fetching hall tickets for student:', studentId);

        // Get student details with class info
        const student = await Student.findById(studentId).populate('sclassName');
        if (!student) {
            console.log('Student not found:', studentId);
            return res.status(404).json({ error: 'Student not found' });
        }

        if (!student.sclassName) {
            console.log('Student has no class assigned:', studentId);
            return res.status(400).json({ error: 'No class assigned to student' });
        }

        console.log('Student class:', student.sclassName._id);

        // Get hall tickets for student's class
        const tickets = await HallTicket.find({
            class: student.sclassName._id,
            isActive: true
        }).sort({ releaseDate: -1 }); // Sort by release date, newest first

        console.log('Found tickets:', tickets);
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error in getStudentHallTickets:', error);
        res.status(500).json({ error: error.message });
    }
};

const generateHallTicketPDF = async (req, res) => {
    try {
        const { studentId, ticketId } = req.params;
        
        // Get student and ticket details
        const student = await Student.findById(studentId)
            .populate('sclassName')
            .populate('school');
        const ticket = await HallTicket.findById(ticketId);
        
        if (!student || !ticket) {
            return res.status(404).json({ error: 'Student or ticket not found' });
        }

        if (!student.sclassName || !student.school) {
            return res.status(400).json({ error: 'Student missing class or school information' });
        }

        // Create PDF
        const doc = new PDFDocument();
        
        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=hall_ticket_${student.rollNum}.pdf`);
        
        // Pipe PDF to response
        doc.pipe(res);
        
        // Add content to PDF
        doc.fontSize(20).text('HALL TICKET', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Exam: ${ticket.examName}`);
        doc.moveDown();
        doc.text(`Student Name: ${student.name}`);
        doc.text(`Roll Number: ${student.rollNum}`);
        doc.text(`Class: ${student.sclassName.sclassName}`);
        doc.text(`School: ${student.school.schoolName}`);
        doc.moveDown();
        doc.text('This hall ticket must be presented at the examination center.');
        
        // Finalize PDF
        doc.end();
    } catch (error) {
        console.error('Error in generateHallTicketPDF:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteHallTicket = async (req, res) => {
    try {
        const result = await HallTicket.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Hall ticket not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in deleteHallTicket:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createHallTicket,
    getHallTickets,
    getStudentHallTickets,
    generateHallTicketPDF,
    deleteHallTicket
}; 