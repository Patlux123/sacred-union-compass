
import { supabase } from '@/lib/utils';

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
    const { data: progress } = await supabase
      .from('devotional_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!progress) {
      // Create initial progress record
      const { data: newProgress } = await supabase
        .from('devotional_progress')
        .insert({
          user_id: userId,
          current_day: 1,
          completed_days: [],
          last_completed: null
        })
        .select()
        .single();
      
      return 1;
    }

    return progress.current_day;
  },

  // Check if today's devotional is completed
  async isTodayCompleted(userId: string): Promise<boolean> {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('devotional_reflections')
      .select('id')
      .eq('user_id', userId)
      .eq('date_completed', today)
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
    
    // Save reflection
    await supabase
      .from('devotional_reflections')
      .insert({
        user_id: userId,
        partner_id: partnerId,
        devotional_day: devotionalDay,
        reflection_comment: reflectionComment,
        completed_at: new Date().toISOString(),
        date_completed: today
      });

    // Update progress
    const { data: currentProgress } = await supabase
      .from('devotional_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (currentProgress) {
      const newCompletedDays = [...(currentProgress.completed_days || []), devotionalDay];
      const nextDay = devotionalDay === 50 ? 1 : devotionalDay + 1; // Loop back to 1 after 50

      await supabase
        .from('devotional_progress')
        .update({
          current_day: nextDay,
          completed_days: newCompletedDays,
          last_completed: today,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);
    }
  },

  // Get partner's reflection for the same day
  async getPartnerReflection(partnerId: string, devotionalDay: number, date: string): Promise<string | null> {
    const { data } = await supabase
      .from('devotional_reflections')
      .select('reflection_comment')
      .eq('user_id', partnerId)
      .eq('devotional_day', devotionalDay)
      .eq('date_completed', date)
      .single();

    return data?.reflection_comment || null;
  },

  // Get completion stats for last 7 days
  async getWeeklyStats(userId: string): Promise<{ completed: number; total: number }> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6); // Last 7 days including today

    const { data } = await supabase
      .from('devotional_reflections')
      .select('date_completed')
      .eq('user_id', userId)
      .gte('date_completed', startDate.toISOString().split('T')[0])
      .lte('date_completed', endDate.toISOString().split('T')[0]);

    return {
      completed: data?.length || 0,
      total: 7
    };
  },

  // Sync partner devotional progress when accounts are linked
  async syncPartnerProgress(userId: string, partnerId: string): Promise<void> {
    const { data: userProgress } = await supabase
      .from('devotional_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    const { data: partnerProgress } = await supabase
      .from('devotional_progress')
      .select('*')
      .eq('user_id', partnerId)
      .single();

    // Set both to start from day 1 if either hasn't started
    const syncDay = (!userProgress && !partnerProgress) ? 1 : 
                   (userProgress?.current_day || partnerProgress?.current_day || 1);

    const updates = [
      supabase
        .from('devotional_progress')
        .upsert({
          user_id: userId,
          partner_id: partnerId,
          current_day: syncDay,
          completed_days: userProgress?.completed_days || [],
          last_completed: userProgress?.last_completed || null,
          updated_at: new Date().toISOString()
        }),
      supabase
        .from('devotional_progress')
        .upsert({
          user_id: partnerId,
          partner_id: userId,
          current_day: syncDay,
          completed_days: partnerProgress?.completed_days || [],
          last_completed: partnerProgress?.last_completed || null,
          updated_at: new Date().toISOString()
        })
    ];

    await Promise.all(updates);
  }
};
