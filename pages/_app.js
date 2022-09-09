import TopNav from '../components/TopNav'
import '../styles/globals.css'
import  "bootstrap/dist/css/bootstrap.min.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
    <TopNav/>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
