import React from 'react';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack }) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Image Background */}
      <div className="relative h-80 w-full">
         <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
          
          <div className="absolute top-8 left-0 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-blue-200 font-medium transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
      </div>

      {/* Content Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 md:p-12">
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed">
            {post.content}
          </div>

          {/* Footer Share */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
             <p className="text-slate-400 text-sm font-medium">Gostou da dica?</p>
             <button className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium text-sm">
                <Share2 className="w-4 h-4" />
                Compartilhar
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};