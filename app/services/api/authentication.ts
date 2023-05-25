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
export class Auth {
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

  setAccessToken = (token: string) => {
    if (token) {
      // this.apisauce.setHeader("Authorization", `Bearer ${token}`)
      this.apisauce.setHeader("Authorization", `Bearer ${token}`)
    }
  }
  // @demo remove-block-start
  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async LoginApp(user_name: string, password: string): Promise<LoginAuthentication> {
    
    const response: ApiResponse<ApiFeedResponse> = await apiMain.post(`auth/login`, {
      user_name,
      password,
    })
    console.log("response status", response);
    try {
      if (response.status == 200) return { kind: "ok", inforUser: response["data"] }
      else return { kind: "bad", inforUser: response.data["message"] }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  async RefreshToken(dateAccess: number, dateRefresh: number): Promise<RefreshToken> {
    try {
      const timeCurrent = new Date().getTime()
      console.log(timeCurrent, dateAccess)
      if (testDateToDate(timeCurrent, dateAccess)) {
        console.log("time curent < timeAccess")
        return { active: true, listToken: {} }
      } else {
        if (testDateToDate(timeCurrent, dateRefresh)) {
          console.log("time curent < timeRefresh")
          let refreshToken = await LocalStorage.load("RefreshToken")
          const response: ApiResponse<ApiFeedResponse> = await apiMain.post(`auth/refresh-tokens`, {
            refreshToken,
          })
          // apiMain.setHeader("Authorization", response.data["access"]["token"])
          // LocalStorage.save("RefreshToken", response.data["refresh"]["token"])
          return { active: true, listToken: response.data }
        } else {
          console.log("time curent > timeRefresh")
          return { active: false, listToken: {} }
        }
      }
    } catch (e) {}
    //return await apiMain.post(`auth/refresh-tokens`,{RefreshToken})
  }
  // @demo remove-block-end
}

// Singleton instance of the API for convenience
export const apiAuth = new Auth()
