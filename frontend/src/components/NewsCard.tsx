import { Link } from 'react-router-dom';
import type { NewsItem } from '../types';

type Props = {
  article: NewsItem;
};

const NewsCard = ({ article }: Props) => {
  return (
    <article className="group overflow-hidden rounded-xl sm:rounded-[2rem] border border-purple-200/60 bg-gradient-to-b from-white via-purple-50/30 to-amber-50/30 shadow-lg sm:shadow-xl shadow-purple-900/10 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/20 animate-fade-in flex flex-col">
      <Link to={`/news/${article._id}`} className="block overflow-hidden flex-shrink-0">
        <img
          src={article.imageUrl}
          alt={article.title}
          loading="lazy"
          className="h-40 sm:h-52 w-full object-cover transition duration-700 group-hover:scale-110 brightness-95 group-hover:brightness-100"
        />
      </Link>
      <div className="space-y-2 sm:space-y-3 p-3 sm:p-6 flex-1 flex flex-col">
        <Link
          to={`/news/${article._id}`}
          className="block text-base sm:text-xl font-semibold text-purple-900 transition hover:text-amber-600 line-clamp-2"
        >
          {article.title}
        </Link>
        <p className="text-purple-700 text-xs sm:text-sm leading-5 sm:leading-6 overflow-hidden line-clamp-2 flex-1">{article.description}</p>
        <div className="flex items-center justify-between text-xs sm:text-sm text-purple-600 pt-2 border-t border-purple-200/40">
          <span className="text-purple-500">{new Date(article.createdAt).toLocaleDateString()}</span>
          <Link to={`/news/${article._id}`} className="rounded-full bg-amber-100/80 px-2.5 sm:px-3 py-1 text-xs sm:text-sm text-amber-700 font-medium hover:bg-amber-200 transition">Read More</Link>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
