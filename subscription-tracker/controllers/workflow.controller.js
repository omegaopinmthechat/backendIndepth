import dayjs from "dayjs";
import Subscription from "../models/subscriptions.model.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow");

const REMINDERS = [7, 5, 2, 1];

// This is the actual Upstash workflow logic
const handler = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;

  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
    }

    await triggerReminder(context, `Reminder ${daysBefore} days before`);
  }
});

// Express-compatible wrapper
export const sendRedminders = async (req, res) => {
  try {
    const result = await handler.fetch(req);
    const data = await result.json();
    res.status(result.status).json(data);
  } catch (err) {
    console.error("Workflow error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// helpers
const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () =>
    Subscription.findById(subscriptionId).populate("user", "name email")
  );
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
    // Send email, SMS, etc.
  });
};
