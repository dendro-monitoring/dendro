export interface CustomApplicationData {
  name: string;
  filepath: string;
}

class CustomApplication {
  name: string;

  filepath: string;

  constructor({ name, filepath }: CustomApplicationData) {
    this.name = name
    this.filepath = filepath
  }
}

export default CustomApplication
