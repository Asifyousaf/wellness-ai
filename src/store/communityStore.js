import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useCommunityStore = create((set, get) => ({
  posts: [],
  comments: {},
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    try {
      set({ isLoading: true });
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles(username, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ posts: data || [], error: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  addPost: async (post) => {
    try {
      set({ isLoading: true });
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('posts')
        .insert([{ ...post, user_id: user.id }]);

      if (error) throw error;
      await get().fetchPosts();
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  addComment: async (postId, content) => {
    try {
      set({ isLoading: true });
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('comments')
        .insert([{ post_id: postId, user_id: user.id, content }]);

      if (error) throw error;
      await get().fetchComments(postId);
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  likePost: async (postId) => {
    try {
      set({ isLoading: true });
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.rpc('increment_likes', { post_id: postId });
      if (error) throw error;

      await get().fetchPosts();
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchComments: async (postId) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          author:profiles(username, avatar_url)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      set(state => ({
        comments: {
          ...state.comments,
          [postId]: data || []
        }
      }));
    } catch (error) {
      set({ error: error.message });
    }
  }
}));