import '../styles/global.scss'
import Layout from '../components/layout'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '@brainhubeu/react-carousel/lib/style.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import 'react-toastify/dist/ReactToastify.css';
export default function App({Component, pageProps}){
    
    return (
    <Layout>
     <Component {...pageProps}/>
    </Layout>
  
    )
}