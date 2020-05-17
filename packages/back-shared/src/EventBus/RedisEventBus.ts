import { createClient } from "redis";

import { AppEvent, EventType } from "./Event";
import { EventBus } from "./EventBus";

const publisher = createClient();
const subscriber = createClient();

export const RedisEventBus: EventBus = {
  publish: <E extends AppEvent>(eventType: E["type"], payload: E["payload"]) =>
    publisher.publish(eventType, JSON.stringify(payload)),
  subscribe: (eventType: EventType, callback) => {
    subscriber.on("message", (channel, message) => {
      if (channel === eventType) callback(JSON.parse(message));
    });
    subscriber.subscribe(eventType);

    return {
      unsubscribe: () => subscriber.unsubscribe(eventType),
    };
  },
};