import { trpc } from "@/utils/trpc";
import type { SessionGetAll } from "@/utils/types";

export const useWidgetSubscriptions = ({
  session,
  postInitSession,
  setSession,
  botId,
  refetchMessages,
  setIsTyping,
}: {
  session: SessionGetAll | null;
  postInitSession: (input: {
    botId: string;
    sessionId: string;
    userId: string;
  }) => Promise<SessionGetAll>;
  setSession: (session: SessionGetAll) => void;
  botId: string;
  refetchMessages: () => void;
  setIsTyping: (isTyping: boolean) => void;
}) => {
  // Support assigned
  trpc.widget.onSupportAssignedSession.useSubscription(
    { sessionId: session?.sessions.id || "" },
    {
      enabled: !!session?.sessions.id,
      onData: async () => {
        if (session?.sessions.id) {
          const result = await postInitSession({
            botId,
            sessionId: session.sessions.id,
            userId: `widget-${Date.now()}`,
          });
          setSession(result);
          localStorage.setItem(`convofy-session`, result.sessions.id);
        }
      },
    }
  );

  // New message received
  trpc.widget.onNewMessage.useSubscription(
    { sessionId: session?.sessions.id || "" },
    {
      enabled: !!session?.sessions.id,
      onData: async () => {
        if (session?.sessions.id) {
          refetchMessages();
        }
      },
    }
  );

  trpc.session.onTyping.useSubscription(
    { sessionId: session?.sessions.id || "" },
    {
      enabled: !!session?.sessions.id,
      onData: async (data) => {
        if (data.data.who === "support") {
          setIsTyping(data.data.isTyping);
        }
      },
    }
  );
};
