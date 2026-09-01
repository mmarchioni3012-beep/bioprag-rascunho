export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      lead_events: {
        Row: {
          campaign: string | null
          content: string | null
          created_at: string
          event_data: Json
          event_type: string
          fbclid: string | null
          gclid: string | null
          id: string
          lead_id: string | null
          medium: string | null
          page_url: string | null
          session_id: string | null
          source: string | null
          term: string | null
        }
        Insert: {
          campaign?: string | null
          content?: string | null
          created_at?: string
          event_data?: Json
          event_type: string
          fbclid?: string | null
          gclid?: string | null
          id?: string
          lead_id?: string | null
          medium?: string | null
          page_url?: string | null
          session_id?: string | null
          source?: string | null
          term?: string | null
        }
        Update: {
          campaign?: string | null
          content?: string | null
          created_at?: string
          event_data?: Json
          event_type?: string
          fbclid?: string | null
          gclid?: string | null
          id?: string
          lead_id?: string | null
          medium?: string | null
          page_url?: string | null
          session_id?: string | null
          source?: string | null
          term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          address_cep: string | null
          address_complement: string | null
          address_number: string | null
          address_reference: string | null
          address_state: string | null
          address_status: string
          address_street: string | null
          address_zone: string | null
          archived: boolean
          archived_at: string | null
          archived_by: string | null
          arrived_at: string
          assigned_to: string | null
          attribution_type: string | null
          campaign: string | null
          city: string
          closed_value: number | null
          company_name: string | null
          consent_version: string | null
          content: string | null
          created_at: string
          created_by: string | null
          created_by_name: string | null
          customer_type: string
          device_type: string | null
          duplicate_suspected: boolean
          email: string | null
          estimated_value: number | null
          fbclid: string | null
          follow_up_at: string | null
          gbraid: string | null
          gclid: string | null
          id: string
          internal_notes: string | null
          landing_page: string | null
          loss_reason: string | null
          manual_source: string | null
          manual_source_detail: string | null
          marketing_consent: boolean
          marketing_consent_at: string | null
          medium: string | null
          message: string | null
          name: string
          neighborhood: string | null
          origin: string
          pest_type: string | null
          phone: string
          phone_alt: string | null
          phone_normalized: string | null
          preferred_contact: string
          privacy_acknowledged: boolean
          privacy_acknowledged_at: string | null
          referrer: string | null
          related_lead_id: string | null
          reported_source: string | null
          retention_review_at: string
          service_date: string | null
          service_interest: string
          session_id: string | null
          short_protocol: string | null
          source: string | null
          status: string
          term: string | null
          updated_at: string
          wbraid: string | null
          whatsapp_intent_at: string | null
          whatsapp_received_at: string | null
          whatsapp_status: string
        }
        Insert: {
          address_cep?: string | null
          address_complement?: string | null
          address_number?: string | null
          address_reference?: string | null
          address_state?: string | null
          address_status?: string
          address_street?: string | null
          address_zone?: string | null
          archived?: boolean
          archived_at?: string | null
          archived_by?: string | null
          arrived_at?: string
          assigned_to?: string | null
          attribution_type?: string | null
          campaign?: string | null
          city: string
          closed_value?: number | null
          company_name?: string | null
          consent_version?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          created_by_name?: string | null
          customer_type?: string
          device_type?: string | null
          duplicate_suspected?: boolean
          email?: string | null
          estimated_value?: number | null
          fbclid?: string | null
          follow_up_at?: string | null
          gbraid?: string | null
          gclid?: string | null
          id?: string
          internal_notes?: string | null
          landing_page?: string | null
          loss_reason?: string | null
          manual_source?: string | null
          manual_source_detail?: string | null
          marketing_consent?: boolean
          marketing_consent_at?: string | null
          medium?: string | null
          message?: string | null
          name: string
          neighborhood?: string | null
          origin?: string
          pest_type?: string | null
          phone: string
          phone_alt?: string | null
          phone_normalized?: string | null
          preferred_contact?: string
          privacy_acknowledged?: boolean
          privacy_acknowledged_at?: string | null
          referrer?: string | null
          related_lead_id?: string | null
          reported_source?: string | null
          retention_review_at?: string
          service_date?: string | null
          service_interest: string
          session_id?: string | null
          short_protocol?: string | null
          source?: string | null
          status?: string
          term?: string | null
          updated_at?: string
          wbraid?: string | null
          whatsapp_intent_at?: string | null
          whatsapp_received_at?: string | null
          whatsapp_status?: string
        }
        Update: {
          address_cep?: string | null
          address_complement?: string | null
          address_number?: string | null
          address_reference?: string | null
          address_state?: string | null
          address_status?: string
          address_street?: string | null
          address_zone?: string | null
          archived?: boolean
          archived_at?: string | null
          archived_by?: string | null
          arrived_at?: string
          assigned_to?: string | null
          attribution_type?: string | null
          campaign?: string | null
          city?: string
          closed_value?: number | null
          company_name?: string | null
          consent_version?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          created_by_name?: string | null
          customer_type?: string
          device_type?: string | null
          duplicate_suspected?: boolean
          email?: string | null
          estimated_value?: number | null
          fbclid?: string | null
          follow_up_at?: string | null
          gbraid?: string | null
          gclid?: string | null
          id?: string
          internal_notes?: string | null
          landing_page?: string | null
          loss_reason?: string | null
          manual_source?: string | null
          manual_source_detail?: string | null
          marketing_consent?: boolean
          marketing_consent_at?: string | null
          medium?: string | null
          message?: string | null
          name?: string
          neighborhood?: string | null
          origin?: string
          pest_type?: string | null
          phone?: string
          phone_alt?: string | null
          phone_normalized?: string | null
          preferred_contact?: string
          privacy_acknowledged?: boolean
          privacy_acknowledged_at?: string | null
          referrer?: string | null
          related_lead_id?: string | null
          reported_source?: string | null
          retention_review_at?: string
          service_date?: string | null
          service_interest?: string
          session_id?: string | null
          short_protocol?: string | null
          source?: string | null
          status?: string
          term?: string | null
          updated_at?: string
          wbraid?: string | null
          whatsapp_intent_at?: string | null
          whatsapp_received_at?: string | null
          whatsapp_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_related_lead_id_fkey"
            columns: ["related_lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
