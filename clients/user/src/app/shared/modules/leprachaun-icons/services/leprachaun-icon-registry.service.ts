import { Injectable } from "@angular/core";
import { LeprachaunIconI } from "../leprachaun-icons";


@Injectable()
export class LeprachaunIconRegistryService {

  private readonly registry = new Map<string, string>();

  constructor() {
  }

  public registerIcons(icons: LeprachaunIconI[]): void {
    icons.forEach(icon => this.registry.set(icon.name, icon.data));
  }

  public getIcon(iconName: string): string | undefined {
    const registry = this.registry;
    if (!registry.has(iconName)) {
      console.warn(`Icon "${iconName}" not found. Please add to icon registry`);
    }
    return registry.get(iconName);
  }

}
