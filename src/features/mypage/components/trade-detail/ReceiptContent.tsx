import Image from 'next/image';

import { PurchaseDetail } from '@/api/services/mypage/purchaseDetail';
import { ICON_PATHS, IMAGE_PATHS } from '@/constants';
import { Icon } from '@/shared';

import { formatDate, getCarrierIcon } from '../../utils/tradeDetail';

interface ReceiptContentProps {
  purchaseDetail: PurchaseDetail;
}

export const ReceiptContent = ({ purchaseDetail }: ReceiptContentProps) => {
  return (
    <div className="w-full flex items-center justify-center mt-8 relative">
      <Image src={IMAGE_PATHS['RECEIPT']} alt="receipt" width={350} height={350} />

      {/* 영수증 내용 */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-64 text-center">
        {/* UFO-Fi 타이틀 */}
        <div className="mb-10">
          <Icon src={ICON_PATHS.UFO_LOGO} alt="UFO Logo" size="3xl" />
          <div className="text-3xl font-bold text-gray-800">UFO-Fi</div>
        </div>
        <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-3"></div>

        {/* 주문번호 */}
        <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-3">
          <span className="text-sm text-gray-600">주문번호</span>
          <span className="text-sm font-medium text-black">{purchaseDetail.purchaseHistoryId}</span>
        </div>

        {/* 상품 정보 */}
        <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-3">
          <span className="text-sm text-gray-600">상품 정보</span>
          <span className="text-sm font-medium text-black flex items-center gap-1">
            <Icon
              src={getCarrierIcon(purchaseDetail.carrier)!}
              alt={purchaseDetail.carrier}
              className="w-3 h-3 object-contain"
            />
            {purchaseDetail.totalGB}GB
          </span>
        </div>

        {/* 구매 일자 */}
        <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-3">
          <span className="text-sm text-gray-600">구매 일자</span>
          <span className="text-sm font-medium text-black">
            {formatDate(purchaseDetail.createdAt)}
          </span>
        </div>

        {/* 총 ZET */}
        <div className="flex justify-between border-b-2 border-dotted border-gray-400 pb-1 mb-8">
          <span className="text-sm text-gray-600">구입 가격</span>
          <span className="text-sm font-medium text-black">{purchaseDetail.totalZet} ZET</span>
        </div>
      </div>
    </div>
  );
};
