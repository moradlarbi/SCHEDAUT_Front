import {
    Breadcrumbs,
    Button,
    Chip,
    FormControl,
    InputLabel,
    Menu,
    MenuItem,
    MenuProps,
    Select,
    Typography,
    alpha,
    styled,
    TextField,
    InputAdornment,
    Paper,
  } from '@mui/material'
  import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
  import { Box, Stack, useTheme } from '@mui/system'
  import { Link, useLocation } from 'react-router-dom'
  import NavigateNextIcon from '@mui/icons-material/NavigateNext'
  import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
  import SettingsIcon from '@mui/icons-material/Settings'
  import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
  import React, { useState } from 'react'
  import { BorderActions } from '../types'
  import Fade from '@mui/material/Fade'
  import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
  import moment from 'moment'
  
  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 220,
  
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '8px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 24,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(3),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.secondary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }))
  export const Beadcrumb = () => {
    const theme = useTheme()
    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
      event.preventDefault()
      console.info('You clicked a breadcrumb.')
    }
  
    return (
      <Stack
        flexDirection={'row'}
        alignItems="center"
        sx={{ color: theme.palette.secondary.main }}
      >
        <Link
          style={{
            textDecoration: 'none',
  
            color: theme.palette.secondary.main,
          }}
          to="/"
        >
          MUI
        </Link>
        <NavigateNextIcon />
        <Link
          style={{
            textDecoration: 'none',
            color: theme.palette.secondary.main,
          }}
          to="/"
        >
          Core
        </Link>
        <NavigateNextIcon />
        <Typography variant="h3" color="primary">
          Breadcrumb
        </Typography>
        ,
      </Stack>
    )
  }
  export const Border = ({
    title,
    subtitle,
    titleProps,
    subtitleProps,
    actions,
    menuActions,
    beforeTitle,
    dateProps,
  }: {
    title?: string
    subtitle?: string
    titleProps?: any
    subtitleProps?: any
    actions?: BorderActions[]
    menuActions?: BorderActions[]
    beforeTitle?: any
    dateProps?: any
  }) => {
    const theme = useTheme()
    let location = useLocation()
    const [anchorEl, setAnchorEl] = useState<any>(null)
    const [open, setOpen] = useState<null | HTMLElement>(null)
  
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setOpen(event.currentTarget)
    }
    const handleClose = () => {
      setOpen(null)
    }
    const paths = location.pathname
      .split('/')
      .filter((e) => e !== '')
      .map((e, i, arr) => ({
        label: e,
        path: arr.slice(0, i + 1).join('/'),
      }))
    return (
      <Box>
        <Stack gap={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {paths && (
              <Stack
                flexDirection={'row'}
                alignItems="center"
                sx={{ color: theme.palette.secondary.main }}
              >
                <Link
                  style={{
                    textDecoration: 'none',
                    color: theme.palette.secondary.main,
                  }}
                  to="/"
                >
                  <HomeOutlinedIcon />
                </Link>
                <NavigateNextIcon />
                {paths.map((e, i) => (
                  <React.Fragment key={e.path + i}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
                      {i !== paths.length - 1 ? (
                        <Link
                          style={{
                            textDecoration: 'none',
                            color:
                              i % 2 === 0
                                ? theme.palette.secondary.main
                                : theme.palette.primary.main,
                            display: 'flex',
                            alignItems: 'center',
                            textTransform: 'uppercase',
                            pointerEvents: i % 2 === 0 ? 'none' : 'auto',
                            cursor: i % 2 === 0 ? 'default' : 'pointer',
                            opacity: i % 2 === 0 ? 0.8 : 1,
                            fontWeight: i % 2 === 0 ? 400 : 600,
                          }}
                          to={'/' + e.path}
                        >
                          {e.label}
                        </Link>
                      ) : (
                        <Box
                          style={{
                            textDecoration: 'none',
                            color: theme.palette.primary.main,
                            display: 'flex',
                            alignItems: 'center',
                            textTransform: 'uppercase',
                          }}
                        >
                          {e.label}
                        </Box>
                      )}
                    </Box>
                    {i !== paths.length - 1 && <NavigateNextIcon />}
                  </React.Fragment>
                ))}
                ,
              </Stack>
            )}
          </Breadcrumbs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {title && (
              <Typography variant="h1" color="primary" {...titleProps}>
                {title}
              </Typography>
            )}
            {beforeTitle && beforeTitle}
          </Box>
          <Box sx={{ display: 'flex' }}>
            {subtitle && (
              <Typography variant="h3" color="secondary" {...subtitleProps}>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Stack>
  
        <Stack
          flexDirection="row"
          sx={{
            justifyContent:
              dateProps !== null && dateProps !== undefined
                ? 'space-between'
                : 'flex-end', //
          }}
          alignItems="center"
          my={6}
        >
          {dateProps !== null && dateProps !== undefined && (
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <TextField
                fullWidth
                label="Période"
                placeholder="Période"
                type="string"
                onClick={() => {
                  dateProps.setShowRange(true)
                }}
                value={`${moment(dateProps.periode[0].startDate).format(
                  'DD/MM/YYYY'
                )}  → ${moment(dateProps.periode[0].endDate).format(
                  'DD/MM/YYYY'
                )}`}
                InputProps={{
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    </>
                  ),
                }}
              />
  
              <Button
                startIcon={<RestartAltOutlinedIcon />}
                sx={{ paddingX: 5, paddingY: 1 }}
                variant="contained"
                onClick={() => {
                  dateProps.refresh()
                  dateProps.setPeriode([
                    {
                      startDate: dateProps.range.startDate,
                      endDate: dateProps.range.endDate,
                      key: 'selection',
                    },
                  ])
                }}
              >
                réinitialiser
              </Button>
            </Box>
          )}
          <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            {actions && (
              <Stack flexDirection="row" gap={2} alignItems="center">
                {actions.map((e, i) => {
                  if (e.label === 'Imprimer')
                    return (
                      <div key={`${e.label}-${i}`}>
                        <Button
                          id="fade-button"
                          aria-controls={open ? 'fade-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                          {...e.ButtonProps}
                          startIcon={e.icon || null}
                          endIcon={<KeyboardArrowDownIcon />}
                        >
                          Imprimer
                        </Button>
                        <Menu
                          id="fade-menu"
                          MenuListProps={{
                            'aria-labelledby': 'fade-button',
                          }}
                          anchorEl={open}
                          open={Boolean(open)}
                          onClose={handleClose}
                          TransitionComponent={Fade}
                        >
                          <MenuItem
                            onClick={() => {
                              e.action[0]()
                              handleClose()
                            }}
                          >
                            imprimer tableau
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleClose()
                              e.action[1]()
                            }}
                          >
                            imprimer ligne
                          </MenuItem>
                        </Menu>
                      </div>
                    )
                  return (
                    <Button
                      key={`${e.label}-${i}`}
                      startIcon={e.icon || null}
                      onClick={e.action}
                      {...e.ButtonProps}
                    >
                      {e.label}
                    </Button>
                  )
                })}
              </Stack>
            )}
            {menuActions && (
              <Stack justifyContent="space-between" flexDirection="row">
                <Button
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget)
                  }}
                  sx={{
                    alignSelf: 'end',
                    color: 'black',
                  }}
                  startIcon={<SettingsIcon />}
                >
                  action
                </Button>
                <StyledMenu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => {
                    setAnchorEl(null)
                  }}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {/* {menuActions.map((menuItem, index) => (
                    <MenuItem
                      key={index}
                      onClick={menuItem.action}
                      {...menuItem.ButtonProps}
                    >
                      {menuItem.icon}
                      {menuItem.label}
                    </MenuItem>
                  ))} */}
                  {menuActions.map((menuItem, index) => (
                    <Link
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        fontSize: 14,
                        cursor: 'pointer',
                      }}
                      key={menuItem.action + index}
                      onClick={menuItem.action}
                      {...menuItem.ButtonProps}
                      to=""
                    >
                      <Paper
                        sx={{
                          paddingX: 4,
                          paddingY: 1,
                          marginX: 2,
                          textAlign: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 1,
                        }}
                        key={index}
                        onClick={handleClose}
                      >
                        {menuItem.icon}
                        {menuItem.label}
                      </Paper>
                    </Link>
                  ))}
                </StyledMenu>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    )
  }