import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface FitnessGoal {
  id: string;
  goal_type: string;
  target_value: number;
  start_date: string;
  end_date: string;
}

interface GoalState {
  goals: FitnessGoal[];
  isLoading: boolean;
  error: string | null;
  fetchGoals: () => Promise<void>;
  addGoal: (goal: Omit<FitnessGoal, 'id'>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
}

export const useGoalStore = create<GoalState>((set) => ({
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
    } catch (error: any) {
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
      
      // Refresh goals after adding
      const { data: updatedGoals } = await supabase
        .from('fitness_goals')
        .select('*')
        .order('start_date', { ascending: false });
        
      set({ goals: updatedGoals || [], error: null });
    } catch (error: any) {
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
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  }
}));