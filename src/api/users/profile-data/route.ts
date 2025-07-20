import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      where: {
        role: {
          in: ['ROLE_USER', 'ROLE_REPORTED'],
        },
        is_active: true,
      },
      include: {
        profile_photo: true,
        user_plans: {
          include: {
            plans: true,
          },
        },
        trade_histories: {
          where: {
            status: {
              in: ['PURCHASE', 'SALE'],
            },
            created_at: {
              gte: dayjs().subtract(7, 'day').toDate(),
            },
          },
        },
        trade_posts: true,
      },
    });

    const result = users.map((user) => {
      const trades = user.trade_histories ?? [];
      const posts = user.trade_posts ?? [];

      // type 계산
      const sales = trades.filter((t) => t.status === 'SALE').length;
      const purchases = trades.filter((t) => t.status === 'PURCHASE').length;
      const type = sales >= purchases ? 'seller' : 'purchaser';

      // avg_zet 계산 (zet_per_unit 평균)
      const zetValues = posts
        .map((post) => post.zet_per_unit)
        .filter((v): v is number => v !== null);
      const avg_zet = zetValues.length
        ? parseFloat((zetValues.reduce((sum, v) => sum + v, 0) / zetValues.length).toFixed(2))
        : 0;

      // data_gb 계산 (sell_mobile_data_capacity_gb 평균)
      const gbValues = posts
        .map((post) => post.sell_mobile_data_capacity_gb)
        .filter((v): v is number => v !== null);
      const data_gb = gbValues.length
        ? parseFloat((gbValues.reduce((sum, v) => sum + v, 0) / gbValues.length).toFixed(2))
        : 0;

      // trade_frequency 계산 (최근 7일 내 거래 수)
      const trade_frequency = trades.length;

      // last_trade_diff_days 계산
      const lastTradeDate = trades.reduce(
        (latest, t) => {
          if (!t.created_at) return latest;
          return latest && latest > t.created_at ? latest : t.created_at;
        },
        null as Date | null,
      );
      const last_trade_diff_days = lastTradeDate ? dayjs().diff(lastTradeDate, 'day') : null;

      // carrier 및 mobile_data_type 계산 (가장 많이 등장한 값)
      const carrierCount: Record<string, number> = {};
      const dataTypeCount: Record<string, number> = {};

      const userPlans = Array.isArray(user.user_plans)
        ? user.user_plans
        : [user.user_plans].filter(Boolean);
      userPlans.forEach((plan) => {
        if (plan?.plans?.carrier) {
          const key = plan.plans.carrier;
          carrierCount[key] = (carrierCount[key] || 0) + 1;
        }
        if (plan?.plans?.mobile_data_type) {
          const key = plan.plans.mobile_data_type;
          dataTypeCount[key] = (dataTypeCount[key] || 0) + 1;
        }
      });

      const carrier = Object.entries(carrierCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
      const mobile_data_type_raw = Object.entries(dataTypeCount).sort(
        (a, b) => b[1] - a[1],
      )[0]?.[0];
      const mobile_data_type = mobile_data_type_raw === 'G' ? '5G' : (mobile_data_type_raw ?? null);

      return {
        user_id: user.id,
        name: user.name ?? 'Unknown',
        type,
        profile_photo_url: user.profile_photo?.profile_photo_url ?? '',
        avg_zet,
        data_gb,
        trade_frequency,
        last_trade_diff_days,
        carrier,
        mobile_data_type,
        role: user.role === 'ROLE_REPORTED' ? 'reported' : 'active',
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('사용자 추천 데이터 조회 실패:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
