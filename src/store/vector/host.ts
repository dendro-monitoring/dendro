export interface HostData {
  cpu?: boolean;
  disk?: boolean;
  filesystem?: boolean;
  load?: boolean;
  host?: boolean;
  memory?: boolean;
  network?: boolean;
  scrapeIntervalSeconds?: string;
}

class Host {
  cpu: boolean;

  disk: boolean;

  filesystem: boolean;

  load: boolean;

  host: boolean;

  memory: boolean;

  network: boolean;

  scrapeIntervalSeconds: string;

  constructor({
    cpu = false,
    disk = false,
    filesystem = false,
    load = false,
    host = false,
    memory = false,
    network = false,
    scrapeIntervalSeconds = '15'
  }: HostData) {
    this.cpu = cpu;
    this.disk = disk;
    this.filesystem = filesystem;
    this.load = load;
    this.host = host;
    this.memory = memory;
    this.network = network;
    this.scrapeIntervalSeconds = scrapeIntervalSeconds;
  }

  /*
   * Helps identify if a host vector config should be built
   */
  isMonitored(): boolean {
    if (this.cpu) return true;
    if (this.disk) return true;
    if (this.filesystem) return true;
    if (this.load) return true;
    if (this.host) return true;
    if (this.memory) return true;
    if (this.network) return true;

    return false;
  }
}

export default Host;
