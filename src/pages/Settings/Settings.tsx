import MonthlyIncomeCard from "@/components/Settings/MonthlyIncomeCard";
import IntegrationCard from "@/components/Settings/IntegrationCard";
import { Mail, Link } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-8">
      {/* Financial Preferences */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Financial Preferences</h2>

        <MonthlyIncomeCard />
      </section>

      {/* Integrations */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Integrations</h2>

        <IntegrationCard
          title="Gmail"
          description="Automatically track expenses from payment emails."
          icon={<Mail className="h-5 w-5" />}
          connected={true}
        />

        <IntegrationCard
          title="SplitWise"
          description="Import shared expenses and debts."
          icon={<Link className="h-5 w-5" />}
          connected={false}
        />
      </section>
    </div>
  );
};

export default Settings;
