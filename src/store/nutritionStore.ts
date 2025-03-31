import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface NutritionLog {
  id: string;
  meal_type: string;
  food_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

interface NutritionState {
  logs: NutritionLog[];
  isLoading: boolean;
  error: string | null;
  fetchLogs: () => Promise<void>;
  addLog: (log: Omit<NutritionLog, 'id'>) => Promise<void>;
  deleteLog: (id: string) => Promise<void>;
}

export const useNutritionStore = create<NutritionState>((set) => ({
  logs: [],
  isLoading: false,
  error: null,
  fetchLogs: async () => {
    try {
      set({ isLoading: true });
      const { data, error } = await supabase
        .from('nutrition_logs')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      set({ logs: data || [], error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  addLog: async (log) => {
    try {
      set({ isLoading: true });
      const { error } = await supabase
        .from('nutrition_logs')
        .insert([log]);

      if (error) throw error;
      
      // Refresh logs after adding
      const { data: updatedLogs } = await supabase
        .from('nutrition_logs')
        .select('*')
        .order('date', { ascending: false });
        
      set({ logs: updatedLogs || [], error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteLog: async (id) => {
    try {
      set({ isLoading: true });
      const { error } = await supabase
        .from('nutrition_logs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      set(state => ({
        logs: state.logs.filter(log => log.id !== id),
        error: null
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  }
}));