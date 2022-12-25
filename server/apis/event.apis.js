import EventService from "../service/event.service.js";

export default (app) => {
  const service = new EventService();
  app.post("/event", async (req, res, next) => {
    try {
      const data = await service.CreateEvent(
        req.body.creator,
        req.body.callback
      );
      console.log({ data });
      if (data.status === "success") {
        return res.status(201).json({ data: data.data });
      } else {
        return res.status(403).json({ message: data });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  app.delete("/event", async (req, res) => {
    try {
      console.log(req.body.creator);
      const data = await service.DeleteEvent(req.body.creator);
      if (data.status === "success") {
        return res.status(201).json(data.data);
      } else {
        return res.status(403).json({ message: data });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  app.post("/event/trigger", async (req, res) => {
    try {
      const data = await service.TriggerEvent(req.body.creator);
      if (data.status === "success") {
        return res.status(201).json(data.data);
      } else {
        return res.status(403).json({ message: data });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};
