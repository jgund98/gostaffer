"use client";

import { useState } from "react";
import { ChevronLeft, Send, Hash, User } from "lucide-react";
import { PageHead, Card, Avatar, initialsOf } from "@/components/portal/ui";
import { CONVERSATIONS, MESSAGES_BY_CONV, byClient } from "@/lib/portal-data";
import { cn } from "@/lib/utils";

export default function AgentMessagesPage() {
  const conversations = byClient(CONVERSATIONS, "acme");
  const [selectedId, setSelectedId] = useState<string>(conversations[0]?.id ?? "");
  const [draft, setDraft] = useState("");

  const selected = conversations.find((c) => c.id === selectedId);
  const messages = MESSAGES_BY_CONV[selectedId] ?? [];

  function send() {
    // stub — clears the input only
    setDraft("");
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Messages" sub="Your team and campaign channels." />

      <div className="grid gap-4 lg:grid-cols-[18rem_1fr]">
        {/* Conversation list — hidden on mobile when a thread is open */}
        <Card className={cn("overflow-hidden p-2", selectedId ? "hidden lg:block" : "block")}>
          <ul className="flex flex-col">
            {conversations.map((c) => {
              const active = c.id === selectedId;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(c.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                      active ? "bg-blade-tint" : "hover:bg-mist"
                    )}
                  >
                    <Avatar initials={initialsOf(c.name)} grad="from-[#1f9e68] to-[#2fd39e]" size={38} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        {c.type === "campaign" ? (
                          <Hash className="h-3.5 w-3.5 shrink-0 text-blade-700" />
                        ) : (
                          <User className="h-3.5 w-3.5 shrink-0 text-slate" />
                        )}
                        <span className="truncate text-sm font-semibold text-ink">{c.name}</span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-slate">{c.preview}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="text-xs text-mute">{c.last}</span>
                      {c.unread > 0 && (
                        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-blade-700 px-1.5 text-xs font-bold text-white tnum">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>

        {/* Thread view */}
        <Card className="flex min-h-[28rem] flex-col overflow-hidden">
          {/* Thread header — back affordance shows on mobile */}
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <button
              type="button"
              onClick={() => setSelectedId("")}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate hover:bg-mist hover:text-ink lg:hidden"
              aria-label="Back to conversations"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {selected && (
              <>
                <Avatar initials={initialsOf(selected.name)} grad="from-[#1f9e68] to-[#2fd39e]" size={32} />
                <span className="truncate font-display text-sm font-semibold text-ink">{selected.name}</span>
              </>
            )}
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => {
              const mine = m.type === "agent";
              return (
                <div key={i} className={cn("flex flex-col", mine ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3.5 py-2.5",
                      mine ? "bg-blade-tint text-ink" : "border border-line bg-bone text-ink"
                    )}
                  >
                    {!mine && <p className="mb-0.5 text-xs font-semibold text-blade-700">{m.who}</p>}
                    <p className="text-sm leading-relaxed">{m.text}</p>
                  </div>
                  <span className="mt-1 px-1 text-xs text-mute">{m.time}</span>
                </div>
              );
            })}
            {messages.length === 0 && (
              <p className="m-auto text-sm text-mute">No messages yet.</p>
            )}
          </div>

          {/* Composer */}
          <div className="flex items-center gap-2 border-t border-line p-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Type a message…"
              className="min-w-0 flex-1 rounded-xl border border-line bg-mist px-3.5 py-2.5 text-sm text-ink placeholder:text-mute focus:border-blade-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={send}
              className="btn-electric inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
