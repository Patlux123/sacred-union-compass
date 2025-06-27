
import { supabase } from '@/integrations/supabase/client';

export interface DevotionalProgress {
  id: string;
  user_id: string;
  partner_id?: string;
  current_day: number;
  completed_days: number[];
  last_completed: string | null;
  created_at: string;
  updated_at: string;
}

export interface DevotionalReflection {
  id: string;
  user_id: string;
  partner_id?: string;
  devotional_day: number;
  reflection_comment: string;
  completed_at: string;
  date_completed: string; // YYYY-MM-DD format
}

export const devotionalService = {
  // Get current devotional day based on user's start date and completion
  async getCurrentDevotionalDay(userId: string): Promise<number> {
    const { data: responses } = await supabase
      .from('devotional_responses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (!responses || responses.length === 0) {
      return 1;
    }

    // Get the latest day and increment by 1, or loop back to 1 after 25
    const lastDay = responses[0].devotional_index;
    return lastDay >= 25 ? 1 : lastDay + 1;
  },

  // Check if today's devotional is completed
  async isTodayCompleted(userId: string): Promise<boolean> {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('devotional_responses')
      .select('id')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    return !!data;
  },

  // Complete today's devotional
  async completeDevotion(
    userId: string, 
    partnerId: string | null, 
    devotionalDay: number, 
    reflectionComment: string
  ): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    
    // Save reflection - include the required 'day' field
    await supabase
      .from('devotional_responses')
      .insert({
        user_id: userId,
        devotional_index: devotionalDay,
        day: devotionalDay, // Add the required day field
        reflection: reflectionComment,
        date: today,
        completed: true
      });
  },

  // Get partner's reflection for the same day
  async getPartnerReflection(partnerId: string, devotionalDay: number, date: string): Promise<string | null> {
    const { data } = await supabase
      .from('devotional_responses')
      .select('reflection')
      .eq('user_id', partnerId)
      .eq('devotional_index', devotionalDay)
      .eq('date', date)
      .single();

    return data?.reflection || null;
  },

  // Get completion stats for last 7 days
  async getWeeklyStats(userId: string): Promise<{ completed: number; total: number }> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6); // Last 7 days including today

    const { data } = await supabase
      .from('devotional_responses')
      .select('date')
      .eq('user_id', userId)
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0]);

    return {
      completed: data?.length || 0,
      total: 7
    };
  },

  // Sync partner devotional progress when accounts are linked
  async syncPartnerProgress(userId: string, partnerId: string): Promise<void> {
    // Update partner links table
    await supabase
      .from('partner_links')
      .upsert({
        user_id: userId,
        partner_id: partnerId
      });

    await supabase
      .from('partner_links')
      .upsert({
        user_id: partnerId,
        partner_id: userId
      });

    // Update profiles with partner information
    await supabase
      .from('profiles')
      .update({ partner_id: partnerId })
      .eq('id', userId);

    await supabase
      .from('profiles')
      .update({ partner_id: userId })
      .eq('id', partnerId);
  }
};
