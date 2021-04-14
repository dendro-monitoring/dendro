export interface HostData {
  cpu?: boolean;
  disk?: boolean;
  filesystem?: boolean;
  load?: boolean;
  host?: boolean;
  memory?: boolean;
  network?: boolean;
}

class Host {
  cpu: boolean;

  disk: boolean;

  filesystem: boolean;

  load: boolean;

  host: boolean;

  memory: boolean;

  network: boolean

  constructor({
    cpu = false,
    disk = false,
    filesystem = false,
    load = false,
    host = false,
    memory = false,
    network = false,
  }: HostData) {
    this.cpu = cpu
    this.disk = disk
    this.filesystem = filesystem
    this.load = load
    this.host = host
    this.memory = memory
    this.network = network
  }
}

export default Host
