import AdbIcon from '@material-ui/icons/Adb';
// import LabelIcon from '@material-ui/icons/Label';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

export const storyMenu = [
  {
    title: 'General',
    tKey: 'general',
    href: '/app/story/general',
    icon: AdbIcon,
  },
  {
    title: 'Video Collection',
    tKey: 'videoCollection',
    href: '/app/story/videos',
    icon: VideoLibraryIcon,
  },
  {
    title: 'Tags',
    tKey: 'tags',
    href: '/app/story/tags',
    icon: LocalOfferIcon,
  },
  {
    title: 'Narrative Design',
    tKey: 'narrativeDesign',
    href: '/app/story/narrative',
    icon: QuestionAnswerIcon,
  },
  // {
  //   title: 'Contexts',
  //   tKey: 'contexts',
  //   href: '/app/story/contexts',
  //   icon: LabelIcon,
  // },
];
