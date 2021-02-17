import AdbIcon from '@material-ui/icons/Adb';
import LabelIcon from '@material-ui/icons/Label';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

const PATH = '/app/story';

export const storyMenu = [
  {
    title: 'General',
    href: `${PATH}}/general`,
    icon: AdbIcon,
  },
  {
    title: 'Video Collection',
    href: `${PATH}}/video-collection`,
    icon: VideoLibraryIcon,
  },
  {
    title: 'Narrative Design',
    href: `${PATH}}/narrative`,
    icon: QuestionAnswerIcon,
  },
  // {
  //   title: 'Contexts',
  //   href: `${PATH}}/contexts`,
  //   icon: LabelIcon,
  // },
  // {
  //   title: 'Tags',
  //   href: `${PATH}}/tags`,
  //   icon: LocalOfferIcon,
  // },
];
