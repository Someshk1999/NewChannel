const Loading = () => (
  <div className="flex min-h-[200px] sm:min-h-[240px] items-center justify-center rounded-xl sm:rounded-2xl border border-dashed border-purple-300 bg-gradient-to-br from-purple-50 to-amber-50 p-6 sm:p-8 text-purple-600 shadow-sm animate-pulse">
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <div className="text-2xl sm:text-3xl animate-float">✨</div>
      <span className="font-semibold text-sm sm:text-base text-center">Loading divine wisdom...</span>
    </div>
  </div>
);

export default Loading;
