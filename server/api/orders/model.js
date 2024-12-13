const mongoose = require("mongoose");

const orderDetailsSchema = new mongoose.Schema({
  ticketCategories: {
    type: {
      type: String,
      required: [true, "Ticket category type is required"],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  sumTicket: {
    type: Number,
    required: true,
  },
});

const ticketCategorySchema = new mongoose.Schema(
  {
      type: {
            type: String,
            required: [true, "Ticket category type is required"],
        },
        price: {
            type: Number,
            default: 0,
        },
        stock: {
            type: Number,
            default: 0,
        },
        statusTicketCategories: {
            type: Boolean,
            enum: [true, false],
            default: true
        },
        expiredDate: {
            type: Date,
        },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Order date is required"],
    },
    personalDetail: {
      firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "Too short"],
        maxlength: [30, "Too long"],
      },
      lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Too short"],
        maxlength: [30, "Too long"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
      },
      role: {
        type: String,
        required: [true, "Role is required"],
      },
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    totalPay: {
      type: Number,
      required: [true, "Total pay is required"],
      default: 0,
    },
    totalOrderTicket: {
      type: Number,
      required: [true, "Total order ticket is required"],
    },
    orderItems: {
      type: [orderDetailsSchema],
      required: [true, "Order items is required"],
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant",
      required: [true, "Participant is required"],
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: [true, "Payment is required"],
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event is required"],
    },
    historyEvent: {
        title: {
            type: String,
            required: [true, "Event title is required"],
            unique: [true, "Event title must be unique"],
            minlength: [3, "Too few characters"],
            maxlength: [50, "Too many characters"],
        },
        date: {
            type: Date,
            required: [true, "Event date is required"],
        },
        about: {
            type: String,
        },
        tagline: {
            type: String,
            required: [true, "Event tagline is required"],
        },
        keyPoint: {
            type: [String],
        },
        vanueName: {
            type: String,
            required: [true, "Event vanue name is required"],
        },
        tickets: {
            type: [ticketCategorySchema],
            required: [true, "Event tickets is required"],
        },
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image",
            required: [true, "Event image is required"],
        },
        talent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Talent",
            required: [true, "Event talent is required"],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Event category is required"],
        },
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organizer",
            required: [true, "Organizer is required"],
        },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
