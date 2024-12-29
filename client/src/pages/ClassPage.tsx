import { SetStateAction, useEffect, useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { Add, Delete, Print, MoreVert } from '@mui/icons-material';
import CustomDataGrid from '../components/CustomDatagrid';
import { Columns } from '../types';
import { useTheme } from "@mui/material/styles";
import { GridCellParams } from '@mui/x-data-grid';
import { editOperation, editStatus } from '../api/class';
import Swal from 'sweetalert2';
import { Border } from '../components/Border';
import NewClass from '../components/creationItems/NewClass';

const ClassPage = () => {
    const [refresh, setRefresh] = useState(false);
    const theme = useTheme();
    const [selectedRows, setSelectedRows] = useState<number[]>();
    const [selectedRow, setSelectedRow] = useState(null);
    const options = [{ active: 0, label: "Blocked" }, { active: 1, label: "Active" }];
    const [item, setItem] = useState({});
    const printAction = async () => {
        // Implement your print logic here
    };

    const columns: Columns[] = [
        { field: "id", headerName: "Ref", type: "string", width: 100 },
        { field: "name", headerName: "Name", type: "string", add: true, edit: true, required: true },
        { field: "nb_stud", headerName: "Number of Students", type: "number", add: true, edit: true, required: true },
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
                                params.row.active === 1
                                    ? theme?.palette.primary.main
                                    : theme?.palette.error.main,
                            color: "#fff",
                            borderRadius: "32px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {params.row.active === 1 ? "Active" : "Blocked"}
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
                                    .filter((o) => o.active !== params.row.active)
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
                if (res.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${values.first_name} has been successfully updated`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setRefresh(!refresh);
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${values.first_name} could not be updated`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${values.first_name} could not be updated`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    let open = Boolean(anchorEl);

    return (
        <>
            {openDialog && (
                <NewClass
                    handleClose={() => setOpenDialog(false)}
                    handleCloseUpdated={() => {
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
                                setRefresh(!refresh);
                            }
                        });
                    }}
                    handleRefresh={() => setRefresh(!refresh)}
                    open={openDialog}
                    item={item}
                    setItem={setItem}
                />
            )}
            <Box>
                <Border
                    title="Classes"
                    subtitle="View, edit, or manage your classes."
                    actions={[
                        {
                            label: `Deactivate (${selectedRows?.length ? selectedRows?.length : 0})`,
                            icon: <Delete />,
                            action: () => {
                                selectedRows?.map(async (id) => {
                                    await editStatus({ active: false }, id)
                                        .then((res: any) => {
                                            if (res.status === 200) {
                                                Swal.fire({
                                                    position: "center",
                                                    icon: "success",
                                                    title: `${res.data.name ?? "Class"} has been successfully deactivated`,
                                                    showConfirmButton: false,
                                                    timer: 1500,
                                                });
                                                setRefresh(!refresh);
                                            } else {
                                                Swal.fire({
                                                    position: "center",
                                                    icon: "error",
                                                    title: `${res.data.name ?? "Class"} could not be deactivated`,
                                                    showConfirmButton: false,
                                                    timer: 1500,
                                                });
                                            }
                                        })
                                        .catch(() => {
                                            Swal.fire({
                                                position: "center",
                                                icon: "error",
                                                title: "Class could not be deactivated",
                                                showConfirmButton: false,
                                                timer: 1500,
                                            });
                                        });
                                });
                            },
                            ButtonProps: {
                                variant: "outlined",
                                color: "error",
                            },
                        },
                        {
                            label: "Print",
                            icon: <Print />,
                            action: printAction,
                            ButtonProps: {
                                variant: "outlined",
                                color: "inherit",
                            },
                        },
                        {
                            label: "Add a Class",
                            icon: <Add />,
                            action: () => {
                                setItem({});
                                setOpenDialog(!openDialog);
                            },
                            ButtonProps: {
                                variant: "contained",
                                color: "primary",
                            },
                        },
                    ]}
                />
                <Box sx={{ height: 450 }}>
                    <CustomDataGrid
                        selectionModel={selectedRows}
                        onRowSelectionModelChange={(newRowSelectionModel: SetStateAction<number[] | undefined>) => {
                            setSelectedRows(newRowSelectionModel);
                        }}
                        onCellDoubleClick={(params: GridCellParams) => {
                            setItem(params.row);
                            setOpenDialog(true);
                        }}
                        checkboxSelection
                        refreshParent={refresh}
                        fetchurl={`/class`}
                        columns={columns}
                        sx={{
                            fontSize: 12,
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default ClassPage;
