import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  employeeName: { type: String, required: true },
  description: { type: String, required: true, maxlength: 150 },
  createdAt: { type: Date, default: Date.now },
});

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;