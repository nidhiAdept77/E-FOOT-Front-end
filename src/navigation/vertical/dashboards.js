import { CreditCard, Crosshair, Inbox, LifeBuoy, List, Mail, Radio, Server, Shield, Trello, User, UserPlus, Users, HelpCircle } from 'react-feather'
import { AiOutlineHome } from "react-icons/ai"
import { RiChatSmile3Line } from "react-icons/ri"

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <AiOutlineHome />,
    navLink: '/'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <Inbox />,
    navLink: '/dashboard'
  },
  {
    id: 'chat',
    title: 'Chats',
    icon: <RiChatSmile3Line />,
    navLink: '/chat'
  },
  {
    id: 'chatRequests',
    title: 'Chat Requests',
    icon: <Trello />,
    navLink: '/chat-requests'
  },
  {
    id: 'myMatch',
    title: 'My Matches',
    icon: <Trello />,
    navLink: '/my-matches'
  },
  {
    id: 'findMyMatch',
    title: "Start Game",
    icon: <Radio />,
    // navLink: '/find-my-match'
    navLink: '/create-challenge'

  },
  // {
  //   id: 'wallet',
  //   title: 'Wallet',
  //   icon: <CreditCard />,
  //   navLink: '/wallet'
  //   // navLink: '/#'
  // },
  {
    id: 'profile',
    title: 'My Profile',
    icon: <User />,
    navLink: '/profile'
  },
  {
    id: 'tournament',
    title: 'Tournaments',
    icon: <Crosshair />,
    // navLink: '/contact-us'
    navLink: '/#'
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: <Mail />,
    // navLink: '/contact-us'
    navLink: '/#'
  },
  {
    id: 'howToPlay',
    title: 'How To Play',
    icon: <Server />,
    navLink: '/how-to-play'
    // navLink: '/#'
  }
  // ,
  // {
  //   id: 'FAQs',
  //   title: 'FAQs',
  //   icon: <HelpCircle />,
  //   navLink: '/faqs'
  //   // navLink: '/#'  
  // }
]
