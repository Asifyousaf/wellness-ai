import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Workout {
  id: string;
  title: string;
  type: string;
  duration: number;
  calories_burned: number;
  date: string;
}

interface WorkoutState {
  workouts: Workout[];
  isLoading: boolean;
  error: string | null;
  fetchWorkouts: () => Promise<void>;
  addWorkout: (workout: Omit<Workout, 'id'>) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  workouts: [],
  isLoading: false,
  error: null,
  fetchWorkouts: async () => {
    try {
      set({ isLoading: true });
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      set({ workouts: data || [], error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  addWorkout: async (workout) => {
    try {
      set({ isLoading: true });
      const { error } = await supabase
        .from('workouts')
        .insert([workout]);

      if (error) throw error;
      
      // Refresh workouts after adding
      const { data: updatedWorkouts } = await supabase
        .from('workouts')
        .select('*')
        .order('date', { ascending: false });
        
      set({ workouts: updatedWorkouts || [], error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteWorkout: async (id) => {
    try {
      set({ isLoading: true });
      const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      set(state => ({
        workouts: state.workouts.filter(w => w.id !== id),
        error: null
      }));
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  }
}));