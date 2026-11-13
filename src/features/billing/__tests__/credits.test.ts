import { describe, it, expect, vi, afterEach } from "vitest";
import { perBlock } from "../hooks/useCredits";
import { notifyAiCreditsChanged, onAiCreditsChanged } from "../creditsEvents";
import { createChapter } from "../../ai-assistant/services/aiAssistant.api";

describe("perBlock (mirrors backend unit pricing)", () => {
  it.each([
    [3, 3, 1],
    [4, 3, 2],
    [10, 3, 4],
    [1, 5, 1],
    [6, 5, 2],
    [0, 5, 1],
    [undefined, 2, 1],
  ])("count=%s size=%s → %s units", (count, size, expected) => {
    expect(perBlock(count, size)).toBe(expected);
  });
});

describe("AI credit refresh after AI actions", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("notifies listeners once on success", async () => {
    const listener = vi.fn();
    const off = onAiCreditsChanged(listener);
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as unknown as Response);

    await createChapter({ courseId: 1, title: "t", description: "d", noOfLessons: 3, contentTypes: ["quiz"] } as any);

    expect(listener).toHaveBeenCalledTimes(1);
    off();
  });

  it("notifies again after a failure so the refund shows up", async () => {
    vi.useFakeTimers();
    const listener = vi.fn();
    const off = onAiCreditsChanged(listener);
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 402,
      statusText: "Payment Required",
      json: async () => ({ message: "Insufficient AI credits: this operation needs 54 credits, you have 10." }),
    } as unknown as Response);

    await expect(
      createChapter({ courseId: 1, title: "t", description: "d", noOfLessons: 3, contentTypes: ["quiz"] } as any)
    ).rejects.toThrow("Insufficient AI credits");

    expect(listener).toHaveBeenCalledTimes(1);
    vi.runAllTimers();
    expect(listener).toHaveBeenCalledTimes(2);
    off();
  });

  it("stops notifying after unsubscribe", () => {
    const listener = vi.fn();
    onAiCreditsChanged(listener)();
    notifyAiCreditsChanged();
    expect(listener).not.toHaveBeenCalled();
  });
});
