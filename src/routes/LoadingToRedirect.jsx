import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const LoadingToRedirect = () => {
    const [ count, setCount ] = useState(3)
    const [ redirect, setRedirect ] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        const interval = setInterval(() => {
            setCount((currentCount)=>{
                if(currentCount === 1){
                    clearInterval(interval)
                    setRedirect(true)
                }
                return currentCount - 1
            })

        }, 1000);

        return ()=> clearInterval(interval)
    },[])

    if(redirect){
        return navigate('/')
    }

  return (
    <div>No Permission , Redirect in {count}</div>
  )
}

export default LoadingToRedirect


