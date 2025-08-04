'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { zetRecoveryAPI } from '@/backend';
import type { ZetRecoveryRequest } from '@/backend/types/zetRecovery';
import { Header, Sidebar } from '@/shared';

export default function ZetRecoveryPage() {
  const [userId, setUserId] = useState('');
  const [zetAmount, setZetAmount] = useState('');
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    const userIdNum = parseInt(userId);
    const zetAmountNum = parseInt(zetAmount);

    if (!userIdNum || userIdNum <= 0) {
      toast.error('올바른 사용자 ID를 입력해주세요.');
      return;
    }

    if (!zetAmountNum || zetAmountNum <= 0) {
      toast.error('올바른 ZET 금액을 입력해주세요.');
      return;
    }

    if (!orderId.trim()) {
      toast.error('주문 ID를 입력해주세요.');
      return;
    }

    setIsProcessing(true);

    try {
      const requestData: ZetRecoveryRequest = {
        userId: userIdNum,
        recoveryZet: zetAmountNum,
        orderId: orderId.trim(),
      };

      const response = await zetRecoveryAPI.recoverZet(requestData);

      if (response.statusCode === 200) {
        toast.success(
          `사용자 ID ${userIdNum}에게 ${zetAmountNum.toLocaleString()} ZET 복구가 완료되었습니다.`,
        );
        // 폼 초기화
        setUserId('');
        setZetAmount('');
        setOrderId('');
      } else {
        toast.error(response.message || 'ZET 복구에 실패했습니다.');
      }
    } catch (error: unknown) {
      console.error('ZET 복구 오류:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'ZET 복구 처리 중 오류가 발생했습니다.';
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid =
    userId && zetAmount && orderId && !isNaN(parseInt(userId)) && !isNaN(parseInt(zetAmount));

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Admin" />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">ZET 복구 관리</h1>
            <div className="max-w-2xl">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">ZET 복구 처리</h2>

                  <div className="space-y-6">
                    {/* 사용자 ID 입력 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        사용자 ID
                      </label>
                      <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="사용자 ID를 입력하세요"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isProcessing}
                      />
                    </div>

                    {/* 복구할 ZET 금액 입력 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        복구할 ZET 금액
                      </label>
                      <input
                        type="number"
                        value={zetAmount}
                        onChange={(e) => setZetAmount(e.target.value)}
                        placeholder="복구할 ZET 금액을 입력하세요"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isProcessing}
                      />
                    </div>

                    {/* 주문 ID 입력 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        주문 ID
                      </label>
                      <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="주문 ID를 입력하세요"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isProcessing}
                      />
                    </div>

                    {/* 확인 버튼 */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleSubmit}
                        disabled={!isFormValid || isProcessing}
                        className={`px-6 py-2 rounded-md font-medium ${
                          isFormValid && !isProcessing
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isProcessing ? '처리 중...' : 'ZET 복구하기'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 사용 안내 */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">사용 안내</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 관리자 권한으로 사용자의 ZET를 복구합니다.</li>
                  <li>• 모든 필드는 필수 입력 항목입니다.</li>
                  <li>• 주문 ID는 결제 시스템과 연동을 위해 필요합니다.</li>
                  <li>• 복구 후에는 해당 사용자에게 알림이 전송됩니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
