import { authenticate } from "../middleware/auth.js";
import UserController from "../controllers/userControllers.js";
import NotesController from "../controllers/notesControllers.js";
import { Router } from "express";
const router = Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.login);

router.get("/public/notes", NotesController.getEveryNotes);


router.get("/users",authenticate, UserController.getAllUsers);
router.get("/users/:id",authenticate, UserController.getUserById);
router.put("/users/:id",authenticate, UserController.updateUserById);
router.delete("/users/:id",authenticate, UserController.deleteUserById);

router.post("/notes",authenticate, NotesController.createNote);
router.get("/notes",authenticate, NotesController.getAllNotes);
router.get("/notes/:id",authenticate, NotesController.getNoteById);
router.put("/notes/:id",authenticate, NotesController.updateNoteById);
router.delete("/notes/:id",authenticate, NotesController.deleteNoteById);

export default router;