import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useGoalStore = create((set) => ({
  goals: [],
  isLoading: false,
  error: null,
  fetchGoals: async () => {
    try {
      set({ isLoading: true });
      const { data, error } = await supabase
        .from('fitness_goals')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;
      set({ goals: data || [], error: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  addGoal: async (goal) => {
    try {
      set({ isLoading: true });
      const { error } = await supabase
        .from('fitness_goals')
        .insert([goal]);

      if (error) throw error;
      
      const { data: updatedGoals } = await supabase
        .from('fitness_goals')
        .select('*')
        .order('start_date', { ascending: false });
        
      set({ goals: updatedGoals || [], error: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteGoal: async (id) => {
    try {
      set({ isLoading: true });
      const { error } = await supabase
        .from('fitness_goals')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      set(state => ({
        goals: state.goals.filter(goal => goal.id !== id),
        error: null
      }));
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  }
}));