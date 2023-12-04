import { useContext } from "react"
import { AuthContext } from "../contexts/AuthProvider"
import { useQuery } from "@tanstack/react-query"

const useCart = () => {
    const { user } = useContext(AuthContext)
    const { refetch, data: cart = []} = useQuery({
      // tanstack Usage >> Quick function >> with fetch and other clients that do not throw by default
      queryKey: ['carts', user?.email],
      queryFn: async () => {
        const response = await fetch(`http://localhost:6001/cart?email=${user?.email}`)
        return response.json()
      },
    })

  return [cart, refetch]
}

export default useCart