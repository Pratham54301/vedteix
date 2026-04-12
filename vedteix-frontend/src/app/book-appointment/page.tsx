"use client";

import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import "react-day-picker/dist/style.css";

const SLOT_INTERVALS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export default function BookAppointmentPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [meetingLink, setMeetingLink] = useState<string | null>(null);

  const dateStr = useMemo(() => (date ? format(date, "yyyy-MM-dd") : ""), [date]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dateStr || !time || !name.trim() || !email.trim()) {
      toast({
        variant: "destructive",
        title: t("book.title"),
        description: t("book.completeFields"),
      });
      return;
    }

    setSubmitting(true);
    setMeetingLink(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          date: dateStr,
          time,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Booking failed");
      }
      setMeetingLink(data.appointment?.meetingLink || null);
      toast({
        title: t("book.success"),
        description: t("book.successDesc"),
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: t("contact.errorTitle"),
        description: err instanceof Error ? err.message : "Booking failed",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container max-w-4xl py-16 md:py-24">
      <div className="mb-10 space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {t("book.kicker")}
        </p>
        <h1 className="text-4xl font-bold tracking-tight">{t("book.title")}</h1>
        <p className="mx-auto max-w-xl text-muted-foreground">{t("book.subtitle")}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{t("book.pickDate")}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={{ before: new Date() }}
              className="rounded-md border p-3"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("book.slots")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label>{t("book.name")}</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>{t("book.email")}</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>{t("book.date")}</Label>
                <Input readOnly value={dateStr} placeholder="YYYY-MM-DD" />
              </div>
              <div className="space-y-2">
                <Label>{t("book.time")}</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("book.time")} />
                  </SelectTrigger>
                  <SelectContent>
                    {SLOT_INTERVALS.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? t("book.submitting") : t("book.submit")}
              </Button>
              {meetingLink ? (
                <p className="text-sm text-muted-foreground">
                  {t("book.successDesc")}{" "}
                  <a href={meetingLink} className="text-primary underline" target="_blank" rel="noreferrer">
                    {meetingLink}
                  </a>
                </p>
              ) : null}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
