
import Switch from '@mui/material/Switch';
import modeContext from '../../../Store/modeContext';
import { useContext } from 'react';

export default function SwitchMode() {
    const modeCtx = useContext(modeContext) 
  return (
    <Switch
      checked={modeCtx.darkMode}
      onChange={modeCtx.ontoggleDarkMode}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}