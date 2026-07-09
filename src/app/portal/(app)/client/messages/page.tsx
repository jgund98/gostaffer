"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { PageHead, Card, Pill, Avatar, initialsOf } from "@/components/portal/ui";
import {
  CONVERSATIONS,
  MESSAGES_BY_CONV,
  type Conversation,
  type Msg,
} from "@/lib/portal-data";
import { cn } from "@/lib/utils";

const CLIENT_ID = "acme";
const PEOPLE_GRAD = "from-[#1f9e68] to-[#2fd39e]";

function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-line px-4 py-3">
        <h2 className="font-display text-sm font-semibold text-ink">Conversations</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((c) => {
          const active = c.id === selectedId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={cn(
                "flex w-full items-start gap-3 border-b border-line px-4 py-3 text-left transition-colors last:border-0",
                active ? "bg-blade-tint" : "hover:bg-bone"
              )}
            >
              <Avatar initials={initialsOf(c.name)} grad={PEOPLE_GRAD} size={36} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate font-medium text-ink">{c.name}</span>
                  <span className="shrink-0 text-xs text-mute">{c.last}</span>
                </span>
                <span className="mt-1 flex items-center gap-2">
                  <Pill tone={c.type === "campaign" ? "blue" : "violet"}>
                    {c.type === "campaign" ? "Campaign" : "Supervisor"}
                  </Pill>
                  {c.unread > 0 && (
                    <span className="ml-auto grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-blade-500 px-1.5 text-[0.68rem] font-semibold text-white">
                      {c.unread}
                    </span>
                  )}
                </span>
                <span className="mt-1 block truncate text-xs text-slate">
                  {c.preview}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function Thread({
  messages,
  onSend,
}: {
  messages: Msg[];
  onSend: (text: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const submit = () => {
    if (!draft.trim()) return;
    onSend(draft);
    setDraft("");
  };
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((m, i) => {
          // From the client's perspective, their own ("client") messages go right.
          const mine = m.type === "client";
          return (
            <div
              key={i}
              className={cn("flex flex-col gap-1", mine ? "items-end" : "items-start")}
            >
              <span className="px-1 text-xs font-medium text-mute">{m.who}</span>
              <span
                className={cn(
                  "max-w-[78%] rounded-2xl px-3.5 py-2 text-sm",
                  mine
                    ? "rounded-br-sm bg-blade-tint text-blade-700"
                    : "rounded-bl-sm bg-bone text-ink"
                )}
              >
                {m.text}
              </span>
              <span className="px-1 text-[0.68rem] text-mute">{m.time}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 border-t border-line p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          placeholder="Message your success team…"
          className="flex-1 rounded-xl border border-line bg-paper px-3.5 py-2 text-sm text-ink outline-none placeholder:text-mute focus:border-blade-500/50"
        />
        <button
          onClick={submit}
          className="btn-electric inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-white"
        >
          <Send className="h-4 w-4" />
          Send
        </button>
      </div>
    </Card>
  );
}

export default function ClientMessagesPage() {
  const conversations = CONVERSATIONS.filter((c) => c.clientId === CLIENT_ID);
  const [selectedId, setSelectedId] = useState(conversations[0]?.id ?? "");
  const messages = MESSAGES_BY_CONV[selectedId] ?? [];

  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Messages" sub="Chat with your GoStaffer success team." />
      <div className="grid h-[70vh] grid-cols-1 gap-4 lg:grid-cols-[20rem_1fr]">
        <ConversationList
          conversations={conversations}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <Thread key={selectedId} messages={messages} onSend={() => {}} />
      </div>
    </div>
  );
}
