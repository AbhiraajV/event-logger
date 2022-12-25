import { Event } from "../schema/event.schema.js";
import { write } from "../util/FileManager.js";

export default class EventService {
  async CreateEvent(creator, callback) {
    console.log({ creator, callback });
    try {
      const eventLogs = await Event.findOne({ creator });
      console.log({ eventLogs });
      if (!eventLogs) {
        const createdEvent = await Event.create({
          creator,
          event: "on",
          callback,
        });
        write(
          "\n \n event (" +
            callback +
            ") created by " +
            creator +
            " on " +
            createdEvent.createdAt
        );
        return {
          status: "success",
          data: createdEvent,
        };
      }
      if (eventLogs.event === "on") {
        return {
          status: "fail",
          message: "Please close previously turned on event",
        };
      }
      eventLogs.event = "on";
      eventLogs.callback = callback;
      const createdEvent = await eventLogs.save();
      write(
        "\n \n event (" +
          callback +
          ") created by " +
          creator +
          " on " +
          createdEvent.updatedAt
      );
      return { status: "success", data: createdEvent };
    } catch (error) {
      return {
        status: "fail",
        message: "unknown",
        data: error,
      };
    }
  }

  async DeleteEvent(creator) {
    try {
      console.log({ creator });
      const eventLogs = await Event.findOne({ creator });
      console.log({ eventLogs, cscs: "remove" });
      if (!eventLogs) {
        return {
          status: "fail",
          message: "No event exists",
        };
      }
      console.log({ eventLogs });
      if (eventLogs.event === "off") {
        return {
          status: "fail",
          message: "No active events",
        };
      }
      console.log({ eventLogs });
      eventLogs.event = "off";
      eventLogs.callback = "";
      console.log({ eventLogs });
      const saved = await eventLogs.save();
      write("\n \n event removed by " + creator + " on " + saved.updatedAt);
      return {
        status: "success",
        data: saved,
      };
    } catch (error) {
      return {
        status: "fail",
        message: "unknown",
        data: error,
      };
    }
  }

  async TriggerEvent(creator) {
    try {
      const eventLogs = await Event.findOne({ creator });
      if (!eventLogs) {
        return {
          status: "fail",
          message: "No event exists",
        };
      }
      if (eventLogs.event === "off") {
        return {
          status: "fail",
          message: "No active events",
        };
      }
      write(
        "\n \n event (" +
          eventLogs.callback +
          ") triggered by " +
          creator +
          " on " +
          new Date()
            .toISOString()
            .replace(/T/, " ") // replace T with a space
            .replace(/\..+/, "")
      );
      return {
        status: "success",
        data: eventLogs.callback,
      };
    } catch (error) {
      return {
        status: "fail",
        message: "unknown",
        data: error,
      };
    }
  }
}
