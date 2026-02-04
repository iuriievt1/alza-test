import type { AlzaProductApiItem } from '../domain/product.types'

export type AlzaProductsResponse = {
  err: number
  msg: string | null
  data: AlzaProductApiItem[]
}


export async function fetchAlzaProducts(): Promise<AlzaProductsResponse> {
  const res = await fetch('https://www.alza.cz/Services/RestService.svc/v2/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filterParameters: {
        id: 18855843,
        isInStockOnly: false,
        newsOnly: false,
        wearType: 0,
        orderBy: 0,
        page: 1,
        params: [],
        producers: [],
        sendPrices: true,
        type: 'action',
        typeId: '',
        branchId: ''
      }
    })
  })


  const json = (await res.json()) as AlzaProductsResponse
  return json
}
