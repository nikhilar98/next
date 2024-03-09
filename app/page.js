import Image from 'next/image'
import UserForm from './components/UserForm'

export default function Home() {
  return (
    <main>
      <h1>Guess game</h1>
      <UserForm/>
    </main>
  )
}
