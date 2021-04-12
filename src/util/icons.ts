import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdbIcon from '@material-ui/icons/Adb';
import BugReportIcon from '@material-ui/icons/BugReport';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import FaceIcon from '@material-ui/icons/Face';

type IconsMap = Map<string, any>;

const icons: IconsMap = new Map();
icons.set('adb', AdbIcon);
icons.set('face', FaceIcon);
icons.set('account', AccountCircleIcon);
icons.set('bug', BugReportIcon);
icons.set('child', ChildCareIcon);

export const getIcon = (name: string): any => {
    const icon = icons.get(name)
    if (!icon) return AdbIcon;
    return icon;
}

