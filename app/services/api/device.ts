/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApiResponse, // @demo remove-current-line
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import type {
  ApiConfig,
  ApiFeedResponse,
  LoginAuthentication,
  RefreshToken, // @demo remove-current-line
} from "./api.types"
import { apiMain } from "./apiMain"
import * as LocalStorage from "../../utils/storage/index"
import { testDateToDate } from "../../utils/common"
/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 20000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Device {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getDevicebyQr (deviceId: string) {
    const device: ApiResponse<ApiFeedResponse> = await apiMain.post(`db/item/read/${deviceId}`, {})
    try {
      if (device.status == 200) return { kind: "ok", result: device["data"] }
      else return { kind: "bad", result: device.data["message"] }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${device.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  // @demo remove-block-end
}

// Singleton instance of the API for convenience
export const deviceAuth = new Device()
