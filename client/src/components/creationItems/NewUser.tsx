import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  TextField,
  InputAdornment,
  Typography,
  Switch,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  Checkbox,
  ListItemText
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, SubmitHandler, FieldErrors, Controller } from "react-hook-form";
import { object, array, string,number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addOperation, editOperation, fetchCourse } from "../../api/user";
import Swal from "sweetalert2";
import { fetchClass } from "../../api/user";

const registerSchema = object({
  last_name: string().nonempty("Last name is required"),
  first_name: string().nonempty("First name is required"),
  email: string().nonempty("Email is required"),
  password: string().nonempty("Password is required"),
  role: string().nonempty("Role is required"),
});

type RegisterInput = TypeOf<typeof registerSchema>;

const fields = [
  { field: "last_name", headerName: "Last Name", type: "string", add: true, edit: true, required: true },
  { field: "first_name", headerName: "First Name", type: "string", add: true, edit: true, required: true },
  { field: "email", headerName: "Email", type: "string", add: true, edit: true, required: true },
  { field: "role", headerName: "Role", type: "select", add: true, edit: false, required: true },
  { field: "password", headerName: "Password", type: "password", add: true, edit: true, required: true },
  {
    field: "active",
    headerName: "Status",
    type: "checkbox",
  },
];

interface Class {
  id: string;
  name: string;
}

interface Course {
  id: string;
  name: string;
}

interface NewItemProps {
  open: boolean;
  handleClose: () => void;
  handleCloseUpdated: () => void;
  handleRefresh: () => void;
  item: any;
  setItem: React.Dispatch<React.SetStateAction<any>>;
}

