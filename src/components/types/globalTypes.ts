/* eslint-disable prettier/prettier */
export interface Variant {
  id: number
  product_id: number
  color: string
  specification: string
  size: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: number
  name: string
  brand: string
  type: string
  origin: string
  created_at: string
  updated_at: string
  description: string
  price: number
  variants: Variant[]
}

export interface VariantForCreate {
  color: string
  specification: string
  size: string
}

export interface ProductForCreate {
  [x: string]: any
  name: string
  brand: string
  type: string
  origin: string
  description: string
  price: number
  variants: VariantForCreate[]
}

export type UniVersalType = any

export interface UserInfo {
  name: string
  address: string
  email: string
}

export interface OrderDetail {
  variant_id: number
  quantity: number
}

export interface OrderForCreate {
  user: UserInfo
  details: OrderDetail[]
}
