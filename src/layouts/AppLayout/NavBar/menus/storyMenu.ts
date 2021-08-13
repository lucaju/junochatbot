import AdbIcon from '@material-ui/icons/Adb';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { MenuType } from '../Menu';

export const storyMenu: MenuType[] = [
  {
    title: 'general',
    tKey: 'general',
    path: '/app/stories/:storyId',
    icon: AdbIcon,
  },
  {
    title: 'Conversation Design',
    tKey: 'conversationDesign',
    path: '/app/stories/:storyId/conversation',
    icon: QuestionAnswerIcon,
  },
  {
    title: 'Video Collection',
    tKey: 'videoCollection',
    path: '/app/stories/:storyId/videos',
    icon: VideoLibraryIcon,
  },
  {
    title: 'Contexts',
    tKey: 'intentContexts',
    path: '/app/stories/:storyId/contexts',
    icon: CenterFocusWeakIcon,
  },
  {
    title: 'Entities',
    tKey: 'entityLibrary',
    path: '/app/stories/:storyId/entities',
    icon: DeviceHubIcon,
  },
  {
    title: 'Play',
    tKey: 'play',
    path: '/story/:storyId',
    icon: PlayCircleOutlineIcon,
  },
];
