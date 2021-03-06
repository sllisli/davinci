/*-
 * <<
 * Davinci
 * ==
 * Copyright (C) 2016 - 2017 EDP
 * ==
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * >>
 */





package edp.davinci.rest

import akka.http.scaladsl.server.{Directives, Route}
import edp.davinci.util.common.FileUtils


class DavinciRoutes extends Directives {
  //  override implicit val actorSystem: ActorSystem = Boot.system
  //  override implicit val materializer: ActorMaterializer = Boot.materializer


  //  override val host: String = Boot.host + ":" + Boot.port
  //  //the url of your api, not swagger's json endpoint
  //  override val basePath = "/api/v1"
  //  //the basePath for the API you are exposing
  //  override val apiDocsPath = "api-docs"
  //where you want the swagger-json endpoint exposed
  //  override val info = Info("Davinci REST API")
  //  provides license and other description details

  val indexRoute: Route = get {
    pathPrefix("") {
      pathEndOrSingleSlash {
        getFromFile(s"${FileUtils.dir}/davinci-ui/index.html")
      }
    } ~ getFromDirectory(s"${FileUtils.dir}/davinci-ui")
  }

  val shareRoute: Route = get {
    pathPrefix("share") {
      pathEndOrSingleSlash {
        getFromFile(s"${FileUtils.dir}/davinci-ui/share.html")
      }
    } ~ getFromDirectory(s"${FileUtils.dir}/davinci-ui")
  }
}
