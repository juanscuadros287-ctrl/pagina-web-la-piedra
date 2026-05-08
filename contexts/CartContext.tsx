// ─────────────────────────────────────────────
// CART CONTEXT — FASE 2
// No está conectado en Fase 1 (phase: 1 en config.json)
// Para activarlo: cambiar phase a 2 en config.json
// ─────────────────────────────────────────────
'use client'

import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { CartItem, Lote } from '@/lib/types'

// Estado
interface CartState {
  items: CartItem[]
}

// Acciones
type CartAction =
  | { type: 'ADD_ITEM'; payload: Lote }
  | { type: 'REMOVE_ITEM'; payload: string } // lote.id
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD'; payload: CartItem[] }

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.some((i) => i.lote.id === action.payload.id)
      if (exists) return state
      return { items: [...state.items, { lote: action.payload, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.lote.id !== action.payload) }
    case 'CLEAR_CART':
      return { items: [] }
    case 'LOAD':
      return { items: action.payload }
    default:
      return state
  }
}

// Context
const CartContext = createContext<{
  items: CartItem[]
  addItem: (lote: Lote) => void
  removeItem: (id: string) => void
  clearCart: () => void
  total: number
  count: number
} | null>(null)

const STORAGE_KEY = 'lapiedra-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Cargar desde localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[]
        dispatch({ type: 'LOAD', payload: parsed })
      }
    } catch { /* noop */ }
  }, [])

  // Guardar en localStorage al cambiar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch { /* noop */ }
  }, [state.items])

  const total = state.items.reduce((sum, item) => {
    return sum + parseInt(item.lote.rango, 10)
  }, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem: (lote) => dispatch({ type: 'ADD_ITEM', payload: lote }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      total,
      count: state.items.length,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
