const express = require("express");
const router = express.Router();
const Ufms = require("../models/Ufms"); // Importando corretamente o modelo

// Criar postagem
router.post("/", async (req, res) => {
  try {
    const { number, subjects } = req.body;
    const createFile = new Ufms({ number, subjects });
    await createFile.save();
    res
      .status(201)
      .json({ message: "Postagem feita com sucesso!", createFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar postagem" });
  }
});

// Mostrar todas postagens
router.get("/", async (req, res) => {
  try {
    const getFiles = await Ufms.find();

    res.json(getFiles);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar conteúdos", error });
  }
});

// Mostrar semestre
router.get("/:number", async (req, res) => {
  try {
    const semester = await Ufms.find({ number: req.params.number });
    if (!semester) {
      res.status(404).json({ message: "Semestre não encontrado." });
    }
    res.json(semester);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Semestre não encontrado" });
  }
});

// Mostrar aula por ID
router.get(
  "/:semesterId/subjects/:subjectId/lessons/:lessonId",
  async (req, res) => {
    try {
      const semesterId = req.params.semesterId;
      const subjectId = req.params.subjectId;
      const lessonId = req.params.lessonId;

      // Encontra o semestre
      const semester = await Ufms.findById(semesterId);
      if (!semester) {
        return res.status(404).json({ message: "Semestre não encontrado." });
      }

      // Encontra a matéria
      const subject = semester.subjects.id(subjectId);
      if (!subject) {
        return res.status(404).json({ message: "Matéria não encontrada." });
      }

      // Encontra a aula
      const lesson = subject.lessons.id(lessonId);
      if (!lesson) {
        return res.status(404).json({ message: "Aula não encontrada." });
      }

      res.json(lesson);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar aula." });
    }
  }
);

// Atualiza aula ID
router.put(
  "/:semesterId/subjects/:subjectId/lessons/:lessonId",
  async (req, res) => {
    try {
      const semesterId = req.params.semesterId;
      const subjectId = req.params.subjectId;
      const lessonId = req.params.lessonId;

      const getSemester = await Ufms.findById(semesterId);
      if (!getSemester) {
        return res.status(404).json({ message: "Semestre não encontrado." });
      }

      const getSubject = getSemester.subjects.id(subjectId);
      if (!getSubject) {
        return res.status(404).json({ message: "Matéria não encontrada." });
      }

      const updateLesson = getSubject.lessons.id(lessonId);
      if (!updateLesson) {
        return res.status(404).json({ message: "Aula não encontrada." });
      }

      updateLesson.name = req.body.name;
      updateLesson.title = req.body.title;
      updateLesson.content = req.body.content;

      await getSemester.save();
      res.json({ message: "Aula atualizada com sucesso!", getSemester });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar aula." });
    }
  }
);

// Apaga aula por ID
router.delete(
  "/:semesterId/subjects/:subjectId/lessons/:lessonId",
  async (req, res) => {
    try {
      const semesterId = req.params.semesterId;
      const subjectId = req.params.subjectId;
      const lessonId = req.params.lessonId;

      const getSemester = await Ufms.findById(semesterId);
      if (!getSemester) {
        return res.status(404).json({ message: "Semestre não encontrado." });
      }

      const getSubject = getSemester.subjects.id(subjectId);
      if (!getSubject) {
        return res.status(404).json({ message: "Matéria não encontrada." });
      }

      const deleteLesson = getSubject.lessons.id(lessonId);
      if (!deleteLesson) {
        return res.status(404).json({ message: "Aula não encontrada." });
      }

      getSubject.lessons.pull(deleteLesson);
      await getSemester.save();

      res.json({ message: "Aula deletada com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao excluir aula." });
    }
  }
);

// Apaga matéria por ID
router.delete("/:semesterId/subjects/:subjectId", async (req, res) => {
  try {
    const semesterId = req.params.semesterId;
    const subjectId = req.params.subjectId;

    const getSemester = await Ufms.findById(semesterId);
    if (!getSemester) {
      return res.status(404).json({ message: "Semestre não encontrado." });
    }

    const deleteSubject = getSemester.subjects.id(subjectId);
    if (!deleteSubject) {
      return res.status(404).json({ message: "Matéria não encontrada." });
    }

    getSemester.subjects.pull(deleteSubject);
    await getSemester.save();

    res.json({ message: "Matéria deletada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao excluir matéria." });
  }
});

// Apaga semestre por ID
router.delete("/:semesterId/", async (req, res) => {
  try {
    const semesterId = req.params.semesterId;

    const getSemester = await Ufms.findByIdAndDelete(semesterId);
    if (!getSemester) {
      return res.status(404).json({ message: "Semestre não encontrado." });
    }

    res.json({ message: "Semestre deletado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao excluir semestre." });
  }
});

module.exports = router;
