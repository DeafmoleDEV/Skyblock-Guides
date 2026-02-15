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
        <h1 className="text-xl font-bold text-heading mb-4 uppercase">Guide Not Found</h1>
        <Link to="/guides" className="text-sm hover:underline">Return to Library</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link to="/guides" className="text-xs uppercase tracking-widest text-secondary hover:text-heading transition-colors mb-12 inline-block">
        ← Back
      </Link>

      <article>
        <header className="mb-12">
          <p className="text-[10px] font-bold text-necron uppercase tracking-[0.2em] mb-4">
            {guideMetadata.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-heading mb-8 tracking-tight leading-tight uppercase">
            {guideMetadata.title}
          </h1>

          <div className="flex items-center gap-4 text-[10px] font-medium uppercase text-muted border-b border-card-border pb-8">
            <span>By {guideMetadata.author}</span>
            <span>•</span>
            <span>{guideMetadata.date}</span>
          </div>
        </header>

        <div className="markdown-content">
          {loading ? (
            <div className="space-y-4">
              <div className="h-2 bg-card-border rounded w-3/4"></div>
              <div className="h-2 bg-card-border rounded w-full"></div>
            </div>
          ) : content ? (
            <div className="prose max-w-none 
              prose-headings:text-heading prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight
              prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-primary prose-p:leading-relaxed prose-p:text-base
              prose-strong:text-heading
              prose-blockquote:border-l prose-blockquote:border-card-hover-border prose-blockquote:italic prose-blockquote:text-secondary
              prose-li:text-primary
            ">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-muted italic text-sm">Content unavailable.</p>
          )}
        </div>
      </article>
    </div>
  );
};

export default GuideDetail;
