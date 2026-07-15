import { Check } from "lucide-react";

import { ButtonLink } from "@/components/ui-blocks/button-link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Pricing } from "@/lib/types";
import { cn } from "@/lib/utils";

const CURRENCY_SYMBOL: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export function PricingCard({ plan }: { plan: Pricing }) {
  const symbol = CURRENCY_SYMBOL[plan.currency] || `${plan.currency} `;
  // price comes as a decimal string like "2000.00" — drop trailing .00
  const price = Number(plan.price).toLocaleString("en-IN");

  return (
    <Card
      className={cn(
        "relative flex flex-col p-6",
        plan.is_featured && "border-primary shadow-lg ring-1 ring-primary"
      )}
    >
      {plan.is_featured && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}
      <h3 className="text-lg font-semibold">{plan.plan_name}</h3>
      {plan.description && (
        <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
      )}
      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-4xl font-bold">
          {symbol}
          {price}
        </span>
        {plan.billing_period && (
          <span className="text-sm text-muted-foreground">/{plan.billing_period}</span>
        )}
      </div>
      {plan.features && plan.features.length > 0 && (
        <ul className="mt-6 flex-1 space-y-3 text-sm">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}
      <ButtonLink
        href="/join"
        className="mt-6 w-full"
        variant={plan.is_featured ? "default" : "outline"}
      >
        Choose {plan.plan_name}
      </ButtonLink>
    </Card>
  );
}
