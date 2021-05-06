import { CreditCard, Crosshair, Inbox, LifeBuoy, List, Mail, Radio, Server, Shield, Trello, User, UserPlus, Users } from 'react-feather'

export default [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <Inbox />,
    navLink: '/dashboard'
  },
  {
    id: 'myMatch',
    title: 'My Match',
    icon: <Trello />,
    // navLink: '/my-match'
    navLink: '/#'
  },
  {
    id: 'findMyMatch',
    title: "Find My Match",
    icon: <Radio />,
    // navLink: '/find-my-match'
    navLink: '/#'

  },
  {
    id: 'wallet',
    title: 'Wallet',
    icon: <CreditCard />,
    // navLink: '/wallet'
    navLink: '/#'
  },
  {
    id: 'profile',
    title: 'My Profile',
    icon: <User />,
    navLink: '/profile'
  },
  {
    id: 'tournament',
    title: 'Tournament',
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
    // navLink: '/how-to-play'
    navLink: '/#'
  },
  {
    id: 'terms',
    title: 'Terms Of Use',
    icon: <LifeBuoy />,
    // navLink: '/terms'
    navLink: '/#'
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    icon: <Shield />,
    // navLink: '/privacy'
    navLink: '/#'
  }
]
