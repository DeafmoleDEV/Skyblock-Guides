import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import guidesRegistry from '../data/guides';

const GuideDetail = () => {
  const { id } = useParams();
  const guideMetadata = guidesRegistry.find(g => g.id === id);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (guideMetadata && guideMetadata.contentPath) {
      setLoading(true);
      fetch(`${import.meta.env.BASE_URL}${guideMetadata.contentPath}`)
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
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="text-xl font-bold text-white mb-4 uppercase">Guide Not Found</h1>
        <Link to="/guides" className="text-sm hover:underline">Return to Library</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/guides" className="text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-12 inline-block">
        ← Back
      </Link>

      <article>
        <header className="mb-12">
          <p className="text-[10px] font-bold text-necron uppercase tracking-[0.2em] mb-4">
            {guideMetadata.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-tight uppercase">
            {guideMetadata.title}
          </h1>

          <div className="flex items-center gap-4 text-[10px] font-medium uppercase text-slate-500 border-b border-white/5 pb-8">
            <span>By {guideMetadata.author}</span>
            <span>•</span>
            <span>{guideMetadata.date}</span>
          </div>
        </header>

        <div className="markdown-content">
          {loading ? (
            <div className="space-y-4">
              <div className="h-2 bg-white/5 rounded w-3/4"></div>
              <div className="h-2 bg-white/5 rounded w-full"></div>
            </div>
          ) : content ? (
            <div className="prose prose-invert prose-slate max-w-none 
              prose-headings:text-white prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight
              prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-base
              prose-strong:text-white
              prose-blockquote:border-l border-white/20 prose-blockquote:italic prose-blockquote:text-slate-400
              prose-li:text-slate-300
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-slate-500 italic text-sm">Content unavailable.</p>
          )}
        </div>
      </article>
    </div>
  );
};

export default GuideDetail;
