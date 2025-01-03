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
  SelectChangeEvent
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { date, number, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addOperation, editOperation } from "../../api/salle";
import Swal from "sweetalert2";

const registerSchema = object({
  name: string().min(1,"Name is required"),
  capacity: number().min(1,"Number of seats is required"),
});

type RegisterInput = TypeOf<typeof registerSchema>;

const fields = [
  { field: "name", headerName: "Name", type: "string", add: true, edit: true, required: true },
  { field: "capacity", headerName: "Number of seats", type: "number", add: true, edit: true, required: true},
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

const NewSalle: React.FC<NewItemProps> = ({ open, handleClose, handleCloseUpdated, handleRefresh, item, setItem }) => {
  const [checked, setChecked] = useState(false);
  const [fieldsChanged, setFieldsChanged] = useState(false);
 
  const addOne = async (values: RegisterInput) => {
    let newValues = { ...values, active: checked ? 0:1 };
    console.log(newValues);

    await addOperation({...newValues})
      .then((res : any) => {
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
            title: `${values.name} could not be added`,
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
          title: `${values.name} could not be added`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const editOne = async (values: any) => {
    console.log(values);
    await editOperation({...values}, values.id)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${values.name} has been updated successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          handleRefresh();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${values.name} could not be updated`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${values.name} could not be updated`,
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
      console.log(values)
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
    console.log(event.target)
    setFieldsChanged(true);
    setRefresh(!refresh);
  };

  return (
    <Dialog open={open} onClose={fieldsChanged ? handleCloseUpdated : handleClose} maxWidth={false} sx={{zIndex:"130"}}>
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
                Room Details
              </Typography>
              <Typography sx={{ pt: 2 }} variant="h3" color={"secondary"}>
                Room Details: create a room.
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
                    {...register(col.field as keyof RegisterInput, 
                      col.type === "number" 
                        ? { setValueAs: (v) => (v === "" ? undefined : Number(v)) } 
                        : {}
                    )}
                    required={col.required}
                    error={!!(errors as FieldErrors<RegisterInput>)[col.field as keyof RegisterInput]}
                    helperText={(errors as FieldErrors<RegisterInput>)[col.field as keyof RegisterInput]?.message}
                    InputProps={{
                      endAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                  />
              ))}
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
                Room Details
              </Typography>
              <Typography sx={{ pt: 2 }} variant="h3" color={"secondary"}>
                Room Details: update a room.
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
            </Box>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography>Inactive</Typography>
              <Switch
                checked={item.active == 0}
                onChange={(e) => {
                  setItem({ ...item, active: e.target.checked ? 0: 1  });
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

export default NewSalle;
