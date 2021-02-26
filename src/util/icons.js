import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdbIcon from '@material-ui/icons/Adb';
import BugReportIcon from '@material-ui/icons/BugReport';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import FaceIcon from '@material-ui/icons/Face';

export const getIcon = (name) => {
  switch (name) {
    case 'adb':
      return AdbIcon;
    case 'face':
      return FaceIcon;
    case 'account':
      return AccountCircleIcon;
    case 'bug':
      return BugReportIcon;
    case 'child':
      return ChildCareIcon;
  }
};
