import ora from 'ora';
import chalk from 'chalk';

export type LevelNames = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export enum Level {
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3,
  Fatal = 4,
}

interface SpinnerOpts {
  color: ora.Color;
}

export class Logger {
  #level: Level = Level.Info;

  setLevel(level: LevelNames): void {
    switch (level) {
      case 'debug':
        this.#level = Level.Debug;
        break;
      case 'info':
        this.#level = Level.Info;
        break;
      case 'warn':
        this.#level = Level.Warn;
        break;
      case 'error':
        this.#level = Level.Error;
        break;
      case 'fatal':
        this.#level = Level.Fatal;
        break;
    }
  }

  /**
   * Log to stdout and create a spinner.
   *
   * ```
   * const spinner = log.spin('Hello world', { color: 'yellow' })
   * try {
   *   // do some task
   *   spinner.succeed()
   * } catch (e) {
   *   spinner.fail(e.msg)
   * }
   * ```
   */
  spin(
    msg: string,
    opts?: SpinnerOpts,
  ): ora.Ora {
    const spinner = ora(msg);
    spinner.color = opts?.color || 'cyan';
    return spinner.start();
  }

  debug(msg: string): void {
    if (this.#level <= Level.Debug) {
      console.log(chalk.bold.blue('DEBUG'), msg);
    }
  }

  info(msg: string): void {
    if (this.#level <= Level.Info) {
      // console.log(chalk.green('INFO'), ...args)
      ora().info(msg);
    }
  }

  warn(msg: string): void {
    if (this.#level <= Level.Warn) {
      // console.log(chalk.yellow('WARN'), ...args);
      ora().warn(chalk.bold.yellow(msg));
    }
  }

  error(msg: string): void {
    if (this.#level <= Level.Error) {
      // console.log(chalk.red('ERROR'), ...args)
      ora().fail(chalk.bold.red(msg));
    }
  }

  fatal({ msg, err }: {msg: string; err?: string}): void {
    if (this.#level <= Level.Fatal) {
      console.log(chalk.bold.red('FATAL'), msg);
      throw new Error(err || 'Some error occurred.');
    }
  }
}

const log = new Logger();

export default log;
