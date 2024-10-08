import { GridRenderCellParams } from '@mui/x-data-grid'


export type Columns = {
    field?: string
    headerName?: string
    type:
      | 'boolean'
      | 'string'
      | 'date'
      | 'number'
      | 'password'
      | 'actions'
      | 'singleSelect' | 'color'
    add?: boolean
    edit?: boolean
    hide?: boolean
    editable?: boolean
    filterable?: boolean
    sortable?: boolean
    renderCell?: (params: GridRenderCellParams) => JSX.Element
    TextFieledProps?: any
    width?: string | number
    filterField?: string
    [key: string]: any
  }
  
  export type Info = {
    title?: string
    description?: string
    addText?: string
    addIcon?: JSX.Element
    editIcon?: JSX.Element
    deleteIcon?: JSX.Element
    DialogTitle?: string
    DialogUpdate?: string
    DialogDescription?: string
    DialogUpdateDescription?: string
  }
  
  export type IProps = {
    columns: Columns[]
    info: Info
    add: boolean
    edit: boolean
    deleteRow: boolean
    fetchurl: string
    refresh: boolean
    addFunction: (data: any) => void
    editFunction: (data: any) => void
    deleteFunction: (data: number) => void
    openUpdate?: boolean
    setOpenUpdate: any
    item: any
    setItem: any
    refreshParent: boolean
    [key: string]: any
  }
  
  export type BACKENDINFO = {
    page: number
    pageSize: number
    total: number
    filter: string[] | number[]
    sort: {
      field: string
      sort: string
    }
    rows: any[]
    refresh: boolean
  }
  export type BorderActions = {
    label: string
    action: any
    icon: JSX.Element
    ButtonProps?: {
      [key: string]: any
    }
  }