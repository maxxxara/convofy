import { EventEmitter, on } from "events";
import { tracked } from "@trpc/server";

// Global event emitter for real-time updates
export const realtimeEvents = new EventEmitter();

// Helper function to create simple event subscriptions
export const createEventSubscription = (eventName: string) => {
  return async function* (opts: { signal?: AbortSignal }) {
    for await (const [data] of on(realtimeEvents, eventName, {
      signal: opts.signal,
    })) {
      yield tracked(`${eventName}-${Date.now()}`, data);
    }
  };
};

// Event types for your chat system
export const emitNewMessage = (sessionId: string) => {
  realtimeEvents.emit(`session:${sessionId}:new-message`);
};

export const emitSupportAssigned = (sessionId: string) => {
  realtimeEvents.emit(`session:${sessionId}:support-assigned`);
};

export const emitSessionUpdated = (sessionId: string) => {
  realtimeEvents.emit(`session:${sessionId}:updated`);
};

export const emitTyping = (
  sessionId: string,
  who: "user" | "support",
  isTyping: boolean
) => {
  realtimeEvents.emit(`session:${sessionId}:typing`, { who, isTyping });
};
