import Button from './Button'
import Typography from './Typography'
import Dialog from './Dialog'
import Card from './Card'
import Modal from './Modal'
import CssBaseline from './CSSBaseline'
import TextField from './TextField'
import InputOutlined from './form/inputOutlined'
import InputBase from './form/input'

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: any) {
  return Object.assign(
    Card(theme),
    InputOutlined(),
    InputBase(),
    TextField(theme),
    Button(theme),
    Dialog(theme),
    Modal(theme),
    Typography(theme),
    CssBaseline(theme)
  )
}