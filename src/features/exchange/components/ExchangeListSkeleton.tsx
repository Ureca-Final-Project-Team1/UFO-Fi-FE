export const ExchangeListSkeleton = () => {
  return (
    <div className="w-full px-3" aria-label="게시물 로딩 중">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="relative w-full mb-5" role="presentation" aria-hidden="true">
            <div className="relative z-10 p-4 rounded-2xl bg-[#0E213F] shadow-md border border-[#175F89] flex flex-col min-h-[200px] animate-pulse">
              <div className="flex flex-row gap-2 justify-between mb-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                <div className="flex flex-col items-end space-y-1">
                  <div className="flex gap-1">
                    <div className="w-6 h-4 bg-gray-600 rounded"></div>
                    <div className="w-8 h-4 bg-gray-600 rounded"></div>
                  </div>
                  <div className="w-12 h-3 bg-gray-600 rounded"></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="w-full h-4 bg-gray-600 rounded mb-1"></div>
                <div className="w-3/4 h-4 bg-gray-600 rounded"></div>
              </div>
              <div className="mt-auto space-y-2">
                <div className="flex justify-between">
                  <div className="w-12 h-5 bg-gray-600 rounded"></div>
                  <div className="w-16 h-5 bg-gray-600 rounded"></div>
                </div>
                <div className="w-20 h-3 bg-gray-600 rounded"></div>
                <div className="flex justify-between items-center">
                  <div className="w-16 h-6 bg-gray-600 rounded"></div>
                  <div className="size-6 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Stone 받침대 */}
            <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 z-0 w-[260px] h-[70px] bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
