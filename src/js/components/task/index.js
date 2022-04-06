export default class Task {
  constructor(options) {
    this.text = options?.text || 'New task';
    this.pinned = options?.pinned || false;
    this.id = options?.id || null;
  }
}
