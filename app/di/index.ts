import { ConsoleLogger, Logger } from "../logger"

export enum Dependency {
  Logger = "Logger"
}

class DiContainer {
  private overrides: { [key in Dependency]?: unknown } = {}
  private singletons: Map<Dependency, unknown> = new Map()

  override<T>(dependency: Dependency, value: T): void {
    this.overrides[dependency] = value
  }

  reset(): void {
    this.singletons = new Map()
    this.overrides = {}
  }

  logger(): Logger {
    return this.getOverride(Dependency.Logger) || new ConsoleLogger()
  }

  private getOverride<T>(dependency: Dependency): T | undefined {
    const overrideValue = this.overrides[dependency] as T
    if (overrideValue) return overrideValue
    return undefined
  }
}

export const DI = new DiContainer()
