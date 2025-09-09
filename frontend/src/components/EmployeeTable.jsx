import React, { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../Navbar/Navbar";
import api from "../services/api"; 

const Example = () => {
  const [viewingRow, setViewingRow] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [duplicateError, setDuplicateError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_id: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "image_url",
        header: "Profile",
        Cell: ({ cell }) => (
          <img
            src={
              cell.getValue()
                ? `${api.defaults.baseURL}${cell.getValue()}`
                : "https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp"
            }
            alt="profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ),
      },
      { accessorKey: "employee_name", header: "Employee Name" },
      { accessorKey: "employee_id", header: "Employee ID", size: 120 },
      { accessorKey: "department", header: "Department" },
      { accessorKey: "designation", header: "Designation" },
      { accessorKey: "project", header: "Project" },
      { accessorKey: "type", header: "Type" },
      { accessorKey: "status", header: "Status" },
    ],
    []
  );

  const { data: fetchedUsers = [], isError, isFetching, isLoading } =
    useGetUsers();
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { mutateAsync: deleteUser } = useDeleteUser();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else setPreviewUrl(null);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFormData({
      employee_name: "",
      employee_id: "",
      department: "",
      designation: "",
      project: "",
      type: "",
      status: "",
    });
  };

  
  const handleSubmitCreate = async () => {
    const data = new FormData();
    if (selectedFile) data.append("image", selectedFile);
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      await createUser(data);
      setOpenCreate(false);
      resetForm();
      setDuplicateError("");
    } catch (err) {
      if (err.message?.includes("Employee ID already exists")) {
        setDuplicateError("Employee ID already exists!");
      } else {
        setDuplicateError("Something went wrong!");
      }
    }
  };

  
  const handleSubmitEdit = async () => {
    const data = new FormData();
    if (selectedFile) data.append("image", selectedFile);
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      await updateUser({ id: editingRow.id, body: data });
      setEditingRow(null);
      resetForm();
      setDuplicateError("");
    } catch (err) {
      if (err.message?.includes("Employee ID already exists")) {
        setDuplicateError("Employee ID already exists!");
      } else {
        setDuplicateError("Something went wrong!");
      }
    }
  };

  
  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    enableRowActions: true,
    rowActionsColumn: { position: "last", size: 100 },

    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <Tooltip title="View">
          <IconButton
            onClick={() => {
              setViewingRow(row);
              setPreviewUrl(
                row.original.image_url
                  ? `${api.defaults.baseURL}${row.original.image_url}`
                  : null
              );
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setEditingRow(row.original);
              setFormData({ ...row.original });
              setPreviewUrl(
                row.original.image_url
                  ? `${api.defaults.baseURL}${row.original.image_url}`
                  : null
              );
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => setDeleteRow(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    renderTopToolbarCustomActions: () => (
      <Button variant="contained" onClick={() => setOpenCreate(true)}>
        Create New Employee
      </Button>
    ),

    state: {
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />

    
      {viewingRow && (
        <Dialog
          open={Boolean(viewingRow)}
          onClose={() => setViewingRow(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>View Employee</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {previewUrl && (
              <img
                src={previewUrl}
                alt="profile"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
            {[
              "employee_name",
              "employee_id",
              "department",
              "designation",
              "project",
            ].map((field) => (
              <TextField
                key={field}
                label={field.replace("_", " ")}
                name={field}
                value={viewingRow.original[field]}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            ))}
            <TextField
              label="Type"
              name="type"
              value={viewingRow.original.type}
              fullWidth
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Status"
              name="status"
              value={viewingRow.original.status}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewingRow(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

     
      <Dialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="preview"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
          {[
            "employee_name",
            "employee_id",
            "department",
            "designation",
            "project",
          ].map((field) => (
            <TextField
              key={field}
              label={field.replace("_", " ")}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
            />
          ))}
          <TextField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitCreate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      
      {editingRow && (
        <Dialog
          open={Boolean(editingRow)}
          onClose={() => setEditingRow(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="preview"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
            {[
              "employee_name",
              "employee_id",
              "department",
              "designation",
              "project",
            ].map((field) => (
              <TextField
                key={field}
                label={field.replace("_", " ")}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                fullWidth
              />
            ))}
            <TextField
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingRow(null)}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmitEdit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      
      {deleteRow && (
        <Dialog
          open={Boolean(deleteRow)}
          onClose={() => setDeleteRow(null)}
          maxWidth="xs"
          fullWidth
        >
          <DialogContent sx={{ textAlign: "center", py: 4 }}>
            <DeleteIcon sx={{ fontSize: 50, color: "primary.main" }} />
            <Box mt={2} mb={2}>
              <strong>Are you sure you want to Delete?</strong>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setDeleteRow(null)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                deleteUser(deleteRow.original.id);
                setDeleteRow(null);
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}

     
      <Dialog open={!!duplicateError} onClose={() => setDuplicateError("")}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>{duplicateError}</DialogContent>
        <DialogActions>
          <Button onClick={() => setDuplicateError("")}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const res = await api.post("/employees", formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/employees");
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
}

function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }) => {
      const res = await api.put(`/employees/${id}`, body);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      await api.delete(`/employees/${userId}`);
      return userId;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Box
          sx={{
            p: 5,
            ml: { sm: "260px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "200%",
              maxWidth: "1200px",
              bgcolor: "background.paper",
              p: 2,
              borderRadius: 2,
            }}
          >
            <Example />
          </Box>
        </Box>
      </QueryClientProvider>
    </>
  );
}
