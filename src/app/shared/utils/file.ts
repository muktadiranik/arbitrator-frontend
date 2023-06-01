export class FileUtil {
  static getFileNameFromUrl(url: string) {
    return url.split('/').pop();
  }
  static fileSize(bytes: number, decimals = 1) {
    if (!+bytes) return '0 B';

    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

    let i = 0;

    for (i; bytes > 1024; ++i) {
      bytes /= 1024;
    }

    return bytes.toFixed(decimals) + ' ' + units[i];
  }
}
