/**
 * Tiny pub/sub so plain-fetch AI calls can tell the app the wallet changed
 * without importing the Redux store (which would create an import cycle).
 * The store subscribes once and invalidates the "Credits" RTK Query tag.
 */
type Listener = () => void;

const listeners = new Set<Listener>();

export const onAiCreditsChanged = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Delay before a second refetch after a failed AI call (the refund settles after the response). */
const REFUND_SETTLE_MS = 1500;

/**
 * Call after every AI request. Credits are reserved before the AI runs and,
 * on failure, refunded just after the response is sent, so a failed call
 * refetches twice: now, and again once the refund has landed.
 */
export const notifyAiCreditsChanged = ({ failed = false }: { failed?: boolean } = {}) => {
  listeners.forEach((l) => l());
  if (failed) {
    setTimeout(() => listeners.forEach((l) => l()), REFUND_SETTLE_MS);
  }
};
