"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiCalendar, 
  HiClock, 
  HiArrowLeft, 
  HiBookmark, 
  HiPrinter,
  HiEye,
  HiHeart,
  HiOutlineBookmark,
  HiOutlineHeart,
  HiOutlineShare,
  HiChevronUp,
  HiTag,
  HiTrendingUp
} from "react-icons/hi";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "../../../data/blogs";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const { slug } = params;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  
  // Find the blog post by slug
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    notFound();
  }

  // Handle scroll events for reading progress and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setReadingProgress(progress);
      setShowScrollTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="pt-16 lg:pt-20 bg-gradient-to-br from-slate-50 via-white to-green-50/20 min-h-screen">
      {/* Reading Progress Bar */}
      <div className="fixed top-16 lg:top-20 left-0 right-0 h-1 bg-slate-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
          style={{ width: `${readingProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Enhanced Navigation Bar */}
      <section className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl sticky top-16 lg:top-20 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/blogs"
              className="inline-flex items-center px-4 py-2 text-slate-600 hover:text-green-600 hover:bg-green-50 font-medium transition-all duration-200 rounded-lg group"
            >
              <HiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Articles
            </Link>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  isBookmarked 
                    ? 'bg-green-100 text-green-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isBookmarked ? <HiBookmark className="w-5 h-5" /> : <HiOutlineBookmark className="w-5 h-5" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="p-3 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <HiOutlineShare className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="p-3 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <HiPrinter className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Article Header */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/30"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Category and Tags */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold shadow-lg"
              >
                <HiTag className="w-4 h-4 mr-2" />
                {post.category}
              </motion.div>
              {post.tags?.slice(0, 2).map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="px-3 py-1 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 rounded-full text-sm font-medium"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight max-w-4xl mx-auto tracking-tight"
            >
              {post.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12"
            >
              {post.excerpt}
            </motion.p>

            {/* Enhanced Author and Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {post.author.split(' ').map(name => name[0]).join('')}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-lg">{post.author}</div>
                  <div className="text-slate-600 font-medium">Solar Energy Expert</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-8 text-slate-500">
                <div className="flex items-center space-x-2">
                  <HiCalendar className="w-5 h-5" />
                  <span className="font-medium">{new Date(post.publishDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HiClock className="w-5 h-5" />
                  <span className="font-medium">{post.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HiEye className="w-5 h-5" />
                  <span className="font-medium">2.4k views</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating Action Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex items-center space-x-4 bg-white/90 backdrop-blur-xl border border-slate-200/50 rounded-2xl px-6 py-3 shadow-xl">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                    isLiked 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {isLiked ? <HiHeart className="w-5 h-5" /> : <HiOutlineHeart className="w-5 h-5" />}
                  <span className="font-medium text-sm">{156 + (isLiked ? 1 : 0)}</span>
                </motion.button>
                
                <div className="w-px h-6 bg-slate-200"></div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                    isBookmarked 
                      ? 'bg-green-50 text-green-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {isBookmarked ? <HiBookmark className="w-5 h-5" /> : <HiOutlineBookmark className="w-5 h-5" />}
                  <span className="font-medium text-sm">{89 + (isBookmarked ? 1 : 0)}</span>
                </motion.button>
                
                <div className="w-px h-6 bg-slate-200"></div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-all duration-200"
                >
                  <HiOutlineShare className="w-5 h-5" />
                  <span className="font-medium text-sm">Share</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Article Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-20"
          >
            <div 
              className="prose prose-xl max-w-none 
                prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b-2 prose-h2:border-gradient-to-r prose-h2:from-green-500 prose-h2:to-emerald-500 prose-h2:pb-4
                prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg
                prose-a:text-green-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-ul:my-8 prose-li:my-3 prose-li:text-slate-700 prose-li:text-lg
                prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-green-50 prose-blockquote:to-emerald-50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:shadow-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.article>

          {/* Author Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-20"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {post.author.split(' ').map(name => name[0]).join('')}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{post.author}</h3>
                <p className="text-slate-600">Solar Energy Expert</p>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Related Articles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="border-t-2 border-slate-100 pt-20"
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-full text-sm font-semibold mb-6"
              >
                <HiTrendingUp className="w-4 h-4 mr-2" />
                Recommended Reading
              </motion.div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Related Articles</h2>
              <p className="text-lg text-slate-600">Continue exploring solar energy insights</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts
                .filter(relatedPost => relatedPost.id !== post.id)
                .slice(0, 2)
                .map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/blogs/${relatedPost.slug}`}
                      className="group block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-slate-300 transition-all duration-500 hover:-translate-y-2"
                    >
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-green-700 rounded-full text-xs font-semibold">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-green-600 transition-colors line-clamp-2 leading-tight">
                          {relatedPost.title}
                        </h3>
                        <p className="text-slate-600 line-clamp-3 mb-6 leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {relatedPost.author.split(' ').map(name => name[0]).join('')}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 text-sm">{relatedPost.author}</div>
                              <div className="text-xs text-slate-500">Solar Energy Expert</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <div className="flex items-center space-x-1">
                              <HiEye className="w-3 h-3" />
                              <span>2.1k</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <HiClock className="w-3 h-3" />
                              <span>{relatedPost.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 flex items-center justify-center group"
          >
            <HiChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPostPage;
