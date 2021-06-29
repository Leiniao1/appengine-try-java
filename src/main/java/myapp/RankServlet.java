/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package myapp;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RankServlet extends HttpServlet {

  Map<String, Integer> scoreMap = new HashMap<String, Integer>() {{
    put("user1", 10);
    put("user2", 50);
  }};
  
  List<String> scoreRank = new ArrayList<String>() {{
    add("user1");
    add("user2");
  }};

  @Override
  public void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws IOException {
    String username = "defaultUser";
    int score = 0;
    String uriSuffix = req.getRequestURI().substring(1); // "/hang/100" -> "hang/100"
    username = uriSuffix.split("/")[1];
    score = Integer.parseInt(uriSuffix.split("/")[2]);
    int rank = 0;
    
    for (int i = 0; i < scoreRank.size(); i++) {
      if (score < scoreMap.get(scoreRank.get(i))) {
        rank = i;
        scoreRank.add(i, username);
        scoreMap.put(username, score);
      }
    }
    
    resp.setContentType("text/plain");
    resp.getWriter().println(rank);
  }
}
