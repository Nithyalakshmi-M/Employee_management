const connectDB = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- Multer configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
});
const upload = multer({ storage });
exports.uploadImage = upload.single('image');

// --- Get All Employees ---
exports.getEmployees = async (req, res) => {
  try {
    const db = await connectDB();
    const [rows] = await db.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error", error: err });
  }
};

// --- Get Employee by ID ---
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDB();
    const [rows] = await db.query("SELECT * FROM employees WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Employee not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error", error: err });
  }
};

// --- Create Employee ---
exports.createEmployee = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.image_url = '/uploads/' + req.file.filename;

    const db = await connectDB();
    const [result] = await db.query("INSERT INTO employees SET ?", data);

    res.json({ message: 'Employee added', id: result.insertId });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ message: "Employee ID already exists!" });
    res.status(500).json({ message: "Database error", error: err });
  }
};

// --- Update Employee ---
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    delete data.created_at;
    delete data.id;
    if (req.file) data.image_url = '/uploads/' + req.file.filename;

    const db = await connectDB();
    await db.query("UPDATE employees SET ? WHERE id = ?", [data, id]);

    res.json({ message: 'Employee updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error", error: err });
  }
};

// --- Delete Employee ---
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDB();

    const [rows] = await db.query("SELECT * FROM employees WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Employee not found" });

    const employee = rows[0];

    // Delete image file
    if (employee.image_url) {
      const filePath = path.join(__dirname, '..', 'uploads', path.basename(employee.image_url));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await db.query("DELETE FROM employees WHERE id = ?", [id]);
    res.json({ message: 'Employee and image deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error", error: err });
  }
};
