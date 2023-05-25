import { Instance, SnapshotIn, SnapshotOut,flow, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { deviceAuth } from '../services/api/device';

/**
 * Model description here for TypeScript hints.
 */
export const DeviceModel = types
  .model("Device")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getDevicebyQr: flow(function*(deviceId: string){
      const device = yield deviceAuth.getDevicebyQr(deviceId);
      return device;
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Device extends Instance<typeof DeviceModel> {}
export interface DeviceSnapshotOut extends SnapshotOut<typeof DeviceModel> {}
export interface DeviceSnapshotIn extends SnapshotIn<typeof DeviceModel> {}
export const createDeviceDefaultModel = () => types.optional(DeviceModel, {})
