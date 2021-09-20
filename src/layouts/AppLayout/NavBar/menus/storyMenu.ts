import AdbIcon from '@mui/icons-material/Adb';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
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
