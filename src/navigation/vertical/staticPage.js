import { Menu, Circle } from 'react-feather'

export default [
  {
    id: 'Menu',
    title: 'Menus',
    icon: <Menu size={20} />,
    children: [
      {
        id: 'home',
        title: 'Home',
        icon: <Circle size={12} />,
        navLink: '/'
      },
      {
        id: 'tipsNTrick',
        title: "Tips 'N Trick",
        icon: <Circle size={12} />,
        navLink: '/tips'
      },
      {
        id: 'playFifaIntern',
        title: 'PLAY FIFA AS AN INTERNSHIP',
        icon: <Circle size={12} />,
        navLink: '/play-fifa-intern'
      },
      {
        id: 'ourServices',
        title: 'Our Services',
        icon: <Circle size={12} />,
        navLink: '/our-services'
      },
      {
        id: 'contact',
        title: 'Contact',
        icon: <Circle size={12} />,
        navLink: '/contact'
      }
    ]
  }
]
