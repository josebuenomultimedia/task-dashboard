const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (err) {
    console.error("❌ Error al obtener tareas:", err);
    res.status(500).json({ error: "Error al obtener tareas." });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, status, important } = req.body; // ⬅️ Incluimos important

    if (!title || typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ error: "El campo 'title' es obligatorio." });
    }

    const newTask = new Task({
      title: title.trim(),
      status: status || "todo",
      important: important ?? false, // ⬅️ Guardar important si viene
      user: req.user.userId,
    });

    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err);
    res.status(500).json({ error: "Error al crear tarea." });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Si el nuevo estado es in-progress, resetear notified
    if (req.body.status === "in-progress") {
      updateData.notified = false;
    }

    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }

    res.json(updated);
  } catch (err) {
    console.error("❌ Error al actualizar tarea:", err);
    res.status(500).json({ error: "Error al actualizar tarea." });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deleted) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }
    res.status(204).end();
  } catch (err) {
    console.error("❌ Error al eliminar tarea:", err);
    res.status(500).json({ error: "Error al eliminar tarea." });
  }
};
