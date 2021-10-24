import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdbIcon from '@mui/icons-material/Adb';
import BugReportIcon from '@mui/icons-material/BugReport';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FaceIcon from '@mui/icons-material/Face';

const icons: Map<string, any> = new Map();
icons.set('adb', AdbIcon);
icons.set('face', FaceIcon);
icons.set('account', AccountCircleIcon);
icons.set('bug', BugReportIcon);
icons.set('child', ChildCareIcon);

export const getIcon = (name: string): any => {
  const icon = icons.get(name);
  if (!icon) return AdbIcon;
  return icon;
};
