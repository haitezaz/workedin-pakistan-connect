export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin: {
        Row: {
          adminid: number
          cnic: number | null
          email: string | null
          name: string | null
          password: string | null
          phonenumber: number | null
        }
        Insert: {
          adminid?: number
          cnic?: number | null
          email?: string | null
          name?: string | null
          password?: string | null
          phonenumber?: number | null
        }
        Update: {
          adminid?: number
          cnic?: number | null
          email?: string | null
          name?: string | null
          password?: string | null
          phonenumber?: number | null
        }
        Relationships: []
      }
      employer: {
        Row: {
          cnic: number | null
          email: string | null
          empid: number
          name: string | null
          password: string | null
          phonenumber: number | null
        }
        Insert: {
          cnic?: number | null
          email?: string | null
          empid?: number
          name?: string | null
          password?: string | null
          phonenumber?: number | null
        }
        Update: {
          cnic?: number | null
          email?: string | null
          empid?: number
          name?: string | null
          password?: string | null
          phonenumber?: number | null
        }
        Relationships: []
      }
      gig_applied: {
        Row: {
          appliedid: number
          gigid: number | null
          gigprice: number | null
          remarks: string | null
          status: string | null
          timestamp: string | null
          workerid: number | null
        }
        Insert: {
          appliedid?: number
          gigid?: number | null
          gigprice?: number | null
          remarks?: string | null
          status?: string | null
          timestamp?: string | null
          workerid?: number | null
        }
        Update: {
          appliedid?: number
          gigid?: number | null
          gigprice?: number | null
          remarks?: string | null
          status?: string | null
          timestamp?: string | null
          workerid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gig_applied_gigid_fkey"
            columns: ["gigid"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["gigid"]
          },
          {
            foreignKeyName: "gig_applied_workerid_fkey"
            columns: ["workerid"]
            isOneToOne: false
            referencedRelation: "worker"
            referencedColumns: ["workerid"]
          },
        ]
      }
      gigs: {
        Row: {
          address: string | null
          city: string | null
          empid: number | null
          gigbudget: number | null
          gigdescription: string | null
          gigid: number
          gigtitle: string | null
          status: string | null
          timestamp: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          empid?: number | null
          gigbudget?: number | null
          gigdescription?: string | null
          gigid?: number
          gigtitle?: string | null
          status?: string | null
          timestamp?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          empid?: number | null
          gigbudget?: number | null
          gigdescription?: string | null
          gigid?: number
          gigtitle?: string | null
          status?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gigs_empid_fkey"
            columns: ["empid"]
            isOneToOne: false
            referencedRelation: "employer"
            referencedColumns: ["empid"]
          },
        ]
      }
      job: {
        Row: {
          city: string | null
          empid: number | null
          jobdescription: string | null
          jobid: number
          joblocation: string | null
          jobsalary: number | null
          jobtitle: string | null
          jobtype: string | null
          skillsrequired: string | null
          status: string | null
          timestamp: string | null
        }
        Insert: {
          city?: string | null
          empid?: number | null
          jobdescription?: string | null
          jobid?: number
          joblocation?: string | null
          jobsalary?: number | null
          jobtitle?: string | null
          jobtype?: string | null
          skillsrequired?: string | null
          status?: string | null
          timestamp?: string | null
        }
        Update: {
          city?: string | null
          empid?: number | null
          jobdescription?: string | null
          jobid?: number
          joblocation?: string | null
          jobsalary?: number | null
          jobtitle?: string | null
          jobtype?: string | null
          skillsrequired?: string | null
          status?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_empid_fkey"
            columns: ["empid"]
            isOneToOne: false
            referencedRelation: "employer"
            referencedColumns: ["empid"]
          },
        ]
      }
      job_worker_applied: {
        Row: {
          jobid: number
          messageofinterest: string | null
          timestamp: string | null
          workerid: number
        }
        Insert: {
          jobid: number
          messageofinterest?: string | null
          timestamp?: string | null
          workerid: number
        }
        Update: {
          jobid?: number
          messageofinterest?: string | null
          timestamp?: string | null
          workerid?: number
        }
        Relationships: [
          {
            foreignKeyName: "job_worker_applied_jobid_fkey"
            columns: ["jobid"]
            isOneToOne: false
            referencedRelation: "job"
            referencedColumns: ["jobid"]
          },
          {
            foreignKeyName: "job_worker_applied_workerid_fkey"
            columns: ["workerid"]
            isOneToOne: false
            referencedRelation: "worker"
            referencedColumns: ["workerid"]
          },
        ]
      }
      skill: {
        Row: {
          skillid: number
          skillname: string | null
        }
        Insert: {
          skillid?: number
          skillname?: string | null
        }
        Update: {
          skillid?: number
          skillname?: string | null
        }
        Relationships: []
      }
      skill_gig: {
        Row: {
          gigid: number
          skillid: number
        }
        Insert: {
          gigid: number
          skillid: number
        }
        Update: {
          gigid?: number
          skillid?: number
        }
        Relationships: [
          {
            foreignKeyName: "skill_gig_gigid_fkey"
            columns: ["gigid"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["gigid"]
          },
          {
            foreignKeyName: "skill_gig_skillid_fkey"
            columns: ["skillid"]
            isOneToOne: false
            referencedRelation: "skill"
            referencedColumns: ["skillid"]
          },
        ]
      }
      skill_job: {
        Row: {
          jobid: number
          skillid: number
        }
        Insert: {
          jobid: number
          skillid: number
        }
        Update: {
          jobid?: number
          skillid?: number
        }
        Relationships: [
          {
            foreignKeyName: "skill_job_jobid_fkey"
            columns: ["jobid"]
            isOneToOne: false
            referencedRelation: "job"
            referencedColumns: ["jobid"]
          },
          {
            foreignKeyName: "skill_job_skillid_fkey"
            columns: ["skillid"]
            isOneToOne: false
            referencedRelation: "skill"
            referencedColumns: ["skillid"]
          },
        ]
      }
      worker: {
        Row: {
          availabilitystatus: string | null
          cnic: number | null
          email: string | null
          hourlyrate: number | null
          name: string | null
          password: string | null
          phonenumber: number | null
          workerid: number
        }
        Insert: {
          availabilitystatus?: string | null
          cnic?: number | null
          email?: string | null
          hourlyrate?: number | null
          name?: string | null
          password?: string | null
          phonenumber?: number | null
          workerid?: number
        }
        Update: {
          availabilitystatus?: string | null
          cnic?: number | null
          email?: string | null
          hourlyrate?: number | null
          name?: string | null
          password?: string | null
          phonenumber?: number | null
          workerid?: number
        }
        Relationships: []
      }
      worker_education: {
        Row: {
          scoredpercentage: number | null
          title: string
          workerid: number
        }
        Insert: {
          scoredpercentage?: number | null
          title: string
          workerid: number
        }
        Update: {
          scoredpercentage?: number | null
          title?: string
          workerid?: number
        }
        Relationships: [
          {
            foreignKeyName: "worker_education_workerid_fkey"
            columns: ["workerid"]
            isOneToOne: false
            referencedRelation: "worker"
            referencedColumns: ["workerid"]
          },
        ]
      }
      worker_reviews: {
        Row: {
          gigid: number | null
          overallrating: number | null
          review: string | null
          reviewid: number
          workerid: number | null
        }
        Insert: {
          gigid?: number | null
          overallrating?: number | null
          review?: string | null
          reviewid?: number
          workerid?: number | null
        }
        Update: {
          gigid?: number | null
          overallrating?: number | null
          review?: string | null
          reviewid?: number
          workerid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "worker_reviews_gigid_fkey"
            columns: ["gigid"]
            isOneToOne: false
            referencedRelation: "gigs"
            referencedColumns: ["gigid"]
          },
          {
            foreignKeyName: "worker_reviews_workerid_fkey"
            columns: ["workerid"]
            isOneToOne: false
            referencedRelation: "worker"
            referencedColumns: ["workerid"]
          },
        ]
      }
      worker_skill: {
        Row: {
          skillid: number
          workerid: number
        }
        Insert: {
          skillid: number
          workerid: number
        }
        Update: {
          skillid?: number
          workerid?: number
        }
        Relationships: [
          {
            foreignKeyName: "worker_skill_skillid_fkey"
            columns: ["skillid"]
            isOneToOne: false
            referencedRelation: "skill"
            referencedColumns: ["skillid"]
          },
          {
            foreignKeyName: "worker_skill_workerid_fkey"
            columns: ["workerid"]
            isOneToOne: false
            referencedRelation: "worker"
            referencedColumns: ["workerid"]
          },
        ]
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
