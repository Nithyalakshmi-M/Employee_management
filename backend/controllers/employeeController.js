const Employee = require('../models/employeeModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// --- Multer configuration ---
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Folder where images will be stored
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


exports.uploadImage = upload.single('image'); 


exports.getEmployees = (req, res) => {
    Employee.getAll((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};



exports.getEmployeeById = (req, res) => {
    const { id } = req.params;
    Employee.getById(id, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results[0]);
    });
};


exports.createEmployee = (req, res) => {
    const data = req.body;

    if (req.file) {
        data.image_url = '/uploads/' + req.file.filename; // Save relative path to DB
    }

    Employee.create(data, (err, results) => {
        if (err) {
           
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({ message: "Employee ID already exists!" });
            }
            return res.status(500).json(err);
        }
        res.json({ message: 'Employee added', id: results.insertId });
    });
};


exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };

  delete data.created_at;
  delete data.id; 

  
  if (req.file) {
    data.image_url = '/uploads/' + req.file.filename;
  }

  
  if (data.updated_at) {
    const d = new Date(data.updated_at);
    data.updated_at = d.toISOString().slice(0, 19).replace('T', ' ');
  }

  Employee.update(id, data, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Employee updated' });
  });
};



exports.deleteEmployee = (req, res) => {
    const { id } = req.params;

    
    Employee.getById(id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (!results[0]) return res.status(404).json({ message: 'Employee not found' });

        const employee = results[0];

        
        if (employee.image_url) {
            
            const filePath = path.join(__dirname, '..', employee.image_url.replace(/^\/+/, ''));
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        
        Employee.delete(id, (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Employee and image deleted successfully' });
        });
    });
};
