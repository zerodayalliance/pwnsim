import {
  getNetworkState,
  subscribeNetworkEvents,
  NetworkEvent,
} from "@/lib/pwnState";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const encoder = new TextEncoder();

  let unsubscribe: (() => void) | null = null;
  let heartbeatInterval: NodeJS.Timeout | null = null;

  const stream = new ReadableStream({
    start(controller) {
      // Send initial status immediately upon connection
      const initialEvent: NetworkEvent = {
        type: "status",
        state: getNetworkState(),
        timestamp: Date.now(),
      };
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(initialEvent)}\n\n`)
      );

      // Subscribe to real-time events across the server process
      unsubscribe = subscribeNetworkEvents((event: NetworkEvent) => {
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
          );
        } catch {
          // Stream might be closed
        }
      });

      // Keep-alive heartbeat every 15s to keep connections alive through proxies
      heartbeatInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: ping\n\n`));
        } catch {
          if (heartbeatInterval) clearInterval(heartbeatInterval);
        }
      }, 15000);
    },
    cancel() {
      if (unsubscribe) unsubscribe();
      if (heartbeatInterval) clearInterval(heartbeatInterval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
