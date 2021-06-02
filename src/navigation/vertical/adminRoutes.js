import { SiGoogleclassroom } from "react-icons/si"
import {GiGameConsole} from 'react-icons/gi'
import {GrGamepad} from 'react-icons/gr'
export default [
    {
      header: 'Admin Routes'
    },
    {
        id: 'createRoom',
        title: 'Create Room',
        icon: <SiGoogleclassroom />,
        navLink: '/create-room'
    },
    {
      id: 'createConsole',
      title: 'Create Console',
      icon: <GiGameConsole />,
      navLink: '/create-console'
    },
    {
      id: 'createGames',
      title: 'Create Games',
      icon: <GrGamepad />,
      navLink: '/create-games'
    }
]  