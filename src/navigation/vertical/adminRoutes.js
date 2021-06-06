import { SiGoogleclassroom } from "react-icons/si"
import {GiGameConsole} from 'react-icons/gi'
import {GrGamepad} from 'react-icons/gr'
import {BsLayoutWtf} from 'react-icons/bs'
export default [
    {
      header: 'Admin Routes'
    },
    {
      id: 'layoutSettings',
      title: 'Layout Settings',
      icon: <BsLayoutWtf />,
      navLink: "/layout-settings"
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