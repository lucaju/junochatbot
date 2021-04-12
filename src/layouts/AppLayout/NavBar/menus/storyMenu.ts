import AdbIcon from '@material-ui/icons/Adb';
// import LabelIcon from '@material-ui/icons/Label';
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
  // {
  //   title: 'Contexts',
  //   tKey: 'contexts',
  //   href: '/app/stories/:storyId/contexts',
  //   icon: LabelIcon,
  // },
];
