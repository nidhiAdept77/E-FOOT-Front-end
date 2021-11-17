import { SiGoogleclassroom } from "react-icons/si"
import {GiGameConsole} from 'react-icons/gi'
import {GrGamepad} from 'react-icons/gr'
import {BsLayoutWtf} from 'react-icons/bs'
import {BiFirstAid} from 'react-icons/bi'

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
        id: 'rooms',
        title: 'Rooms',
        icon: <SiGoogleclassroom />,
        navLink: '/rooms'
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
    },
    {
      id: 'resolveDispute',
      title: 'Resolve Dispute',
      icon: <BiFirstAid />,
      navLink: '/resolve-dispute'
    }
]  