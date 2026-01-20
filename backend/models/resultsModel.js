const mongoose = require('mongoose');

const resultSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    // A student takes ONE course per result record
    courses: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Department",
    },

    // TEST SCORES
    testScores: {
      firstTest: { type: Number, default: 0 },
      secondTest: { type: Number, default: 0 },
    },

    // ASSIGNMENT SCORE
    assignmentScores: {
      type: Number,
      default: 0,
    },

    // EXAM SCORE
    score: {
      type: Number,
      default: 0, // lecturer may not enter exam score yet
    },

    /*grade: {
      type: String,
      default: null, // computed when exam score is added
    },*/

    session: {
      type: String,
      required: [true, "Please enter a session"],
    },

    level: {
      type: Number,
      required: [true, "Please enter a level"],
    },

    semester: {
      type: String,
      enum: ["First", "Second"],
      required: [true, "Please enter a semester"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Results", resultSchema);
