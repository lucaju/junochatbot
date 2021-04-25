import AdbIcon from '@material-ui/icons/Adb';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
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
    title: 'Video Collection',
    tKey: 'videoCollection',
    path: '/app/stories/:storyId/videos',
    icon: VideoLibraryIcon,
  },
  {
    title: 'Tags',
    tKey: 'common:tags',
    path: '/app/stories/:storyId//tags',
    icon: LocalOfferIcon,
  },
  {
    title: 'Conversation Design',
    tKey: 'conversationDesign',
    path: '/app/stories/:storyId/conversation',
    icon: QuestionAnswerIcon,
  },
  {
    title: 'Contexts',
    tKey: 'contexts',
    path: '/app/stories/:storyId/contexts',
    icon: CenterFocusWeakIcon,
  },
  {
    title: 'Entities',
    tKey: 'entities',
    path: '/app/stories/:storyId/entities',
    icon: DeviceHubIcon,
  },
];
