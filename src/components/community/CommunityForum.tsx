import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  Plus,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Tractor
} from 'lucide-react';
import { COMMUNITY_POSTS } from '../../data/seedData';
import { CommunityPost } from '../../types';

export const CommunityForum: React.FC = () => {
  const { customer, userRole } = useApp();
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('Regenerative Farming');

  const tags = ['All', 'Regenerative Farming', 'Jeevamrutha', 'Soil Health', 'A2 Dairy', 'Nutrition Science', 'Kitchen Gardening'];

  const filteredPosts = posts.filter(p => {
    if (selectedTag === 'All') return true;
    return p.tags.includes(selectedTag);
  });

  const handleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: userRole === 'farmer' ? 'Ramesh Patel' : customer.name,
      authorRole: userRole === 'farmer' ? 'farmer' : 'customer',
      authorAvatar: userRole === 'farmer' ? 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=300&q=80' : customer.avatar,
      authorLocation: 'Bengaluru / Nashik',
      title: newTitle,
      content: newContent,
      tags: newTags.split(',').map(s => s.trim()).filter(Boolean),
      likes: 1,
      commentsCount: 0,
      createdAt: 'Just now',
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowNewPostForm(false);
  };

  return (
    <div className="min-h-screen py-8 bg-slatebg dark:bg-slate-950 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-slate-800 text-brand-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Kisan & Consumer Circle</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Regenerative Agriculture Forum
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Knowledge sharing between farmers, agro-scientists, and conscious eaters.
            </p>
          </div>

          <button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-soft-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Share Story or Question</span>
          </button>
        </div>

        {/* New Post Form Drawer */}
        {showNewPostForm && (
          <form
            onSubmit={handleCreatePost}
            className="mb-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-brand-500/40 shadow-soft-lg space-y-4 animate-in fade-in duration-200"
          >
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Create a Community Post
            </h3>

            <div>
              <label className="text-xs font-semibold block mb-1">Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Tips for pest control using neem kernel oil extract"
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">Your Story / Advice</label>
              <textarea
                rows={4}
                required
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                placeholder="Describe your regenerative farming method, yield change, or home composting technique..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={newTags}
                onChange={e => setNewTags(e.target.value)}
                className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewPostForm(false)}
                className="px-4 py-2 text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold"
              >
                Publish Post
              </button>
            </div>
          </form>
        )}

        {/* Tag Filters */}
        <div className="mb-6 overflow-x-auto pb-2 flex items-center gap-2">
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedTag === t
                  ? 'bg-brand-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Posts Stream */}
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft-sm space-y-4"
            >
              {/* Author Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-11 h-11 rounded-2xl object-cover border border-brand-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {post.authorName}
                      </h4>
                      {post.authorRole === 'farmer' && (
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-harvest-100 text-harvest-800 dark:bg-harvest-950 dark:text-harvest-300">
                          Kisan
                        </span>
                      )}
                      {post.authorRole === 'expert' && (
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                          Agro Scientist
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {post.authorLocation} • {post.createdAt}
                    </p>
                  </div>
                </div>
              </div>

              {/* Title & Body */}
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {post.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Image if present */}
              {post.imageUrl && (
                <div className="rounded-2xl overflow-hidden aspect-[16/9] max-h-72">
                  <img src={post.imageUrl} alt="post visual" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer reactions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-brand-600 font-semibold"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes} Helpful</span>
                </button>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount} replies</span>
                  </span>
                  <button
                    onClick={() => alert('Link copied to clipboard!')}
                    className="hover:text-slate-800 dark:hover:text-white"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
