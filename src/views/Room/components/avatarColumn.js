import AvatarGroup from '@components/avatar-group'

const data = [
  {
    title: 'Vinnie Mostowy'
  },
  {
    title: 'Elicia Rieske'
  },
  {
    title: 'Julee Rossignol'
  },
  {
    title: 'Darcey Nooner'
  },
  {
    title: 'Jenny Looper'
  }
]

const UserAvatarGroup = () => {
  return <AvatarGroup data={data} />
}

export default UserAvatarGroup