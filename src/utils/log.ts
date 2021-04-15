import * as ora from 'ora'
import * as chalk from 'chalk'

export type LevelNames = 'debug' | 'info' | 'warn' | 'error' | 'fatal'

export enum Level {
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3,
  Fatal = 4,
}

interface Spinner {
  color: ora.Color;
}

export class Logger {
  #level: Level = Level.Info

  setLevel(level: LevelNames) {
    switch (level) {
    case 'debug':
      this.#level = Level.Debug
      break
    case 'info':
      this.#level = Level.Info
      break
    case 'warn':
      this.#level = Level.Warn
      break
    case 'error':
      this.#level = Level.Error
      break
    case 'fatal':
      this.#level = Level.Fatal
      break
    }
  }

  /**
   * Usage: const spinner = log.spin('Hello world')
   *
   * @param {String} msg the string to print to console
   * @param {Spinner} opts options for the spinner
   * @returns {ora} spinner instance
   */
  spin(
    msg: string,
    opts?: Spinner,
  ) {
    const spinner = ora(msg)
    spinner.color = opts?.color || 'cyan'
    return spinner.start()
  }

  debug(msg: string) {
    if (this.#level <= Level.Debug) {
      console.log(chalk.blue('DEBUG'), msg)
    }
  }

  info(msg: string) {
    if (this.#level <= Level.Info) {
      // console.log(chalk.green('INFO'), ...args)
      ora().info(msg)
    }
  }

  warn(msg: string) {
    if (this.#level <= Level.Warn) {
      // console.log(chalk.yellow('WARN'), ...args)
      ora().warn(msg)
    }
  }

  error(msg: string) {
    if (this.#level <= Level.Error) {
      // console.log(chalk.red('ERROR'), ...args)
      ora().fail(msg)
    }
  }

  fatal(msg: string) {
    if (this.#level <= Level.Fatal) {
      console.log(chalk.red('FATAL'), msg)
      throw new Error('Some error occurred.')
    }
  }
}

export default new Logger()
