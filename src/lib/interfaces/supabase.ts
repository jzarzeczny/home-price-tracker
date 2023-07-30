export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      houses: {
        Row: {
          id: string;
          imageUrl: string | null;
          link: string | null;
          title: string | null;
          userId: string | null;
        };
        Insert: {
          id?: string;
          imageUrl?: string | null;
          link?: string | null;
          title?: string | null;
          userId?: string | null;
        };
        Update: {
          id?: string;
          imageUrl?: string | null;
          link?: string | null;
          title?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "houses_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      prices: {
        Row: {
          created_at: string | null;
          houseid: string | null;
          id: string;
          price: string | null;
          pricePerM: string | null;
          userId: string | null;
        };
        Insert: {
          created_at?: string | null;
          houseid?: string | null;
          id?: string;
          price?: string | null;
          pricePerM?: string | null;
          userId?: string | null;
        };
        Update: {
          created_at?: string | null;
          houseid?: string | null;
          id?: string;
          price?: string | null;
          pricePerM?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "prices_houseid_fkey";
            columns: ["houseid"];
            referencedRelation: "houses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "prices_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
