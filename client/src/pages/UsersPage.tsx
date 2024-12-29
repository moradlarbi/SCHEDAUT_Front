import { SetStateAction, useEffect, useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { Add, Delete, Print, MoreVert } from '@mui/icons-material';
import CustomDataGrid from '../components/CustomDatagrid';
import { Columns } from '../types';
import { useTheme } from "@mui/material/styles";
import { GridCellParams } from '@mui/x-data-grid';
import { editOperation, editStatus } from '../api/user';
import Swal from 'sweetalert2';
import { Border } from '../components/Border';
import NewUser from '../components/creationItems/NewUser';
import moment from 'moment';

const UsersPage = () => {
    const [refresh, setrefresh] = useState(false);
    const theme = useTheme();
    const [selectedRows, setSelectedRows] = useState<number[]>();
    const [selectedRow, setSelectedRow] = useState(null);
    const options = [{ active: 0, label: "Blocked" }, { active: 1, label: "Active" }];
    const [item, setItem] = useState({});

    const Printaction = async () => {
        //   const pdfBlob = await pdf(<PrintModule rows={pdfinfo.rows} columns={columns} topbanner={{
        //     title: "Buyers"
        //   }} />).toBlob();
        //   window.open(URL.createObjectURL(pdfBlob));
    }

    const columns: Columns[] = [
        { field: "id", headerName: "Ref", type: "string", width: 100 },
        { field: "last_name", headerName: "Last Name", type: "string", flex: 1, add: true, edit: true, },
        { field: "first_name", headerName: "First Name", type: "string", flex: 1, add: true, edit: true, },
        { field: "numPermis", headerName: "License Number", type: "string", flex: 1, add: true, edit: true, },
        { field: "role", headerName: "Role", type: "string", add: true, edit: true, required: true },
        { field: "password", headerName: "Password", type: "password", add: true, edit: true, required: true },
        { field: "idClasses", headerName: "Class", type: "string", flex: 1, add: true, edit: true, required: false },
        { field: "idCourses", headerName: "Courses", type: "string", flex: 1, add: true, edit: true, required: false },
        {
            field: "active",
            headerName: "Status",
            type: "string",
            editable: false,
            width: 100,
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            background:
                                params.row.active == 1 ? theme?.palette.primary.main : theme?.palette.error.main,
                            color: "#fff",
                            borderRadius: "32px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {params.row.active == 1 ? "Active" : "Blocked"}
                    </Box>
                );
            },
        },
        {
            type: "actions",
            editable: false,
            renderCell: (params: GridCellParams) => {
                return (
                    <>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={(event) => {
                                setSelectedRow(params.row.id);
                                setAnchorEl(event.currentTarget);
                            }}
                        >
                            <MoreVert />
                        </IconButton>
                        {open && selectedRow === params.row.id && (
                            <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={() => {
                                    setAnchorEl(null);
                                }}
                            >
                                {options
                                    .filter(
                                        (o) => o.active !== params.row.active
                                    )
                                    .map((option) => (
                                        <MenuItem
                                            key={option.label}
                                            onClick={() => {
                                                handleChangeState(params.row);
                                                setAnchorEl(null);
                                            }}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                            </Menu>
                        )}
                    </>
                );
            },
        },
    ];

    const handleChangeState = async (values: any) => {
        await editOperation({ ...values, active: !values.active }, values.id)
            .then((res: any) => {
                console.log(res)
                if (res.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${values.first_name} has been successfully updated`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setrefresh(!refresh)
                }
                else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${values.first_name} was not updated`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((e: any) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${values.first_name} was not updated`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
    }

    const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    let open = Boolean(anchorEl);

    return (
        <>
            {openDialog && <NewUser handleClose={() => setOpenDialog(false)} handleCloseUpdated={() => {
                Swal.fire({
                    icon: "warning",
                    title: "Are you sure?",
                    text: "Your changes will not be saved!",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, discard changes!",
                    customClass: {
                        popup: 'swal-popup',
                    }
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        setOpenDialog(false);
                        setrefresh(!refresh);
                    }
                });
            }} handleRefresh={() => setrefresh(!refresh)} open={openDialog} item={item} setItem={setItem} />}
            <Box>
                <Border
                    title="Users"
                    subtitle="View, edit or manage your users."
                    actions={[
                        {
                            label: `Deactivate (${selectedRows?.length ? selectedRows?.length : 0})`,
                            icon: <Delete />,
                            action: () => {
                                selectedRows?.map(async (id) => {
                                    await editStatus({ active: false }, id)
                                        .then((res: any) => {
                                            console.log(res)
                                            if (res.status === 200) {
                                                Swal.fire({
                                                    position: "center",
                                                    icon: "success",
                                                    title: `${res.data.last_name ?? "User"} has been successfully deactivated`,
                                                    showConfirmButton: false,
                                                    timer: 1500,
                                                });
                                                setrefresh(!refresh)
                                            }
                                            else {
                                                Swal.fire({
                                                    position: "center",
                                                    icon: "error",
                                                    title: `${res.data.last_name ?? "User"} was not deactivated`,
                                                    showConfirmButton: false,
                                                    timer: 1500,
                                                });
                                            }
                                        })
                                        .catch((e: any) => {
                                            console.log(e)
                                            Swal.fire({
                                                position: "center",
                                                icon: "error",
                                                title: `User was not deactivated`,
                                                showConfirmButton: false,
                                                timer: 1500,
                                            });
                                        })
                                })
                            },
                            ButtonProps: {
                                variant: "outlined",
                                color: "error",
                            },
                        },
                        {
                            label: "Print",
                            icon: <Print />,
                            action: Printaction,
                            ButtonProps: {
                                variant: "outlined",
                                color: "inherit",
                            },
                        },
                        {
                            label: "Add a new user",
                            icon: <Add />,
                            action: () => {
                                setItem({})
                                setOpenDialog(!openDialog)
                            },
                            ButtonProps: {
                                variant: "contained",
                                color: "primary",
                            },
                        }
                    ]}
                />
                <Box sx={{ height: 450 }}>
                    <CustomDataGrid
                        selectionModel={selectedRows}
                        onRowSelectionModelChange={(newRowSelectionModel: SetStateAction<number[] | undefined>) => {
                            setSelectedRows(newRowSelectionModel);
                        }}
                        onCellDoubleClick={(params: GridCellParams) => {
                            console.log(params.row)
                            setItem(params.row)
                            setOpenDialog(true)
                        }}
                        checkboxSelection
                        refreshParent={refresh}
                        fetchurl={`/users`}
                        columns={columns}
                        sx={{
                            fontSize: 12,
                        }}
                    />
                </Box>
            </Box>
        </>
    )
}

export default UsersPage;
