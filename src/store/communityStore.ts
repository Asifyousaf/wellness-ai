import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  likes: number;
  created_at: string;
  author?: {
    username: string;
    avatar_url: string;
  };
}

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author?: {
    username: string;
    avatar_url: string;
  };
}

interface CommunityState {
  posts: Post[];
  comments: Record<string, Comment[]>;
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: { content: string; image_url?: string }) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
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
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
      set({ error: error.message });
    }
  }
}));