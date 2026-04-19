import { useState, useMemo } from 'react';

export interface PostMeta {
  id: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

interface Props {
  posts: PostMeta[];
  allTags: string[];
}

export default function BlogList({ posts, allTags }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return posts.filter(post => {
      const matchesSearch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term);
      const matchesTags =
        activeTags.size === 0 || post.tags.some(tag => activeTags.has(tag));
      return matchesSearch && matchesTags;
    });
  }, [searchTerm, activeTags, posts]);

  function toggleTag(tag: string) {
    setActiveTags(prev => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-xs bg-transparent border-b border-white/15 pb-1 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors font-mono"
        />
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-[10px] font-mono px-2 py-0.5 border transition-colors ${
                activeTags.has(tag)
                  ? 'border-white/50 text-white/70'
                  : 'border-white/10 text-white/25 hover:border-white/30 hover:text-white/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-white/20 text-xs font-mono">no posts found.</p>
      ) : (
        <ul className="space-y-8">
          {filtered.map(post => (
            <li key={post.id}>
              <a href={`/blog/${post.id}`} className="group block">
                <div className="text-[10px] text-white/20 mb-1 font-mono">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <h2 className="text-white/70 group-hover:text-white/90 transition-colors text-sm font-mono mb-1">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-white/25 text-xs leading-relaxed font-mono">{post.excerpt}</p>
                )}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] text-white/15 border border-white/8 px-1.5 py-px font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