const NewUser: React.FC<NewItemProps> = ({ open, handleClose, handleCloseUpdated, handleRefresh, item, setItem }) => {
  const [checked, setChecked] = useState(false);
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [idCourses, setIdCourses] = useState<string[]>([]);
  const [idClass, setIdClass] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataClass = await fetchClass();
        setClasses(dataClass);
        const dataCourse = await fetchCourse();
        setCourses(dataCourse);
      } catch (error) {
        console.error("Failed to fetch Trucks", error);
      }
    };
    fetchData();
  }, []);

  const addOne = async (values: RegisterInput) => {
    let nom = values.last_name;
    let newValues : any = values
    if (values.role ==="student"){
      newValues = { ...newValues, idClass, active: checked ? 0 : 1 };
    }
    else {
      newValues = { ...newValues,idCourses, active: checked ? 0 : 1 };
    }
    console.log(newValues)
    await addOperation({ ...newValues })
      .then((res: any) => {
        if (res.status === 201) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${nom} has been successfully added`,
            showConfirmButton: false,
            timer: 1500,
          });
          handleRefresh();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${nom} could not be added`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${nom} could not be added`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const editOne = async (values: any) => {
    await editOperation({ ...values }, values.id)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${values.last_name} has been successfully updated`,
            showConfirmButton: false,
            timer: 1500,
          });
          handleRefresh();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${values.last_name} could not be updated`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${values.last_name} could not be updated`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const { register, formState: { errors, isSubmitSuccessful }, reset, control, watch, handleSubmit } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values: any) => {
    if (Object.keys(errors).length === 0) {
      addOne(values);
      handleClose();
    }
  };

  const handleSubmitEdit = () => {
    editOne(item);
    handleClose();
  };

  const [refresh, setRefresh] = useState(false);
  const handleChangeUpdate = (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<any>) => {
    if ((event.target as HTMLInputElement).type === "number") {
      setItem({ ...item, [event.target.name]: Number(event.target.value) });
    } else {
      setItem({ ...item, [event.target.name]: event.target.value });
    }
    setFieldsChanged(true);
    setRefresh(!refresh);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setIdClass(event.target.value as string);
  };

  const role = watch("role");

  return (
    <Dialog open={open} onClose={fieldsChanged ? handleCloseUpdated : handleClose} maxWidth={false} sx={{ zIndex: "130" }}>
      {Object.keys(item).length === 0 ? (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
            <Box>
              <Typography sx={{ mt: 2 }} variant="h1" color={"primary.main"}>User profile</Typography>
              <Typography sx={{ pt: 2 }} variant="h3" color={"secondary"}>User profile: create a user.</Typography>
            </Box>
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 10px", marginTop: "10px", minWidth: 500 }}>
              {fields.filter((c) => c.add && c.type !== "select").map((col) => (
                <TextField
                  key={col.field}
                  fullWidth
                  label={col.headerName}
                  type={col.type}
                  {...register(col.field as keyof RegisterInput)}
                  required={col.required}
                  error={!!(errors as FieldErrors<RegisterInput>)[col.field as keyof RegisterInput]}
                  helperText={(errors as FieldErrors<RegisterInput>)[col.field as keyof RegisterInput]?.message}
                  InputProps={{
                    endAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
              ))}
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="teacher">Teacher</MenuItem>
                    </Select>
                  )}
                />
                {errors.role && <Typography color="error">{errors.role.message}</Typography>}
              </FormControl>
              {role === "student" &&
                <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  label="Class"
                  value={idClass}
                  onChange={handleSelectChange}
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              }
              {role === "teacher" && (
                <FormControl fullWidth>
                  <InputLabel>Courses</InputLabel>
                  <Select
                    label="Courses"
                    multiple
                    value={idCourses}
                    sx={{
                      maxWidth:230,
                    }}
                    onChange={(event) => {
                      const {
                        target: { value },
                      } = event;

                      // Handle both select and deselect
                      setIdCourses(typeof value === "string" ? value.split(",") : value);
                    }}
                    renderValue={(selected) =>
                      courses
                        .filter((course) => selected.includes(course.id))
                        .map((course) => course.name)
                        .join(", ")
                    }
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          overflowY: "auto",
                          maxWidth: 100,
                        },
                      },
                    }}
                  >
                    {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        <Checkbox checked={idCourses.includes(course.id)} />
                        {course.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

            </Box>

            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography>Inactive</Typography>
              <Switch
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                inputProps={{ "aria-label": "controlled" }}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit">Save</Button>
          </DialogActions>
        </Box>
      ) : (
        <Box component="form">
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
            <Box>
              <Typography sx={{ mt: 2 }} variant="h1" color={"primary.main"}>User profile</Typography>
              <Typography sx={{ pt: 2 }} variant="h3" color={"secondary"}>User profile: update a user.</Typography>
            </Box>
            <CloseIcon onClick={fieldsChanged ? handleCloseUpdated : handleClose} sx={{ cursor: "pointer" }} />
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 10px", marginTop: "10px", minWidth: 500 }}>
              {fields.filter((c) => c.edit && c.type !== "select").map((col) => (
                <TextField
                  key={col.field}
                  fullWidth
                  label={col.headerName}
                  type={col.type}
                  name={col.field}
                  value={item[col.field]}
                  onChange={(event) => handleChangeUpdate(event as React.ChangeEvent<HTMLInputElement>)}
                  required={col.required}
                  InputProps={{
                    endAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
              ))}
              {item.role === "student" &&
                <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  label="Class"
                  value={item.idClass}
                  onChange={(event) => {
                    setItem({ ...item, idClass: event.target.value });
                    setFieldsChanged(true);
                    setRefresh(!refresh);
                  }}
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              }
              {item.role === "teacher" && (
                <FormControl fullWidth>
                  <InputLabel>Courses</InputLabel>
                  <Select
                    label="Courses"
                    multiple
                    sx={{
                      maxWidth: 230
                    }}
                    value={item.idCourses}
                    onChange={(event) => {
                      setItem({ ...item, idCourses: event.target.value });
                      setFieldsChanged(true); // Indique que des champs ont été modifiés
                      setRefresh(!refresh); // Force un rafraîchissement si nécessaire
                    }}
                    renderValue={(selected) =>
                      courses
                        .filter((course) => selected.includes(course.id))
                        .map((course) => course.name)
                        .join(", ")
                    }
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300, // Contrôle la hauteur maximale du menu déroulant
                          maxWidth: 400, // Contrôle la largeur maximale du menu déroulant
                        },
                      },
                    }}
                  >
                    {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        <Checkbox checked={item.idCourses.includes(course.id)} />
                        <ListItemText primary={course.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

            </Box>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography>Inactive</Typography>
              <Switch
                checked={!item.active}
                onChange={(e) => {
                  setItem({ ...item, active: !e.target.checked });
                  setRefresh(!refresh);
                }}
                inputProps={{ "aria-label": "controlled" }}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={fieldsChanged ? handleCloseUpdated : handleClose}>Cancel</Button>
            <Button variant="contained" type="submit" onClick={handleSubmitEdit}>Update</Button>
          </DialogActions>
        </Box>
      )}
    </Dialog>
  );
};

export default NewUser;
