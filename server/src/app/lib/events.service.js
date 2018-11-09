const mongo = require("../tools/mongo.service");
const userService = require("./users.service");
const bookingsSrv = require("./bookings.service");
const uploadService = require("../tools/upload.service");

const col = "events";

async function fillEventsOwner(events) {
  await Promise.all(
    await events.map(async event => {
      const eventCopy = event;

      eventCopy.owner = await userService.getById(event.ownerId);

      delete eventCopy.ownerId;

      return eventCopy;
    })
  );
  return events;
}

async function fillEventsBookingsNumber(events) {
  await Promise.all(
    events.map(async event => {
      const eventCopy = event;

      eventCopy.bookingsNumber = await mongo.count("bookings", {
        eventId: String(event._id)
      });

      return eventCopy;
    })
  );

  return events;
}

async function calculatePax(events) {
  await Promise.all(
    events.map(async event => {
      const eventCopy = event;
      const bookings = await bookingsSrv.getByEventId(event._id);
      let pax = 0;

      await Promise.all(
        bookings.map(async booking => {
          pax += Number(booking.seats);
        })
      );

      eventCopy.pax = pax;

      return eventCopy;
    })
  );

  return events;
}

module.exports.getAll = async (
  organizationId,
  ownerId,
  name,
  status,
  startDate,
  endingDate,
  priv
) => {
  const options = {};

  if (organizationId) {
    options.organizationId = organizationId;
  }

  if (ownerId) {
    options.ownerId = ownerId;
  }

  if (name) {
    options.$or = [
      { name: { $regex: name, $options: "i" } },
      { description: { $regex: name, $options: "i" } }
    ];
  }

  if (status) {
    options.status = status.toUpperCase();
  }

  if (startDate) {
    options.date = { $gte: startDate };
  }

  if (endingDate) {
    if (startDate) {
      options.date.$lte = endingDate;
    } else {
      options.date = { $lte: endingDate };
    }
  }

  let events = await mongo.findProjection(
    col,
    options,
    { thumbnail: -1 },
    { date: 1 }
  );

  events = await calculatePax(events);
  events = await fillEventsBookingsNumber(events);

  return fillEventsOwner(events);
};

module.exports.getByStatus = async (organizationId, status) => {
  const data = mongo.find(col, { organizationId, status }, { date: -1 });

  return data;
};

module.exports.getBySlug = async slug => mongo.find(col, { slug });

exports.insertEvent = async event => mongo.insertOne(col, event);

exports.updateEvent = async (eventId, event, sendMessage, customMessage) => {
  const oldEvent = await this.getById(eventId);
  const eventCopy = event;

  if (eventCopy.capacity < oldEvent.capacity - oldEvent.freeSeats) {
    return new Error("Capacity is not valid :(");
  }

  if (eventCopy.capacity > oldEvent.capacity) {
    eventCopy.freeSeats +=
      Number(eventCopy.capacity) - Number(oldEvent.capacity);
  }

  if (eventCopy.capacity < oldEvent.capacity) {
    eventCopy.freeSeats -=
      Number(oldEvent.capacity) - Number(eventCopy.capacity);
  }

  /* Si pasamos el evento a cancelado, cancelamos todas las reservas y aumentamos freeSeats */
  /* También eliminamos sus fotos asociadas */
  if (eventCopy.status === "CANCELED" && oldEvent.status !== eventCopy.status) {
    const bookings = await bookingsSrv.getAll(eventId, undefined);

    await Promise.all(
      bookings.map(async booking => {
        const bookingCopy = booking;

        if (booking.status !== "CANCELED") {
          bookingCopy.status = "CANCELED";

          await bookingsSrv.updateBooking(
            booking._id,
            bookingCopy,
            sendMessage,
            customMessage
          );
        }
      })
    );

    eventCopy.freeSeats = Number(eventCopy.capacity);

    if (eventCopy.files) {
      eventCopy.files.forEach(async file => {
        await uploadService.removeFile(eventId, file.name, true);
      });
    }
  }

  return mongo.updateOne(col, eventId, eventCopy);
};

exports.getById = async eventId => mongo.findOneById(col, eventId);

exports.removeEvent = async eventId => {
  const bookings = await bookingsSrv.getByEventId(eventId);

  Promise.all(
    bookings.map(async booking => {
      await bookingsSrv.deleteBooking(booking._id);
    })
  );

  await mongo.removeOne(col, eventId);
};

exports.addFiles = async (eventId, fileUrl) => {
  const updateCommand = { $push: { files: fileUrl } };
  const result = await mongo.updateQuery(col, eventId, updateCommand);

  return result;
};

exports.saveThumbnail = async (eventId, thumbnail, type) => {
  const event = await this.getById(eventId);

  event.thumbnail = {
    content: thumbnail,
    type
  };

  return mongo.updateOne(col, eventId, event);
};

exports.deleteThumbnail = async eventId => {
  const event = await this.getById(eventId);

  delete event.thumbnail;

  return mongo.updateOne(col, eventId, event);
};
