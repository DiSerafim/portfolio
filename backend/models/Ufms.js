const mongoose = require("mongoose");

// Aula (Lesson)
const LessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Matéria (Subject)
const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lessons: [LessonSchema], // Matéria tem várias aulas
});

// Semestre (Semester)
const SemesterSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  subjects: [SubjectSchema], // Semestre tém várias matérias
});

module.exports = mongoose.model("Ufms", SemesterSchema);
