import { useMemo } from "react";
import { AiOperation, useGetCreditPricingQuery, useGetCreditWalletQuery } from "../api/billingApi";

export type CreditStatus = "ok" | "low" | "empty";

/** Fraction of lifetime credits below which the balance counts as "low". */
const LOW_THRESHOLD = 0.2;

/**
 * Single source of truth for the user's AI credit wallet.
 * Every consumer shares one RTK Query cache entry, so the header pill,
 * profile popup, AI assistant and billing page always show the same number.
 * The wallet refetches after every AI action (see creditsEvents.ts).
 */
export const useCredits = () => {
  const { data, isLoading, isError, refetch } = useGetCreditWalletQuery(undefined, {
    refetchOnFocus: true,
  });

  return useMemo(() => {
    const remaining = data?.balance ?? 0;
    const totalCredited = data?.totalCredited ?? 0;
    const used = data?.totalConsumed ?? 0;
    const usedPercent = totalCredited > 0 ? Math.min(100, (used / totalCredited) * 100) : 0;

    let status: CreditStatus = "ok";
    if (data) {
      if (remaining <= 0) status = "empty";
      else if (totalCredited > 0 && remaining / totalCredited < LOW_THRESHOLD) status = "low";
    }

    return {
      wallet: data,
      remaining,
      totalCredited,
      used,
      usedPercent,
      status,
      isLoading,
      isError,
      refetch,
      hasEnough: (cost: number) => remaining >= cost,
    };
  }, [data, isLoading, isError, refetch]);
};

/**
 * Number of `size`-sized blocks for `count` items (at least 1).
 * Mirrors `perBlock` in the backend's ai-credits middleware.
 */
export const perBlock = (count: number | undefined, size: number) =>
  Math.max(1, Math.ceil((count && count > 0 ? count : size) / size));

/**
 * Credits an AI action will cost, and whether the user can afford it.
 * `cost` is null until pricing has loaded (or if the operation isn't priced),
 * in which case `canAfford` stays true so the button isn't blocked; the
 * server still enforces the balance and returns 402 if it's too low.
 */
export const useCreditCost = (operation: AiOperation | null, units = 1) => {
  const { data: pricing, isLoading: pricingLoading } = useGetCreditPricingQuery();
  const { wallet, remaining, isLoading: walletLoading } = useCredits();

  const perUnit = operation ? pricing?.[operation] : undefined;
  const cost = perUnit === undefined ? null : perUnit * Math.max(1, Math.ceil(units));
  const canAfford = cost === null || !wallet || remaining >= cost;

  return {
    cost,
    remaining,
    canAfford,
    isLoading: pricingLoading || walletLoading,
  };
};

export const creditStatusColor: Record<CreditStatus, string> = {
  ok: "#4F39F6",
  low: "#F59E0B",
  empty: "#EF4444",
};
