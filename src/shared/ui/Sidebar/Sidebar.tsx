import React, { useState } from 'react';

import { Icon } from '../Icons/Icon';

const Sidebar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleToggle = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col justify-between py-6 px-4">
      <nav className="flex flex-col gap-1">
        {/* 대시보드 */}
        <button
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-primary font-semibold text-[15px] hover:bg-gray-50 focus:bg-gray-100 transition-colors"
          type="button"
        >
          <Icon name="planet" className="w-5 h-5 text-blue-500" />
          <span className="text-blue-600">대시보드</span>
        </button>

        {/* 게시물 관리 */}
        <div>
          <button
            className="flex items-center gap-3 px-3 py-2 rounded-lg w-full hover:bg-gray-50 focus:bg-gray-100 transition-colors"
            type="button"
            onClick={() => handleToggle('post')}
          >
            <Icon name="box" className="w-5 h-5 text-gray-900" />
            <span className="flex-1 text-left text-gray-900">게시물 관리</span>
            <Icon
              name={openMenu === 'post' ? 'ChevronUp' : 'ChevronDown'}
              className="w-4 h-4 text-gray-500"
            />
          </button>
        </div>

        {/* 사용자 관리 */}
        <div>
          <button
            className={`flex items-center gap-3 px-3 py-2 rounded-lg w-full hover:bg-gray-50 focus:bg-gray-100 transition-colors ${openMenu === 'user' ? 'bg-gray-100' : ''}`}
            type="button"
            onClick={() => handleToggle('user')}
          >
            <Icon name="astronaut" className="w-5 h-5 text-gray-900" />
            <span className="flex-1 text-left text-gray-900">사용자 관리</span>
            <Icon
              name={openMenu === 'user' ? 'ChevronUp' : 'ChevronDown'}
              className="w-4 h-4 text-gray-500"
            />
          </button>
          {openMenu === 'user' && (
            <div className="ml-8 mt-1 flex flex-col gap-1">
              <button className="text-left px-2 py-1 rounded text-gray-900 hover:bg-gray-50">
                전체 사용자
              </button>
              <button className="text-left px-2 py-1 rounded text-gray-900 hover:bg-gray-50">
                비활성화된 사용자
              </button>
            </div>
          )}
        </div>

        {/* 금칙어 설정 */}
        <div>
          <button
            className="flex items-center gap-3 px-3 py-2 rounded-lg w-full hover:bg-gray-50 focus:bg-gray-100 transition-colors"
            type="button"
            onClick={() => handleToggle('banword')}
          >
            <Icon name="Package" className="w-5 h-5 text-gray-900" />
            <span className="flex-1 text-left text-gray-900">금칙어 설정</span>
            <Icon
              name={openMenu === 'banword' ? 'ChevronUp' : 'ChevronDown'}
              className="w-4 h-4 text-gray-500"
            />
          </button>
        </div>
      </nav>

      {/* 하단 Docs */}
      <div className="border-t pt-6 mt-6">
        <button
          className="flex items-center gap-3 px-3 py-2 rounded-lg w-full hover:bg-gray-50 focus:bg-gray-100 transition-colors"
          type="button"
        >
          <Icon name="box" className="w-5 h-5 text-gray-900" />
          <span className="text-gray-900">Docs</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
