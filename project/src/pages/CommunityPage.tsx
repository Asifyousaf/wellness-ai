import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MessageCircle, Heart, Share2, Calendar, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { useCommunityStore } from '../store/communityStore';
import { useAuthStore } from '../store/authStore';

export const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const { posts, fetchPosts, addPost, likePost, addComment } = useCommunityStore();
  const { user } = useAuthStore();
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author?.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    try {
      await addPost({ content: newPostContent });
      setNewPostContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const upcomingEvents = [
    {
      title: 'Group Workout Session',
      date: '2025-03-25',
      time: '10:00 AM',
      participants: 15
    },
    {
      title: 'Nutrition Workshop',
      date: '2025-03-27',
      time: '2:00 PM',
      participants: 25
    },
    {
      title: 'Mindfulness Meditation',
      date: '2025-03-30',
      time: '9:00 AM',
      participants: 20
    }
  ];

  const trendingTopics = [
    { tag: '#MorningWorkout', posts: 156 },
    { tag: '#HealthyEating', posts: 143 },
    { tag: '#MindfulnessMatters', posts: 128 },
    { tag: '#FitnessGoals', posts: 112 },
    { tag: '#WellnessJourney', posts: 98 }
  ];

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Community</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with fellow wellness enthusiasts, share your journey, and get inspired
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search and Filters */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('trending')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === 'trending'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Trending
              </button>
            </div>

            {/* Create Post */}
            {user && (
              <form onSubmit={handleSubmitPost} className="bg-white rounded-xl shadow-lg p-6">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Post
                  </button>
                </div>
              </form>
            )}

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={post.author?.avatar_url || 'https://via.placeholder.com/40'}
                      alt={post.author?.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{post.author?.username}</h3>
                      <p className="text-sm text-gray-600">
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-4">{post.content}</p>
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt="Post content"
                      className="rounded-lg mb-4 w-full"
                    />
                  )}
                  <div className="flex items-center gap-6 text-gray-600">
                    <button
                      onClick={() => likePost(post.id)}
                      className="flex items-center gap-2 hover:text-purple-600"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-purple-600">
                      <MessageCircle className="w-5 h-5" />
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-purple-600">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.title}
                    className="border-b last:border-0 pb-4 last:pb-0"
                  >
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {format(new Date(event.date), 'MMMM d, yyyy')} at {event.time}
                    </p>
                    <p className="text-sm text-purple-600">
                      {event.participants} participants
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Trending Topics
              </h2>
              <div className="space-y-2">
                {trendingTopics.map((topic) => (
                  <div
                    key={topic.tag}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <span className="text-purple-600">{topic.tag}</span>
                    <span className="text-sm text-gray-600">{topic.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};