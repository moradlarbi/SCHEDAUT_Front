import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box/Box";
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
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { object, string, TypeOf, number } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addOperation, editOperation, fetchCourses, fetchTeachers } from "../../api/class";
import Swal from "sweetalert2";
import { Delete } from "@mui/icons-material";

const registerSchema = object({
  name: string().min(1, "The name is required"),
  nb_stud: number().min(1, "The number of students is required"),
});

type RegisterInput = TypeOf<typeof registerSchema>;

const fields = [
  { field: "name", headerName: "Name", type: "string", add: true, edit: true, required: true },
  { field: "nb_stud", headerName: "Number of students", type: "number", add: true, edit: true, required: true },
  {
    field: "active",
    headerName: "Status",
    type: "checkbox",
  },
];

interface NewItemProps {
  open: boolean;
  handleClose: () => void;
  handleCloseUpdated: () => void;
  handleRefresh: () => void;
  item: any;
  setItem: React.Dispatch<React.SetStateAction<any>>;
}
interface Teacher {
  id: string;
  first_name: string;
  last_name: string;
  idCourses: string[];
}

interface Course {
  id: string;
  name: string;
}


const NewClass: React.FC<NewItemProps> = ({ open, handleClose, handleCloseUpdated, handleRefresh, item, setItem }) => {
  const [checked, setChecked] = useState(false);
  const [fieldsChanged, setFieldsChanged] = useState(false);
   const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courseTeachers, setCourseTeachers] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  useEffect(() => {
      const fetchData = async () => {
        try {
          const dataTeachers = await fetchTeachers();
          setTeachers(dataTeachers);
          const dataCourse = await fetchCourses();
          setCourses(dataCourse);
          console.log(dataTeachers, dataCourse)
        } catch (error) {
          console.error("Failed to fetch data", error);
        }
      };
      fetchData();
    }, []);

  const addOne = async (values: RegisterInput) => {
    let newValues = { ...values,courseTeachers, active: checked ? 0 : 1 };
    console.log(newValues);

    await addOperation({ ...newValues })
      .then((res: any) => {
        console.log(res);
        if (res.status === 201) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${values.name} has been added successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          handleRefresh();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${values.name} was not added`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${values.name} was not added`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const editOne = async (values: any) => {
    console.log(values);
    await editOperation({ ...values }, values.id)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${values.name} has been successfully updated`,
            showConfirmButton: false,
            timer: 1500,
          });
          handleRefresh();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${values.name} was not updated`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${values.name} was not updated`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<RegisterInput>({
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
      console.log(values);
      handleClose();
    }
  };

  const handleSubmitEdit = () => {
    console.log(item);
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
    console.log(event.target);
    setFieldsChanged(true);
    setRefresh(!refresh);
  };

  return (
    <Dialog open={open} onClose={fieldsChanged ? handleCloseUpdated : handleClose} maxWidth={false} sx={{ zIndex: "130" }}>
      {Object.keys(item).length === 0 ? (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
            id="alert-dialog-title"
          >
            <Box>
              <Typography sx={{ mt: 2 }} variant="h1" color={"primary.main"}>
                Class Form
              </Typography>
              <Typography sx={{ pt: 2 }} variant="h3" color={"secondary"}>
                Class Form: Create a new class.
              </Typography>
            </Box>
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 10px", marginTop: "10px", minWidth: 500 }}
            >
              {fields.filter((c) => c.add).map((col) => (
                <TextField
                  key={col.field}
                  fullWidth
                  label={col.headerName}
                  type={col.type}
                  {...register(col.field as keyof RegisterInput, col.type === "number"
                    ? { setValueAs: (v) => (v === "" ? undefined : Number(v)) }
                    : {})}
                  required={col.required}
                  error={!!(errors as FieldErrors<RegisterInput>)[col.field as keyof RegisterInput]}
                  helperText={(errors as FieldErrors<RegisterInput>)[col.field as keyof RegisterInput]?.message}
                  InputProps={{
                    endAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
              ))}
                <FormControl fullWidth style={{ marginBottom: '16px' }}>
                  <InputLabel>Course</InputLabel>
                  <Select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    {courses.filter((course) => !courseTeachers.some((item) => item.idCourse === course.id)).map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth style={{ marginBottom: '16px' }}>
                  <InputLabel>Teacher</InputLabel>
                  <Select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                  >
                    {teachers
                      .filter((teacher) => teacher.idCourses.includes(selectedCourse))
                      .map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                          {teacher.first_name} {teacher.last_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

              <div>  
                <List>
                  {courseTeachers.map((item, index) => (
                    <ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        Course: {courses.find((c) => c.id === item.idCourse)?.name} | Teacher:{" "}
                        {teachers.find((t) => t.id === item.idTeacher)?.first_name}{" "}
                        {teachers.find((t) => t.id === item.idTeacher)?.last_name}
                      </div>
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          const updatedList = courseTeachers.filter((_, i) => i !== index);
                          setCourseTeachers(updatedList);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </div>

            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (selectedCourse && selectedTeacher) {
                  setCourseTeachers([
                    ...courseTeachers,
                    { idCourse: selectedCourse, idTeacher: selectedTeacher },
                  ]);
                  setSelectedCourse('');
                  setSelectedTeacher('');
                }
              }}
            >
              Add course
            </Button>
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
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </Box>
      ) : (
        <Box component="form">
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
            id="alert-dialog-title"
          >
            <Box>
              <Typography sx={{ mt: 2 }} variant="h1" color={"primary.main"}>
                Class Form
              </Typography>
              <Typography sx={{ pt: 2 }} variant="h3" color={"secondary"}>
                Class Form: Update a class.
              </Typography>
            </Box>
            <CloseIcon onClick={fieldsChanged ? handleCloseUpdated : handleClose} sx={{ cursor: "pointer" }} />
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 10px", marginTop: "10px", minWidth: 500 }}
            >
              {fields.filter((c) => c.edit).map((col) => (
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
              <FormControl fullWidth style={{ marginBottom: '16px' }}>
                  <InputLabel>Course</InputLabel>
                  <Select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    {courses.filter((course) => !item?.courseTeachers?.some((i : any) => i.idCourse === course.id)).map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth style={{ marginBottom: '16px' }}>
                  <InputLabel>Teacher</InputLabel>
                  <Select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                  >
                    {teachers
                      .filter((teacher) => teacher.idCourses.includes(selectedCourse))
                      .map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                          {teacher.first_name} {teacher.last_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

              <div>  
                <List>
                  {item?.courseTeachers.map((i : any, index : number) => (
                    <ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        Course: {courses.find((c) => c.id === i.idCourse)?.name} | Teacher:{" "}
                        {teachers.find((t) => t.id === i.idTeacher)?.first_name}{" "}
                        {teachers.find((t) => t.id === i.idTeacher)?.last_name}
                      </div>
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          const updatedList = item?.courseTeachers.filter((_ : any, i : any) => i !== index);
                          setItem({ ...item, courseTeachers : updatedList});
                          setFieldsChanged(true);
                          setRefresh(!refresh);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (selectedCourse && selectedTeacher) {
                  setItem({ ...item, courseTeachers : [
                    ...item.courseTeachers,
                    { idCourse: selectedCourse, idTeacher: selectedTeacher },
                  ]});
                  setFieldsChanged(true);
                  setSelectedCourse('');
                  setSelectedTeacher('');
                  
                }
              }}
            >
              Add course
            </Button>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography>Inactive</Typography>
              <Switch
                checked={item.active == 0}
                onChange={(e) => {
                  setItem({ ...item, active: e
                    .target.checked ? 0 : 1 });
                    setRefresh(!refresh);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={fieldsChanged ? handleCloseUpdated : handleClose}>Cancel</Button>
              <Button variant="contained" type="submit" onClick={handleSubmitEdit}>
                Update
              </Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    );
  };
  
  export default NewClass;
  