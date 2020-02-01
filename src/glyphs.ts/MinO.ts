import GlyphModel from "../GlyphModel";
import CommonParameters from "../CommonParameters";
import { isUndefined } from "util";

export default class MinO implements GlyphModel {
  private commonParameters: CommonParameters;
  readonly additionalParameters: { [name: string]: any; } = {

  };
  setParameter(parameters: CommonParameters): void {
    this.commonParameters = parameters;
  }
  readonly paramManifest: string[] = [

  ];

  constructor(parameters: CommonParameters, additionalParameters?: { [name: string]: any }) {
    // Have the common parameter pointing to the common parameters
    this.commonParameters = parameters;
    // Configure the exclusive parameters
    if(additionalParameters) Object.assign(this.additionalParameters, additionalParameters);
  }
  get paramsInUse(): { [name: string]: any; } {
    const mergedParam: { [name: string]: any } = {};
    for(let param of this.paramManifest) {
      let common = (this.commonParameters as { [name: string]: any })[param];
      let added = this.additionalParameters[param];
      mergedParam[param] = isUndefined(added) ? common : added;
    }
    return mergedParam;
  }

  getOutline(): import("../GlyphOutline").default {
    throw new Error("Method not implemented.");
  }
}