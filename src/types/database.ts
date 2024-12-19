export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          project_name: string
          solution_name: string
          problem_description: string
          solution_description: string
          impact: string
          experts: string
          technical_area: string
          country: string
          coordinates: number[]
          contact_point: string
          image_url: string | null
          tags: string[]
          created_at: string
          owner: string
        }
        Insert: {
          id?: string
          project_name: string
          solution_name: string
          problem_description: string
          solution_description: string
          impact: string
          experts: string
          technical_area: string
          country: string
          coordinates: number[]
          contact_point: string
          image_url?: string | null
          tags?: string[]
          created_at?: string
          owner: string
        }
        Update: {
          id?: string
          project_name?: string
          solution_name?: string
          problem_description?: string
          solution_description?: string
          impact?: string
          experts?: string
          technical_area?: string
          country?: string
          coordinates?: number[]
          contact_point?: string
          image_url?: string | null
          tags?: string[]
          created_at?: string
          owner?: string
        }
      }
    }
  }
}