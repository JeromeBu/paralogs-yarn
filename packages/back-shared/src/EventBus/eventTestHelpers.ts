import { AppEvent } from "./EventBus";
import { InMemoryEventBus } from "./InMemoryEventBus";

export const createExpectDispatchedEvent = (eventBus: InMemoryEventBus) => (
  event: AppEvent,
) => {
  expect(eventBus.events).toContainEqual(event);
};
