import Foundation
import ExpoModulesCore

internal final class FileSystemFile: FileSystemPath {
  override init(url: URL) {
    if !url.hasDirectoryPath {
      super.init(url: url)
      return
    }
    super.init(url: url.deletingLastPathComponent().appendingPathComponent(url.lastPathComponent, isDirectory: false))
  }
  func create() {
    FileManager.default.createFile(atPath: url.path, contents: nil)
  }
  func exists() -> Bool {
    var isDirectory: ObjCBool = false
    if FileManager.default.fileExists(atPath: url.path, isDirectory: &isDirectory) {
        return !isDirectory.boolValue
    }
    return false
  }
  // TODO: Move to the constructor once error is rethrowed
  func validatePath() throws {
    guard url.isFileURL && !url.hasDirectoryPath else {
      throw Exception(name: "wrong type", description: "tried to create a file with a directory path")
    }
  }

  func write(_ content: Either<String, TypedArray>) throws {
    if let content: String = content.get() {
      try content.write(to: url, atomically: false, encoding: .utf8) // TODO: better error handling
    }
    // TODO: typedarray, blobs, others support
  }

  func text() throws -> String {
    return try String(contentsOf: url)
  }
}
