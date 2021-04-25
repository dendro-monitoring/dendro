### host-metrics:

- [x] cpu
  * dimensions
    * type: obj.type
    * collector: obj.tags.collector
    * host: obj.host
    * cpu-core: obj.tags.cpu
    * cpu-mode: obj.tags.mode
  * measures
    * measure-name: obj.name
    * measure-value: obj.gauge.value || obj.counter.value
  * time: obj.timestamp

- [x] memory
  * dimensions
    * type: obj.type
    * collector: obj.tags.collector
    * host: obj.host
  * measures
    * measure-name: obj.name
    * measure-value: obj.gauge.value || obj.counter.value
  * time: obj.timestamp

- [x] network
  * dimensions
    * type: obj.type
    * host: obj.host
    * collector: obj.tags.collector
    * device: obj.tags.device
  * measures
    * measure-name: obj.name
    * measure-value: obj.gauge.value || obj.counter.value
  * time: obj.timestamp
- [x] disk
  * dimensions
    * type: obj.type
    * host: obj.host
    * collector: obj.tags.collector
    * device: obj.tags.device
  * measures
    * measure-name: obj.name
    * measure-value: obj.gauge.value || obj.counter.value
  * time: obj.timestamp

- [x] filesystem
  * dimensions
    * type: obj.type
    * host: obj.host
    * collector: obj.tags.collector
    * device: obj.tags.device
    * filesystem: obj.tags.filesystem
    * mountpoint: obj.tags.mountpoint
  * measures
    * measure-name: obj.name
    * measure-value: obj.gauge.value || obj.counter.value
  * time: obj.timestamp

- [x] host
  * dimensions
    * type: obj.type
    * host: obj.host
    * collector: obj.tags.collector
  * measures
    * measure-name: obj.name
    * measure-value: obj.gauge.value || obj.counter.value
  * time: obj.timestamp

- [x] load
  * dimensions
    * type: obj.type
    * host: obj.host
    * collector: obj.tags.collector
  * measures
    * measure-name: obj.name
    * measure-value: obj.gauge.value || obj.counter.value
  * time: obj.timestamp

### mongodb:

- [x] mongodb-metrics
  * dimensions
    * type: obj.type
    * host: obj.host
  * measures
    * measure-name: obj.name
    * measure-value: obj.gauge.value || obj.counter.value
  * time: obj.timestamp

- [x] mongodb-logs
  * dimensions
    * type: obj.type
    * host: obj.host
    * severity: obj.parsed.s
    * component: obj.parsed.c
    * context: obj.parsed.ctx
    * message: obj.parsed.msg
  * measures
    * measure-name: severity
    * measure-value: obj.parsed.s
  * time: obj.timestamp

### nginx:

- [x] nginx-access-log
  * dimensions
    * type: obj.type
    * host: obj.host
    * agent: obj.parsed.agent
    * client: obj.parsed.client
    * method: obj.parsed.method
    * path: obj.parsed.path
    * referer: obj.parsed.referer
    * request: obj.parsed.request
    * response-body-size: obj.parsed.size
  * measures
    * measure-name: "status-code"
    * measure-value: obj.parsed.status
  * time: obj.timestamp

- [ ] nginx-error-log
  * dimensions
    * type: obj.type
    * host: obj.host
    * client: obj.parsed.client
    * server: obj.parsed.server
    * message: obj.parsed.message
    * request: obj.parsed.request
  * measures
    * measure-name: "severity"
    * measure-value: obj.parsed.severity (varchar)
  * time: obj.timestamp

- [x] nginx-metrics
  * dimensions
    * type: obj.type
    * host: obj.host
  * measures
    * measure-name: obj.name
    * measure-value: obj.gauge.value || obj.counter.value
  * time: obj.timestamp

### postgres
- [x] postgres-error-log
  * dimensions
    * host: obj.host
    * type: obj.type
    * database: obj.database
    * code: obj.code
    * message: obj.message
  * measures
    * measure-name: "level"
    * measure-value: obj.level
  * time: obj.timestamp

- [x] postgres-metrics
  * dimensions
    * type: obj.type
    * host: obj.host
    * database: obj.tags.db (string || null)
  * measures
    * measure-name: obj.name
    * measure-value: obj.gauge.value || obj.counter.value
  * time: obj.timestamp

### apache
- [ ] apache-access-log
- [ ] apache-error-log
- [ ] apache-metrics

### custom app
- [ ] custom-app-log
  * dimensions
    * host: obj.host
    * app-name: obj.appname
  * measures
    * measure-name: "message"
    * measure-value: obj.payload
  * time: obj.timestamp
