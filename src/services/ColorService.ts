export default class ColorService {
  public static getRandomColor(palette?: string[]): string {
    if (palette) {
      return palette[ Math.floor(Math.random() * palette.length) ];
    } else {
      return `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`;
    }
  }
}
