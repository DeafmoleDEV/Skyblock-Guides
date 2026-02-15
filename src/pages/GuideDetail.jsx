import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Clock, User, ChevronLeft, AlertTriangle, Share2, Bookmark } from 'lucide-react';
import guidesRegistry from '../data/guides';

const GuideDetail = () => {
  const { id } = useParams();
  const guideMetadata = guidesRegistry.find(g => g.id === id);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (guideMetadata && guideMetadata.contentPath) {
      setLoading(true);
      fetch(guideMetadata.contentPath)
        .then(res => res.text())
        .then(text => {
          setContent(text);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load guide:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, guideMetadata]);

  if (!guideMetadata) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <AlertTriangle className="w-16 h-16 text-necron mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-4">Guide Not Found</h1>
        <p className="text-slate-400 mb-8">The guide you are looking for doesn't exist or hasn't been added yet.</p>
        <Link to="/guides" className="text-diamond hover:underline flex items-center justify-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Return to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/guides" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Library
      </Link>

      <article>
        {/* Blog Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-necron/10 text-necron text-[10px] font-black uppercase tracking-widest border border-necron/20">
              {guideMetadata.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
            {guideMetadata.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-slate-800/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-necron to-gold flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {guideMetadata.author.charAt(0)}
              </div>
              <div>
                <p className="text-white font-bold text-sm">{guideMetadata.author}</p>
                <div className="flex items-center gap-3 text-slate-500 text-xs">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {guideMetadata.date}</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Blog Content (Markdown) */}
        <div className="markdown-content">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              <div className="h-4 bg-slate-800 rounded w-full"></div>
              <div className="h-4 bg-slate-800 rounded w-5/6"></div>
            </div>
          ) : content ? (
            <div className="prose prose-invert prose-slate max-w-none 
              prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-800
              prose-p:text-slate-300 prose-p:leading-normal prose-p:text-lg
              prose-strong:text-white prose-strong:font-bold
              prose-blockquote:border-l-4 prose-blockquote:border-necron prose-blockquote:bg-slate-900/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
              prose-table:bg-slate-900/30 prose-table:rounded-xl prose-table:overflow-hidden
              prose-th:bg-slate-800/50 prose-th:px-4 prose-th:py-3 prose-th:text-white
              prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-slate-800/50
              prose-code:text-diamond prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-li:text-slate-300
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-slate-500 italic">This guide content is currently empty or still being written.</p>
          )}
        </div>
        
        <footer className="mt-20 pt-10 border-t border-slate-800/50">
          <div className="bg-slate-900/30 rounded-2xl p-8 text-center">
            <h4 className="text-xl font-bold text-white mb-2">Was this guide helpful?</h4>
            <p className="text-slate-400 mb-6 text-sm">Join our community Discord to discuss strategies with other players.</p>
            <a 
              href="https://discord.gg/5humW7QHkK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-necron text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-necron/20"
            >
              Join Discord
            </a>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default GuideDetail;
