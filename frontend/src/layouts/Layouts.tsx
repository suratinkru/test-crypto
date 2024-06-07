import React from 'react'
import Header from '../components/Header'

type Props = {
  children?: React.ReactNode
}

const Layouts: React.FC<Props> = ({children}) => {
  React.useEffect(() => {
    console.log('Layouts');
    
  }, [])
  return (
   <div style={{backgroundColor:"#191b1e !important"}}>
    <Header />
     {children}
   </div>
  )
}

export default Layouts