import type { Metadata } from "next";

import { PageHeader } from "@/components/ui-blocks/page-header";
import { Section } from "@/components/ui-blocks/section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Weekly class timetable at Calimuv.",
};

// Static weekly timetable. Edit these rows to update the schedule.
// (When you want to manage this from the admin dashboard, we can add a table.)
const schedule = [
  { time: "6:00 AM", mon: "Foundations", tue: "Mobility", wed: "Foundations", thu: "Skills", fri: "Foundations", sat: "Open Gym", sun: "—" },
  { time: "8:00 AM", mon: "Strength", tue: "Skills", wed: "Strength", thu: "Mobility", fri: "Strength", sat: "Workshop", sun: "Open Gym" },
  { time: "5:00 PM", mon: "Skills", tue: "Foundations", wed: "Skills", thu: "Foundations", fri: "Skills", sat: "—", sun: "—" },
  { time: "7:00 PM", mon: "Advanced", tue: "Strength", wed: "Advanced", thu: "Strength", fri: "Advanced", sat: "—", sun: "—" },
];

const days = [
  ["mon", "Mon"],
  ["tue", "Tue"],
  ["wed", "Wed"],
  ["thu", "Thu"],
  ["fri", "Fri"],
  ["sat", "Sat"],
  ["sun", "Sun"],
] as const;

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        title="Weekly Schedule"
        subtitle="Drop in to any class that fits your routine. Times may vary on holidays."
      />
      <Section>
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-24">Time</TableHead>
                {days.map(([, label]) => (
                  <TableHead key={label} className="min-w-28">
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((row) => (
                <TableRow key={row.time}>
                  <TableCell className="font-medium">{row.time}</TableCell>
                  {days.map(([key]) => (
                    <TableCell key={key} className="text-muted-foreground">
                      {row[key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Want a personalised plan?{" "}
          <a href="/contact" className="text-primary hover:underline">
            Get in touch
          </a>
          .
        </p>
      </Section>
    </>
  );
}
