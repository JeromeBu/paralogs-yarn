import { generateUuid } from "@paralogs/shared";
import { AppEvent, EventType } from "./Event";

export interface EventBus {
  subscribe: <E extends AppEvent>(
    eventType: E["type"],
    callback: (payload: E["payload"]) => void,
  ) => {
    unsubscribe: () => void;
  };
  publish: <E extends AppEvent>(eventType: E["type"], payload: E["payload"]) => void;
}

export type InMemoryEventBus = EventBus & { events: AppEvent[] };

type Subscriptions = {
  [eventType in EventType]: {
    [id: string]: (params: any) => void;
  };
};

interface EventBusDependencies {
  getNow: () => Date;
}

export const createInMemoryEventBus = ({
  getNow,
}: EventBusDependencies): InMemoryEventBus => {
  const events: AppEvent[] = [];
  const subscriptions: Subscriptions = {
    UserSignedUp: {},
  };

  return {
    subscribe: (eventType: EventType, callback) => {
      const id = generateUuid();
      subscriptions[eventType][id] = callback;
      return {
        unsubscribe: () => {
          delete subscriptions[eventType][id];
        },
      };
    },
    publish: <E extends AppEvent>(eventType: E["type"], payload: E["payload"]) => {
      events.push({
        dateTimeOccurred: getNow(),
        type: eventType,
        payload,
      });
      Object.keys(subscriptions[eventType]).forEach(id => {
        subscriptions[eventType][id](payload);
      });
    },
    events,
  };
};

// const yoBus = createInMemoryEventBus({
//   getNow: () => new Date(),
//   getId: generateUuid,
// });
//
// let truc = 0;
//
// yoBus.subscribe("UserSignedUp", payload => {
//   console.log({ payload });
// });
//
// const interval = setInterval(() => {
//   yoBus.publish("UserSignedUp", {
//     // eslint-disable-next-line no-plusplus
//     email: `lala${truc++}@mail.com`,
//     uuid: generateUuid(),
//   });
// }, 1000);
//
// setTimeout(() => {
//   console.log("EVENTS : ", yoBus.events);
//   clearInterval(interval);
// }, 4000);
