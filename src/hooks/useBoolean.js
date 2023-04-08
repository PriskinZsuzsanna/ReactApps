import { useState, useEffect } from "react"

export default function useBoolean(key, defaultValue) {
    
        const [boolean, setBoolean] = useState(() => {
            const jsonValue = localStorage.getItem(key)
            console.log(jsonValue)
            if (jsonValue != []) return false
        
            else {
              return defaultValue
            }
          })
        
          return [boolean, setBoolean]
  
  
}