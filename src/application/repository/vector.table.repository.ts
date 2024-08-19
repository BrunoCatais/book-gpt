export default interface VectorTableRepository {
  removeAllByFileId(id: string): Promise<void>;
}
