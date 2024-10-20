import Notes from "../models/notes.js";
class NotesController {
  static async createNote(req, res) {
    try {
      const { title, content } = req.body;
      const note = await Notes.createNote(req.user._id, title, content);

      res.status(201).json({ message: "Note created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllNotes(req, res) {
    try {
      console.log(req.user._id);
      const notes = await Notes.getNotes(req.user._id);
      console.log(notes);
      res.status(200).json({ notes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getEveryNotes(req, res) {
    try {
      const userId = req.query.userId;
      const noteId = req.query.noteId;
      if (userId && noteId) {
        const note = await Notes.getNote(userId, noteId);
        res.status(200).json({ note });
      } else {
        const notes = await Notes.getAllNotes();
        res.status(200).json({ notes });
      }
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getNoteById(req, res) {
    try {
      const note = await Notes.getNote(req.user._id, req.params.id);
      res.status(200).json({ note });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateNoteById(req, res) {
    try {
      const { title, content } = req.body;
      const note = await Notes.updateNote(
        req.user._id,
        req.params.id,
        title,
        content
      );

      res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteNoteById(req, res) {
    try {
      console.log(req.params.id);
      const note = await Notes.deleteNote(req.user._id, req.params.id);

      res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
export default NotesController;
