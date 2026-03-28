import { useState, useEffect } from "react";
import MonthlyIncomeCard from "@/components/Settings/MonthlyIncomeCard";
import IntegrationCard from "@/components/Settings/IntegrationCard";
import { Mail, Users } from "lucide-react";
import { getUserProfile } from "@/services/userService";
import API from "@/services/api";

const Settings = () => {
  const [gmailConnected, setGmailConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  useEffect(() => {
    // Load user profile to check if Gmail is already connected
    getUserProfile()
      .then((user) => {
        setGmailConnected(user.gmailConnected);
      })
      .catch((err) => console.error("Failed to load user:", err));

    // Check if we just came back from Google OAuth flow
    // Google redirects to /settings?gmail=connected after success
    const params = new URLSearchParams(window.location.search);

    if (params.get("gmail") === "connected") {
      setGmailConnected(true);
      setSyncResult(
        "Gmail connected successfully! Click Sync Now to import your expenses.",
      );
      // Clean the URL — remove query params without page reload
      window.history.replaceState({}, "", "/settings");
    }

    if (params.get("error") === "auth_failed") {
      setSyncResult("Gmail connection failed. Please try again.");
      window.history.replaceState({}, "", "/settings");
    }
  }, []);

  // Step 1 of Gmail flow — get OAuth URL from backend and redirect user
  const handleConnectGmail = async () => {
    try {
      const res = await API.get("/gmail/auth-url");
      // Redirect browser to Google's permission screen
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Failed to get Gmail auth URL:", error);
      setSyncResult("Failed to start Gmail connection. Please try again.");
    }
  };

  // Disconnect Gmail — clears tokens from database
  const handleDisconnectGmail = async () => {
    try {
      await API.post("/gmail/disconnect");
      setGmailConnected(false);
      setSyncResult(null);
    } catch (error) {
      console.error("Failed to disconnect Gmail:", error);
    }
  };

  // Sync Gmail — fetches emails and parses transactions
  const handleSyncGmail = async () => {
    setSyncing(true);
    setSyncResult(null);

    try {
      const res = await API.post("/gmail/sync");
      const { newExpenses, skipped } = res.data;

      if (newExpenses === 0) {
        setSyncResult(
          `Sync complete — No new expenses found. ${skipped} emails skipped.`,
        );
      } else {
        setSyncResult(
          `Sync complete — ${newExpenses} new expense${newExpenses > 1 ? "s" : ""} added from your bank emails. ${skipped} already existed.`,
        );
      }
    } catch (error) {
      setSyncResult("Sync failed. Please reconnect Gmail and try again.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-10 max-w-5xl">
      {/* ── Financial Preferences ─────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-lg font-semibold tracking-tight">
          Financial Preferences
        </h2>
        <p className="text-sm text-muted-foreground">
          Configure your income and budgeting setup.
        </p>
        <div className="rounded-2xl border border-border/40 bg-background/40 backdrop-blur-xl p-5 shadow-sm">
          <MonthlyIncomeCard />
        </div>
      </section>

      {/* ── Integrations ──────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-lg font-semibold tracking-tight">Integrations</h2>
        <p className="text-sm text-muted-foreground">
          Connect external services to automate your financial tracking.
        </p>

        <div className="grid gap-5 md:grid-cols-2 items-stretch">
          {/* Gmail Integration */}
          <div className="rounded-2xl border border-border/40 bg-background/40 backdrop-blur-xl p-5 shadow-sm hover:shadow-md transition-all">
            <IntegrationCard
              title="Gmail"
              description="Automatically parse bank transaction emails to track expenses."
              icon={<Mail className="h-5 w-5" />}
              connected={gmailConnected}
              onConnect={handleConnectGmail}
              onDisconnect={handleDisconnectGmail}
              onSync={handleSyncGmail}
              syncing={syncing}
              syncResult={syncResult}
            />
          </div>

          {/* Splitwise — manual entry only */}
          <div className="rounded-2xl border border-border/40 bg-background/40 backdrop-blur-xl p-5 shadow-sm opacity-80">
            <IntegrationCard
              title="Splitwise"
              description="Track shared expenses manually using the Split & Owe page."
              icon={<Users className="h-5 w-5" />}
              connected={false}
              comingSoon
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
