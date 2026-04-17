import { Link } from 'react-router-dom';
import type { NewsItem } from '../types';

type Props = {
  article: NewsItem;
};

const NewsCard = ({ article }: Props) => {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <Link to={`/news/${article._id}`} className="block overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="space-y-3 p-6">
        <Link
          to={`/news/${article._id}`}
          className="block text-xl font-semibold text-slate-950 transition hover:text-sky-600"
        >
          {article.title}
        </Link>
        <p className="text-slate-600 text-sm leading-6 overflow-hidden text-ellipsis">{article.description}</p>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">Read More</span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
