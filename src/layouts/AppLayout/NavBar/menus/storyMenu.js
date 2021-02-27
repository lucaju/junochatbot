import AdbIcon from '@material-ui/icons/Adb';
// import LabelIcon from '@material-ui/icons/Label';
// import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

const PATH = '/app/story';

export const storyMenu = [
  {
    title: 'General',
    tKey: 'general',
    href: `/app/story/general`,
    icon: AdbIcon,
  },
  {
    title: 'Video Collection',
    tKey: 'videoCollection',
    href: `/app/story/videos`,
    icon: VideoLibraryIcon,
  },
  {
    title: 'Narrative Design',
    tKey: 'narrativeDesign',
    href: `/app/story/narrative`,
    icon: QuestionAnswerIcon,
  },
  // {
  //   title: 'Contexts',
  //   tKey: 'contexts',
  //   href: `${PATH}}/contexts`,
  //   icon: LabelIcon,
  // },
  // {
  //   title: 'Tags',
  //   tKey: 'tags',
  //   href: `${PATH}}/tags`,
  //   icon: LocalOfferIcon,
  // },
];
