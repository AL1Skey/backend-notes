import { db } from "./config/index.js";
import { ObjectId } from "mongodb";
export default class Notes {
  static collection() {
    return db.collection("users");
  }

  static async createNote(userId, title, content) {
    const note = {
      _id: new ObjectId(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await this.collection().updateOne(
      { _id: new ObjectId(userId) },
      { $push: { notes: note } }
    );
    return result;
  }

  static async getNotes(userId) {
    const result = await this.collection().findOne({ _id: new ObjectId(userId) }, { notes: 1 });
    console.log(result['notes'], 'result');
    if (!result.notes) {
      return [];
    }
    return result.notes;
  }

  static async getNote(userId, noteId) {
    const result = await this.collection().findOne(
      { _id: new ObjectId(userId) },
      { notes: { $elemMatch: { _id: new ObjectId(noteId) } } }
    );
    return result.notes[0];
  }

  static async updateNote(userId, noteId, title, content) {
    const updates = {
      $set: {
        'notes.$.title': title,
        'notes.$.content': content,
        'notes.$.updatedAt': new Date()
      }
    };
    const result = await this.collection().updateOne(
      { _id: new ObjectId(userId), notes: { $elemMatch: { _id: new ObjectId(noteId) } } },
      updates
    );
    return result;
  }

  static async deleteNote(userId, noteId) {
    const result = await this.collection().updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { notes: { _id: new ObjectId(noteId) } } }
    );
    return result;
  }

}