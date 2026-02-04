import { useEffect, useState } from 'react'
import { fetchAlzaProducts } from '../api/products.api'
import type { Product } from '../domain/product.types'
import { mapApiProduct } from '../domain/product.mapper'
import { MOCK_PRODUCTS } from '../mock/products.mock'

type State = {
  products: Product[]
  loading: boolean
  error: string | null
  usedFallback: boolean
}


export function useProducts(): State {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usedFallback, setUsedFallback] = useState(false)

  useEffect(() => {
    let alive = true

    async function run() {
      setLoading(true)
      setError(null)
      setUsedFallback(false)

      try {
        const json = await fetchAlzaProducts()

        if (json.err > 0) {
          throw new Error(json.msg ?? 'Neznámá chyba služby.')
        }

        const mapped = Array.isArray(json.data) ? json.data.map(mapApiProduct) : []
        if (!alive) return

        setProducts(mapped)
      } catch (e) {
 
        const msg = e instanceof Error ? e.message : 'Chyba při načtení dat.'
        if (!alive) return
        setError(msg)
        setProducts(MOCK_PRODUCTS)
        setUsedFallback(true)
      } finally {
        if (alive) setLoading(false)
      }
    }

    void run()
    return () => {
      alive = false
    }
  }, [])

  return { products, loading, error, usedFallback }
}
