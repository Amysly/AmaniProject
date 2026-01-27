const mongoose = require("mongoose");

const admissionSchema = mongoose.Schema(
  {
    // ================= PERSONAL INFORMATION =================
    personalInfo: {
      fullName: {
        type: String,
        required: [true, "Please enter your full name"],
      },

      email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
      },

      phoneNumber: {
        type: String,
        required: [true, "Please enter your phone number"],
      },

      dateOfBirth: {
        type: Date,
        required: [true, "Please enter your date of birth"],
      },

      presentAddress: {
        type: String,
        required: [true, "Please enter your present address"],
      },

      permanentAddress: String,

      village: String,

      localGovt: {
        type: String,
        required: [true, "Please enter your local government area"],
      },

      stateOfOrigin: {
        type: String,
        required: [true, "Please enter your state of origin"],
      },

      citizenship: {
        type: String,
        required: [true, "Please enter your citizenship"],
      },

      poBox: String,

      maritalStatus: {
        type: String,
        enum: ["single", "married", "divorced"],
        required: [true, "Please select your marital status"],
      },
    },

    // ================= ENROLLMENT INFORMATION =================
    enrollmentInfo: {
      startMonth: {
        type: String,
        required: [true, "Please enter start month"],
      },

      startYear: {
        type: String,
        required: [true, "Please enter start year"],
      },

      studyYear: {
        type: Number,
        required: [true, "Please enter study year"],
      },

      programType: {
        type: String,
        enum: ["Full Time", "Part Time", "Distance Learning"],
        required: [true, "Please select program type"],
      },

      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: [true, "Please select department"],
      },

      currentOccupation: {
        type: String,
        required: [true, "Please enter current occupation"],
      },

      sponsorship: {
        type: String,
        required: [true, "Please enter sponsorship name"],
      },

      pastorName: {
        type: String,
        required: [true, "Please enter pastor name"],
      },

      relationshipWithPastor: {
        type: String,
        required: [true, "Please enter relationship with pastor"],
      },

      nextOfKinName: {
        type: String,
        required: [true, "Please enter next of kin name"],
      },

      relationshipWithNextOfKin: {
        type: String,
        required: [true, "Please enter relationship with next of kin"],
      },
    },

    // ================= RELIGIOUS + EDUCATION =================
    religiousEducationInfo: {
      churchName: {
        type: String,
        required: [true, "Please enter church name"],
      },

      churchAddress: {
        type: String,
        required: [true, "Please enter church address"],
      },

      churchMember: {
        type: String,
        enum: ["yes", "no"],
        required: [true, "Please select church membership"],
      },

      conversionDate: {
        type: Date,
        required: [true, "Please enter conversion date"],
      },

      conversionTestimony: {
        type: String,
        required: [true, "Please provide conversion testimony"],
      },

      secondarySchoolName: {
        type: String,
        required: [true, "Please enter secondary school name"],
      },

      secondarySchoolDates: {
        type: String,
        required: [true, "Enter secondary school dates"],
      },

      certificateType: {
        type: String,
        enum: ["WAEC", "NECO"],
        required: [true, "Select certificate type"],
      },

      collegeName: {
        type: String,
        required: [true, "Please enter college/university"],
      },

      collegeDates: {
        type: String,
        required: [true, "Enter college dates"],
      },
    },

    // ================= APPLICATION STATUS =================
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admission", admissionSchema);
