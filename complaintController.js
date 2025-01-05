import Complaint from "../models/Complaint.js";
import Employee from "../models/Employee.js";

const submitComplaint = async (req, res) => {
  try {
    const { employeeId, description } = req.body;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }
    const newComplaint = new Complaint({
      employeeId,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      description
    });
    await newComplaint.save();
    return res.status(201).json({ success: true, complaint: newComplaint });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Submit complaint server error" });
  }
};
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, complaints });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Get complaints server error" });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComplaint = await Complaint.findByIdAndDelete(id);
    if (!deletedComplaint) {
      return res.status(404).json({ success: false, error: "Complaint not found" });
    }
    return res.status(200).json({ success: true, deletedComplaint });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Delete complaint server error" });
  }
};

export { submitComplaint, getComplaints, deleteComplaint };