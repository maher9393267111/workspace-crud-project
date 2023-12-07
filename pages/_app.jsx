import '@/styles/globals.css'

import 'semantic-ui-css/semantic.min.css'
// import { MantineProvider } from '@mantine/core'



export default function App({ Component, pageProps }) {
  return (
  
    <div>
      {/* <MantineProvider */}
      
      {/* withGlobalStyles
				withNormalizeCSS
      > */}

     

<Component {...pageProps} />
{/* </MantineProvider > */}
    </div>
  
 
)}
