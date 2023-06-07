export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      houses: {
        Row: {
          id: string
          imageUrl: string | null
          price: string | null
          pricePerM: string
          title: string | null
        }
        Insert: {
          id?: string
          imageUrl?: string | null
          price?: string | null
          pricePerM: string
          title?: string | null
        }
        Update: {
          id?: string
          imageUrl?: string | null
          price?: string | null
          pricePerM?: string
          title?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
