import Head from 'next/head'
import { makeStyles } from '@mui/styles';
import Racers from '../blocks/Racers'
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Racers/>
      </main>

    </div>
  )
}
