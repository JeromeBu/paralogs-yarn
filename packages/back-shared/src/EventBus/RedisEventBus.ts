import { createClient } from "redis";

import { EventBus } from "./EventBus";

const publisher = createClient();
const subscriber = createClient();

export const RedisEventBus: EventBus = {
  publish: ({ type, payload }) =>
    publisher.publish(type, JSON.stringify(payload)),
  subscribe: (eventType, callback) => {
    subscriber.on("message", (channel, message) => {
      if (channel === eventType) callback(JSON.parse(message));
    });
    subscriber.subscribe(eventType);

    return {
      unsubscribe: () => subscriber.unsubscribe(eventType),
    };
  },
};
